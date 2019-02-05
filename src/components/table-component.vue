<template>
  <div id="table" v-if="items.length > 0">
  <p id="sorting">Sorted by: {{sortBy}}, {{order}}</p>
  <filtering v-bind:currentPage="currentPage" v-on:updatePage="updateCurrentPage($event)"></filtering>
  <items-table v-bind:currentPage="currentPage" v-bind:sortBy="sortBy" v-bind:prevSortBy="prevSortBy" v-bind:order="order" v-on:update_sortBy_prevSortBy_order="updateData($event)"></items-table>
  <pagination v-bind:currentPage="currentPage" v-on:loadNextPage="updateCurrentPage($event)"></pagination>
</div>
<div v-else>
Table is empty
</div>
</template>

<script>
import Pagination from './pagination.vue';
import Table from './table.vue';
import Filtering from './filtering.vue';

export default {
  data(){
    return{
      currentPage: 1,
      sortBy: "Name",
      prevSortBy: "Name",
      order: 'mixed'
    }
  },
  computed: {
    items(){
      return this.$store.state.filteredItems;
    }
  },
  methods: {
    updateCurrentPage(page){
      this.currentPage = page;
    },
    updateData(data){
      this.sortBy = data.sortBy;
      this.prevSortBy = data.prevSortBy;
      this.order = data.order;
    }
  },
  components: {
    'pagination': Pagination,
    'items-table': Table,
    'filtering': Filtering
  },
  created(){
    this.$store.dispatch('getItems');
  }
}
</script>

<style lang='scss'>
@import '~@/_flex-mixin.scss';

#sorting {
  align-self: flex-start;
  margin: 0;
  padding: 0;
}

#table {
  @include flex(center, flex-start, column);
}

</style>
