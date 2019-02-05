import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');

Vue.use(Vuex);

import {eventBus} from 'main';

export const store = new Vuex.Store({
  state: {
    items: [{}],
    itemsCount: 0,
    filteredItems: []
  },
  getters: {
    headers: state => {
      if (state.items.length > 0){
        return Object.keys(state.items[0]).map((header) =>{
          header = header.replace(/_/g, " ");
          return header.charAt(0).toUpperCase() + header.substr(1);
        });
      }
    }
  },
  mutations: {
  getItems(state, data) {
    state.items = data.items;
    state.itemsCount = data.count;
    if (state.filteredItems.length === 0){
      state.filteredItems = state.items;
    }
    else {
      state.filteredItems.forEach((item) =>{
        if(state.items.some(element => element._id === item._id)){
          //
        }
        else {
          var index = state.filteredItems.indexOf(item);
          state.filteredItems.splice(index, 1);
        }
      })
    }
  },
  sortBy(state, data) {
    var falseValues = ['none', 'n/a', 'unknown', undefined];
      state.filteredItems.sort((a, b) => {
        if (data.header === "birth_year"){
          if (falseValues.indexOf(a[data.header]) === -1 ){
            var prev = parseFloat(a[data.header]);
          }
          if (falseValues.indexOf(b[data.header]) === -1 ){
            var next = parseFloat(b[data.header]);
          }
        }
        else {
          var prev = a[data.header];
          var next = b[data.header];
        }
        if (falseValues.indexOf(prev) !== -1){
          return 1;
        }
        else if (falseValues.indexOf(next) !== -1){
          return -1;
        }
        else if (prev === next){
          return 0;
        }
        else if (prev < next) {
          if (data.order === "desc"){
            return -1;
          }
          else {
            return 1;
          }
        }
        else if (prev > next) {
          if (data.order === "desc"){
            return 1;
          }
          else {
            return -1;
          }
        }
      });
    },
    filterTable(state, payload){
      if (payload.type === "string"){
        this.state.filteredItems = this.state.filteredItems.filter((item) => {
          return item[payload.key] === payload.value;
        });
      }
      else if (payload.type === "number") {
        var payloadValue = payload.value.replace(/\s/g, "");
        var numberRangeFrom = payloadValue.match(/(\d+)\-/)[1];
        var numberRangeTo = payloadValue.match(/\-(\d+)/)[1];
          this.state.filteredItems = this.state.filteredItems.filter((item) =>{
            return parseFloat(item[payload.key]) >= numberRangeFrom && parseFloat(item[payload.key]) <= numberRangeTo;
          });
      }
    },
    resetFilter(state){
      this.state.filteredItems = this.state.items;
    },
    updateItemInDB(state, newItem){
      function replaceItem(arrayOfItems){
        arrayOfItems.map((item) =>{
          if (item._id === newItem._id){
            return item = newItem;
          }
        })
      }
      replaceItem(this.state.items);
      replaceItem(this.state.filteredItems);
    }
},
  actions: {
    getItems({commit}){
      axios.get('http://192.168.1.117:3001/items')
        .then(response =>{
          commit('getItems', response.data);
        })
        .catch(error=>{
          console.log(error);
        })
    },
    updateItemInDB({commit}, item){
      axios.put('http://192.168.1.117:3001/items/update', item)
      .then(response =>{
        commit('updateItemInDB', response.data);
      })
      .catch(error =>{
        console.log(error);
      })
    },
    deleteItemFromDB({commit, dispatch}, item){
      axios.delete('http://192.168.1.117:3001/items/delete', {params: {_id: item._id}})
      .then(response =>{
        dispatch('getItems');
      })
      .catch(error =>{
        console.log(error);
      })
    }
  }
})
