<template>
  <div class="total">
    <div class="table_con">
      <table class="listTable">
        <thead class="listHead">
        <tr>
          <td>编号</td>
          <td>订单</td>
          <td>价格</td>
          <td>数量</td>
          <td>支付</td>
          <td>打包</td>
          <td>点单</td>
          <td>日期</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in orderList" :key="item.orderId">
          <td>{{item.orderId}}</td>
          <td>
            <span v-for="li in item.goodlist" :key="li.goodId">
              <span>{{li.name}}、</span>
            </span>
          </td>
          <td>¥{{item.totalprice}}</td>
          <td>{{item.totalcount}}</td>
          <td>{{item.pay}}</td>
          <td>
            <span v-if="item.bale==0">否</span>
            <span v-if="item.bale==1">是</span>
          </td>
          <td>{{item.name}}</td>
          <td>{{item.time}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size= "pageSize"
      @current-change="getPageOrder"
      :total="count">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'total',
    data() {
      return {
        count: 0,
        orderList:[],
        pageSize: 20
      }
    },
    created(){
      this.getPageOrder(1);
    },
    methods: {
      getPageOrder: function (size) {
        this.$http.get('http://localhost/Laravel_site/public/index.php/order/getOrderPage/'+size)
          .then(response=>{
            if(response.data.result){
              this.orderList = response.data.data;
              this.count = parseInt(response.data.count[0]['count(*)']);
            }
          })
          .catch(error=>{
            console.log(error);
            alert('网络错误');
          })
      }
    }
  }
</script>
<style lang="less">

  .total {
    @border: 1px solid #e3e3e3;
    height: 100%;
    background: white;
  .table_con{
    height: 90%;
    overflow-y: auto;
    border: 2px solid #6db4fd;
  }
  .listTable{
    width: 100%;
    border-top:@border;
    border-left: @border;
    td{
      padding: 15px 8px;
      border-bottom: @border;
      border-right:  @border;
    }
  }
  }

</style>
