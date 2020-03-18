<template>
  <div v-loading="loading">
    <div style="margin-top: 10px;display: flex;justify-content: center">
      <el-input
        placeholder="默认展示部分成员，可以通过用户名搜索用户..."
        prefix-icon="el-icon-search"
        v-model="keywords" style="width: 400px" size="small">
      </el-input>
      <el-button type="primary" icon="el-icon-search" size="small" style="margin-left: 3px" @click="searchClick">搜索
      </el-button>
    </div>
    <div style="display: flex;justify-content: space-around;flex-wrap: wrap">
      <el-card style="width:330px;margin-top: 10px;" v-for="(user,index) in users" :key="index"
               v-loading="cardloading[index]">
        <div slot="header" style="text-align: left">
          <div><img :src="user.userface" :alt="user.nickname" style="width: 70px;height: 70px"></div>

          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>账号:</span><span>{{user.username}}</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>用户名:</span> <span>{{user.nickname}}</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px" @click="first" >
            <el-button type="primary"  size="small" style="margin-left: 3px" @click="firsted(user.id)">
              <span>{{user.nickname}}&nbsp;的空间</span>
            </el-button>

          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>电子邮箱:</span><span>{{user.email}}</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>注册时间:</span><span>{{user.regTime | formatDateTime}}</span>
          </div>


        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
    import {getRequest, postRequest} from '../utils/api'
    import {putRequest} from '../utils/api'
    import {deleteRequest} from '../utils/api'
    export default{
        mounted: function () {
            this.loading = true;
            this.loadUserList();
            this.cardloading = Array.apply(null, Array(20)).map(function (item, i) {
                return false;
            });
            this.eploading = Array.apply(null, Array(20)).map(function (item, i) {
                return false;
            });
        },
        methods: {
         firsted(uid){
             var _this=this;
            // _this.$alert(uid);
             _this.$router.replace({path: '/teamTable', query: {uid: uid}});
            // this.$router.push({path: '/teamTable', query: {uid: row}})
            },

            loadUserList(){
                var _this = this;
                getRequest("/admin/user/all?nickname="+this.keywords).then(resp=> {
                    _this.loading = false;
                    if (resp.status == 200) {
                       //  _this.$alert(resp.data);
                        _this.users = resp.data;
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
            },
            searchClick(){
                this.loading = true;
                this.loadUserList();
            }
        },
        data(){
            return {
                loading: false,
                eploading: [],
                cardloading: [],
                keywords: '',
                users: [],
                allRoles: [],
                roles: [],
                cpRoles: []
            }
        }
    }
</script>
