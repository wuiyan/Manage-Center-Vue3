<script setup>
import NavigationBar from './NavigationBarView.vue'
import {removeCookie} from '../utils/cookieData'
import { ElMessage } from 'element-plus'
import { user } from '../store/store';
import {userLogout} from '../api/user'

function logout(){
    // 通过移除Cookie的方式移除登录状态-已废弃
    // removeCookie("user");

    userLogout().then(res=>{
        // 后端退出登录成功
        if(res.data.code == 0){
          // 通过响应式API的形式取消用户前端登录状态
          user.removeUserInfo();

          ElMessage.success("已退出登录");
          // 刷新页面，更新效果
          window.location.reload();
        }
    }
    ).catch(error=>{
      throw error;
    });

}

</script>

<template>
  <div class="main" >
    <el-container style="height: 100%;">
        <el-header class="el-header">
          <div class="titleText">
            <img class="logo" src="..\assets\logo.svg">
            <p>信息管理中心</p>
          </div>
          <div class="avatar">
            <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar  :size="default"> user </el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item @click="logout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
            
          </div>
          
          
        </el-header>
        <el-container>
          <el-aside class="el-aside">
            <NavigationBar></NavigationBar>
          </el-aside>
          <el-main>
            <RouterView></RouterView>
          </el-main>
        </el-container>
      </el-container>
  </div>
  
  </template>
  
<style scoped>
/* 顶栏展示样式 */
.main {
  width:100%;
  height:100%;
  align-items:center;
  background-color:#cff0da;
}

.el-header{
  height: 3rem !important;
  background-color: #3E4348;
  display: flex;
  justify-content: space-between;
}

.titleText{
  display: flex;
  height: 100%;
  font-size: 120%;
  color:#fff;
  /* font-size: large; */
  /* justify-content:space-around; */
  align-items: center; /* 垂直居中*/
}

.logo{
  height: 60%;
  margin-right: 10px;
}
.avatar{
  display: flex;
  align-items: center;
}
.el-dropdown-link{
  cursor: pointer;
}

/* 侧边栏样式 */
.el-aside{
  height: 100%;
  width: 150px !important;
}
</style>

