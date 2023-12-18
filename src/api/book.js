import requests from "./api";

// 学生列表数据请求获取
export async function getStudentList(pageNum,size){
    return await requests.get("/student/info?pageNum="+pageNum+"&size="+size);
}
//学生列表总数据获取
export async function studentCount(){
    return await requests.get("/student/count");
}

// 学生列表数据添加
export async function addStudentInfo(form){
    return await requests.post("/student/info",{
        sid:form.sid,
        name:form.name,
        sex:form.sex,
        age:form.age,
        speciality:form.speciality
    });
}

// 学生列表数据更新
export async function updateStudentInfo(form){
    return await requests.put("/student/info",{
        sid:form.sid,
        name:form.name,
        sex:form.sex,
        age:form.age,
        speciality:form.speciality
    });
}

// 学生列表数据删除
export async function deleteStudentInfo(sid){
    return await requests.delete("/student/info/"+sid);
}

// 书籍列表数据获取
export async function getBookList(pageNum,size){
    return await requests.get("/book/info?pageNum="+pageNum+"&size="+size);
}

//书籍列表总数据获取
export async function bookCount(){
    return await requests.get("/book/count");
}

// 书籍列表数据添加
export async function addBookInfo(form){
    return await requests.post("/book/info",{
        bid:form.bid,
        title:form.title,
        desc:form.desc,
        coverImage:form.coverImage
    })
}
// 书籍记录更新
export async function updateBookInfo(form){
    return await requests.put("/book/info/",{
        bid:form.bid,
        title:form.title,
        desc:form.desc,
        coverImage:form.coverImage
    });
}

// 书籍记录删除
export async function deleteBookInfo(bid){
    return await requests.delete("/book/info/"+bid);
}


// 借阅列表获取
export async function getBorrowList(pageNum,size){
    return await requests.get("/borrow/info?pageNum="+pageNum+"&size="+size);
}

//借阅列表总数据获取
export async function borrowCount(){
    return await requests.get("/borrow/count");
}

// 借阅记录添加
export async function addBorrowInfo(form){
    return await requests.post("/borrow/info",{
        sid:form.sid,
        bid:form.bid,
        date:form.date
    })
}
// 借阅记录删除
export async function deleteBorrowInfo(id){
    return await requests.delete("/borrow/info/"+id);
}