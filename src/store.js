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
    getItems(state, data){
      state.items = data.items;
      state.itemsCount = data.count;
    }
  },
  actions: {
    getItems({commit, dispatch}){
      axios.get('http://localhost:3001/items')
        .then(response =>{
          commit('getItems', response.data);
        })
        .catch(error=>{
          console.log(error);
        })
    }
  }
})
