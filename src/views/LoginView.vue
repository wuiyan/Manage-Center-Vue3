<template>
    <div class="body">
        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">
            欢迎登录管理系统
            </h3>
            <el-form-item prop="userAccount">
                <el-input type="text" v-model="loginForm.userAccount" placeholder="亲，请输入用户名" >
                </el-input>
            </el-form-item>
            <el-form-item prop="userPassword">
                <el-input type="password" v-model="loginForm.userPassword" placeholder="亲，请输入密码" >
                </el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px">
                </el-input>
                <img  v-on:click="refreshImage" :src="captchaUrl">

            </el-form-item>
            <el-checkbox v-model="loginForm.checked" class="loginRemember">记住我</el-checkbox>
            <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
            <div class="link">
                <router-link class="linkStyple" to="/register">新用户注册</router-link>
            </div>
        </el-form>

    </div>
</template>
  



<script>
import {setCookie} from '../utils/cookieData'
import {userLogin} from '../api/user'
import { user } from '../store/store'

export default {
  name: "Login",
    data(){
      return{
          captchaUrl: "http://fast.95man.com/Home/SecurityCode?t=0.36521313044261317",
          loginForm:{
              userAccount:"",
              userPassword:"",
              code:'',
              checked: true,
          },
        //   表单验证规则
        // required：该字段是否必须，message：提示信息，trigger：触发验证的时机，blur失去焦点时触发
          rules:{
              userAccount:[
                {required:true,message:"请输入用户名",trigger:"blur"},
                { min: 4, max: 14, message: '长度在 4 到 14 个字符', trigger: 'blur' }
              ],
              userPassword:[
                {required:true,message:"请输入密码",trigger:"blur"},
                { min: 6,  message: '密码长度要大于6', trigger: 'blur' }],
              code:[
                {required:false,message:"请输入验证码",trigger:"blur"}
            ],
          }

      }
  },
    methods:{
      submitLogin(){
          this.$refs.loginForm.validate((valid) => {
              if (valid) {
                userLogin(this.loginForm).then(res=>{
                    if(res.data.code==0){
                        // 将用户信息存储到store中
                        user.updateUserInfo(res.data.data);
                        // console.log(user.userInfo);
                        this.$message.success("登录成功");
                        this.$router.push('/');
                    }else{
                        this.$message.error('登录失败：'+ res.data.message +" " + res.data.description);
                    }
                }).catch(error=>{
                    throw error;
                })

                //   this.$message.success("提交成功");
                  // 登陆成功后保存用户信息到localStorage中
                //   localStorage.setItem('user', JSON.stringify(this.loginForm));

                  // 登陆成功后保存用户信息到Cookie中| 参数列表：cookie名称、cookie值、存活时间（天）
                //   setCookie("user",JSON.stringify(this.loginForm),1);

                  // 跳转到主界面
                //   this.$router.push('/');

              } else {
                this.$message.warning("请按照规则补全参数！");
                return false;
              }
          });
      },
      refreshImage(){
        this.captchaUrl = "http://fast.95man.com/Home/SecurityCode?t=0.36521313044261317&" + Math.random();
      }
    }
};
</script>

<style scoped>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        text-align: left;
        margin: auto;
        margin-top: 8%;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: aliceblue;
        border:1px solid rgb(16, 3, 29);
        box-shadow: 0 0 25px rgb(28, 88, 184);
        background-color:rgba(255,255,255,1);
        backdrop-filter:blur(0px);
        opacity:1;

    }
    .loginTitle{
        margin: 0px auto 48px auto;
        text-align: center;
        font-size: 34px;
        /* font-family: "宋体"; */
    }
    .loginRemember{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
    .body{
        width: 100vw;
        height: 100vh;
        background-image: url("../assets/background.png") !important;
        background-size: cover;
        overflow: hidden;
    }
    .body::before{
        content:"";
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:rgba(18, 15, 15, 0.2);
        backdrop-filter:blur(10px);
        opacity:0.4;
    }
    .link{
        margin-top: 10px;
        text-align: right;
    }
    .linkStyple{
        color: #409eff;
    }
</style>


