import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/signup'

Vue.use(Router)

export default new Router({
  routes: [
    {   //登录页面
      path: '/login',
      name: 'login',
      hidden: true,
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      hidden: true,
      component: Signup
    },
    {
      path: '/',
      name: 'Analysis',
      component: Home,
      iconCls: 'el-icon-success',
      children: [
        { name: 'overall', path: '/analysis/overall', icon: 'el-icon-document', component: require('@/components/analysis/overall') },
        { name: 'article', path: '/analysis/article', icon: 'el-icon-location', component: require('@/components/analysis/indiv') },
        { name: 'authors', path: '/analysis/authors', icon: 'el-icon-edit-outline', component: require('@/components/analysis/author') },
      ]
    },
  ]
})
