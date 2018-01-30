<template>
  <div class="pos">
    <div>
      <el-row>
        <el-col :span="7" class="pos-order" id="order-list">
          <el-tabs v-model="activeName">
            <el-tab-pane label="点单" name="first">
              <el-table :data="tableData" border stripe
                        style="width: 100%;text-align: left">
                <el-table-column prop="name" label="商品名称">
                </el-table-column>
                <el-table-column prop="price" label="金额" width="60">
                </el-table-column>
                <el-table-column prop="count" label="数量" width="50">
                </el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="addItem(scope.row)">增加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="total">数量：{{totalCount}}<span class="totalprice">总价：¥{{totalPrice}}</span></div>
              <div class="total">
                <el-radio v-model="bale" label="0">不打包</el-radio>
                <el-radio v-model="bale" label="1">打包</el-radio>
              </div>
              <div class="order-btn">
                <el-button type="warning" @click="checkOut(0)">挂单</el-button>
                <el-button type="danger" @click="deleteAll">删除</el-button>
                <el-button type="success" @click="choosePay()">结账</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="挂单" name="second">
              <el-card class="box-card" v-for="(item,index) in pendList" v-if="item[0].status==0" :key="index">
                <div slot="header" class="clearfix">
                  <span v-if="item.length >0">{{item[0].time}}</span>
                  <div class="btn_con">
                    <el-button type="success" size="mini" @click="checkoutpend(index,item[0].orderId)">结算</el-button>
                    <el-button type="danger" size="mini" @click="deletePend(item[0].orderId,'del')">删除</el-button>
                  </div>
                </div>
                <div>
                  <span v-for="li in item">{{li.name}} </span></div>
                <div style="float: right;">总计：¥{{item[0].price}}</div>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="17">
          <div class="common-goods" v-if="showCommon==1">
            <div class="goods-title">常用商品</div>
            <div class="goods-list">
              <ul>
                <li v-for="(item,index) in commonGoods" @click="addGoods(item)">
                  <span>{{item.name}}</span>
                  <span class="o-price">¥{{item.price}}元</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-type">
            <el-tabs>
              <el-tab-pane :label="type.typeName" v-for="(type,num) in typeGoods" :key="num">
                <ul class='cookList' v-for="(item,index) in type.list" :key="index">
                  <li @click="addGoods(item)">
                    <span class="foodImg"><img :src="item.img" width="100%"></span>
                    <span class="foodName">{{item.name}}</span>
                    <span class="foodPrice">¥{{item.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="选择支付方式"
      :visible.sync="dialogVisible"
      width="30%">
      <el-radio v-model="pay" label="支付宝">支付宝</el-radio>
      <el-radio v-model="pay" label="微信支付">微信支付</el-radio>
      <el-radio v-model="pay" label="银行卡">银行卡</el-radio>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="checkOut(1)">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue'

  export default {
    name: 'pos',
    data(){
      return {
        activeName:'first',
        totalCount: 0,
        totalPrice: 0,
        tableData: [],
        commonGoods: [],
        typeGoods: [
          {
            typeName: '汉堡',
            list: ''
          },
          {
            typeName: '小食',
            list: ''
          },
          {
            typeName: '饮料',
            list: ''
          },
          {
            typeName: '套餐',
            list:''
          }
        ],
        pendList:[],
        showCommon: '',
        dialogVisible: false,
        pay: '支付宝',
        bale: '0'
      }
    },
    created(){
       this.$http.get('http://localhost/Laravel_site/public/index.php/good/common')
        .then(response=>{
          this.commonGoods=response.data;
        })
        .catch(error=>{
          console.log(error);
        });
       this.$http.get('http://localhost/Laravel_site/public/index.php/good/all')
        .then(response => {
          this.typeGoods[0].list = response.data[0];
          this.typeGoods[1].list = response.data[1];
          this.typeGoods[2].list = response.data[2];
          this.typeGoods[3].list = response.data[3];
        })
        .catch(error => {
          console.log(error);
        });
      this.$http.get('http://localhost/Laravel_site/public/index.php/set/getSet')
        .then(response => {
          this.showCommon = response.data.data.data[1].status;
        })
        .catch(error => {
          console.log(error);
        });
      this.getPendOrder();
    },
    mounted() {
      const orderHeight = document.body.clientHeight;
      document.getElementById('order-list').style.height = orderHeight + 'px';

    },
    methods:{
      addGoods(good){
        this.activeName = 'first';
        let ishave = false;
        this.tableData.forEach((val,index, arr) => {
          if(good.goodId === val.goodId){
            ishave = true;
            Vue.set(this.tableData, index, {
              goodId: val.goodId,
              name: val.name,
              count: val.count+1,
              price: val.price
            });
          }
        });
        if(!ishave){
          const item = good;
          item.count = 1;
          this.tableData.push(item);
        }
        this.computedTotal();
      },
      deleteItem(good){
        this.tableData = this.tableData.filter(o => o.goodId !== good.goodId);
        this.computedTotal();
      },
      addItem(good){
        this.tableData.forEach((val,index, arr) => {
          if(good.goodId === val.goodId){
            Vue.set(this.tableData, index, {
              goodId: val.goodId,
              name: val.name,
              count: val.count+1,
              price: val.price
            });
          }
        });
      },
      computedTotal(){
        this.totalCount = 0;
        this.totalPrice = 0;
        this.tableData.forEach((val) => {
          this.totalCount += parseInt(val.count);
          this.totalPrice += parseInt(val.price);
        });
      },
      deleteAll(){
        this.tableData = [];
        this.totalCount = 0;
        this.totalPrice = 0;
        this.bale = '0';
      },
      checkoutpend(index,orderId){
         this.$http.post('http://localhost/Laravel_site/public/index.php/order/pendUpdate',{orderId:orderId})
          .then(response => {
            if(response.data.result){
              this.$message({
                message: '结账成功！',
                type: 'success'
              });
              this.deletePend(orderId,'hide');
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      deletePend(orderId,mode){
        if(mode==='del'){
           this.$http.post('http://localhost/Laravel_site/public/index.php/order/deleteOrder',{orderId:orderId})
            .then(response => {
              if(response.data.result) {
                this.$message({
                  message: '删除成功！',
                  type: 'success'
                });
                this.pendList[orderId][0].status = 1;
              }
            })
            .catch(error => {
              console.log(error);
            })
        }
        else{
          this.pendList[orderId][0].status = 1;
        }

      },
      choosePay(){
        this.dialogVisible = true;
      },
      checkOut(status){
        this.dialogVisible = false;
        if(this.tableData.length > 0 && this.totalCount > 0 && this.totalPrice > 0){
          let result = {
            totalcount: this.totalCount,
            totalprice: this.totalPrice,
            status:status,
            goodlist: [],
            pay: this.pay,
            bale: this.bale
          };
          this.tableData.forEach((val) => {
            result.goodlist.push({
              goodId:val.goodId,
              count:val.count
            })
          });
           this.$http.post('http://localhost/Laravel_site/public/index.php/order/insertOrder', result)
            .then(response => {
              if(response.data.result){
                if(status===1){
                  this.$message({
                    message: '结账成功！',
                    type: 'success'
                  });
                }
                else{
                  this.getPendOrder();
                }
                this.deleteAll();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
        else{
          this.$message.error('账单为空');
        }
      },
      getPendOrder(){
        this.$http.get('http://localhost/Laravel_site/public/index.php/order/getPendOrder')
          .then(response =>{
            if(response.data.result){
              this.pendList = response.data.data.data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
</script>
<style lang="less">
  .pos{
    .pos-order {
      background-color: #f9fafc;
      border-right: 1px solid #c0ccda;
      padding: 0 10px;
    .order-btn{
      padding-top: 10px;
      border-top: 1px solid #ebeef5;
    }
    }
    .common-goods {
      .goods-title {
        height: 20px;
        border-bottom: 1px solid #d3dce6;
        background-color: #f9fafc;
        padding: 10px;
        text-align: left;
      }
      .goods-list ul li{
        list-style: none;
        float: left;
        border:1px solid #caccd2;
        margin: 5px;
        padding: 10px;
        background-color: white;
        border-radius: 5px;
        cursor: pointer;
        font-size: 13px;
        .o-price{
          color: #5887ff;
          margin-left: 3px;
        }
      }
    }
  .goods-type{
    clear: left;
    padding: 0 10px;
  .cookList li{
    list-style: none;
    width:200px;
    border:1px solid #E5E9F2;
    height: auto;
    overflow: hidden;
    background-color:#fff;
    padding: 4px;
    float:left;
    margin: 2px;
    border-radius: 3px;
    cursor: pointer;

  }
  .cookList li span{
    display: block;
    float:left;
  }
  .foodImg img{
    width: 80px;
    height: 80px;
  }
  .foodName{
    padding-left: 10px;
    color:brown;
    margin-top: 10px;
  }
  .foodPrice{
    font-size: 13px;
    padding-left: 10px;
    padding-top:10px;
  }
  }
  .total{
    padding: 10px;
    background-color: white;
    border:1px solid #E5E9F2;
    text-align: left;
    .totalprice{
      float: right;
      display: inline-block;
      width: 120px;
    }
  }
  .btn_con {
    float: right;
    display: inline-block !important;
    margin-top: -5px;
    margin-right: -5px;
  }
  .box-card{
    margin-bottom: 10px;
  }
  }
</style>
