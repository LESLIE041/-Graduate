import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import CategoryEdit_1 from '../views/CategoryEdit_1.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import ArticleEdit_1 from '../views/ArticleEdit_1.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import AdEdit_1 from '../views/AdEdit_1.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import AdminUserEdit_1 from '../views/AdminUserEdit_1.vue'
import DataEdit from '../views/DataEdit.vue'
import DataEdit_1 from '../views/DataEdit_1.vue'
import DataList from '../views/DataList.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 登陆页面的路由
    path: '/login',
    name: 'login',
    component: Login,
    meta: {isPublic: true}
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path: '/categories/create', component:CategoryEdit},
      // /categories/edit/:id指的是动态路由;将id与页面相结合
      {path: '/categories/edit/:id', component:CategoryEdit_1, props: true},
      {path: '/categories/list', component:CategoryList},
      {path: '/articles/create', component:ArticleEdit},
      {path: '/articles/edit/:id', component:ArticleEdit_1, props: true},
      {path: '/articles/list', component:ArticleList},
      {path: '/advs/create', component:AdEdit},
      {path: '/advs/edit/:id', component:AdEdit_1, props: true},
      {path: '/advs/list', component:AdList},
      {path: '/admin_users/create', component:AdminUserEdit},
      {path: '/admin_users/edit/:id', component:AdminUserEdit_1, props: true},
      {path: '/admin_users/list', component:AdminUserList},
      {path: '/datas/create', component:DataEdit},
      {path: '/datas/edit/:id', component:DataEdit_1, props: true},
      {path: '/datas/list', component:DataList}
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token) {
    return next('/Login')
  }
  next()
})

export default router
