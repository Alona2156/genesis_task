<template>
  <div id="mainContainer">
    <filtering-block v-bind:currentPage="currentPage" v-bind:numberOfFilters="numberOfFilters" v-on:loadNextPage="updatePage($event)" v-for="index in numberOfFilters" v-bind:key="index"></filtering-block>
    <div id="buttonsContainer">
      <div id="addFilter" class="filter-button" @click="addNewFilter">
         Add filter
      </div>
      <div class="filter-button" @click="resetFilter">
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
      this.updatePage(1);
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
@import '~@/_add-reset-button.scss';

#mainContainer {
  @include flex(center, flex-start, column);
  width: calc(100% - 80px);
}

#buttonsContainer {
  width: 100%;
  @include flex(space-between, center, row);
  margin: 10px 0;
}
</style>
