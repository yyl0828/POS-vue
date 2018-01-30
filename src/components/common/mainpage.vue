<template>
  <div>
    <leftNav></leftNav>
    <div class="mainpage">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import leftNav from '@/components/common/leftNav'

  export default {
    name: 'mainpage',
    components: {
      leftNav
    }
  }
</script>
<style>
  .mainpage {
    float: left;
    width: 95%;
    background-color: #eff2f7;
    height: 100vh;
    overflow: hidden;

  }
</style>
