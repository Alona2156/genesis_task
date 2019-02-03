<template>
  <table id="items" border="1">
    <tr>
      <td class="header" v-for="header in headers" v-bind:class="{'colored': header === sortBy}" @click="sortByHeader(header)">{{header}}</td>
    </tr>
    <tr v-for="item in itemsPerPage">
      <td v-for="value in item">{{value}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ['currentPage', 'sortBy', 'prevSortBy', 'order'],
  data(){
    return {
      showItemsPerPage: 10
    }
  },
  computed: {
    items(){
      return this.$store.state.items;
    },
    headers(){
      return this.$store.getters.headers;
    },
    itemsPerPage(){
      return this.items.slice((this.currentPage * this.showItemsPerPage - this.showItemsPerPage), this.currentPage * this.showItemsPerPage);
    }
  },
  methods: {
    sortByHeader(header){
      this.prevSortBy = this.sortBy;
      this.sortBy = header;
      this.toggleSortingOrder();
      var payload = {};
      payload.header = header.replace(/\s/g, "_").toLowerCase();
      payload.order = this.order;
      this.$store.dispatch('sortBy', payload);
    },
    toggleSortingOrder(){
      if (this.prevSortBy === this.sortBy){
        if (this.order === "asc"){
          this.order = "desc";
        }
        else if (this.order === "desc"){
          this.order = "asc";
        }
      }
      else {
        this.order = "desc";
      }
      this.$emit('update_sortBy_prevSortBy_order', {sortBy: this.sortBy, prevSortBy: this.prevSortBy, order: this.order});
    }
  }
}
</script>

<style lang="scss">
@import '~@/_colors.scss';

#items {
  border-collapse: collapse;
  td {
    padding: 10px;
  }
  .header {
    cursor: pointer;
    font-weight: bold;
  }
}

.colored {
  color: $green;
}
</style>
