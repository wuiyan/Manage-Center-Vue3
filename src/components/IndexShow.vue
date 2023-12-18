<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const colors = [
  { color: '#f56c6c', percentage: 10 },
  { color: '#e6a23c', percentage: 20 },
  { color: '#5cb87a', percentage: 30 },
  { color: '#1989fa', percentage: 40 },
  { color: '#6f7ad3', percentage: 50 },
  { color: '#f56c6c', percentage: 60 },
  { color: '#e6a23c', percentage: 70 },
  { color: '#5cb87a', percentage: 80 },
  { color: '#1989fa', percentage: 90 },
  { color: '#6f7ad3', percentage: 100 }
]
const percentage1 = ref(0)
const percentage2 = ref(0)
const percentage3 = ref(0)

onMounted(() => {
  setInterval(() => {
    if(percentage1.value < 50){
        percentage1.value = (percentage1.value % 100) + 1
    }
    if(percentage2.value < 60){
        percentage2.value = (percentage2.value % 100) + 1
    }
    if(percentage3.value < 70){
        percentage3.value = (percentage3.value % 100) + 1
    }
  }, 5)
})
</script>

<template>
<div class="background">
<div class="mainText">
    <h1>数据概览</h1>
</div>
<hr color="#ffffff">
<el-row>
    <el-col :span="8">
        <div class="showCard">
            <el-statistic :value="268500">
            <template #title>
            <div class="bigText" >
                书籍数量
            </div>
            </template>
            </el-statistic>
            <el-progress type="dashboard" :percentage="percentage1" :color="colors" />
        </div>
    </el-col>
    <el-col :span="8">
    <div class="showCard">
      <el-statistic :value="138">
        <template #title>
          <div class="bigText" >
            学生人数
          </div>
        </template>
      </el-statistic>
      <el-progress type="dashboard" :percentage="percentage2" :color="colors" />
    </div>
    </el-col>
    <el-col :span="8">
    <div class="showCard">
      <el-statistic :value="172000">
        <template #title>
          <div class="bigText" >
            借阅数量
          </div>
        </template>
    </el-statistic>
    <el-progress type="dashboard" :percentage="percentage3" :color="colors" />
    </div>
    </el-col>
  </el-row>
</div>
</template>

<style scoped>
.background{
    background-color: azure;
    height: 100%;
    border-radius: 15px;
}
.mainText{
    padding-top: 5%;
    padding-bottom: 1%;
}
h1{
    text-align: center;
    font-size: 36px;
}

.el-row{
    margin-top: 6%;
}
.el-col {
  text-align: center;
  height: 100%;
}
.showCard{
    background-color: #CFF0DA;
    margin: 0 30px;
    padding: 30px;
    height: 100%;
    border-radius: 15px;
}
.bigText{
    font-size: 24px;
    color: black;
    margin-bottom: 18px;
}
</style>