

<template>
    <el-table :data="userList" style="width: 100%" height="auto">
    <el-table-column  fixed prop="avatarUrl" label="头像" width="120" >
      <template #default="scope">
        <div style="display: flex; align-items: center">
            <el-image class="headSculpture" preview-teleported :src="scope.row.avatarUrl" :preview-src-list="srcList">
              <template #error>
                <div class="image-slot" style="color: brown;">
                  Error
                </div>
              </template>
              <template #placeholder>
                <div class="image-slot">Loading<span class="dot">...</span></div>
              </template>
            </el-image>
        </div>
    </template>
    </el-table-column>
      <el-table-column  prop="id" label="id" width="120" />
      <el-table-column prop="username" label="昵称" width="120" />
      <el-table-column prop="userAccount" label="账户" width="120" />
      <el-table-column prop="gender" label="性别" width="120" :formatter="enumFormat"/>
      <el-table-column prop="phone" label="手机号" width="120" />
      <el-table-column prop="email" label="邮箱" width="120" />
      <el-table-column prop="userStatus" label="账户状态" width="120" :formatter="enumFormat"/>
      <el-table-column prop="userRole" label="角色" width="120" :formatter="enumFormat" />
      <el-table-column label="操作" width="200" align="center">
      <template #default="scope">
        <el-button size="small" @click="dialogFormVisible=true"
          >添加</el-button>
          <el-button size="small" @click="editUserForm(scope.row)"
          >编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.id)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination 
        layout=" prev, pager, next ,sizes" 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="currentPage" 
        :page-sizes="[1,5,10,20]" 
        :page-size="pageSize" 
        :total="totalSize">
    </el-pagination>
    </div>
    
    


    <el-dialog v-model="dialogFormVisible" title="添加用户" :before-close="cancelFormSubmit">
    <el-form :model="addUser" :rules="addRules">
      <el-form-item prop="userAccount">
                <el-input type="text" v-model="addUser.userAccount" placeholder="请输入账户名" >
                </el-input>
            </el-form-item>
            <el-form-item prop="userPassword">
                <el-input type="password" v-model="addUser.userPassword" placeholder="请输入密码" >
                </el-input>
            </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelFormSubmit()">取消</el-button>
        <el-button type="primary" @click="submitForm()">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogFormEditVisible" title="编辑用户信息" :before-close="cancelFormSubmit">
    <el-form :model="formData" :rules="rules" ref="editFrom">
      <el-form-item v-for="(value, key) in userInfo" :label="value+'：'" :key="key" :prop="key">
        <el-input v-model="formData[key]" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelFormSubmit()">取消</el-button>
        <el-button type="primary" @click="submitEditForm()">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
  </template>
  
<script>
import { userList,UserGenderEnum,userRoleEnum,UserStatusEnum,userDelete,userUpdate,userAdd,userCount } from "../api/user"

