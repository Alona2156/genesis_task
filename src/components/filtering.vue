<template>
  <div id="filtering">
    <p>Filter by:</p>
    <filtering-block v-bind:currentPage="currentPage" v-on:loadNextPage="updatePage($event)"></filtering-block>
    <div id="addFilterContainer">
      <div id="addFilter" class="filter-button" @click="addNewFilter">
         Add filter
      </div>
    </div>
  </div>
</template>

<script>
import filteringBlock from './filteringBlock.vue';

export default {
  props: ['currentPage'],
  data(){
    return{
    }
  },
  methods: {
    updatePage(page){
      this.$emit('updatePage', page);
    },
    addNewFilter(){
      console.log('add new filter');
    }
  },
  components: {
    'filtering-block': filteringBlock
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';
@import '~@/_colors.scss';

#filtering {
  @include flex(space-between, center, row);
  align-self: flex-start;
  flex-wrap: wrap;
  margin:0 0 10px 0;
  padding: 0;
  width: 100%;
}

.filter-button {
  padding: 3px 8px;
  color: white;
  background-color: $green;
  font-weight: bold;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
}

#addFilterContainer {
  flex-basis: 100%;
  @include flex($ai: flex-start);
  margin: 0;
}
</style>
