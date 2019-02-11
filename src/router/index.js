import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'

import Home from '@/views/home'
import Login from '@/views/login/login'
import Forget from '@/views/forget/forget'
import Reset from '@/views/reset/reset'

// 推广优化
import Seo from '@/views/seo/seo'
import SeoList from '@/views/seo/seoList'
import CommerceList from '@/views/seo/commerceList'

// 帮助中心
import Help from '@/views/help/help'
import HelpDetail from '@/views/help/detail'

// 会员中心
import User from '@/views/user/user'
import Password from '@/views/user/password/password'
import Company from '@/views/user/company/company'
// 网站管理
import AdministrationWeb from '@/views/administrationWeb/index/index'
import Product from '@/views/administrationWeb/product/product'
import ProductDetail from '@/views/administrationWeb/product/productDetail'
import Banner from '@/views/administrationWeb/banner/banner'
import Article from '@/views/administrationWeb/article/article'
import ArticleDetail from '@/views/administrationWeb/article/articleDetail'
import Photo from '@/views/administrationWeb/photo/photo'
import PhotoDetail from '@/views/administrationWeb/photo/photoDetail'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/reset',
      name: '重置密码',
      component: Reset
    },
    {
      path: '/help',
      name: '帮助中心',
      component: Help
    },
    {
      path: '/helpDetail',
      name: '帮助详情',
      component: HelpDetail
    },
    {
      path: '/administrationWeb',
      name: '网站管理',
      component: AdministrationWeb
    },
    {
      path: '/product',
      name: '产品列表',
      component: Product
    },
    {
      path: '/productDetail',
      name: '产品详情',
      component: ProductDetail
    },
    {
      path: '/banner',
      name: 'banner列表',
      component: Banner
    },
    {
      path: '/article',
      name: '图文列表',
      component: Article
    },
    {
      path: '/articleDetail',
      name: '图文详情',
      component: ArticleDetail
    },
    {
      path: '/photo',
      name: '图集列表',
      component: Photo
    },
    {
      path: '/photoDetail',
      name: '图集详情',
      component: PhotoDetail
    },
    {
      path: '/user',
      name: '个人中心',
      component: User
    },
    {
      path: '/password',
      name: '修改密码',
      component: Password
    },
    {
      path: '/company',
      name: '公司信息',
      component: Company
    },
    {
      path: '/seo',
      name: '推广优化',
      component: Seo
    },
    {
      path: '/seoList',
      name: '关键词优化',
      component: SeoList
    },
    {
      path: '/commerceList',
      name: '商贸推广',
      component: CommerceList
    }
  ]
})
