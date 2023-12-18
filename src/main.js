import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/dist/locale/zh-cn.mjs'

import { checkIfUserIsAuthenticated,checkIfUserIsAdmin } from './auth/auth'

//判断是否登录
router.beforeEach(async function (to, from, next) {

    if (to.meta.requiresAuth) {
      //从cookie中获取用户信息，判断是否已登录
      if (await checkIfUserIsAuthenticated()) {
        // 只有管理员可访问的页面
        if(to.meta.requiresAdmin){
          if(checkIfUserIsAdmin()){
            next();
          }else{
            ElMessage({
              showClose: true,
              message: '用户无访问权限！',
              type: 'warning',})
            next({
              path:from.path
            });
          }
        }
        // 普通页面
        next(); //表示已经登录
      } else {
        // 提示未登录信息
        ElMessage({
            showClose: true,
            message: '请先登录账号',
            type: 'warning',})

        //未登录
        //next可以传递一个路由对象作为参数 表示需要跳转到的页面
        next({
          name: "login",
          query: {"redirect": to.fullPath} //登录后再跳回此页面时要做的配置
        });
      }
    } else {
      //表示不需要登录
      next(); //继续往后走
    }
  });

const app = createApp(App)



app.use(router)
// 添加element-plus并设置语言
app.use(ElementPlus, {locale})


app.mount('#app')
