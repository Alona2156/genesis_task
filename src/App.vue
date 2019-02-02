<template>
  <div id="app">
    <table-component></table-component>
  </div>
</template>

<script>
import tableComponent from './components/table-component';

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    "table-component": tableComponent
  }
}
</script>

<style lang="scss">
@import '~@/_flex-mixin.scss';
@import '~@/_colors.scss';
@import '~@/_body.scss';

#app {
  @include flex();
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $grey;
}

</style>
