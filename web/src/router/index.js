import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Article from '../views/Article.vue'
import Data from '../views/Data.vue'
import Ads from '../views/Ads.vue'
import Tai from '../views/Tai.vue'
import Others from '../views/Others.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {path: '/', name: 'home', component: Home},
      {path: '/articles/:id', name: 'article', component: Article, props: true},
      {path: '/datas', name: 'data', component: Data, props: true},
      {path: '/ads', name: 'ads', component: Ads, props: true},
      {path: '/datas/taiyuan', name: 'tai', component: Tai, props: true},
      {path: '/datas/others', name: 'others', component: Others, props: true},
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
