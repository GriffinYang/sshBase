//全局变量区
/*当前页，总条数，每页显示的条数，总计页数*/
let currentPage=1,totalNum=undefined,number=2,pageNum=0;
/*分页栏的容器*/
const pageContainer= document.getElementById('page-container');
/*选取的记录的id的容器*/
let selectIds=[]
/*规定弹出框所执行的函数，改变其值(引用)以调用不同的方法*/
let confirmTarget;
/*表示当前的搜索是否为常规查询*/
let isNormal=true
/*表示当前是不是分页栏的操作*/
let isBar=false
// 添加事件监听器区域
const addBtn = document.getElementById('add');
// 为添加按钮添加事件跳转至增加页面
addBtn.onclick = (e) => {
  let url="add.html";
// 添加页面直接跳转至空页面
  window.open(url,"_blank");
};
const editBtn = document.getElementById('edit');
// 为修改按钮添加事件跳转至修改页面
editBtn.onclick = (e) => {
  let url;
  const layer=document.getElementById("layer")
  /*清空selectIds数组*/
  selectIds.splice(0,selectIds.length)
  /*遍历所有已选中的内容，并将其id添加至数组中*/
  document.querySelectorAll(".selected").forEach(item=>{
    selectIds.push(item.getAttribute("recordid"))
  })
  /*确保在修改时只选中了一条记录*/
  if(selectIds.length==0){
    confirmTarget=skipFn;
    document.getElementById("log").innerHTML="请选择一条记录!"
    layer.classList.remove("hidden")
    return
  }else if(selectIds.length>1){
    confirmTarget=skipFn;
    document.getElementById("log").innerHTML="一次仅可修改一条记录！"
    layer.classList.remove("hidden")
    return;
  }else url=`edit.html?id=${selectIds[0]}`
  window.open(url,"_blank");
};
const queryBtn=document.getElementById("conditional-query");
currentPage=1;
/*为查询按钮添加查询的事件*/
queryBtn.onclick=()=>{
  currentPage=1
  isNormal=false
  isBar=false
  fetchTable()
}
const resetBtn=document.getElementById("reset-btn")
/*重置所有的条件*/
resetBtn.onclick=()=>{
  isNormal=true
  isBar=false
  document.getElementById("client-name").value=""
  document.getElementById("circumstance").value=""
  document.getElementById("work-type").value=""
  document.getElementById("status").value=""
  document.getElementById("chief").value=""
  document.getElementById("dept-name").value=""
  current_page=1
  fetchTable()
}
const deleteBtn=document.getElementById("delete");
/*为删除按钮添加事件*/
deleteBtn.onclick=()=>{
    const layer=document.getElementById("layer")
    document.getElementById("log").innerHTML="确认删除?"
    layer.classList.remove("hidden")
    document.getElementById("cancel").classList.remove("hidden")
    confirmTarget=deleteRecord;
}
const ok=document.getElementById("ok")
const exportInfo=document.getElementById("export")
/*添加导出按钮的事件*/
exportInfo.addEventListener("click",(event)=>{
  const aEle=document.createElement("a")
  aEle.classList.add("hidden")
  const clientName=document.getElementById("client-name").value
  const circumstance=document.getElementById("circumstance").value
  const workType=document.getElementById("work-type").value
  const status=document.getElementById("status").value
  const chief=document.getElementById("chief").value
  const department=document.getElementById("dept-name").value
  aEle.href=`http://localhost:8080/beta/fetch/export?clientName=${clientName}&circumstance=${circumstance}&workType=${workType}&status=${status}&chief=${chief}&department=${department}`
  const spanEle = document.createElement("span");
  spanEle.textContent="download"
  spanEle.id="download"
  aEle.append(spanEle)
  document.body.append(aEle)
  $('#download').trigger("click");
  $('#download').parent().remove();
})
/*为弹出框的确认添加事件*/
ok.addEventListener("click",(e)=>{
  confirmFn(confirmTarget)
  const layer=document.getElementById("layer")
  layer.classList.add("hidden")
})
const cancelFn=document.getElementById("cancel")
/*为弹出框的取消添加事件*/
cancelFn.addEventListener("click",(e)=>{
  confirmFn(confirmTarget)
  const layer=document.getElementById("layer")
  layer.classList.add("hidden")
  e.target.classList.add("hidden")
})
//实际方法区
/*创建弹出框的中间函数*/
function confirmFn(fn){
  fn()
}
/*创建一个不执行任何操作的跳过函数*/
function skipFn(){

}
/*删除记录*/
function deleteRecord(){
  const del=document.querySelectorAll(".selected")
  if (del.length==0)return
  selectIds.splice(0,selectIds.length)
  del.forEach(item=>{
    selectIds.push(item.getAttribute("recordId"))
  })
  let fetchParam="";
  let deletable=false;
  let targetIds=[];
  let deleteURL;
  new Promise((resolve,reject)=>{
    selectIds.forEach((item,index)=>{
      $.ajax({
        url:`http://localhost:8080/beta/fetch/currentStatus?id=${item}`,
        success:(data)=>{
          if(data.code==200){
            targetIds.push(item)
            if(index==0)fetchParam+=`?ids=${item}`
            else fetchParam+=`&ids=${item}`
            deletable=false;
            isBar=false
            fetchTable()
          }else{
            deletable=true;
          }
          if(index==selectIds.length-1)
          resolve()
        }
      })
    }
    )
  }).then(()=>{
    $.ajax({
      url:`http://localhost:8080/beta/edit/delete${fetchParam}`,
      success:()=>{
        let ids = targetIds
        console.log("ids=>",ids)
        console.log("fetchParam=>",fetchParam)
        del.forEach((item)=>{
          let id=item.getAttribute("recordId")
          if (ids.includes(id)) item.remove()
        })
        if(deletable){
          confirmTarget=skipFn;
          $("#log").text("包含无法删除项(已完成项目)，已跳过！")
          $("#layer").removeClass("hidden")
        }else{
          window.location.reload()
        }
      },
      timeout:5000,
      error:()=>{
        confirmTarget=skipFn;
        $("#log").text("更新失败！服务器异常")
        $("#layer").removeClass("hidden")
      }
    })
  })
}
/*初始化分页栏*/
function initPageBar(current,total,num){
  currentPage=current;
  totalNum=total;
  number=num;
  pageContainer.innerHTML=""
  if (totalNum<=number)pageNum=1;
  else
  pageNum=totalNum%number>0?Math.ceil(totalNum/number):totalNum/number;
  if (total==0)pageNum=0
  // createPager(currentPage,pageNum,pageNum<=3?pageNum:3,pageContainer)
  /*调用自定义的分页插件(pagination.js),*/
  createPageBar(totalNum,2,currentPage,3,pageContainer,async ()=>{
    const data = `http://localhost:8080/beta/fetch/main?from=${current_page}&number=${number}&status=`
    console.log("normal->",isNormal)
    console.log("current->",currentPage)
    if(isNormal)
    return new Promise((resolve, reject)=>{
      $.ajax({
        url: data,
        success: (data) => {
          const records = data.data;
          const tbody = document.querySelector("tbody")
          tbody.innerHTML = ""
          records.forEach(record => {
            totalNum = record.total
            const tr = document.createElement("tr");
            tr.setAttribute("recordId", record.id);
            const selectContainer = document.createElement("td")
            const select = document.createElement("input")
            select.type = "checkBox"
            select.classList.add("select")
            selectContainer.classList.add("text-center")
            selectContainer.append(select)
            tr.append(selectContainer)

            const clientName = document.createElement("td");
            clientName.textContent = record.clientName;
            clientName.classList.add("text-center")
            tr.append(clientName)

            const startTime = document.createElement("td")
            startTime.textContent = record.start;
            startTime.classList.add("text-center")
            tr.append(startTime)

            const endTime = document.createElement("td")
            endTime.textContent = record.end;
            endTime.classList.add("text-center")
            tr.append(endTime);

            const circumstance = document.createElement("td")
            let cirStr = undefined;
            switch (record.circumstance) {
              case 1:
                cirStr = "尽职调查";
                break;
              case 2:
                cirStr = "租期检查";
                break;
              case 3:
                cirStr = "签约现场";
                break;
              case 4:
                cirStr = "投标现场";
                break;
              case 5:
                cirStr = "拍卖现场";
                break;
              case 6:
                cirStr = "其他";
            }
            circumstance.textContent = cirStr
            circumstance.classList.add("text-center")
            tr.append(circumstance)

            let workTypeStr = undefined;
            switch (record.workType) {
              case 1:
                workTypeStr = "项目营销";
                break;
              case 2:
                workTypeStr = "正式尽调";
                break;
              case 3:
                workTypeStr = "权属办理";
                break;
              case 4:
                workTypeStr = "押品办理";
                break;
              case 5:
                workTypeStr = "其他"
            }
            const workType = document.createElement("td")
            workType.textContent = workTypeStr
            workType.classList.add("text-center")
            tr.append(workType)

            const status = document.createElement("td")
            status.textContent = record.status == 0 ? '执行中' : '已完成'
            status.classList.add("text-center")
            tr.append(status)

            const chief = document.createElement("td")
            chief.textContent = record.chief
            chief.classList.add("text-center")
            tr.append(chief)

            const department = document.createElement("td")
            department.textContent = record.department
            department.classList.add("text-center")
            tr.append(department)

            const createDate = document.createElement("td")
            createDate.textContent = record.create
            createDate.classList.add("text-center")
            tr.append(createDate)
            tbody.append(tr)
          })
          const allSelect = document.getElementById("select-all")
          allSelect.onclick = (e) => {
            const status = e.target.checked
            const selectors = document.querySelectorAll(".select")
            selectors.forEach(selector => {
              if (status)
                selector.parentElement.parentElement.classList.add("selected")
              else selector.parentElement.parentElement.classList.remove("selected")
              selector.checked = status
            })
          }
          document.querySelectorAll(".select").forEach(selector => {
            selector.onclick = (e) => {
              if (e.target.checked)
                e.target.parentElement.parentElement.classList.add("selected")
              else
                e.target.parentElement.parentElement.classList.remove("selected")
            }
          })
          resolve('success')
        },
        fail:()=>{
          reject('error')
        }
      })
    })
    else
      fetchTable()
    return new Promise((resolve, reject)=>{
      resolve('success')
    })
  },null)
}
/*初始化方法*/
function initialize(){
  document.getElementById("select-all").checked=false
  $.ajax({
    url:`http://localhost:8080/beta/fetch/main?status=&from=${currentPage}&number=${number}`,
    success:(data)=>{
      const records=data.data;
      records.forEach(record=>{
        if(totalNum==undefined){
          totalNum=record.total
          initPageBar(currentPage,totalNum,number)
        }
        const tr=document.createElement("tr");

        tr.setAttribute("recordId",record.id);
        const selectContainer=document.createElement("td")
        const select=document.createElement("input")
        select.type="checkBox"
        select.classList.add("select")
        selectContainer.classList.add("text-center")
        selectContainer.append(select)
        tr.append(selectContainer)

        const clientName=document.createElement("td");
        clientName.textContent=record.clientName;
        clientName.classList.add("text-center")
        tr.append(clientName)

        const startTime=document.createElement("td")
        startTime.textContent=record.start;
        startTime.classList.add("text-center")
        tr.append(startTime)

        const endTime=document.createElement("td")
        endTime.textContent=record.end;
        endTime.classList.add("text-center")
        tr.append(endTime);

        const circumstance=document.createElement("td")
        let cirStr=undefined;
        switch (record.circumstance) {
          case 1:
            cirStr="尽职调查";
            break;
          case 2:
            cirStr="租期检查";
            break;
          case 3:
            cirStr="签约现场";
            break;
          case 4:
            cirStr="投标现场";
            break;
          case 5:
            cirStr="拍卖现场";
            break;
          case 6:
            cirStr="其他";
        }
        circumstance.textContent=cirStr
        circumstance.classList.add("text-center")
        tr.append(circumstance)

        let workTypeStr=undefined;
        switch (record.workType){
          case 1:
            workTypeStr="项目营销";
            break;
          case 2:
            workTypeStr="正式尽调";
            break;
          case 3:
            workTypeStr="权属办理";
            break;
          case 4:
            workTypeStr="押品办理";
            break;
          case 5:
            workTypeStr="其他"
        }
        const workType=document.createElement("td")
        workType.textContent=workTypeStr
        workType.classList.add("text-center")
        tr.append(workType)

        const status=document.createElement("td")
        status.textContent=record.status==0?'执行中':'已完成'
        status.classList.add("text-center")
        tr.append(status)

        const chief=document.createElement("td")
        chief.textContent=record.chief
        chief.classList.add("text-center")
        tr.append(chief)

        const department=document.createElement("td")
        department.textContent=record.department
        department.classList.add("text-center")
        tr.append(department)

        const createDate=document.createElement("td")
        createDate.textContent=record.create
        createDate.classList.add("text-center")
        tr.append(createDate)
        document.querySelector("tbody").append(tr)
      })
      const allSelect=document.getElementById("select-all")
      allSelect.onclick=(e)=>{
        const status=e.target.checked
        const selectors=document.querySelectorAll(".select")
        selectors.forEach(selector=>{
          console.log("status----->",status)
          if (status)
            selector.parentElement.parentElement.classList.add("selected")
          else selector.parentElement.parentElement.classList.remove("selected")
          selector.checked=status
        })
      }
      document.querySelectorAll(".select").forEach(selector=>{
        selector.onclick=(e)=>{
          if(e.target.checked)
            e.target.parentElement.parentElement.classList.add("selected")
          else
            e.target.parentElement.parentElement.classList.remove("selected")
        }
      })
    },
    timeout:5000,
    error:()=>{
      confirmTarget=skipFn;
      $("#log").text("更新失败！服务器异常")
      $("#layer").removeClass("hidden")
    }

  })
}
/*获取数据*/
function fetchTable(){
  let data;
  const clientName=document.getElementById("client-name").value
  const circumstance=document.getElementById("circumstance").value
  const workType=document.getElementById("work-type").value
  const status=document.getElementById("status").value
  const chief=document.getElementById("chief").value
  const department=document.getElementById("dept-name").value
  data=`http://localhost:8080/beta/fetch/main?from=${current_page}&number=${number}&clientName=${clientName}&circumstance=${circumstance}&workType=${workType}&status=${status}&chief=${chief}&department=${department}`
  $.ajax({
    url:data,
    success:(data)=>{
      const records=data.data;
      const tbody=document.querySelector("tbody")
      tbody.innerHTML=""
      records.forEach((record,index)=>{
        totalNum=record.total
        const tr=document.createElement("tr");
        tr.setAttribute("recordId",record.id);
        const selectContainer=document.createElement("td")
        const select=document.createElement("input")
        select.type="checkBox"
        select.classList.add("select")
        selectContainer.classList.add("text-center")
        selectContainer.append(select)
        tr.append(selectContainer)

        const clientName=document.createElement("td");
        clientName.textContent=record.clientName;
        clientName.classList.add("text-center")
        tr.append(clientName)

        const startTime=document.createElement("td")
        startTime.textContent=record.start;
        startTime.classList.add("text-center")
        tr.append(startTime)

        const endTime=document.createElement("td")
        endTime.textContent=record.end;
        endTime.classList.add("text-center")
        tr.append(endTime);

        const circumstance=document.createElement("td")
        let cirStr=undefined;
        switch (record.circumstance) {
          case 1:
            cirStr="尽职调查";
            break;
          case 2:
            cirStr="租期检查";
            break;
          case 3:
            cirStr="签约现场";
            break;
          case 4:
            cirStr="投标现场";
            break;
          case 5:
            cirStr="拍卖现场";
            break;
          case 6:
            cirStr="其他";
        }
        circumstance.textContent=cirStr
        circumstance.classList.add("text-center")
        tr.append(circumstance)

        let workTypeStr=undefined;
        switch (record.workType){
          case 1:
            workTypeStr="项目营销";
            break;
          case 2:
            workTypeStr="正式尽调";
            break;
          case 3:
            workTypeStr="权属办理";
            break;
          case 4:
            workTypeStr="押品办理";
            break;
          case 5:
            workTypeStr="其他"
        }
        const workType=document.createElement("td")
        workType.textContent=workTypeStr
        workType.classList.add("text-center")
        tr.append(workType)

        const status=document.createElement("td")
        status.textContent=record.status==0?'执行中':'已完成'
        status.classList.add("text-center")
        tr.append(status)

        const chief=document.createElement("td")
        chief.textContent=record.chief
        chief.classList.add("text-center")
        tr.append(chief)

        const department=document.createElement("td")
        department.textContent=record.department
        department.classList.add("text-center")
        tr.append(department)

        const createDate=document.createElement("td")
        createDate.textContent=record.create
        createDate.classList.add("text-center")
        tr.append(createDate)
        tbody.append(tr)
      })
      const allSelect=document.getElementById("select-all")
      allSelect.onclick=(e)=>{
        const status=e.target.checked
        const selectors=document.querySelectorAll(".select")
        selectors.forEach(selector=>{
          if (status)
            selector.parentElement.parentElement.classList.add("selected")
          else selector.parentElement.parentElement.classList.remove("selected")
          selector.checked=status
        })
      }
      document.querySelectorAll(".select").forEach(selector=>{
        selector.onclick=(e)=>{
          if(e.target.checked)
            e.target.parentElement.parentElement.classList.add("selected")
          else
            e.target.parentElement.parentElement.classList.remove("selected")
        }
      })
      // currentPage=1;

      if(records.length==0){
        document.getElementById("page-container").classList.add("hidden")
        document.getElementById("none-data").classList.remove("hidden")
      }else{
        document.getElementById("page-container").classList.remove("hidden")
        document.getElementById("none-data").classList.add("hidden")
      }
      if(!isBar)
      initPageBar(current_page,totalNum,number)
    },
    timeout:5000,
    error:()=>{
      confirmTarget=skipFn;
      $("#log").text("更新失败！服务器异常")
      $("#layer").removeClass("hidden")
    }
  })
}
/*入口函数*/
initialize()