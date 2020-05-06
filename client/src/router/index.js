
import {ifLogin} from "../api";
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: ()=> import('../views/Login/index')
  },
  {
    path: '/admin',
    meta: {cnName: '首页'},
    component: ()=> import('../views/Admin/index'),
    beforeEnter:(to,from,next)=>{
      ifLogin().then(res=>{
        if (res.data.code) {
          //code不为0，未登录,跳登录
          next("/");
        }else{
          //已登录，跳admin
          next();
        }
      }).catch(()=>{
        next("/");
      });
    },
    children: [
      {
        path: '',
        name: 'AdminIndex',
        component: ()=>import('../views/Admin/AdminIndex/index'),
        meta: {cnName: '首页'},
      },
      {
        path: 'ArticleAdd',
        name: 'ArticleAdd',
        component: ()=>import('../views/Admin/Article/ArticleAdd'),
        meta: {cnName: '发表文章'},
      },
      {
        path: 'ArticleManage',
        name: 'ArticleManage',
        component: ()=>import('../views/Admin/Article/ArticleManage'),
        meta: {cnName: '管理文章'},
      },
      {
        path: 'UserAdmin',
        name: 'UserAdmin',
        component: ()=>import('../views/Admin/User/UserAdmin'),
        meta: {cnName: '权限管理'},
      },
      {
        path: 'MessageDelete',
        name: 'MessageDelete',
        component: ()=>import('../views/Admin/Message/MessageDelete'),
        meta: {cnName: '删除留言'},
      },
      {
        path: 'DiaryAdd',
        name: 'DiaryAdd',
        component: ()=>import('../views/Admin/Diary/DiaryAdd'),
        meta: {cnName: '发表日记'},
      },
      {
        path: 'DiaryManage',
        name: 'DiaryManage',
        component: ()=>import('../views/Admin/Diary/DiaryManage'),
        meta: {cnName: '管理日记'},
      },
      {
        path: 'LinksAdd',
        name: 'LinksAdd',
        component: ()=>import('../views/Admin/Links/LinksAdd'),
        meta: {cnName: '添加友链'},
      },
      {
        path: 'LinksDelete',
        name: 'LinksDelete',
        component: ()=>import('../views/Admin/Links/LinksDelete'),
        meta: {cnName: '删除友链'},
      }
    ]
  },

];

const router = new VueRouter({
  routes
});

export default router
