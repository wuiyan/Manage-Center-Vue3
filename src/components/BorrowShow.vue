<template>
    <el-table :data="borrowList" style="width: 100%" height="auto" > 
      <el-table-column fixed prop="id" label="借阅编号" width="150" align="center"/>
      <el-table-column prop="book.title" label="书籍标题" width="120" align="center" />
      <el-table-column prop="book.bid" label="书籍编号" width="120"  align="center" />
      <el-table-column prop="student.name" label="借阅人" width="120" align="center" />
      <el-table-column prop="student.sid" label="借阅人学号" width="120" align="center" />
      <el-table-column prop="date" label="借阅时间" width="200" align="center" />
      <el-table-column label="操作" width="200" align="center">
      <template #default="scope">
        <el-button size="small" @click="dialogFormVisible=true"
          >添加</el-button>
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




    <el-dialog v-model="dialogFormVisible" title="添加借阅">
    <el-form :model="submiForm">
      <el-form-item label="书籍名称" :label-width="120" >
        <!-- <el-input v-model="submiForm.title" autocomplete="off" /> -->
      <el-select v-model="submiForm.bid" value-key="bid" placeholder="请选择书籍名称">
      <el-option
        v-for="item in bookList"
        :key="item.bid"
        :label="item.title"
        :value="item.bid"
      />
    </el-select>
      </el-form-item>
      <el-form-item label="借阅人" :label-width="120">
        <!-- <el-input v-model="submiForm.name" autocomplete="off" /> -->
        <el-select v-model="submiForm.sid" value-key="sid" placeholder="请选择借阅人">
      <el-option
        v-for="item in studentList"
        :key="item.sid"
        :label="item.name"
        :value="item.sid"
      />
    </el-select>
      </el-form-item>
      <el-form-item label="借阅日期" :label-width="120">
        <el-date-picker
        v-model="submiForm.date"
        type="date"
        placeholder="选择借阅日期"
        style="width: 100%;"
      />
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
  </template>

<script>
import { getBorrowList,addBorrowInfo,getBookList,getStudentList,deleteBorrowInfo, borrowCount } from "../api/book"
export default{
    
    data(){
        return {
            borrowList:[],
            bookList:[],
            studentList:[],
            dialogFormVisible:false,
            submiForm:{
                sid:null,
                bid:null,
                date:null
            },
            // 当前页码
            currentPage:1,
            // 页面展示条数
            pageSize:5,
            // 总数据条数
            totalSize:10,
            
        }
    },
    methods:{
      // 分页切换
    handleCurrentChange(val){
      this.currentPage = val;
      this.getBorrowData();
    },
    // 页面展示条数切换
    handleSizeChange(val){
      this.pageSize = val;
      this.getBorrowData();
    },
    // 获取用户信息总条数
    getBorrowTotal(){
      borrowCount().then(res=>{
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
        // 获取数据
        getBorrowData(){
            getBorrowList(this.currentPage,this.pageSize).then(res=>{
              if (res.data.code == 0) {
                this.borrowList = res.data.data;
                console.log(this.borrowList);
              }
            }).catch(err=>{
                throw err;
            });
            getBookList(this.currentPage,this.pageSize).then(res=>{
              if (res.data.code == 0) {
               this.bookList = res.data.data;
               console.log(this.bookList);
              }
            }).catch(err=>{
                throw err;
            });
            getStudentList(this.currentPage,this.pageSize).then(res=>{
              if (res.data.code == 0) {
               this.studentList = res.data.data;
               console.log(this.studentList);
              }
            }).catch(err=>{
                throw err;
            });
        },
        // 取消表单提交
        cancelFormSubmit(){
            this.dialogFormVisible=false;
            this.submiForm = {
                sid:null,
                bid:null,
                date:null
            }
            
        },
        // 提交表单
        submitForm(){
          this.dialogFormVisible=false;
          let checkAttribute = (form,props)=>{
            return props.every(prop => form.hasOwnProperty(prop) && form[prop] !== null && form[prop]!== "");  
          }
          let result = checkAttribute(this.submiForm,['sid','bid','date']);
          if(!result){
            this.$message.warning("请检查参数是否输入完整");
            return null;
          }

          addBorrowInfo(this.submiForm).then(res=>{
            if(res.data.data>0){
              this.$message.success("提交成功");
              this.cancelFormSubmit();
              location.reload();
            }else{
              this.$message.error(res.data.message);
        }
          }).catch(err=>{
              throw err;
            })
        },
        // 删除记录
        handleDelete(id){
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
        deleteBorrowInfo(id).then(res=>{
            if(res.data.data>0){
              this.$message.success("删除成功");
              location.reload();
            }else{
              this.$message.error(res.data.message);
        }
          }).catch(err=>{
              throw err;
            })  
      }).catch(()=>{
        this.$message.info("已取消删除")
      });
      }
    },
    created(){
        this.getBorrowData();
        this.getBorrowTotal();
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