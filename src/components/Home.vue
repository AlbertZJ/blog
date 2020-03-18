<template>
  <el-container class="home_container">
    <el-header>
      <div class="home_title">微社区管理</div>
      <div class="home_userinfoContainer">
        <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link home_userinfo">
    {{currentUserName}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="sysMsg">公告</el-dropdown-item>
<!--            <el-dropdown-item command="MyArticle">我的文章</el-dropdown-item>-->
            <el-dropdown-item command="MyHome">个人主页</el-dropdown-item>
<!--            <router-link to="register"><el-button type="primary" style="width: 40%;background: #505458;border: none">注册</el-button></router-link>-->
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
<!--      左边菜单-->
      <el-aside width="200px">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo" style="background-color: #ECECEC" router>
          <template v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="item.children.length>1" :key="index">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" v-if="!child.hidden" :index="child.path" :key="child.path">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
            <template v-else>
              <el-menu-item :index="item.children[0].path">
                <i :class="item.children[0].iconCls"></i>
                <span slot="title">{{item.children[0].name}}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
<!--          页面显示-->
          <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!this.$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>

</template>
<script>
  import {getRequest} from '../utils/api'
  export default{
    methods: {

      handleCommand(command){
        var _this = this;
        if (command === 'logout') {
          this.$confirm('注销登录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            getRequest("/logout")
            _this.currentUserName = '游客';
            _this.$router.replace({path: '/'});
          }, function () {
            //取消
          })
        }else if(command==='sysMsg'){

            // getRequest("/notice/show").then(function (msg) {
            //   //  _this.$alert(msg.data);
            //     _this.$alert(msg.data.message, '友情提示', {
            //         confirmButtonText:'确定',
            //         callback:action => {
            //
            //         }
            //     });
            //
            // });

            getRequest("/notice/sys").then(function (msg) {
                //  _this.$alert(msg.data);
                _this.$alert(msg.data.message, '公告', {
                    confirmButtonText:'确定',
                    callback:action => {

                    }
                });

            });

        }else if(command==='UpdatePwd'){

        }

      }
    },
    mounted: function () {
        getRequest("/notice/sys").then(function (msg) {
            //  _this.$alert(msg.data);
            _this.$alert(msg.data.message, '公告', {
                confirmButtonText:'确定',
                callback:action => {

                }
            });

        });

      // this.$alert('欢迎来到微社区管理平台，请遵守相关约定！', '友情提示', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //   }
      // });
      var _this = this;
      getRequest("/currentUserName").then(function (msg) {
        _this.currentUserName = msg.data;
      }, function (msg) {
        _this.currentUserName = '游客';
      });
    },
    data(){
      return {
        currentUserName: ''
      }
    }
  }
</script>
<style>
  .home_container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .el-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-aside {
    background-color: #ECECEC;
  }

  .el-main {
    background-color: #fff;
    color: #000;
    text-align: center;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }
</style>
