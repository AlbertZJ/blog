<template>
  <div>
<!--    <div style="display: flex;justify-content: flex-start">-->
<!--      <el-input-->
<!--        placeholder="通过标题搜索该分类下的文章"-->
<!--        prefix-icon="el-icon-search"-->
<!--        v-model="keywords" style="width: 300px" size="mini">-->
<!--      </el-input>-->
<!--      <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 3px" @click="searchClick">搜索-->
<!--      </el-button>-->
<!--    </div>-->
  <el-container>
    <el-main class="cate_mana_main">
      <el-table
        ref="multipleTable"
        :data="favorite"
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
<!--        <el-table-column-->
<!--          label="文章标题"-->
<!--          prop="title"-->
<!--          width="120" align="left">-->
<!--        </el-table-column>-->
        <el-table-column
          label="标题"
          width="400" align="left">
          <template slot-scope="scope"><span style="color: #409eff;cursor: pointer" @click="itemClick(scope.row)">{{ scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="publishDate"
          label="收藏时间" align="left">
          <template slot-scope="scope">{{ scope.row.publishDate | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
<!--            <el-button-->
<!--              size="mini"-->
<!--              @click="handleEdit(scope.$index, scope.row)">编辑-->
<!--            </el-button>-->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">取消收藏
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" :disabled="this.selItems.length==0" style="margin-top: 10px;width: 150px;"
                 @click="deleteAll" v-if="this.favorite.length>0">批量取消收藏
      </el-button>
    </el-main>
  </el-container>
  </div>
</template>
<script>
    import {postRequest} from '../utils/api'
    import {putRequest} from '../utils/api'
    import {deleteRequest} from '../utils/api'
    import {getRequest} from '../utils/api'
    export default{
        methods: {
            deleteAll(){
                var _this = this;
                this.$confirm('取消收藏这 ' + this.selItems.length + ' 条数据?', '提示', {
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
            handleDelete(index, row){
                let _this = this;
                this.$confirm('取消文章《' + row.title + '》的收藏?', '提示', {
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
            itemClick(row) {
                this.$router.push({path: '/blogDetail', query: {aid: row.aid}})
            },
            deleteCate(ids){
                var _this = this;
                this.loading = true;
                //删除
                deleteRequest("/favorite/delete" + ids).then(resp=> {
                    var json = resp.data;
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
                            message: '该收藏下尚有用户，取消收藏失败!'
                        });
                    }
                })
            },
            searchClick() {
                this.refresh();
            },
            refresh(){
                var _this = this;
               // _this.$alert(_this.keywords);
                getRequest("/favorite/all").then(resp=> {
                    _this.favorite = resp.data;
                   // _this.$alert(_this.favorite);
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
                title: '',
                selItems: [],
                favorite: [],
                loading: false,
                keywords:'',
            }
        }
    }
</script>
<style>

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
