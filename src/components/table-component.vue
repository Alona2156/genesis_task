<template>
  <div id="table">
    <table id="items" border="1">
  <tr>
    <td v-for="header in headers">{{header}}</td>
  </tr>
  <tr v-for="item in itemsPerPage">
    <td v-for="value in item">{{value}}</td>
  </tr>
</table>
<div id="pages">
  <div class="page" v-for="index in pagesCount" @click="loadNextPage(index)">{{index}}</div>
</div>
</div>
</template>

<script>
export default {
  data(){
    return{
      currentPage: 1,
      showItemsPerPage: 10
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

#items {
  border-collapse: collapse;
  td {
    padding: 10px;
  }
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


</style>
