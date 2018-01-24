<template>
  <div class="shop">
    <ul>
      <li v-for="li in list">
        <el-card class="box-card">
          <el-row :gutter="10">
            <el-col :span="11">
              <img src="/static/img/shop.jpg" class="shop-img">
            </el-col>
            <el-col :span="13">
              <div>
                <i class="icon iconfont icon-location"></i>{{li.name}}
                <span style="float: right">
                <svg class="icon" aria-hidden="true"
                     v-if="li.guest <20"><use xlink:href="#icon-normal"></use></svg>
                  <svg class="icon" aria-hidden="true"
                       v-if="li.guest<40 && li.guest>20"><use xlink:href="#icon-zhuangtai2"></use></svg>
                   <svg class="icon" aria-hidden="true"
                        v-if="li.guest>40"><use xlink:href="#icon-error"></use></svg>
            </span>
              </div>
              <div class="desc">
                <div>客流量：{{li.guest}}</div>
                <div>排队人数：{{li.list}}</div>
                <div>营业时间：{{li.opentime}}</div>
              </div>

            </el-col>
          </el-row>
        </el-card>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'shop',
    data() {
      return {
        list: ''
      }
    },
    created(){
      this.$http.get('http://localhost/Laravel_site/public/index.php/shop/getShop')
        .then(response=>{
          if(response.data.result){
            this.list = response.data.data.data;
          }
        })
        .catch(error=>{
          console.log(error);
          alert('网络错误');
        })

    }
  }
</script>
<style lang="less">
  .shop {
    color: #999999;
  ul li {
    list-style: none;
    display: inline-block;
    margin: 10px;
    width: 300px;
  .shop-img {
    width: 100%;
    height: 100%;
  }
  }
  .box-card {
  div {
    line-height: 24px;
  }
  .desc{
    font-size: 12px;
    line-height: 16px;
  }

  }
  }
</style>
