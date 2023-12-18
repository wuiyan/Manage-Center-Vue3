import {getCookie} from '../utils/cookieData'
import { user } from '../store/store';
import {userLoginCheck} from '../api/user'
//权限验证相关的js文件

// 检查用户是否已登录
export async function checkIfUserIsAuthenticated() {
    // 从 localStorage 中取出存储的用户信息
    // const user = JSON.parse(localStorage.getItem('user'));

    // 从Cookie中取出对应的值
    // const user = JSON.parse(getCookie('user'));

    // 从本地状态管理中检查当前用户是否登录
    let userStatus = user.loginStatus;

    // 如若本地没有信息，访问服务器检查用户是否登录
    if(!userStatus){
        // 添加注释避免在后端环境没有启动时报错
        try{
            await userLoginCheck().then(res=>{
                // 用户已登录，获取登录信息
                if(res.data.code == 0){
                    user.updateUserInfo(res.data.data);
                    userStatus = user.loginStatus;
                }
            }).catch(error=>{
                throw error;
            })
        }catch(error){
            console.log(error);
        }
        
    }

    console.log(user.userInfo);

    // 如果用户状态为真，则认为已登录
    return userStatus;
}

// 检查当前用户是否是管理员
export function checkIfUserIsAdmin(){
    let userStatus = user.userInfo.userRole;
    if(userStatus == 1){
        return true;
    }
    return false;
}