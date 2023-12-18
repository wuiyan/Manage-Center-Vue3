

<template>
    <el-table :data="studentList" style="width: 100%" height="auto">
      <el-table-column fixed prop="sid" label="学号" width="150" align="center"/>
      <el-table-column prop="name" label="姓名" width="120" align="center"/>
      <el-table-column prop="sex" label="性别" width="200" align="center"/>
      <el-table-column prop="age" label="年龄" width="200" align="center"/>
      <el-table-column prop="speciality" label="专业" width="300" align="center"/>
      <el-table-column label="操作" width="200" align="center">
      <template #default="scope">
        <el-button size="small" @click="dialogFormVisible=true"
          >添加</el-button>
          <el-button size="small" @click="editFormData(scope.row)"
          >编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.sid)"
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


    <el-dialog v-model="dialogFormVisible" title="新增学生" :show-close="false">
    <el-form :model="formData">
      <el-form-item label="学生姓名" :label-width="120" >
        <el-input v-model="formData.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学生性别" :label-width="120">
        <el-input v-model="formData.sex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学生年龄" :label-width="120">
        <el-input v-model="formData.age" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学生专业" :label-width="120">
        <el-input v-model="formData.speciality" autocomplete="off" />
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

  <el-dialog v-model="dialogEditFormVisible" title="修改学生信息" :show-close="false">
    <el-form :model="formData">
      <el-form-item label="学生姓名" :label-width="120" >
        <el-input v-model="formData.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学生性别" :label-width="120">
        <el-input v-model="formData.sex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学生年龄" :label-width="120">
        <el-input v-model="formData.age" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学生专业" :label-width="120">
        <el-input v-model="formData.speciality" autocomplete="off" />
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
import { getStudentList,deleteStudentInfo,updateStudentInfo,addStudentInfo,studentCount } from "../api/book"

export default{
  data: () => ({
    dialogFormVisible:false,
    dialogEditFormVisible:false,
    studentList: [],
    formData:{
      sid:null,
      name:null,
      sex:null,
      age:null,
      speciality:null
    },
    // 当前页码
    currentPage:1,
    // 页面展示条数
    pageSize:10,
    // 总数据条数
    totalSize:10,
    
  }),

  methods:{
    // 分页切换
    handleCurrentChange(val){
      this.currentPage = val;
      this.getStudentData();
    },
    // 页面展示条数切换
    handleSizeChange(val){
      this.pageSize = val;
      this.getStudentData();
    },
    // 获取用户信息总条数
    getStudentTotal(){
      studentCount().then(res=>{
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
    // 获取学生数据
    getStudentData(){
      getStudentList(this.currentPage,this.pageSize).then(res=>{
        if (res.data.code == 0) {
          this.studentList = res.data.data;
          console.log(this.studentList);
        }else{
          this.$message.error(res.data.message);
        }
    }).catch(error=>{
      throw error;
    });
    },
    // 取消提交
    cancelFormSubmit(){
      this.dialogFormVisible=false;
      this.dialogEditFormVisible=false;
      this.formData={
        sid:null,
        name:null,
        sex:null,
        age:null,
        speciality:null
      }
    },
    // 新增表格提交
    submitForm(){
      let checkAttribute = (form,props)=>{
            return props.every(prop => form.hasOwnProperty(prop) && form[prop] !== null && form[prop]!== "");  
          }
      let result = checkAttribute(this.formData,['name','sex','age',"speciality"]);
      if(!result){
            this.$message.warning("请检查参数是否输入完整");
            return null;
          }
      addStudentInfo(this.formData).then(res=>{
        if(res.data.data>0){
              this.$message.success("添加成功");
              this.cancelFormSubmit();
              location.reload();
          }else{
          this.$message.error(res.data.message);
        }
          }).catch(err=>{
            console.log("111:"+ err.data);
              throw err;
            })
    },
    // 编辑表格提交
    submitEditForm(){
      let checkAttribute = (form,props)=>{
            return props.every(prop => form.hasOwnProperty(prop) && form[prop] !== null && form[prop]!== "");  
          }
      let result = checkAttribute(this.formData,['name','sex','age',"speciality","sid"]);
      if(!result){
            this.$message.warning("请检查参数是否输入完整");
            return null;
          }
      updateStudentInfo(this.formData).then(res=>{
        if(res.data.data>0){
              this.$message.success("学生信息更新成功");
              this.cancelFormSubmit();
              location.reload();
          }else{
          this.$message.error(res.data.message);
        }
          }).catch(err=>{
              throw err;
            })
    },
    // 编辑修改对话框的数据
    editFormData(student){
      this.formData.sid = student.sid;
      this.formData.age = student.age;
      this.formData.sex = student.sex;
      this.formData.speciality = student.speciality;
      this.formData.name = student.name;
      this.dialogEditFormVisible=true;
    },
    // 删除记录
    handleDelete(sid){
      this.$confirm(
        "确认要删除该记录吗？此操作无法撤销！",
        "提示",
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'custom-cancel-button',
          type: 'warning',
          center: true
        }
      ).then(()=>{
        deleteStudentInfo(sid).then(res=>{
          if(res.data.data>0){
            this.$message.success("学生记录删除成功");
            location.reload();
          }else{
            this.$message.error("学生记录删除失败："+res.data.message);
          }
            }).catch(error=>{
            throw error;
          });
      }).catch(()=>{
        this.$message.info("已取消删除")
      });
      
    }
    
  },
  created(){
    // 获取学生数据
    this.getStudentData();
    // 获取学生信息总条数
    this.getStudentTotal();
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
  margin-right: 8%;
}
</style>