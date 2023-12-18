import requests from "./api";

// 用户登录请求
export async function userLogin(form){
    return requests.post("/user/login",{
        userAccount:form.userAccount,
        userPassword:form.userPassword,
        rememberMe:form.checked
    })
}

// 用户登录状态检验
export async function userLoginCheck(){
    return requests.post("/user/user-status");
}

// 用户注销
export async function userLogout(){
    return requests.post("/user/logout");
}

// 用户注册请求
export async function userRegister(form){
    return requests.post("/user/register",{
        userAccount:form.userAccount,
        userPassword:form.userPassword,
        checkPassword:form.checkPassword
    })
}

// 用户列表查询
export async function userList(pageNum,size){
    return requests.get("/user/list?pageNum="+pageNum+"&size="+size);
}

// 用户列表总条数查询
export async function userCount(){
    return requests.get("/user/count");
}

// 用户添加
export async function userAdd(form,checkPassword){
    return requests.post("/user/register",{
        userAccount:form.userAccount,
        userPassword:form.userPassword,
        checkPassword:checkPassword
    })
}

// 用户修改
export async function userUpdate(form){
    return requests.post("/user/update",{
        id:form.id,
        username:form.username,
        userAccount:form.userAccount,
        avatarUrl:form.avatarUrl,
        gender:form.gender,
        phone:form.phone,
        email:form.email,
        userStatus:form.userStatus,
        userRole:form.userRole,
    });

}

// 用户删除
export async function userDelete(id){
    return requests.post("/user/delete",{
        id:id
    })
}

//-------------------------------------------------------------//
// 枚举常量定义
// 性别常量
export const UserGenderEnum = {
    0: '女',
    1: '男',
};
// 状态常量
export const UserStatusEnum = {
    0: '正常',
    1: '异常',
};
// 角色常量
export const userRoleEnum = {
    0: '普通用户',
    1: '管理员',
};
