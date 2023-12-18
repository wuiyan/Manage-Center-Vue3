<template>
    <div class="body">
        <el-form :rules="rules" ref="registerForm" :model="registerForm" class="loginContainer">
            <h3 class="loginTitle">
            新用户注册
            </h3>
            <el-form-item prop="userAccount">
                <el-input type="text" v-model="registerForm.userAccount" placeholder="请输入账户名" >
                </el-input>
            </el-form-item>
            <el-form-item prop="userPassword">
                <el-input type="password" v-model="registerForm.userPassword" placeholder="请输入密码" >
                </el-input>
            </el-form-item>
            <el-form-item prop="checkPassword">
                <el-input type="password"  v-model="registerForm.checkPassword" placeholder="请输入确认密码">
                </el-input>

            </el-form-item>
            <el-button type="primary" style="width:100%" @click="submitRegister">注册</el-button>
            <div class="link">
                <router-link class="linkStyple" to="/login">返回用户登录</router-link>
            </div>
        </el-form>

    </div>
</template>
  



<script>
import {userRegister} from '../api/user'

export default {
  name: "Register",
    data(){
      return{
          captchaUrl: "http://fast.95man.com/Home/SecurityCode?t=0.36521313044261317",
          registerForm:{
              userAccount:"",
              userPassword:"",
              checkPassword:""
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
            checkPassword:[
                {required:true,message:"请输入确认密码",trigger:"blur"},
                { min: 6,  message: '密码长度要大于6', trigger: 'blur' }]
          }

      }
  },
    methods:{
        submitRegister(){
          this.$refs.registerForm.validate((valid) => {
              if (valid) {
                userRegister(this.registerForm).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success("注册成功");
                        this.$router.push('/login');
                    }else{
                        this.$message.error('注册出错：'+ res.data.message +" " + res.data.description);
                    }
                }).catch(error=>{
                    throw error;
                });
                  
              } else {
                  this.$message.warning("请按照规则填写参数！");
                  return false;
              }
          });
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


