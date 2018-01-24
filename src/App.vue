<template>
  <div id="app">
    <leftNav></leftNav>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import leftNav from '@/components/common/leftNav'

  export default {
    name: 'app',
    components: {
      leftNav
    }
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1200px;
  font-size: 14px;
}
  .main{
    float: left;
    width: 95%;
    background-color: #eff2f7;
    height: 100%;
    overflow: hidden;

  }
.icon {
  width: 2em; height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>
