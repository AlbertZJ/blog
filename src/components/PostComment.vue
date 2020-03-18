<template>
  <el-container v-loading="loading" class="post-article">
    <el-header class="header">
    </el-header>
    <el-main class="main">
      <div id="editor">
        <mavon-editor style="height: 100%;width: 100%;" ref=md @imgAdd="imgAdd"
                      @imgDel="imgDel" v-model="comment.content"></mavon-editor>
      </div>
      <div style="display: flex;align-items: center;margin-top: 15px;justify-content: flex-end">
        <el-button @click="cancelEdit" v-if="from!=undefined">放弃修改</el-button>
        <template v-if="from==undefined || from=='draft'">
          <el-button @click="saveBlog(0)">保存到草稿箱</el-button>
          <el-button type="primary" @click="saveBlog(1)">发表评论</el-button>
        </template>
        <template v-else="from==post">
          <el-button type="primary" @click="saveBlog(1)">保存修改</el-button>
        </template>
      </div>
    </el-main>
  </el-container>
</template>
<script>
    import {postRequest} from '../utils/api'
    import {putRequest} from '../utils/api'
    import {deleteRequest} from '../utils/api'
    import {getRequest} from '../utils/api'
    import {uploadFileRequest} from '../utils/api'
    // Local Registration
    import {mavonEditor} from 'mavon-editor'
    // 可以通过 mavonEditor.markdownIt 获取解析器markdown-it对象
    import 'mavon-editor/dist/css/index.css'
    import {isNotNullORBlank} from '../utils/utils'

    export default {
        mounted: function () {
            // this.getCategories();
            var from = this.$route.query.from;
            this.from = from;
            var _this = this;
            // _this.$alert(this.from);
            if (from != null && from != '' && from != undefined) {
                var id = this.$route.query.id;
                this.id = id;
                this.loading = true;
              //  _this.$alert(this.id);
                getRequest("/comment/" + id).then(resp=> {
                    _this.loading = false;
                    if (resp.status == 200) {
                        _this.comment = resp.data;
                    } else {
                        _this.$message({type: 'error', message: '页面加载失败!'})
                    }
                }, resp=> {
                    // 后台返回数据出错时输出
                    _this.loading = false;
                    _this.$message({type: 'error', message: '页面加载失败!'})
                })
            }
        },
        components: {
            mavonEditor
        },
        methods: {
            cancelEdit(){
                this.$router.go(-1)
            },
            saveBlog(state){
                if (!(isNotNullORBlank(this.comment.content,))) {
                    this.$message({type: 'error', message: '数据不能为空!'});
                    return;
                }
                var _this = this;
                _this.loading = true;
                postRequest("/comment/", {
                    id: _this.comment.id,
                    content: _this.comment.content,
                    state: state,
                }).then(resp=> {
                    _this.loading = false;
                    if (resp.status == 200 && resp.data.status == 'success') {
                        _this.comment.id = resp.data.msg;
                        _this.$message({type: 'success', content: state == 0 ? '保存成功!' : '发布成功!'});
//            if (_this.from != undefined) {
                        window.bus.$emit('blogTableReload')
//            }
                        if (state == 1) {
                            _this.$router.replace({path: '/commentList'});
                        }
                    }
                }, resp=> {
                    _this.loading = false;
                    _this.$message({type: 'error', content: state == 0 ? '保存草稿失败!' : '文章发布失败!'});
                })
            },

            handleClose(tag) {
                // this.article.dynamicTags.splice(this.article.dynamicTags.indexOf(tag), 1);
            },
            showInput() {

            },
            handleInputConfirm() {

            }
        },
        data() {
            return {
                // categories: [],
                //  tagInputVisible: false,
                //  tagValue: '',
                loading: false,
                from: '',
                comment: {
                    id: '-1',
                    //  dynamicTags: [],
                    content: '',
                    //  mdContent: '',
                    //   cid: ''
                }
            }
        }
    }
</script>
<style>
  .post-article > .main > #editor {
    width: 100%;
    height: 450px;
    text-align: left;
  }

  .post-article > .header {
    background-color: #ececec;
    margin-top: 10px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }

  .post-article > .main {
    /*justify-content: flex-start;*/
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    background-color: #ececec;
    padding-top: 0px;
  }

  .post-article > .header > .el-tag + .el-tag {
    margin-left: 10px;
  }

  .post-article > .header > .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .post-article > .header > .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .post-article {
  }
</style>
