<template>
  <div class="login">
    <div class="container">
      <div class="title" v-if="password.length==0">请输入密码</div>
      <div class="title" style="margin-top: 10px">
        <span v-for="(li,index) in password" v-bind:key="index">*</span>
      </div>
      <div class="num_con">
        <el-row :gutter="20">
          <el-col :span="8" v-for="item in Num" v-bind:key="item">
            <div @click="wordpress(item)" class="num_btn">{{item}}</div>
          </el-col>
        </el-row>
      </div>
      <el-row class="del_btn">
        <el-col :span="9">
          <el-button type="primary" @click="del_one">删除</el-button>
        </el-col>
        <el-col :span="6">
          <div @click="wordpress(0)" class="num_btn" style="margin: 0">0</div>
        </el-col>
        <el-col :span="9">
          <el-button type="primary" @click="del_all">清空</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" class="enter" @click="enter_pass">进入</el-button>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'login',
    data() {
      return {
        Num: [],
        password: [],
      }
    },
    mounted: function () {
      for (let i = 1; i < 10; i++) {
        this.Num.push(i);
      }
    },
    methods: {
      wordpress: function (num) {
        this.password.push(num);
      },
      del_one: function () {
        this.password.pop();
      },
      del_all: function () {
        this.password = [];
      },
      enter_pass: function () {
        if (this.password = [0, 0, 0, 0]) {
          document.cookie = 'pass=true';
          this.$router.push('/pos');
        }
      }
    }
  }
</script>
<style scoped>
  .login {
    text-align: center;
    background-color: #409EFF;
    height: 100%;
  }

  .container {
    width: 400px;
    margin-top: 5%;
    background-color: white;
    display: inline-block;
    height: 450px;
    border-radius: 20px;
    padding: 20px;
  }

  .title {
    font-size: 20px;
  }

  .num_con {
    margin: 20px 30px;
  }

  .num_btn {
    background-color: #d3dce6;
    height: 60px;
    margin: 10px 5px;
    border-radius: 20px;
    font-size: 20px;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
  }

  .num_btn:hover {
    background-color: #409EFF;
  }

  .enter {
    display: inline-block;
    width: 80%;
    height: 50px;
  }

  .del_btn {
    margin: 10px;
  }

  .del_btn button {
    display: inline-block;
    width: 70%;
    height: 50px;
    background-color: #d3dce6;
    border: none;
    color: black;
  }
</style>
