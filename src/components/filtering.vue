<template>
  <div id="filtering">
    <p>Filter by:</p>
    <select id="chooseHeader" v-model="filterHeader">
      <option v-for="header in headers" >{{header}}</option>
    </select>
    <select id="chooseItem">
      <option v-for="item in items">{{item[filterByHeader]}}</option>
    </select>
  </div>
</template>

<script>
export default {
  data(){
    return{
      filterHeader: ""
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
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';

#filtering {
  @include flex($fxd: row);
  align-self: flex-start;
  margin: 0 0 10px 0;
  padding: 0;
  * {
    margin: 0 15px 0 0;
    padding: 0px;
  }
}
</style>
