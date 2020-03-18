import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import CommentMana from "../components/CommentMana";
import RoleMana from "../components/RoleMana";
import Register from '@/components/Register'
import Home from '@/components/Home'
import ArticleList from '@/components/ArticleList'
import CateMana from '@/components/CateMana'
import DataCharts from '@/components/DataCharts'
import PostArticle from '@/components/PostArticle'
import UserMana from '@/components/UserMana'
import BlogDetail from '@/components/BlogDetail'
import NoticeMana from "../components/NoticeMana";
import NoticeCfg from "../components/NoticeCfg";
import NoticeTable from "../components/NoticeTable";
import PostNotice from "../components/PostNotice";
import NoticeList from "../components/NoticeList";
import NoticeDetail from "../components/NoticeDetail";
import PostComment from "../components/PostComment";
import CommentDetail from "../components/CommentDetail";
import CommentList from "../components/CommentList";
import FavoriteMana from "../components/FavoriteMana";
import FavoriteList from "../components/FavoriteList";
import TeamList from "../components/TeamList";
import TeamTable from "../components/TeamTable";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      hidden: true,
      component: Login
    },
    {
      path: '/register',
      name: '注册',
      hidden: true,
      component: Register
    },{
      path: '/home',
      name: '',
      component: Home,
      hidden: true
    },
    {
      path: '/home',
      component: Home,
      name: '文章管理',
      iconCls: 'fa fa-file-text-o',
      children: [
        {
          path: '/articleList',
          name: '文章列表',
          component: ArticleList,
          meta: {
            keepAlive: true
          }
        }, {
          path: '/postArticle',
          name: '发表文章',
          component: PostArticle,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/blogDetail',
          name: '文章详情',
          component: BlogDetail,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/editBlog',
          name: '编辑文章',
          component: PostArticle,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }
      ]
    },
    {
      path: '/home',
      component: Home,
      name: '评论管理',
      iconCls: 'fa fa-file-text-o',
      children: [
        {
          path: '/commentList',
          name: '评论列表',
          component: CommentList,
          meta: {
            keepAlive: true
          }
        }, {
          path: '/commentDetail',
          name: '评论详情',
          component: CommentDetail,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }
      ]
    },
    {
      path: '/home',
      component: Home,
      name: '公告管理',
      iconCls: 'fa fa-file-text-o',
      children: [
        {
          path: '/noticeList',
          name: '公告列表',
          component: NoticeList,
          meta: {
            keepAlive: true
          }
        }, {
          path: '/postNotice',
          name: '发布公告',
          component: PostNotice,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/noticeDetail',
          name: '公告详情',
          component: NoticeDetail,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/editNotice',
          name: '编辑公告',
          component: PostNotice,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }
      ]
    },
    // 主页用户管理分栏
     {
      path: '/home',
      component: Home,
       iconCls:'fa fa-user-o',
      name: '社区成员',
      children: [
        {
          path: '/teamList',
          name: '社区成员',
          iconCls:'fa fa-user-o',
          component: TeamList,
          meta: {
            keepAlive: true
          }
        }, {
          path: '/teamTable',
          name: '空间',
          component: TeamTable,
           hidden: true,
          meta: {
            keepAlive: false
          }

        }
      ]
    },

    // 主页用户管理分栏
    {
          path: '/home',
          component: Home,
          name: '用户管理',
          iconCls:'fa fa-user-o',
          children: [
            {
              path: '/user',
              //  iconCls: 'fa fa-user-o',
              name: '用户管理',
              component: UserMana,
              meta: {
                keepAlive: true
              }
            }, {
              path: '/regist',
              name: '信息管理',
              component: Register,
              meta: {
                keepAlive: true
              }
            }
      ]
    }
    , {
      path: '/home',
      component: Home,
      name: '栏目管理',
      children: [
        {
          path: '/cateMana',
          iconCls: 'fa fa-reorder',
          name: '栏目管理',
          component: CateMana
        }
      ]
    },
     {
      path: '/home',
      component: Home,
      name: '角色管理',
      children: [
        {
          path: '/cateRole',
          iconCls: 'fa fa-reorder',
          name: '角色管理',
          component: RoleMana
        }
      ]
    },
    {
      path: '/home',
      component: Home,
      name: '收藏管理',
      children: [
        {
          path: '/favorite',
          iconCls: 'fa fa-reorder',
          name: '收藏管理',
          component: FavoriteMana
        }
      ]
    },
    // {
    //   path: '/home',
    //   component: Home,
    //   name: '收藏夹s',
    //   children: [
    //     {
    //       path: '/favoritelist',
    //       iconCls: 'fa fa-reorder',
    //       name: '收藏夹s',
    //       component: FavoriteList
    //     }
    //   ]
    // },
    {
      path: '/home',
      component: Home,
      name: '数据统计',
      iconCls: 'fa fa-bar-chart',
      children: [
        {
          path: '/charts',
          iconCls: 'fa fa-bar-chart',
          name: '数据统计',
          component: DataCharts
        }
      ]
    },
   {
      path: '/login',
      name: 'Login',
      hidden: true,
      component: Login
    }
  ]
})
