<template>
  <div id="filtering">
    <p>Filter by:</p>
    <select id="chooseHeader" v-model="filterHeader" @change="createItemsSet">
      <option v-for="header in headers" >{{header}}</option>
    </select>
    <select id="chooseItem" v-model="filterValue" @change="filterTable">
      <option v-for="item in itemValues">{{item}}</option>
    </select>
    <div id="reset" @click="resetFilter">
      Reset
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      filterHeader: "",
      itemValues: "",
      filterValue: ""
    }
  },
  computed: {
    items(){
      return this.$store.state.items;
    },
    headers(){
      return this.$store.getters.headers;
    },
    filterByHeader(){
      return this.filterHeader.replace(/\s/g, "_").toLowerCase();
    }
  },
  methods: {
    createItemsSet(){
      this.itemValues = new Set();
      this.items.forEach((item) =>{
        this.itemValues.add(item[this.filterByHeader]);
      });
      this.itemValues = Array.from(this.itemValues);
    },
    filterTable(){
      this.$store.commit('filterTable', {key: this.filterByHeader, value: this.filterValue});
    },
    resetFilter(){
      this.$store.commit('resetFilter');
      this.filterHeader = "";
      this.filterValue = "";
      this.itemValues = "";
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
