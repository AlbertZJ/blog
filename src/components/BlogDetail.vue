<template>
  <el-row v-loading="loading">
    <el-col :span="24">
      <div style="text-align: left;">
        <el-button type="text" icon="el-icon-back" @click="goBack" style="padding-bottom: 0px;">返回</el-button>
      </div>
    </el-col>
    <el-col :span="24">
      <div>
        <div><h3 style="margin-top: 0px;margin-bottom: 0px" v-model="article.title">{{article.title}}</h3></div>
        <div style="width: 100%;margin-top: 5px;display: flex;justify-content: flex-end;align-items: center">
          <div style="display: inline; color: #20a0ff;margin-left: 50px;margin-right:20px;font-size: 12px;" v-model="article.nickname">
            {{article.nickname}}
          </div>
          <span style="color: #20a0ff;margin-right:20px;font-size: 12px;">浏览 {{article.pageView==null?0:article.pageView}}</span>
          <span style="color: #20a0ff;margin-right:20px;font-size: 12px;"> {{article.editTime | formatDateTime}}</span>
          <el-tag type="success" v-for="(item,index) in article.tags" :key="index" size="small"
                  style="margin-left: 8px">{{item.tagName}}
          </el-tag>
          <span style="margin:0px 50px 0px 0px"></span>
        </div>
      </div>
    </el-col>
    <el-col>
      <div style="text-align: left" v-html="article.htmlContent">
      </div>
    </el-col>
    <el-header class="cate_mana_header">
      <el-input
        placeholder="请输入内容"
        v-model="content" style="width: 400px;">
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px" @click="addComment">新增点评</el-button>
      <div style="display: flex;justify-content: flex-start">
        <el-button type="text"  size="mini" style="margin-left: 3px;color:black" @click="like">喜欢{{article.countlike}}
        </el-button>
        <el-button  size="medium" style="margin-left: 10px" @click="addlove" >{{favorite}}</el-button>
      </div>
<!--      <div style="display: flex;justify-content: flex-start">-->
<!--        <el-button type="text" icon="el-icon-search" size="mini" style="margin-left: 3px;color:black" @click="dislike">不喜欢{{article.countdislike}}-->
<!--        </el-button>-->
<!--      </div>-->
    </el-header>
    <div >
      <el-card style="margin-top: 10px;" v-for="(comment,index) in comment" :key="index"
               v-loading="cardloading[index]">
        <div slot="header" style="text-align: left">
          <div><img :src="comment.userface" :alt="comment.nickname" style="width: 70px;height: 70px"> <span>{{comment.comname}}</span>
            <div style="display: flex;justify-content: flex-start">
                <el-button type="text"  size="mini" style="margin-left: 3px;color:black" @click="comlike(comment.id)">喜欢{{comment.countlike}}
              </el-button>
<!--              <el-button type="text" icon="el-icon-search" size="mini" style="margin-left: 3px;color:black" @click="comdislike(comment.id)">不喜欢{{comment.countdislike}}-->
<!--              </el-button>-->
            </div>
          </div>
          <div >
            <span>{{comment.content }}</span>
          </div>
          <div >
            <span>{{comment.comDate | formatDateTime}}</span>
            <el-button  size="medium" style="margin-left: 10px" @click="addCom(comment.id)" v-if="comment.parentId==-1">评论</el-button>
            <el-button  size="medium" style="margin-left: 10px" @click="deleteCom(comment.id)" v-if="comment.uid==UserId">删除</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </el-row>
