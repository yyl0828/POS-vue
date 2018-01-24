<template>
  <div class="set">
    <div class="waiter_con">
      当前收银员
      <el-select size="mini" @change="changeWaiter"
                 style="width: 120px" v-model="waiter" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.waiterId"
          :label="item.name"
          :value="item.waiterId">
        </el-option>
      </el-select>
    </div>
    <div class="set_item">
      自动叫号
      <el-switch
        v-model="autoCall"
        active-color="#13ce66"
        @change="callEvent"
        inactive-color="#dcdfe6">
      </el-switch>
    </div>
    <div class="set_item">
      是否显示常用商品
      <el-switch
        v-model="commonGood"
        @change="commonEvent"
        active-color="#13ce66"
        inactive-color="#dcdfe6">
      </el-switch>
    </div>

  </div>
</template>
<script>
  export default {
    name:'set',
    data(){
      return{
        autoCall:false,
        commonGood:false,
        waiter: '',
        options: []
      }
    },
    created(){
      this.$http.get('http://localhost/Laravel_site/public/index.php/set/getWaiter')
        .then(response => {
          if (response.data.result) {
            this.options = response.data.data.data;
            this.options.forEach((val, index, arr) => {
              if (val.status === 1) {
                this.waiter = val.waiterId;
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.$http.get('http://localhost/Laravel_site/public/index.php/set/getSet')
        .then(response => {
          if (response.data.result) {
            const set = response.data.data.data;
            this.commonGood = this.intToBoolean(set[1].status);
            this.autoCall = this.intToBoolean(set[0].status);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    methods:{
      intToBoolean(i){
        (i===1) ? i= true : i=false ;
        return i;
      },
      BooleanToInt(i){
        (i) ? i= 1 : i=0 ;
        return i;
      },
      changeWaiter(){
        this.$http.post(
          'http://localhost/Laravel_site/public/index.php/set/updateWaiter',{newWaiter:this.waiter})
          .then(response => {
            if (response.data.result) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      callEvent(){
        this.updateSet({setId:1,val:this.BooleanToInt(this.autoCall)});
      },
      commonEvent(){
        this.updateSet({setId:2,val:this.BooleanToInt(this.commonGood)});
      },
      updateSet(i){
        this.$http.post(
          'http://localhost/Laravel_site/public/index.php/set/updateSet',i)
          .then(response => {
            if (response.data.result) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
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
  .set{
    text-align: center;
    padding: 15px;
    .set_item{
      background: white;
      padding: 15px 30px;
      margin: 6px 10px;
      border-radius: 8px;
      width: 50%;
      display: inline-block;
      text-align: left;
    }
    .waiter_con{
      text-align: right;
      margin-bottom: 20px;
    }
  }
</style>
