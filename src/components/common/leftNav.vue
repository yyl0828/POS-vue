<template>
  <div class="leftNav">
    <ul>
      <li @click="routerFun('/')"
      :class="path=='pos'?'activeLi':''">
        <i class="icon iconfont icon-goumai"></i>
        <div>收银</div>
      </li>
      <li @click="routerFun('/shop')"
          :class="path=='shop'?'activeLi':''">
        <i class="icon iconfont icon-dianpu"></i>
        <div>店铺</div>
      </li>
      <li @click="routerFun('/food')"
          :class="path=='food'?'activeLi':''">
        <i class="icon iconfont icon-hanbao"></i>
        <div>餐品</div>
      </li>
      <li @click="routerFun('/total')"
          :class="path=='total'?'activeLi':''">
        <i class="icon iconfont icon-zuanshi"></i>
        <div>统计</div>
      </li>
      <li @click="routerFun('/set')"
          :class="path=='set'?'activeLi':''">
        <i class="icon iconfont icon-gongnengjianyi"></i>
        <div>设置</div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'leftNav',
    data(){
      return{
        path:this.$route.name
      }
    },
    methods:{
      routerFun(path){
        this.$router.push(path);
        this.path = this.$route.name;
      }
    }
  }
</script>
<style lang="less">
  .leftNav{
    color: #fff;
    font-size: 10px;
    height: 100%;
    background-color: #1D8ce0;
    float: left;
    width: 5%;
    .iconfont{
      font-size: 24px;
    }
    ul{
      padding: 0;
      margin: 0;
      li{
        list-style: none;
        text-align: center;
        border-bottom: 1px solid #20a0ff;
        padding: 10px;
        cursor: pointer;
      }
    }
  .activeLi{
    background-color: #6db4fd;
  }
  }
</style>
