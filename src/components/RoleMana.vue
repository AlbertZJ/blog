<template>
  <el-container>
    <el-header class="cate_mana_header">
      <el-input
        placeholder="请输入角色名称"
        v-model="name" style="width: 200px;" v-if="isAdmin">
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px" @click="addRole" v-if="isAdmin">新增角色</el-button>
    </el-header>
    <el-main class="cate_mana_main">
      <el-table
        ref="multipleTable"
        :data="role"
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
          label="角色名称"
          prop="name"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          prop="date"
          label="启用时间" align="left">
          <template slot-scope="scope">{{ scope.row.date | formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作" align="left" v-if="isAdmin">
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
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" :disabled="this.selItems.length==0" style="margin-top: 10px;width: 100px;"
                 @click="deleteAll" v-if="this.role.length>0&&isAdmin">批量删除
      </el-button>
    </el-main>
  </el-container>
</template>
<script>
    import {postRequest} from '../utils/api'
    import {putRequest} from '../utils/api'
    import {deleteRequest} from '../utils/api'
    import {getRequest} from '../utils/api'

    export default {
        methods: {
            addRole() {
                this.loading = true;
                var _this = this;
                postRequest('/admin/role/addRole', {name: this.name}).then(resp => {
                    if (resp.status == 200) {
                        var json = resp.data;
                        _this.$message({type: json.status, message: json.msg});
                        _this.name = '';
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
            deleteAll() {
                var _this = this;
                this.$confirm('确认删除这 ' + this.selItems.length + ' 条数据?', '提示', {
                    type: 'warning',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    var selItems = _this.selItems;
                    var ids = '';
                    for (var i = 0; i < selItems.length; i++) {
                        ids += selItems[i].id + ",";
                    }
                    _this.deleteRole(ids.substring(0, ids.length - 1));
                }).catch(() => {
                    //取消
                    _this.loading = false;
                });
            },
            handleSelectionChange(val) {
                this.selItems = val;
            },
            handleEdit(index, row) {
                var _this = this;
                this.$prompt('请输入新名称', '编辑', {
                    confirmButtonText: '更新',
                    inputValue: row.name,
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
                        putRequest("/admin/role/update", {id: row.id, name: value}).then(resp => {
                            var json = resp.data;
                            _this.$message({
                                type: json.status,
                                message: json.msg
                            });
                            _this.refresh();
                        }, resp => {
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
            handleDelete(index, row) {
                let _this = this;
                this.$confirm('确认删除 ' + row.name + ' ?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.deleteRole(row.id);
                }).catch(() => {
                    //取消
                    _this.loading = false;
                });
            },
            deleteRole(ids) {
                var _this = this;
                this.loading = true;
                //删除
                deleteRequest("/admin/role/delete" + ids).then(resp => {
                    var json = resp.data;
                    _this.$message({
                        type: json.status,
                        message: json.msg
                    });
                    _this.refresh();
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
                            message: '该栏目下尚有用户，删除失败!'
                        });
                    }
                })
            },
            refresh() {
                let _this = this;
                getRequest("/admin/role/all").then(resp => {
                    _this.role = resp.data;
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

            }
        },
        mounted: function () {
            var _this = this;
            getRequest("/isAdmin").then(resp => {
                if (resp.status == 200) {
                    _this.isAdmin = resp.data;
                }
            });
            this.loading = true;
            this.refresh();
        },
        data() {
            return {
                name: '',
                selItems: [],
                role: [],
                loading: false,
                isAdmin:false
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
