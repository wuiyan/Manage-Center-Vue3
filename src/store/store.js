import { reactive } from 'vue'

// 定义用户信息
const userInfo = {
    // 用户id
    id: Number,
    // 用户名
    username: String,
    // 用户账户
    userAccount: String,
    // 用户头像链接
    avatarUrl: String,
    // 性别，1：男性，0：女性
    gender: Number,
    // 手机号码
    phone: String,
    // 用户邮箱
    email: String,
    // 用户状态
    userStatus: Number,
    // 用户角色
    userRole: Number,
}

// 导出用户对象
export const user = reactive({
    userInfo: userInfo,
    loginStatus:false,
    updateUserInfo(data){
        this.userInfo.id = data.id;
        this.userInfo.username = data.username;
        this.userInfo.userAccount = data.serAccount;
        this.userInfo.avatarUrl = data.avatarUrl;
        this.userInfo.gender = data.gender;
        this.userInfo.phone = data.phone;
        this.userInfo.email = data.email;
        this.userInfo.userStatus = data.userStatus;
        this.userInfo.userRole = data.userRole;

        this.loginStatus=true;
    },
    removeUserInfo(){
        this.userInfo={};
        this.loginStatus=false;
    }

})

