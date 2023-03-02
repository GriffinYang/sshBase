//全局变量区
let currentPage=1,totalNum=undefined,number=10,pageNum=0;
const pageContainer= document.getElementById('page-container');
let selectIds=[]
let confirmTarget;
// 添加事件监听器区域
const addBtn = document.getElementById('add');
addBtn.onclick = (e) => {
  let url="edit.html";
  window.open(url,"_self");
};
const editBtn = document.getElementById('edit');
editBtn.onclick = (e) => {
  let url;
  const layer=document.getElementById("layer")
  selectIds.splice(0,selectIds.length)
  document.querySelectorAll(".selected").forEach(item=>{
    selectIds.push(item.getAttribute("recordid"))
  })
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
  window.open(url,"_self");
};
const queryBtn=document.getElementById("conditional-query");
queryBtn.onclick=()=>{
  fetchTable()
}
const resetBtn=document.getElementById("reset-btn")
resetBtn.onclick=()=>{
  document.getElementById("client-name").value=""
  document.getElementById("circumstance").value=""
  document.getElementById("work-type").value=""
  document.getElementById("status").value=""
  document.getElementById("chief").value=""
  document.getElementById("dept-name").value=""
}
const deleteBtn=document.getElementById("delete");
deleteBtn.onclick=()=>{
    const layer=document.getElementById("layer")
    document.getElementById("log").innerHTML="确认删除?"
    layer.classList.remove("hidden")
    confirmTarget=deleteRecord;
}
const ok=document.getElementById("ok")
ok.addEventListener("click",(e)=>{
  confirmFn(confirmTarget)
  const layer=document.getElementById("layer")
  layer.classList.add("hidden")
})
const cancelFn=document.getElementById("cancel")
cancelFn.addEventListener("click",(e)=>{
  confirmFn(confirmTarget)
  const layer=document.getElementById("layer")
  layer.classList.add("hidden")
})
//实际方法区
function confirmFn(fn){
  fn()
}
function skipFn(){

}
function deleteRecord(){
  const del=document.querySelectorAll(".selected")
  console.log(del)
  if (del.length==0)return
  selectIds.splice(0,selectIds.length)
  del.forEach(item=>{
    selectIds.push(item.getAttribute("recordId"))
  })
  let fetchParam="";
  selectIds.forEach((item,index)=>{
    if(index==0)fetchParam+=`?ids=${item}`
    else fetchParam+=`&ids=${item}`
  })
  $.ajax({
    url:`http://localhost:8080/beta/edit/delete${fetchParam}`,
    success:()=>{
      initialize()
    }
  })
}
function initPageBar(current,total,num){
  currentPage=current;
  totalNum=total;
  number=num;
  pageContainer.innerHTML=""
  if (totalNum<=number)pageNum=1;
  else
  pageNum=totalNum/number>1?Math.floor(totalNum/number)+1:Math.floor(totalNum/number);
  createPager(currentPage,pageNum,pageNum<=5?pageNum:5,pageContainer)
}
function initialize(){
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
        circumstance.textContent=record.circumstance
        circumstance.classList.add("text-center")
        tr.append(circumstance)

        const workType=document.createElement("td")
        workType.textContent=record.workType
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
    }

  })
}
initialize()
function fetchTable(){
  let data;
  const clientName=document.getElementById("client-name").value
  const circumstance=document.getElementById("circumstance").value
  const workType=document.getElementById("work-type").value
  const status=document.getElementById("status").value
  const chief=document.getElementById("chief").value
  const department=document.getElementById("dept-name").value
  data=`http://localhost:8080/beta/fetch/main?from=${currentPage}&number=${number}&clientName=${clientName}&circumstance=${circumstance}&workType=${workType}&status=${status}&chief=${chief}&department=${department}`
  $.ajax({
    url:data,
    success:(data)=>{
      const records=data.data;
      const tbody=document.querySelector("tbody")
      tbody.innerHTML=""
      records.forEach(record=>{
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
        circumstance.textContent=record.circumstance
        circumstance.classList.add("text-center")
        tr.append(circumstance)

        const workType=document.createElement("td")
        workType.textContent=record.workType
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
    }
  })
}
function createPager(pager, pagerNumber, middlePager, container) {
  // 清空
  container.innerText = '';
  var divpager = document.createElement('div');
  pager.className = 'pager';
  /*
   * className:样式类
   * text:中间的显示文本
   * newPager: 点击后跳转到哪一页
   */
  function createAnchor(className, text, newPager) {
    var a = document.createElement('a');
    a.className = className;
    a.classList.add("btn")
    a.classList.add("page-btn")
    a.innerText = text;
    divpager.appendChild(a);
    a.onclick = function() {
      // 做相应的三种情况的判断
      if (newPager < 1 || newPager > pagerNumber || newPager === pager) {
        return;
      }
      createPager(newPager, pagerNumber, middlePager, container);
    }
  }
  // 首页和上一页
  if (pager === 1) {
    createAnchor('disabled', '首页', 1)
    createAnchor('disabled', '上一页', pager - 1)
  } else {
    createAnchor('', '首页', 1)
    createAnchor('', '上一页', pager - 1)
  }
  // 中间的数字
  var min = Math.floor(pager - middlePager / 2);
  if (min < 1) {
    min = 1;
  }
  var max = min + middlePager - 1;
  if (max > pagerNumber) {
    max = pagerNumber;
  }
  for (var i = min; i <= max; i++) {
    if (i === pager) {
      createAnchor('active', i, i);
    } else {
      createAnchor('', i, i);
    }
  }
  // 下一页和尾页
  if (pager === pagerNumber) {
    createAnchor('disabled', '下一页', pager + 1)
    createAnchor('disabled', '尾页', pagerNumber);
  } else {
    createAnchor('', '下一页', pager + 1)
    createAnchor('', '尾页', pagerNumber);
  }
  // 当前页
  var span = document.createElement('span');
  span.innerText = pager + "/" + pagerNumber;
  divpager.appendChild(span);
  // 添加进容器中
  container.appendChild(divpager);
  currentPage=pager
  const pageChangers=document.querySelectorAll(".page-btn")
  pageChangers.forEach(changer=>{
    changer.addEventListener("click",()=>{
      const data=`http://localhost:8080/beta/fetch/main?from=${currentPage}&number=${number}&status=`
      $.ajax({
        url:data,
        success:(data)=>{
          const records=data.data;
          const tbody=document.querySelector("tbody")
          tbody.innerHTML=""
          records.forEach(record=>{
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
            circumstance.textContent=record.circumstance
            circumstance.classList.add("text-center")
            tr.append(circumstance)

            const workType=document.createElement("td")
            workType.textContent=record.workType
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
        }
      })
    })
  })
}
