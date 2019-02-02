<template>
  <div id="table">
  <p id="sorting">Sorted by: {{sortBy}}</p>
    <table id="items" border="1">
  <tr>
    <td class="header" v-for="header in headers" v-bind:class="{'colored': header === sortBy}" @click="sortByHeader(header)">{{header}}</td>
  </tr>
  <tr v-for="item in itemsPerPage">
    <td v-for="value in item">{{value}}</td>
  </tr>
</table>
<div id="pages">
  <div class="page" v-for="index in pagesCount" @click="loadNextPage(index)" v-bind:class="{'color-border': index === currentPage}">{{index}}</div>
</div>
</div>
</template>

<script>
export default {
  data(){
    return{
      currentPage: 1,
      showItemsPerPage: 10,
      sortBy: "Name",
      prevSortBy: "Name",
      order: 'asc'
    }
  },
  computed: {
    items(){
      return this.$store.state.items;
    },
    itemsCount(){
      return this.$store.state.itemsCount;
    },
    headers(){
      return this.$store.getters.headers;
    },
    pagesCount(){
      return Math.ceil(this.itemsCount/10);
    },
    itemsPerPage(){
      return this.items.slice((this.currentPage * this.showItemsPerPage - this.showItemsPerPage), this.currentPage * this.showItemsPerPage);
    }
  },
  methods: {
    loadNextPage(index){
      this.currentPage = index;
    },
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
    }
  },
  created(){
    this.$store.dispatch('getItems');
  }
}
</script>

<style lang='scss'>
@import '~@/_flex-mixin.scss';
@import '~@/_colors.scss';

#table {
  @include flex();
}

#sorting {
  align-self: flex-start;
}

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

#pages{
    @include flex($fxd: row);
    margin-top: 20px;
    .page {
      @include flex();
      height: 30px;
      width: 30px;
      border: 2px solid $grey;
      border-radius: 50%;
      margin-left: 15px;
      cursor: pointer;
    }
}

.color-border {
  border: 2px solid $green !important;
}


</style>
