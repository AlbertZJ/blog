<template>
  <el-container class="article_list">
    <el-main class="main">
      <el-tabs v-model="commentName" @tab-click="handleClick" type="card">
        <el-tab-pane label="所有评论" name="all">
          <comment_table state="-1" :showEdit="false" :showDelete="false" :showRestore="false" :commentName="commentName"></comment_table>
        </el-tab-pane>
        <el-tab-pane label="已发表" name="post">
          <comment_table state="1" :showEdit="true" :showDelete="true" :showRestore="false" :commentName="commentName"></comment_table>
        </el-tab-pane>
<!--        <el-tab-pane label="回收站" name="dustbin">-->
<!--          <comment_table state="2" :showEdit="false" :showDelete="true" :showRestore="true" :commentName="commentName"></comment_table>-->
<!--        </el-tab-pane>-->
        <el-tab-pane label="评论管理" name="commentmana" v-if="isAdmin">
          <comment_table state="-2" :showEdit="false" :showDelete="true" :showRestore="false" :commentName="commentName"></comment_table>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
    import CommentTable from '@/components/CommentTable'
    import CommentCfg from '@/components/CommentCfg'
    import {postRequest} from '../utils/api'
    import {putRequest} from '../utils/api'
    import {deleteRequest} from '../utils/api'
    import {getRequest} from '../utils/api'

    export default {
        mounted: function () {
            var _this = this;
            getRequest("/isComment").then(resp=> {
                if (resp.status == 200) {
                   // _this.$alert(resp.data+"comment");
                    _this.isAdmin = resp.data;
                }
            })
        },
        data() {
            return {
                commentName: 'post',
                isAdmin: false
            };
        },
        methods: {
            handleClick(tab, event) {
//        console.log(tab, event);
            }
        },
        components: {
            'comment_table': CommentTable,
            'comment_cfg': CommentCfg
        }
    };
</script>
<style>
  .article_list > .header {
    background-color: #ececec;
    margin-top: 10px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }

  .article_list > .main {
    /*justify-content: flex-start;*/
    display: flex;
    flex-direction: column;
    padding-left: 0px;
    background-color: #fff;
    padding-top: 0px;
    margin-top: 8px;
  }
</style>
