<script setup>
import {checkIfUserIsAdmin} from '../auth/auth'
import { useRoute } from 'vue-router';

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

// 根据路由显示当前导航栏的活动项
const route = useRoute();
let routeName = route.path.replace('/','');

</script>


<template>

    <el-row class="tac">
    <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#4FB0C6"
        class="el-menu"
        :default-active=" routeName "
        text-color="#fff"
        :router="true"
        @open="handleOpen"
        @close="handleClose"
      >
      <el-menu-item index="/">
          <span>主页</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <span>信息管理</span>
          </template>
            <el-menu-item index="student">学生信息管理</el-menu-item>
            <el-menu-item index="book">书籍信息管理</el-menu-item>
          <el-menu-item index="borrow">借阅信息管理</el-menu-item>
        </el-sub-menu>
        <div v-if="checkIfUserIsAdmin()">
        <el-menu-item index="user-manage" >
          <span>用户管理</span>
        </el-menu-item>
        </div>
        <el-menu-item index="#">
          <span>关于</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>


<style>
.tac,.el-menu{
    height: 100% !important;
}
.el-col-12{
  max-width: 100% !important;
  flex: 0 0 100% !important;
}
</style>