</template>
<script>
  import {getRequest} from '../utils/api'
  import {postRequest} from '../utils/api'
  import {putRequest} from '../utils/api'
  import {deleteRequest} from '../utils/api'
  export default{
    methods: {
        handleSelectionChange(val) {
            this.selItems = val;
        },
        refresh(){
            let _this = this;
           // _this.$alert(this.$route.query.aid);
            getRequest("/comment/com/" + this.$route.query.aid).then(resp=> {
               //  _this.$alert(resp.data);
                    if (resp.status == 200) {
                       // _this.$alert(resp.data+"bhb");
                        _this.comment = resp.data;
                    }
                    _this.loading = false;
                }, resp=> {
                    _this.loading = false;
                    _this.$message({type: 'error', message: '点评页面加载失!'});
                }
            );
            getRequest("/currentUserId").then(function (msg) {
                _this.UserId = msg.data;
            });
        },
        re(){
            var _this = this;
            getRequest("/article/" + this.article.id).then(resp=> {
                    if (resp.status == 200) {
                        _this.article = resp.data;
                      //  _this.$alert( _this.article );
                    }
                    _this.loading = false;
                }, resp=> {
                    _this.loading = false;
                    _this.$message({type: 'error', message: '页面加载失败!'});
                }
            );

        },
        addlove(){
            var _this=this;
            postRequest("/favorite/selected",{aid:this.article.id}).then(resp=> {
                //  _this.$alert(resp.data);
                if (resp.data === '') {
                    postRequest("/favorite/add", {aid: this.article.id,state:1}).then(resp => {
                        _this.favorite = "已收藏";
                    });
                    //  _this.$alert("aaa");
                }else{
                    //  _this.$alert(this.favorite+"s");
                    if(this.favorite!="已收藏") {
                        //  _this.$alert("_this.favorite");
                        putRequest("/favorite/changed", {aid: this.article.id, state: 1}).then(resp => {
                            if (resp.status == 200) {
                                var json = resp.data;
                                // _this.$alert(json);
                                _this.$message({
                                    type: json.status,
                                    message: json.msg
                                });
                                _this.favorite = "已收藏";

                            }
                            _this.loading = false;
                        });
                    }else{
                        putRequest("/favorite/changed", {aid: this.article.id, state: 2}).then(resp => {
                            if (resp.status == 200) {
                                var json = resp.data;
                               //  _this.$alert(json);
                                _this.$message({
                                    type: json.status,
                                    message: json.msg
                                });
                                    _this.favorite = "未收藏";

                            }
                            _this.loading = false;

                        });
                    }

                }

                _this.re();
                _this.loading = false;
            }, resp=> {
                if (resp.response.status == 403) {
                    _this.$message({
                        type: 'error',
                        message: resp.response.data
                    });
                }
                _this.loading = false;
            });
        },
        addComment(){
            this.loading = true;
            var _this = this;
            var aid=this.article.id;
            var content=this.content;
            // _this.$alert(this.content);
             // _this.$alert(this.article.id);
            getRequest("/currentUserId").then(function (msg) {
                var id = msg.data;
                _this.$alert(aid+content+"-1")
                postRequest('/comment/add', {
                    aid: aid,
                    content: content,
                    parentId: -1,
                    uid: id
                }).then(resp => {
                    _this.$alert(resp.status);
                    if (resp.status == 200) {
                        var json = resp.data;
                        _this.$message({type: json.status, message: json.msg});
                        _this.content = '';
                        // _this.$router.replace({path: '/user'});
                    }
                    _this.loading = false;
                }, resp => {
                    if (resp.response.status == 403) {
                        _this.$message({
                            type: 'error',
                            message: resp.response.data
                        });
                    }
                    _this.loading = false;
                });
            });
        },
        addCom(cid){
      var _this = this;
            var aid=this.article.id;
          //  _this.$alert(cid);
      this.$prompt('请输入评论内容', '评论', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
      }).then(({value}) => {
          //value就是输入值
          if (value == null || value.length == 0) {
              _this.$message({
                  type: 'info',
                  message: '数据不能为空!'
              });
          } else {
              _this.loading = true
             // _this.$alert(value);
              postRequest("/comment/adds", {aid:aid,parentId:cid, content: value}).then(resp=> {
                  if (resp.status == 200) {
                      var json = resp.data;
                      // _this.$alert(json);
                      _this.$message({
                          type: json.status,
                          message: json.msg
                      });
                      _this.refresh();
                  }
                  _this.loading = false;
              }, resp=> {
                  if (resp.response.status == 403) {
                      _this.$message({
                          type: 'error',
                          message: resp.response.data
                      });
                  }
                  _this.loading = false;
              });
          }
      });
  },
        deleteCom(cid){
            var _this = this;
            this.loading = true;

           // _this.$alert(cid);
            deleteRequest("/comment/delete/"+cid).then(resp=> {
                if (resp.status == 200) {
                var json = resp.data;
              //  _this.$alert(json);
                _this.$message({
                    type: json.status,
                    message: json.msg
                });
                    _this.refresh();
                }
                _this.loading = false;
                    }, resp=> {
                _this.loading = false;
                        if (resp.response.status == 403) {
                            _this.$message({
                                type: 'error',
                                message: resp.response.data
                            });
                        }
                        _this.loading = false;
                    });

        },
        like(){
            this.loading = true;
            var _this = this;
            var aid=this.article.id;
           // _this.$alert(aid);
            postRequest("/likes/getlikes",{aid:aid,likes:1}).then(resp=> {
                //  _this.$alert(resp.data);
                if (resp.data === '') {
                    postRequest('/likes/add',{aid:aid,likes:1}).then(resp => {
                        // _this.$alert(resp.status);
                        // _this.$alert("sadf;");
                        if (resp.status == 200) {
                            var json = resp.data;
                            _this.$message({type: json.status, message: json.msg});
                           // _this.$alert("saddfwe");
                        }
                        _this.re();
                        _this.loading = false;
                    }, resp => {
                        if (resp.response.status == 403) {
                            _this.$message({
                                type: 'error',
                                message: resp.response.data
                            });
                        }
                        _this.loading = false;
                    });
                } else {
                    //删除
                  //  _this.$alert(aid+"kkkkk");
                    postRequest("/likes/delete", {aid: aid,likes:-1}).then(resp => {
                        if (resp.status == 200) {
                            var json = resp.data;
                            //   _this.$alert(resp.data);
                            _this.$message({
                                type: json.status,
                                message: json.msg
                            });
                            _this.re();
                           // _this.$alert("sdaf");
                        }
                        _this.loading = false;
                    }, resp => {
                        _this.loading = false;
                        if (resp.response.status == 403) {
                            _this.$message({
                                type: 'error',
                                message: resp.response.data
                            });
                        } else if (resp.response.status == 500) {
                            _this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    });
                    _this.loading = false;
                }
            });
        },
        dislike(){
            this.loading = true;
            var _this = this;
            var aid=this.article.id;
          //  _this.$alert(aid);
            postRequest("/likes/getlikes",{aid:aid,likes:-1}).then(resp=> {
                  //  _this.$alert(resp.data);
                    if(resp.data=="") {
            postRequest('/likes/adddislike',{aid:aid,likes:-1}).then(resp=> {
              //  _this.$alert(resp.status);
                if (resp.status == 200) {
                    var json = resp.data;
                    _this.$message({type: json.status, message: json.msg});
                    //   _this.refresh();
                }
                _this.loading = false;
            }, resp=> {
                if (resp.response.status == 403) {
                    _this.$message({
                        type: 'error',
                        message: resp.response.data
                    });
                }
                _this.loading = false;
            });
                    }else{
                        //删除
                      //  _this.$alert(aid);
                        postRequest("/likes/delete", {aid: aid,likes:-1}).then(resp => {
                            var json = resp.data;
                          //  _this.$alert(resp.data);
                            _this.$message({
                                type: json.status,
                                message: json.msg
                            });
                            _this.loading = false;
                        }, resp => {
                            _this.loading = false;
                            if (resp.response.status == 403) {
                                _this.$message({
                                    type: 'error',
                                    message: resp.response.data
                                });
                            } else if (resp.response.status == 500) {
                                _this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        });
                        _this.loading = false;
                        // _this.$alert("不可重复评论！");
                    }
                _this.loading = false;
            });
        },
        comlike(cid){
          //  this.loading = true;
            var _this = this;

             //_this.$alert("fsdgdhgt");
            postRequest("/comlikes/getlikes",{cid:cid,likestate:1}).then(resp=> {
               //   _this.$alert(resp.data);
                if (resp.data === '') {
                    postRequest('/comlikes/add', {cid: cid, likestate: 1}).then(resp => {
                        // _this.$alert(resp.status);
                        // _this.$alert("sadf;");
                        if (resp.status == 200) {
                            var json = resp.data;
                            _this.$message({type: json.status, message: json.msg});
                        }
                        _this.refresh();
                        _this.loading = false;
                    }, resp => {
                        if (resp.response.status == 403) {
                            _this.$message({
                                type: 'error',
                                message: resp.response.data
                            });
                        }
                        _this.loading = false;
                    });
                } else {
                    //删除
                  //  _this.$alert(cid);
                    postRequest("/comlikes/delete", {cid: cid,likestate:1}).then(resp => {
                        if (resp.status == 200) {
                            var json = resp.data;
                            //  _this.$alert(resp.data);
                            _this.$message({
                                type: json.status,
                                message: json.msg
                            });
                           // _this.$alert("re");
                         //   _this.refresh();
                        }
                        _this.refresh();
                        _this.loading = false;
                    }, resp => {
                        _this.loading = false;
                        if (resp.response.status == 403) {
                            _this.$message({
                                type: 'error',
                                message: resp.response.data
                            });
                        } else if (resp.response.status == 500) {
                            _this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    });
                    _this.loading = false;
                }
            });
        },
        comdislike(cid){
            this.loading = true;
            var _this = this;
            postRequest("/comlikes/getlikes",{cid:cid,likestate:-1}).then(resp=> {
                //   _this.$alert(resp.data);
                if(resp.data==='') {
                    postRequest('/comlikes/adddislike', {cid:cid,likestate:-1}).then(resp=> {
                        //  _this.$alert(resp.status);
                        if (resp.status == 200) {
                            var json = resp.data;
                            _this.$message({type: json.status, message: json.msg});
                            //   _this.refresh();
                        }
                        _this.loading = false;
                    }, resp=> {
                        if (resp.response.status == 403) {
                            _this.$message({
                                type: 'error',
                                message: resp.response.data
                            });
                        }
                        _this.loading = false;
                    });
                }else{
                    //删除
                 //   _this.$alert(cid);
                    postRequest("/comlikes/delete", {cid: cid,likestate:-1}).then(resp => {
                        var json = resp.data;
                     //   _this.$alert(resp.data);
                        _this.$message({
                            type: json.status,
                            message: json.msg
                        });
                        _this.refresh();
                        _this.loading = false;
                    }, resp => {
                        _this.loading = false;
                        if (resp.response.status == 403) {
                            _this.$message({
                                type: 'error',
                                message: resp.response.data
                            });
                        } else if (resp.response.status == 500) {
                            _this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    });
                    _this.loading = false;
                    // _this.$alert("不可重复评论！");
                }
                _this.loading = false;
            });
        },
        goBack(){
            this.$router.go(-1);
        }
    },

    mounted: function () {
        this.loading = true;
        this.refresh();
        this.cardloading = Array.apply(null, Array(20)).map(function (item, i) {
            return false;
        });
        this.eploading = Array.apply(null, Array(20)).map(function (item, i) {
            return false;
        });
      var aid = this.$route.query.aid;
      this.activeName = this.$route.query.an
      var _this = this;
      this.loading = true;
    // _this.$alert(aid);
     getRequest("/article/" + aid).then(resp=> {
            if (resp.status == 200) {
                _this.article = resp.data;
             //    _this.$alert( _this.article );
            }
            _this.loading = false;
        }, resp=> {
            _this.loading = false;
            _this.$message({type: 'error', message: '页面加载失败!'});
        }
      );
        getRequest("/currentUserId").then(function (msg) {
            _this.UserId = msg.data;
        });
        postRequest("/favorite/selected",{aid:aid,state:1}).then(resp=> {
            //  _this.$alert(resp.data);
            if (resp.data === '') {
             _this.favorite="未收藏";
            // _this.$alert(_this.favorite);
            }else{
                _this.favorite="已收藏";
            }
        });
    },
    data(){
      return {
          cateName: '',
          selItems: [],
          comment: [],
        article: {},
        loading: false,
        activeName: '',
          comname:'',
          countlike:'',
          countdislike:'',
          favorite:''
      }
    }
  }
</script>
