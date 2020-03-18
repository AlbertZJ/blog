<style type="text/css">
  .blog_table_footer {
    display: flex;
    box-sizing: content-box;
    padding-top: 10px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    justify-content: space-between;
  }
</style>
<template>
  <div>
    <div style="display: flex;justify-content: flex-start">
      <el-input
        placeholder="通过关键字搜索包含该关键字下的评论"
        prefix-icon="el-icon-search"
        v-model="keywords" style="width: 400px" size="mini">
      </el-input>
      <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 3px" @click="searchClick">搜索
      </el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="comment"
      tooltip-effect="dark"
      style="width: 100%;overflow-x: hidden; overflow-y: hidden;"
      max-height="390"
      @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column
        type="selection"
        width="35" align="left" v-if="showEdit || showDelete">
      </el-table-column>
      <el-table-column
        label="文章标题"
        width="400" align="left">
        <template slot-scope="scope"><span style="color: #409eff;cursor: pointer" @click="itemClicks(scope.row)">{{ scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="评论内容"
        width="400" align="left">
        <template slot-scope="scope"><span style="color: #409eff;cursor: pointer" @click="itemClick(scope.row)">{{ scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间" width="140" align="left">
        <template slot-scope="scope">{{ scope.row.publishDate | formatDateTime}}</template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="谁评论"
        width="120" align="left">
      </el-table-column>
      <el-table-column label="操作" align="left" v-if="showEdit || showDelete">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRestore(scope.$index, scope.row)" v-if="showRestore">还原
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" v-if="showDelete">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="blog_table_footer">
      <el-button type="danger" size="mini" style="margin: 0px;" v-show="this.comment.length>0 && showDelete"
                 :disabled="this.selItems.length==0" @click="deleteMany">批量删除
      </el-button>
      <span></span>
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalCount" @current-change="currentChange" v-show="this.comment.length>0">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import {putRequest} from '../utils/api'
    import {getRequest} from '../utils/api'

    export default {
        data() {
            return {
                comment: [],
                selItems: [],
                loading: false,
                currentPage: 1,
                totalCount: -1,
                pageSize: 6,
                keywords: '',
                dustbinData: []
            }
        },
        mounted: function () {
            var _this = this;
            this.loading = true;
            this.loadBlogs(1, this.pageSize);
            window.bus.$on('commentTableReload', function () {
                _this.loading = true;
                _this.loadBlogs(_this.currentPage, _this.pageSize);
            })
        },
        methods: {
            searchClick() {
                this.loadBlogs(1, this.pageSize);
            },
            itemClicks(row) {
                this.$router.push({path: '/blogDetail', query: {aid: row.aid}})
            },
            itemClick(row) {
                this.$router.push({path: '/commentDetail', query: {aid: row.id}})
            },
            deleteMany() {
                var selItems = this.selItems;
                for (var i = 0; i < selItems.length; i++) {
                    this.dustbinData.push(selItems[i].id)
                }
                this.deleteToDustBin(selItems[0].state)
            },
            //翻页
            currentChange(currentPage) {
                this.currentPage = currentPage;
                this.loading = true;
                this.loadBlogs(currentPage, this.pageSize);
            },
            loadBlogs(page, count) {
                var _this = this;
                var url = '';
                // _this.$alert(this.state);
                if (this.state == -2) {
                    url = "/admin/comment/all" + "?page=" + page + "&count=" + count + "&keywords=" + this.keywords;
                   //  _this.$alert(url+"jhg");
                } else {
                    url = "/comment/all?state=" + this.state + "&page=" + page + "&count=" + count + "&keywords=" + this.keywords;
                    //  _this.$alert(url);
                }
                getRequest(url).then(resp => {
                    //   _this.$alert("sdf");
                    _this.loading = false;
                    if (resp.status == 200) {
                        _this.comment = resp.data.comment;
                        _this.totalCount = resp.data.totalCount;
                        // _this.$alert(resp.data);
                    } else {
                        _this.$message({type: 'error', message: '数据加载失败!'});
                    }
                }, resp => {
                    //  _this.$alert("sadfasfd");
                    _this.loading = false;
                    if (resp.response.status == 403) {
                        _this.$message({type: 'error', message: resp.response.data});
                    } else {
                        _this.$message({type: 'error', message: '数据加载失败!'});
                    }
                }).catch(resp => {
                    // _this.$alert("sadfhonslsmjo");
                    //压根没见到服务器
                    _this.loading = false;
                    _this.$message({type: 'error', message: '数据加载失败!'});
                })
            },
            handleSelectionChange(val) {
                this.selItems = val;
            },
            handleEdit(index, row) {
                // let _this = this;
                // _this.$alert(row.message);
                this.$router.push({path: '/editComment', query: {from: this.commentName, id: row.id}});
            },
            handleDelete(index, row) {
                this.dustbinData.push(row.id);
                this.deleteToDustBin(row.state);
            },
            handleRestore(index, row) {
                let _this = this;
                this.$confirm('将该评论还原到原处，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.loading = true;
                    putRequest('/comment/restore', {commentId: row.id}).then(resp => {
                        if (resp.status == 200) {
                            var data = resp.data;
                            _this.$message({type: data.status, message: data.msg});
                            if (data.status == 'success') {
                                window.bus.$emit('commentTableReload') // 通过选项卡都重新加载数据
                            }
                        } else {
                            _this.$message({type: 'error', message: '还原失败!'});
                        }
                        _this.loading = false;
                    });
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消还原'
                    });
                });
            },
            deleteToDustBin(state) {
                var _this = this;
                this.$confirm(state != 2 ? '将该评论放入回收站，是否继续?' : '永久删除该评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.loading = true;
                    var url = '';
                    if (_this.state == -2) {
                        url = "/admin/comment/dustbin";
                    } else {
                        url = "/comment/dustbin";
                    }
                    putRequest(url, {aids: _this.dustbinData, state: state}).then(resp => {
                        if (resp.status == 200) {
                            var data = resp.data;
                            _this.$message({type: data.status, message: data.msg});
                            //  _this.$alert(data.status);
                            if (data.status == 'success') {
                                window.bus.$emit('commentTableReload')  // 通过选项卡都重新加载数据
                            }
                        } else {
                            _this.$message({type: 'error', message: '删除失败!'});
                        }
                        _this.loading = false;
                        _this.dustbinData = []
                    }, resp => {
                        _this.loading = false;
                        _this.$message({type: 'error', message: '删除失败!'});
                        _this.dustbinData = []
                    });
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                    _this.dustbinData = []
                });
            }
        },
        props: ['state', 'showEdit', 'showDelete', 'commentName', 'showRestore']
    }
</script>
