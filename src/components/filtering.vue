<template>
  <div id="filtering">
    <p>Filter by:</p>
    <select id="chooseHeader" v-model="mainFilterHeader" @change="createOptionsSet">
      <option v-for="header in headers" >{{header}}</option>
    </select>
    <select id="chooseOption" v-model="mainFilterOptions" @change="filterTable">
      <option v-for="item in filterOptions">{{item}}</option>
    </select>
    <div id="reset" @click="resetFilter">
      Reset
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentPage'],
  data(){
    return{
      mainFilterHeader: "",
      mainFilterOptions: "",
      filterOptions: "",
      dataType: ""
    }
  },
  computed: {
    items(){
      return this.$store.state.items;
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
      this.$emit('loadNextPage', 1);
      this.$store.commit('filterTable', {key: this.filterHeader, value: this.mainFilterOptions, type: this.dataType});
    },
    resetFilter(){
      this.$store.commit('resetFilter');
      this.mainFilterHeader = "";
      this.mainFilterOptions = "";
      this.filterOptions = "";
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
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';
@import '~@/_colors.scss';

#filtering {
  @include flex($fxd: row, $jc: flex-start);
  width: 100%;
  align-self: flex-start;
  margin: 0 0 10px 0;
  padding: 0;
  * {
    margin: 0 15px 0 0;
    padding: 0px;
  }
}

#reset {
  margin-left: auto;
  margin-right: 0;
  padding: 3px 8px;
  color: $grey;
  background-color: $green;
  font-weight: bold;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
}
</style>
