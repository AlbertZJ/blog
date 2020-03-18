<template>

  <body >
  <el-header class="cate_mana_header">
    <el-input
      placeholder="请输入新密码"
      v-model="password" style="width: 200px;">
    </el-input>
    <el-button type="primary" size="medium" style="margin-left: 10px" @click="updatePwd">确认修改</el-button>
  </el-header>

  <el-form :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">用户信息</h3>
    <el-form-item label="账号:" :label-width="formLabelWidth" prop="account">
    <span>  {{update.username}}</span>
<!--      <el-input type="text" v-model="update.username" auto-complete="off" placeholder="账号"></el-input>-->
    </el-form-item>
    <el-form-item label="姓名:" :label-width="formLabelWidth" prop="nickname">
      <el-input type="text" v-model="update.nickname" auto-complete="off" placeholder="姓名" ></el-input>
    </el-form-item>
    <el-form-item label="邮箱:" :label-width="formLabelWidth" prop="email">
      <el-input type="email" v-model="update.email" auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item label="头像:" :label-width="formLabelWidth" prop="userface">
      <el-input type="text" v-model="update.userface" auto-complete="off" placeholder="头像地址"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="submitClick" style="width: 60%;background: dodgerblue;border: none">修改</el-button>
<!--      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click.native.prevent="sorry">取消</el-button>-->

    </el-form-item>
  </el-form>
  </body>
</template>
<script>
    import {getRequest, postRequest} from '../utils/api'
    import {putRequest} from '../utils/api'

    export default {
        data() {
            return {
                rules: {
                    nickname: [{required: true, message: '名字不能为空', trigger: 'blur'}],
                    // password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
                },
                checked: true,
                update: {
                    username: "",
                    // password: ''
                },
                loading: false,
                formLabelWidth:'60px'
            }
        },
        methods: {
            sorry(){
                var _this=this;
                _this.$router.replace({path: '/regist'});
            },
            updatePwd(){
              var _this=this;
              this.loading=true;
             // _this.$alert("update");
              putRequest('/updatePwd',{
                  id:this.update.id,
                  password:this.password
              }).then(resp=>{
                 // _this.$alert("sa");
                  _this.loading=false;
                  if (resp.status == 200) {
                      //成功
                      var json = resp.data;
                      if (json.status == 'success') {
                          _this.$alert(json.msg);
                          _this.$router.replace({path: '/regist'});
                      } else {
                          _this.$alert('错误!', '密码修改失败!');
                      }
                  } else {
                      //失败
                      _this.$alert('错误!', '密码修改失败!');
                  }
              }, resp => {
                  _this.loading = false;
                  _this.$alert('找不到服务器!', '信息修改失败!');
              });
            },
            submitClick: function () {
                var _this = this;
                this.loading = true;
                    putRequest('/updateUser', {
                        id: this.update.id,
                        nickname: this.update.nickname,
                        // password: this.update.password,
                        email: this.update.email,
                        userface: this.update.userface
                    }).then(resp => {
                      //   _this.$alert("asddff");
                        _this.loading = false;
                        if (resp.status == 200) {
                            //成功
                            var json = resp.data;
                            if (json.status == 'success') {
                                _this.$alert(json.msg);
                                _this.$router.replace({path: '/regist'});
                            } else {
                                _this.$alert('错误!', '信息修改失败!');
                            }
                        } else {
                            //失败
                            _this.$alert('错误!', '信息修改失败!');
                        }
                    }, resp => {
                        _this.loading = false;
                        _this.$alert('找不到服务器!', '信息修改失败!');
                    });
            }
        }
        ,
        mounted: function () {
            var _this = this;
            getRequest("/currentUserId").then(function (msg) {
               var  id=msg.data;
              //  _this.$alert(msg.data);
                getRequest("/admin/users/" + id).then(resp=> {
                    _this.loading = false;
                  //  _this.$alert(resp.data);
                    if (resp.status == 200) {

                        _this.update = resp.data;
                    } else {
                        _this.$message({type: 'error', message: '数据加载失败!'});
                    }
                }, resp=> {
                    _this.loading = false;
                    if (resp.response.status == 403) {
                        var data = resp.response.data;
                        _this.$message({type: 'error', message: data});
                    }
                });
            }, function (msg) {
                // _this.currentUserName = '游客';
            });
        },
        date(){

        }

    }
</script>
<style>

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

</style>
