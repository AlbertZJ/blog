<template>
  <el-container>
    <el-header class="cate_mana_header">
      <el-input
        placeholder="请输入公告内容"
        v-model="message" style="width: 200px;">
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px" @click="add">新增公告</el-button>
    </el-header>


    <el-main class="cate_mana_main">
      <el-table
        ref="multipleTable"
        :data="notice"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column
          type="selection"
          width="55" align="left">
        </el-table-column>
        <el-table-column
          label="编号"
          prop="id"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          label="公告内容"
          prop="message"
          width="120" align="left">
        </el-table-column>

        <el-table-column
          label="最近编辑时间" width="140" align="left">
          <template slot-scope="scope">{{ scope.row.publishDate | formatDateTime}}</template>
        </el-table-column>
        <el-table-column
          label="发布人"
          prop="nickname"
          width="120" align="left">
        </el-table-column>

        <el-table-column
          label="删除时间" width="140" align="left">
          <template slot-scope="scope">{{ scope.row.deleteTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column
          label="删除记录的人"
          prop="dename"
          width="120" align="left">
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>

<!--            <el-button  size="medium" style="margin-left: 10px" @click="addCom(comment.id)" v-if="comment.parentId==-1">评论</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" :disabled="this.selItems.length==0" style="margin-top: 10px;width: 100px;"
                 @click="deleteAll" v-if="this.notice.length>0">批量删除
      </el-button>
    </el-main>
  </el-container>
</template>
<script>
    import {postRequest} from '../utils/api'
    import {putRequest} from '../utils/api'
    import {deleteRequest} from '../utils/api'
    import {getRequest} from '../utils/api'
    export default{
        methods: {
            add(){
                this.loading = true;
                var _this = this;
              //  _this.$alert(this.messages);
                var id=7;
                getRequest("/currentUserId").then(function (msg) {
                    id=msg.data;
                });
                  // _this.$alert(id);
                    postRequest('/admin/notice/add', {message: this.message, uid: id}).then(resp => {
                      //  _this.$alert(resp.status + "saihf");
                        if (resp.status == 200) {
                            var json = resp.data;
                            _this.$message({type: json.status, message: json.msg});
                            _this.message = '';
                            _this.refresh();
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
            },
            deleteAll(){
                var _this = this;
                this.$confirm('确认删除这 ' + this.selItems.length + ' 条数据?', '提示', {
                    type: 'warning',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(()=> {
                    var selItems = _this.selItems;
                    var ids = '';
                    for (var i = 0; i < selItems.length; i++) {
                        ids += selItems[i].id + ",";
                    }
                    _this.deleteCate(ids.substring(0, ids.length - 1));
                }).catch(() => {
                    //取消
                    _this.loading = false;
                });
            },
            handleSelectionChange(val) {
                this.selItems = val;
            },
            handleEdit(index, row){
                var _this = this;
                this.$prompt('请输入新名称', '编辑', {
                    confirmButtonText: '更新',
                    inputValue: row.message,
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    //value就是输入值
                    if (value == null || value.length == 0) {
                        _this.$message({
                            type: 'info',
                            message: '数据不能为空!'
                        });
                    } else {
                        _this.loading = true;
                        putRequest("/admin/notice/", {id: row.id, message: value}).then(resp=> {
                            var json = resp.data;
                            _this.$message({
                                type: json.status,
                                message: json.msg
                            });
                            _this.refresh();
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
            handleDelete(index, row){
                let _this = this;
                this.$confirm('确认删除 ' + row.message + ' ?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.deleteCate(row.id);
                }).catch(() => {
                    //取消
                    _this.loading = false;
                });
            },
            deleteCate(ids){
                var _this = this;
                this.loading = true;
                _this.$alert(ids);
                //删除
                putRequest("/admin/notice/delete/" + ids).then(resp=> {
                    var json = resp.data;
                   // _this.$alert("json");
                    _this.$message({
                        type: json.status,
                        message: json.msg
                    });
                    _this.refresh();
                }, resp=> {
                    _this.loading = false;
                    if (resp.response.status == 403) {
                        _this.$message({
                            type: 'error',
                            message: resp.response.data
                        });
                    } else if (resp.response.status == 500) {
                        _this.$message({
                            type: 'error',
                            message: '该栏目下尚有用户，删除失败!'
                        });
                    }
                })
            },
            refresh(){
                let _this = this;
                getRequest("/admin/notice/all").then(resp=> {
                    _this.notice = resp.data;
                   // _this.$alert(resp.data);
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
        },
        mounted: function () {
            this.loading = true;
            this.refresh();
        },
        data(){
            return {
                cateName: '',
                selItems: [],
                message: [],
                loading: false
            }
        }
    }
</script>
<style>
  .cate_mana_header {
    background-color: #ececec;
    margin-top: 20px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }

  .cate_mana_main {
    /*justify-content: flex-start;*/
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    background-color: #ececec;
    margin-top: 20px;
    padding-top: 10px;
  }
</style>
