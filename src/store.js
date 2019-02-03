import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    items: [{}],
    itemsCount: 0
  },
  getters: {
    headers: state => {
      return Object.keys(state.items[0]).map((header) =>{
        header = header.replace(/_/g, " ");
        return header.charAt(0).toUpperCase() + header.substr(1);
      });
    }
  },
  mutations: {
  getItems(state, data) {
    state.items = data.items;
    state.itemsCount = data.count;
  },
  sortBy(state, data) {
    var falseValues = ['none', 'n/a', 'unknown', undefined];
      state.items.sort((a, b) => {
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
    }
},
  actions: {
    getItems({commit}){
      axios.get('http://localhost:3001/items')
        .then(response =>{
          commit('getItems', response.data);
        })
        .catch(error=>{
          console.log(error);
        })
    },
    sortBy({commit}, payload){
      commit('sortBy', payload);
    }
  }
})
