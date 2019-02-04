<template>
<div id="filtering-block">
<p>Filter by:</p>
<select id="chooseHeader" v-model="mainFilterHeader" @change="createOptionsSet" :disabled="!notFiltered">
  <option v-for="header in headers" >{{header}}</option>
</select>
<select id="chooseOption" v-model="mainFilterOptions" :disabled="!notFiltered">
  <option v-for="item in filterOptions">{{item}}</option>
</select>
<div class="confirm" @click="filterTable" v-if="notFiltered">
  Confirm
</div>
</div>
</template>

<script>
import {eventBus} from 'main';

export default {
  props: ['currentPage'],
  data(){
    return{
      mainFilterHeader: "",
      mainFilterOptions: "",
      filterOptions: "",
      dataType: "",
      notFiltered: 1
    }
  },
  computed: {
    items(){
      return this.$store.state.filteredItems;
    },
    headers(){
      return this.$store.getters.headers;
    },
    filterHeader(){
      return this.mainFilterHeader.replace(/\s/g, "_").toLowerCase();
    }
  },
  methods: {
    createOptionsSet(){
      if (this.filterHeader !== "mass" && this.filterHeader !== "height" && this.filterHeader !== "birth_year"){
        this.filterOptions = new Set();
        this.items.forEach((item) =>{
          this.filterOptions.add(item[this.filterHeader]);
        });
        this.filterOptions = Array.from(this.filterOptions);
        this.dataType = "string";
      }
      else {
        this.createNumberRanges();
        this.dataType = "number";
      }
    },
    filterTable(){
      if (this.filterHeader.length > 0 && this.mainFilterOptions.length > 0 && this.dataType.length > 0){
        this.$emit('loadNextPage', 1);
        this.$store.commit('filterTable', {key: this.filterHeader, value: this.mainFilterOptions, type: this.dataType});
        this.notFiltered = 0;
      }
    },
    createNumberRanges(){
      var allValues = [];
      this.items.forEach((item) =>{
        var itemVal = parseFloat(item[this.filterHeader]);
        if(!isNaN(itemVal)){
          allValues.push(itemVal);
        }
      });
      var firstValue = Math.floor(Math.min.apply(null,allValues)/10)*10;
      var lastValue = Math.ceil(Math.max.apply(null, allValues)/10)*10;
      this.filterOptions = [];
      var stringNum = -1;
      var rangeStep = (lastValue - firstValue)/5;
      rangeStep = Math.ceil(rangeStep/10)*10;
      var rangeStepNumber = ((lastValue - firstValue)/rangeStep);
      for (var i = firstValue; i <= lastValue+rangeStep; i+=rangeStep){
          if (stringNum > -1 && stringNum < rangeStepNumber){
            this.filterOptions[stringNum] += i.toString();
          }
          stringNum ++;
          if (stringNum < rangeStepNumber){
            this.filterOptions.push(i.toString());
            this.filterOptions[stringNum] += " - ";
          }
      }
    }
  },
  created(){
    eventBus.$on('resetSelectedFilter', () =>{
      this.mainFilterHeader = "";
      this.mainFilterOptions = "";
      this.filterOptions = "";
      this.notFiltered = 1;
    })
  }
}
</script>

<style lang="scss">
@import '~@/_colors.scss';
@import '~@/_flex-mixin.scss';
@import '~@/_add-reset-button.scss';
@import '~@/_confirm-show-button.scss';

#filtering-block {
  @include flex($fxd: row, $jc: flex-start);
  width: 100%;
  flex-wrap: no-wrap;
  margin: 10px 0 0 0;
  padding: 0;
  * {
    margin: 0 25px 0 0;
  }
}

</style>
