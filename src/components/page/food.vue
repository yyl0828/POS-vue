<template>
  <div class="food">
    <el-card class="box-card" v-for="(li,index) in list" :key="index">
      <div slot="header" class="clearfix">
        <span>号码：{{li.num}}</span>
        <span>时间：{{li.time}}</span>

        <span style="float: right;margin-top: -10px;">
          <el-button v-if="li.status==2" type="success">叫号</el-button>
           <el-button v-if="li.status==1" disabled>制作中</el-button>
           <el-button v-if="li.status==0" disabled>排队中</el-button>
        </span>
      </div>
      <div>
        餐品：{{li.foods}}
      </div>
    </el-card>

  </div>
</template>
<script>
  export default {
    name: 'food',
    data(){
      return{
        list: [
          {
            num: 36,
            time: '2018-01-04 13:59',
            status: 2,
            foods: '香辣鸡腿堡、薯条、可乐'
          },
          {
            num: 37,
            time: '2018-01-04 14:09',
            status: 1,
            foods: '单人套餐、小吃桶、玉米寿司'
          },
          {
            num: 38,
            time: '2018-01-04 14:11',
            status: 1,
            foods: '全家桶、薯条、可乐'
          },
          {
            num: 39,
            time: '2018-01-04 14:13',
            status:0,
            foods: '双人套餐、红豆派、鸡米花'
          }
        ]
      }
    }
  }
</script>
<style lang="less">
  .food{
    padding: 20px;
    .box-card{
      margin-bottom: 10px;
    }
  }
</style>
