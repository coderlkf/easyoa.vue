<template>
  <div class="wrapper">
    <ul class="bg-bubbles">
      <li v-for="n in 10"
          :key="'li'+n"></li>
      <ol v-for="n in 5"
          :key="'ol'+n"></ol>
    </ul>
    <div class="bg bg-blur"
         style="display: none;"></div>
    <div style="height: 10%;"></div>
    <el-form :model="ruleForm2"
             :rules="rules2"
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text"
                  v-model="ruleForm2.account"
                  auto-complete="off"
                  placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input v-model="ruleForm2.checkPass"
                  auto-complete="off"
                  show-password
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked"
                   checked
                   class="remember">记住密码</el-checkbox>

      <div style="margin-bottom: 20px;"
           class="count-test">
        <el-radio-group @change="loginAccount"
                        v-model="account3">
          <el-radio-button label="测试账号1"></el-radio-button>
          <el-radio-button label="测试账号2"></el-radio-button>
          <el-radio-button label="超级管理员"></el-radio-button>
        </el-radio-group>
      </div>
      <el-form-item style="width:100%;">
        <el-button type="primary"
                   style="width:100%;"
                   @click.native.prevent="handleSubmit2"
                   :loading="logining">
          {{loginStr}}
        </el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '../api/api'

export default {
  name: 'login',
  data () {
    return {
      instance: "",
      loginStr: '登录',
      logining: false,
      loginingMock: false,
      ruleForm2: {
        account: 'admin',
        checkPass: '123456'
      },
      account3: '测试账号1',
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2 () {
      this.$refs.ruleForm2.resetFields();
    },
    loginAccount () {
      if (this.account3 === "测试账号1") {
        this.ruleForm2.account = "admin";
        this.ruleForm2.checkPass = "123456";
      } else if (this.account3 === "测试账号2") {
        this.ruleForm2.account = "test";
        this.ruleForm2.checkPass = "123456";
      } else {
        this.ruleForm2.account = "blogadmin";
        this.ruleForm2.checkPass = "blogadmin";
      }
    },
    openAlert (msg) {
      this.instance = this.$notify({
        title: '提示',
        message: msg,
        duration: 0,
        position: 'top-left'
      });
    },
    closeAlert () {
      this.instance.close()
    },
    // 获取 Token
    handleSubmit2 (ev) {
      var _this = this;
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true;
          var loginParams = { userName: this.ruleForm2.account, passWord: this.ruleForm2.checkPass };

          _this.loginStr = "登录中...";

          login(loginParams).then(res => {
            if (res.issuccess) {
              _this.$store.commit("saveToken", res.result.token);
              var curTime = new Date();
              // 过期时间暂定一个小时
              var expiredate = new Date(curTime.setSeconds(curTime.getSeconds() + 60 * 60));
              _this.$store.commit("saveTokenExpire", expiredate);
              window.localStorage.refreshtime = expiredate;
              window.localStorage.expires_in = 60 * 60;

              _this.$store.commit("saveUinfo", res.result.uinfo);
              _this.$router.replace('/')
            }
            else {
              _this.$message({
                message: '登录失败!',
                title: '提示',
                type: 'error'
              })
              _this.loginStr = '重新登录'
              this.logining = false
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}

</script>

<style>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  z-index: 9999;
  position: relative;
}

.login-container .title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login-container .remember {
  margin: 0px 0px 25px 0px;
}

.containerLogin {
  max-width: 600px;
  margin: 0 auto;
  padding: 80px 0;
  height: 400px;
  text-align: center;
}

.containerLogin h1 {
  font-size: 40px;
  -webkit-transition-duration: 1s;
  transition-duration: 1s;
  -webkit-transition-timing-function: ease-in-put;
  transition-timing-function: ease-in-put;
  font-weight: 200;
}

.bg {
  margin: 0px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url(../assets/loginbck.png) no-repeat top left;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.wrapper {
  background: #50a3a2;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(to bottom right, #127c7b 0, #50a3a2);
  opacity: 0.8;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wrapper.form-success .containerLogin h1 {
  -webkit-transform: translateY(85px);
  -ms-transform: translateY(85px);
  transform: translateY(85px);
}

.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.bg-bubbles li,
.bg-bubbles ol {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}

ol {
  padding: 0 !important;
}

.bg-bubbles ol:nth-child(11) {
  left: 10%;
  top: 10%;
  width: 20px;
  height: 20px;
}

.bg-bubbles ol:nth-child(12) {
  left: 20%;
  top: 40%;

  width: 60px;
  height: 60px;
}

.bg-bubbles ol:nth-child(13) {
  left: 65%;
  top: 30%;

  width: 100px;
  height: 60px;
}

.bg-bubbles ol:nth-child(14) {
  left: 70%;
  top: 30%;
  width: 100px;
  height: 150px;
}

.bg-bubbles ol:nth-child(15) {
  left: 50%;
  top: 70%;

  width: 40px;
  height: 60px;
}

.bg-bubbles li:nth-child(1) {
  left: 10%;
}

.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 17s;
  animation-duration: 17s;
}

.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
}

.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
  animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}

.bg-bubbles li:nth-child(5) {
  left: 70%;
}

.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}

.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
  animation-delay: 7s;
}

.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
  animation-delay: 15s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
}

.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}

.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
  animation-delay: 11s;
}

@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}

@keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}

.content-az {
  padding: 0 !important;
  border: none !important;
}
</style>