export default{
  data: () => ({
    dialogFormVisible:false,
    dialogFormEditVisible:false,
    formData:{
        id: null,
        // 用户名
        username: null,
        // 用户账户
        userAccount: null,
        // 用户头像链接
        avatarUrl: null,
        // 性别，1：男性，0：女性
        gender: null,
        // 手机号码
        phone: null,
        // 用户邮箱
        email: null,
        // 用户状态
        userStatus: null,
        // 用户角色
        userRole: null,
    },
    userInfo: {
        // 用户名
        username: "用户名",
        // 用户账户
        userAccount: "用户账户",
        // 用户头像链接
        avatarUrl: "用户头像链接",
        // 性别，1：男性，0：女性
        gender: "性别",
        // 手机号码
        phone: "手机号码",
        // 用户邮箱
        email: "用户邮箱",
        // 用户状态
        userStatus: "用户状态",
        // 用户角色
        userRole: "用户角色",
    },
    rules:{
        username:[
            {required:false,message:"请输入用户名",trigger:"blur"},
            { min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }
        ],
        userAccount:[
            {required:true,message:"请输入用户账户",trigger:"blur"},
            { min: 4, max: 14, message: '长度在 4 到 14个字符',trigger: 'blur' }],
        gender:[
            {required:true,message:"请选择性别,0：女性，1：男性",trigger:"blur"}],
        phone:[
            {required:true,message:"请输入手机号",trigger:"blur"},
            { min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
        ],
        userStatus:[
            {required:true,message:"用户状态,0:正常",trigger:"blur"},
        ],
        userRole:[
            {required:true,message:"用户角色,0:普通用户,1:管理员",trigger:"blur"},
        ]
    },
    addUser:{
      userAccount:"",
      userPassword:"",
    },
    addRules:{
            userAccount:[
                {required:true,message:"请输入用户名",trigger:"blur"},
                { min: 4, max: 14, message: '长度在 4 到 14 个字符', trigger: 'blur' }
              ],
              userPassword:[
                {required:true,message:"请输入密码",trigger:"blur"},
                { min: 8,  message: '密码长度要大于8', trigger: 'blur' }],
          },
    userList: [],
    srcList: [],
    // 当前页码
    currentPage:1,
    // 页面展示条数
    pageSize:5,
    // 总数据条数
    totalSize:10,
  }),

  methods:{
    // 分页切换
    handleCurrentChange(val){
      this.currentPage = val;
      this.getUserData();
    },
    // 页面展示条数切换
    handleSizeChange(val){
      this.pageSize = val;
      this.getUserData();
    },
    // 获取用户信息总条数
    getUserTotal(){
      userCount().then(res=>{
        if(res.data.code == 0){
          this.totalSize = res.data.data;
        }else{
          console.log(res.data.message);
          this.$message.warning(res.data.message);
        }
      }).catch(error=>{
        throw error;
      });
    },
    // 获取用户数据
    getUserData(){
        userList(this.currentPage,this.pageSize).then(res=>{
            if(res.data.code == 0){
                this.userList = res.data.data;
                this.srcList = this.userList.map(item => item.avatarUrl);
                console.log(this.userList);
            }else{
                console.log(res.data.message);
                this.$message.warning(res.data.message);
            }
            
    }).catch(error=>{
      throw error;
    });},
    // 将枚举值转换为对应的实际值
    enumFormat(row, column, cellValue, index){
        // return cellValue == 0 ? '女' : '男';
        if(column.property == "gender"){
            return UserGenderEnum[cellValue];
        }
        if(column.property == "userStatus"){
            return UserStatusEnum[cellValue];
        }
        if(column.property == "userRole"){
            return userRoleEnum[cellValue];
        }
        
    },
    // 取消提交
     cancelFormSubmit(){
      this.dialogFormVisible=false;
      this.dialogFormEditVisible=false;
      this.formData={
        id: null,
        username: null,
        userAccount: null,
        avatarUrl: null,
        gender: null,
        phone: null,
        email: null,
        userStatus: null,
        userRole: null,
      };
      this.addUser={
        userAccount:"",
        userPassword:"",
        checkPassword:userPassword
      };
    },
    // 提交新增表单数据
    submitForm(){
      console.log(this.addUser);
      userAdd(this.addUser,this.addUser.userPassword).then(res=>{
        if(res.data.data> 0){
          this.$message.success("添加成功");
          this.cancelFormSubmit();
          location.reload();
        }else{
          this.$message.error('添加失败:'+ res.data.message +" " + res.data.description);
        }
      }).catch(error=>{
        throw error;})
    },
    // 删除用户
    handleDelete(id){
      this.$confirm(
        "确认要删除该用户吗？",
        "提示",
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'custom-cancel-button',
          type: 'warning',
          center: true
        }
      ).then(()=>{
        userDelete(id).then(res=>{
            if(res.data.data){
              console.log("删除成功");
              this.$message.success("删除成功！")
              location.reload();
            }
          }).catch(err=>{
              throw err;
            })  
      }).catch(()=>{
        this.$message.info("已取消删除")
      });

      
    },
    // 编辑用户对话框设置
    editUserForm(user){
      this.formData = user
      this.dialogFormEditVisible=true;
    },
    // 提交更新表单
    submitEditForm(){
      this.$refs.editFrom.validate((valid) => {
        if(valid){
            console.log(this.formData);
            userUpdate(this.formData).then(res=>{
              if(res.data.data>0){
                console.log("更新成功");
                this.$message.success("更新成功");
                this.cancelFormSubmit();
                location.reload();
              }else{
                this.$message.warning(res.data.message);
              }
            }).catch(err=>{
                throw err;
              })
        }else{
          this.$message.warning("请按照规则补全参数！");
          return false;
        }
      });

    }
    
  },
  created(){
    this.getUserData();
    this.getUserTotal();
  }
}





  
  </script>

<style scoped>
/* 设置头像展示样式 */
.headSculpture{
  width: 80px;
  height: 80px;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

/* 调整element UI中的确认框中确认和取消按钮的左右顺序 */
.el-message-box__btns{
  display: flex;
  flex-direction: row-reverse;
}


.custom-cancel-button{
  margin-left: 10px;
}

.page{
  display: flex;
  justify-content: center;
  margin-top: 1%;
}
</style>
  