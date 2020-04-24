<template>
  <div>
    <div class="el-card welcomecard">
      <div class="el-card__header">
        <h3>{{uinfo.userName}},欢迎进入后台管理系统!</h3>
      </div>
      <div class="el-card__body">
        <div>上一次登录时间：{{uinfo.lastLoginTime}}</div>
        <div>上一次登录IP：{{uinfo.lastLoginIp}}</div>
        <div>登录次数：{{uinfo.loginCount}}</div>
      </div>
    </div>
    <div class="el-card welcomecard">
      <div class="el-card__header">日历
      </div>
      <div class="el-card__body">
        <el-calendar></el-calendar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uinfo: null
    }
  },
  created () {
    this.uinfo = JSON.parse(window.localStorage.getItem('uinfo'))
  }
}
</script>

<style>
.welcomecard {
  width: 40%;
  float: left;
  margin-right: 2em;
  font-size: 1.2em;
}
.welcomecard div {
  margin: 5px;
}
</style>