<template>
  <table id="items" border="1" v-if="items.length > 0" >
    <tr>
      <td class="header" v-if="header !== ' id'" v-for="header in headers" v-bind:class="{'colored': header === sortBy}" @click="sortByHeader(header)">{{header}}</td>
    </tr>
    <tr v-for="item in itemsPerPage">
      <td v-if="key !== '_id'" v-for="(value, key) in item"><input type="text" v-model="value" v-bind:size="sizeValue(value)" @input="updateItem(item, key, value)" :disabled="item !== selectedItem" /></td>
      <td class="icons"><i class="fas fa-trash-alt" @click="deleteItem(item)"></i><i v-bind:class="[item === selectedItem ? 'fas fa-check-circle' : 'fas fa-edit']" @click="editItem(item)"></i></td>
    </tr>
  </table>
  <div v-else>
  Table is empty
  </div>
</template>

<script>
import {eventBus} from 'main';

export default {
  props: ['currentPage', 'sortBy', 'prevSortBy', 'order'],
  data(){
    return {
      showItemsPerPage: 10,
      selectedItem: ""
    }
  },
  computed: {
    items(){
      return this.$store.state.filteredItems;
    },
    headers(){
      return this.$store.getters.headers;
    },
    itemsPerPage(){
      return this.items.slice((this.currentPage * this.showItemsPerPage - this.showItemsPerPage), this.currentPage * this.showItemsPerPage);
    }
  },
  methods: {
    sizeValue(value){
      if (typeof value === "string"){
        return value.length + 1;
      }
      else {
        return 5;
      }
    },
    sortByHeader(header){
      this.prevSortBy = this.sortBy;
      this.sortBy = header;
      this.toggleSortingOrder();
      var payload = {};
      payload.header = header.replace(/\s/g, "_").toLowerCase();
      payload.order = this.order;
      this.$store.commit('sortBy', payload);
    },
    toggleSortingOrder(){
      if (this.prevSortBy === this.sortBy){
        if (this.order === "asc"){
          this.order = "desc";
        }
        else if (this.order === "desc"){
          this.order = "asc";
        }
        else {
          this.order = "desc";
        }
      }
      else {
        this.order = "desc";
      }
      this.$emit('update_sortBy_prevSortBy_order', {sortBy: this.sortBy, prevSortBy: this.prevSortBy, order: this.order});
    },
    deleteItem(item){
      this.$store.dispatch('deleteItemFromDB', item);
    },
    editItem(item){
      if (this.selectedItem !== item){
        this.selectedItem = item;
      }
      else {
        this.selectedItem = "";
        this.$store.dispatch('updateItemInDB', item);
      }
    },
    updateItem(item, key, value){
      item[key] = value;
    }
  }
}
</script>

<style lang="scss">
@import '~@/_colors.scss';

.no-style {
  border:none;
background-image:none;
background-color:transparent;
-webkit-box-shadow: none;
-moz-box-shadow: none;
box-shadow: none;
}

#items {
  border-collapse: collapse;
  td {
    input {
      @extend .no-style;
      padding: 5px;
      border: none;
      font-size: 16px;
      box-sizing: border-box;
      font-weight: 200;
    }
    input[type=text]:disabled{
      @extend .no-style;
      color: $grey;
      font-weight: 200;
      -webkit-text-fill-color: $grey;
      -webkit-opacity: 1;
    }
  }
  .header {
    cursor: pointer;
    font-weight: bold;
    padding: 10px;
  }
}

.colored {
  color: $green;
}

.icons {
  width: 60px;
  border-top:1px solid white;
  border-bottom:1px solid white;
  border-right:1px solid white;
  padding: 10px;
  .fa-trash-alt{
    float: left;
    cursor: pointer;
  }
  .fa-edit{
    float: right;
    cursor: pointer;
  }
  .fa-check-circle{
    float: right;
    cursor: pointer;
    color: $green;
    font-size: 18px;
  }
}
</style>
