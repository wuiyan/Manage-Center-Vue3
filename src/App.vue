<script setup>
import { RouterLink, RouterView } from 'vue-router'
import IndexView from './views/IndexView.vue';
import LoginView from './views/LoginView.vue';
</script>

<template>
<!-- <IndexView></IndexView> -->
<!-- <LoginView></LoginView> -->
<RouterView></RouterView>
</template>

<style>
html,body{
    height: 100%;
    width: 100%;
    margin: 0 !important;
    padding: 0 ;
}
</style>
