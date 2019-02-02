<template>
<table id="items" border="1">
  <tr>
    <td v-for="header in headers">{{header}}</td>
  </tr>
  <tr v-for="item in items">
    <td v-for="value in item">{{value}}</td>
  </tr>
</table>
</template>

<script>
export default {
  data(){
    return{
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
    }
  },
  created(){
    this.$store.dispatch('getItems');
  }
}
</script>

<style lang='scss'>
#items {
  border-collapse: collapse;
  td {
    padding: 10px;
  }
}

</style>
