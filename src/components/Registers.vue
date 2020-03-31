<template>
  <body id="paper">
  <el-form :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">用户注册</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="submitClick" style="width: 40%;background: #505458;border: none">
        注册
      </el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
    import {postRequest} from '../utils/api'

    export default {
        data() {
            return {
                rules: {
                    account: [{required: true, message: '账号不能为空', trigger: 'blur'}],
                    checkPass: [{required: true, message: '密码不能为空', trigger: 'blur'}]
                },
                checked: true,
                loginForm: {
                    username: 'zengjian',
                    password: '123'
                },
                loading: false
            }
        },
        methods: {
            submitClick: function () {
                var _this = this;
                this.loading = true;
                postRequest('/register', {
                    username: this.loginForm.username,
                    password: this.loginForm.password,
                }).then(resp => {
                    if (resp.status == 200) {
                        //成功
                        var json = resp.data;
                        if (json.status == 'success') {
                            _this.$router.replace({path: '/login'});
                        } else {
                            _this.$alert('账号或密码错误!', '注册失败!');
                        }
                    } else {
                        //失败
                        _this.$alert('账号或密码错误!', '注册失败!');
                    }
                    _this.loading = false;
                }, resp => {
                    _this.loading = false;
                    _this.$alert('找不到服务!', '注册失败!');
                });
            }
        }
    }
</script>
<style>
  #paper {
    background: url("../assets/img/bg/back.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: -5px 0px;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }

  /*.login_button {*/
  /*background: #505458;*/
  /*}*/
  /*el_checkbox {*/
  /*background: #505458;*/
  /*}*/
</style>
