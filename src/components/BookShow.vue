

<template>
    <el-table :data="bookList" style="width: 100%" height="auto">
    <el-table-column  fixed prop="coverImage" label="书籍封面" width="200" align="center">
      <template #default="scope">
        <div style="display: flex; align-items: center; justify-content: center;" >
            <el-image  class="headSculpture" preview-teleported :src="scope.row.coverImage" :preview-src-list="srcList">
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
      <el-table-column  prop="bid" label="书籍编号" width="200" align="center" />
      <el-table-column prop="title" label="书籍标题" width="200" align="center" />
      <el-table-column prop="desc" label="书籍简介" width="200" align="center" />
      <el-table-column label="操作" width="200" align="center">
      <template #default="scope">
        <el-button size="small" @click="dialogFormVisible=true"
          >添加</el-button>
          <el-button size="small" @click="editBookForm(scope.row)"
          >编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.bid)"
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


    <el-dialog v-model="dialogFormVisible" title="新增书籍">
    <el-form :model="formData">
      <el-form-item label="书籍标题" :label-width="auto" >
        <el-input v-model="formData.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="书籍简介" :label-width="auto">
        <el-input v-model="formData.desc" autocomplete="off" />
      </el-form-item>
      <el-form-item label="书籍封面链接" :label-width="auto">
        <el-input v-model="formData.coverImage" autocomplete="off" />
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

  <el-dialog v-model="dialogFormEditVisible" title="修改书籍">
    <el-form :model="formData">
      <el-form-item label="书籍标题" :label-width="120" >
        <el-input v-model="formData.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="书籍简介" :label-width="120">
        <el-input v-model="formData.desc" autocomplete="off" />
      </el-form-item>
      <el-form-item label="书籍封面链接" :label-width="120">
        <el-input v-model="formData.coverImage" autocomplete="off" />
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
import { getBookList,addBookInfo,deleteBookInfo,updateBookInfo,bookCount } from "../api/book"

export default{
  data: () => ({
    dialogFormVisible:false,
    dialogFormEditVisible:false,
    formData:{
      bid:null,
      title:null,
      desc:null,
      coverImage:null
    },
    bookList: [],
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
      this.getBookData();
    },
    // 页面展示条数切换
    handleSizeChange(val){
      this.pageSize = val;
      this.getBookData();
    },
    // 获取用户信息总条数
    getBookTotal(){
      bookCount().then(res=>{
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
    // 获取书籍数据
    getBookData(){
        getBookList(this.currentPage,this.pageSize).then(res=>{
          if(res.data.code == 0){
            this.bookList = res.data.data;
            this.srcList = this.bookList.map(item => item.coverImage);
            console.log(this.bookList);
          }
      
    }).catch(error=>{
      throw error;
    });},
    // 取消提交
    cancelFormSubmit(){
      this.dialogFormVisible=false;
      this.dialogFormEditVisible=false;
      this.formData={
        bid:null,
        title:null,
        desc:null,
        coverImage:null
      }
    },
    // 提交新增表单数据
    submitForm(){
      let checkAttribute = (form,props)=>{
            return props.every(prop => form.hasOwnProperty(prop) && form[prop] !== null && form[prop]!== "");  
          }
      let result = checkAttribute(this.formData,['desc','title','coverImage']);
      if(!result){
            this.$message.warning("请检查参数是否输入完整");
            return null;
          }
      addBookInfo(this.formData).then(res=>{
        if(res.data.data>0){
          this.$message.success("书籍添加成功");
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
    handleDelete(bid){
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
        deleteBookInfo(bid).then(res=>{
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
    },
    // 编辑书籍对话框设置
    editBookForm(book){
      this.formData.bid = book.bid;
      this.formData.title = book.title;
      this.formData.desc = book.desc;
      this.formData.coverImage = book.coverImage;
      this.dialogFormEditVisible=true;
    },
    // 提交更新表单
    submitEditForm(){
      let checkAttribute = (form,props)=>{
            return props.every(prop => form.hasOwnProperty(prop) && form[prop] !== null && form[prop]!== "");  
          }
      let result = checkAttribute(this.formData,['desc','title','coverImage',"bid"]);
      if(!result){
            this.$message.warning("请检查参数是否输入完整");
            return null;
          }
          updateBookInfo(this.formData).then(res=>{
            if(res.data.data>0){
              this.$message.success("更新成功");
              this.cancelFormSubmit();
              location.reload();
            }else{
              this.$message.error(res.data.message);
            }
          }).catch(err=>{
              throw err;
            })
    }
    
  },
  created(){
    this.getBookData();
    this.getBookTotal();
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
  