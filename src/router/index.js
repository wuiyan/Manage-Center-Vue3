import { createRouter, createWebHistory } from 'vue-router'
import IndexShow from '../components/IndexShow.vue'
import StudentShow from '../components/StudentShow.vue'
import BookShow from '../components/BookShow.vue'
import BorrowShow from '../components/BorrowShow.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import IndexView from '../views/IndexView.vue'
import UserManage from '../components/UserManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      meta: { 
        requiresAuth: true,
       },
      children:[
        {
          path: '',
          name: 'info',
          component: IndexShow
        },
        {
          path: 'student',
          name: 'student',
          component: StudentShow
        },
        {
          path: 'book',
          name: 'book',
          component: BookShow
        },
        {
          path: 'borrow',
          name: 'borrow',
          component: BorrowShow
        },{
          path: 'user-manage',
          name: 'userManage',
          component: UserManage,
          meta: { 
            requiresAdmin:true
           },
        }
      ]
    }
    ,{
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false }
    },{
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    }
    
  ]
})

export default router
