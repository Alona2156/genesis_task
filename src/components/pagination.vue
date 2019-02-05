<template>
<div id="pages">
  <div class="page" v-for="index in pagesCount" @click="loadNextPage(index)" v-bind:class="{'color-border': index === currentPage}">{{index}}</div>
</div>
</template>

<script>

export default{
  props: ['currentPage'],
  data() {
    return{
    }
  },
  computed: {
    itemsCount(){
      return this.$store.state.filteredItems.length;
    },
    pagesCount(){
      return Math.ceil(this.itemsCount/10);
    }
  },
  methods: {
    loadNextPage(index){
      this.currentPage = index;
      this.$emit('loadNextPage', this.currentPage);
    }
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';
@import '~@/_colors.scss';

#pages{
    @include flex(center, center, row);
    margin-top: 20px;
    width: calc(100% - 80px);
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

.color-border {
  border: 2px solid $green !important;
}
</style>
