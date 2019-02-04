<template>
<div id="mainContainer">
    <filtering-block v-bind:currentPage="currentPage" v-bind:numberOfFilters="numberOfFilters" v-on:loadNextPage="updatePage($event)" v-for="index in numberOfFilters"></filtering-block>
  <div id="buttonsContainer">
    <div id="addFilter" class="filter-button" @click="addNewFilter">
       Add filter
    </div>
    <div id="reset" class="filter-button" @click="resetFilter">
      Reset
    </div>
  </div>
  </div>
</template>

<script>
import filteringBlock from './filteringBlock.vue';
import {eventBus} from 'main';

export default {
  props: ['currentPage'],
  data(){
    return{
      numberOfFilters: 1
    }
  },
  computed:{
    headers(){
      return this.$store.getters.headers;
    }
  },
  methods: {
    updatePage(page){
      this.$emit('updatePage', page);
    },
    addNewFilter(){
      if (this.numberOfFilters < this.headers.length){
        this.numberOfFilters++;
      }
    },
    resetFilter(){
      this.$store.commit('resetFilter');
      this.numberOfFilters = 1;
      eventBus.$emit('resetSelectedFilter');
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

#mainContainer {
  @include flex();
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

#buttonsContainer {
  width: 100%;
  @include flex(space-between, center, row);
  margin: 10px 0;
}
</style>
