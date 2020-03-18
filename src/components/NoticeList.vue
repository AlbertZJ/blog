<template>
  <el-container class="article_list">
    <el-main class="main">
      <el-tabs v-model="noticeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="所有公告" name="all" v-if="isAdmin">
          <notice_table state="-1" :showEdit="false" :showDelete="false" :showRestore="false" :noticeName="noticeName"></notice_table>
        </el-tab-pane>
        <el-tab-pane label="已发表" name="post" v-if="isAdmin">
          <notice_table state="1" :showEdit="true" :showDelete="true" :showRestore="false" :noticeName="noticeName"></notice_table>
        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="draft" v-if="isAdmin">
          <notice_table state="0" :showEdit="true" :showDelete="true" :showRestore="false" :noticeName="noticeName"></notice_table>
        </el-tab-pane>
        <el-tab-pane label="回收站" name="dustbin" v-if="isAdmin">
          <notice_table state="2" :showEdit="false" :showDelete="true" :showRestore="true" :noticeName="noticeName"></notice_table>
        </el-tab-pane>
        <el-tab-pane label="公告管理" name="noticemana" v-if="isAdmin">
          <notice_table state="-2" :showEdit="false" :showDelete="true" :showRestore="false" :noticeName="noticeName"></notice_table>
        </el-tab-pane>
        <el-tab-pane label="公告历史" name="old" >
          <notice_table state="-2" :showEdit="false" :showDelete="false" :showRestore="false" :noticeName="noticeName"></notice_table>
        </el-tab-pane>
<!--        <el-tab-pane label="通知配置" name="blogcfg">-->
<!--          <notice_cfg></notice_cfg>-->
<!--        </el-tab-pane>-->
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
    import NoticeTable from '@/components/NoticeTable'
    import NoticeCfg from '@/components/NoticeCfg'
    import {postRequest} from '../utils/api'
    import {putRequest} from '../utils/api'
    import {deleteRequest} from '../utils/api'
    import {getRequest} from '../utils/api'
    export default {
        mounted: function () {
            var _this = this;
            getRequest("/isNotice").then(resp=> {
                if (resp.status == 200) {
                 //   _this.$alert(resp.data+"notice");
                    _this.isAdmin = resp.data;
                }
            })
        },
        data() {
            return {
                noticeName: 'post',
                isAdmin: false
            };
        },
        methods: {
            handleClick(tab, event) {
//        console.log(tab, event);
            }
        },
        components: {
            'notice_table': NoticeTable,
            'notice_cfg': NoticeCfg
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
