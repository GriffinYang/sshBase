// 配置区
/*返回主页的按钮*/
const home = document.querySelector('.back');
const date=new Date()
/*弹出框的中间变量*/
let confirmTarget;
/*选中的员工元素*/
let staffElement=[];
/*添加返回主页的事件*/
home.onclick = () => {
  window.open('index.html',"_self");
};
/*初始化开始时间*/
$('#begin-time').datepicker({
  format: 'yyyy/mm/dd',
  autoclose: true,
  todayBtn : true,
  startDate:date,
  todayHighlight:true,
  language:'zh-CN'
});
/*初始化结束时间*/
$('#end-time').datepicker({
  format: 'yyyy/mm/dd',
  autoclose: true,
  todayBtn : true,
  startDate: date,
  todayHighlight: true,
  language:'zh-CN'
});
/*添加弹出框取消按钮的事件*/
$("#cancel").click(()=>{
  $("#layer").addClass("hidden")
  $("#cancel").addClass("hidden")
})
/*添加弹出框确认的事件*/
$("#ok").click(()=>{
  $("#layer").addClass("hidden")
  $("#cancel").addClass("hidden")
  return confirmFn(confirmTarget)
})
//全局变量区
/*员工项的模板*/
let contentTemplate=`
        <div class="w-100 d-flex flex-wrap justify-content-start info border-shadow position-relative staff" id="staff-info">
          <input type="checkbox" class="check-info position-absolute" />
<!--        类型-->
        <div class="staffs pt-4 w-50">
          <div class="form-group row d-flex justify-content-center star-container">
            <label for="staff-type" class="col-2">类型</label>
            <span
                    style="
              color: red;
              font-size: larger;
              font-weight: bolder;
              position: absolute;
              left: 33%;
            "
            >*</span>
            <div class="col-6">
              <select name="staff-type" id="staff-type" class="form-control staff-type">
                <option value="">请选择</option>
                <option value="1">我司人员</option>
                <option value="2">分行人员</option>
                <option value="3">客户人员</option>
                <option value="4">其他</option>
              </select>
            </div>
          </div>
        </div>
<!--        姓名-->
        <div class="staffs pt-4 w-50">
          <div class="form-group row d-flex justify-content-center">
            <label for="staff-name" class="col-2">姓名</label>
            <div class="col-6">
              <input
                name="staff-name"
                id="staff-name"
                class="form-control bg-light"
                type="text"
              />
            </div>
          </div>
        </div>
<!--        调查身份-->
        <div class="identity pt-4 w-50 hidden">
          <div class="form-group row star-container d-flex justify-content-center">
            <label for="identity" class="col-2">调查身份</label>
            <span
                    style="
              color: red;
              font-size: larger;
              font-weight: bolder;
              position: absolute;
              left: 33%;
            "
            >*</span>
            <div class="col-6">
              <select id="staff-identity"  class="form-control bg-light" name="identity">
                <option value="">请选择</option>
                <option value="1">第一调查人</option>
                <option value="2">第二调查人</option>
                <option value="3">其他调查人</option>
              </select>
            </div>
          </div>
        </div>
<!--        部门-->
        <div class="department pt-4 w-50 hidden">
          <div class="form-group row d-flex justify-content-center">
            <label for="department" class="col-2">部门</label>
            <div class="col-6">
              <input
                      name="department"
                      id="department"
                      class="form-control bg-light"
                      type="text"
              />
            </div>
          </div>
        </div>
<!--        机构名称-->
        <div class="org-name-container pt-4 w-50 hidden">
          <div class="form-group row d-flex justify-content-center">
            <label for="org-name" class="col-2">机构名称</label>
            <div class="col-6 input-container">
              <input
                      name="org-name"
                      class="form-control bg-light org-name"
                      type="text"
                      id="org-name"
              />
              <select
                      name="company-branch"
                      class="form-control bg-light branch"
                      id="company-branch">
                <option value="">请选择</option>
                <option value="1">北京分部</option>
                <option value="2">深圳分部</option>
                <option value="3">上海分部</option>
              </select>
            </div>
          </div>
        </div>
<!--        职务-->
        <div class="post pt-4 w-50 hidden">
          <div class="form-group row d-flex justify-content-center">
            <label for="post" class="col-2">职务</label>
            <div class="col-6">
              <input
                      name="post"
                      id="post"
                      class="form-control bg-light"
                      type="text"
              />
            </div>
          </div>
        </div>
<!--        联系方式-->
        <div class="contact pt-4 w-50 hidden">
          <div class="form-group row d-flex justify-content-center">
            <label for="contact" class="col-2">联系方式</label>
            <div class="col-6">
              <input
                      name="contact"
                      id="contact"
                      class="form-control bg-light"
                      type="text"
              />
            </div>
          </div>
        </div>
`
/*目标的员工对象*/
let targetObj={mainInfo:undefined,staffInfo:[]};
/*获取当前所修改的主表的id*/
let targetId=window.location.href.trim().split("=")[1]?window.location.href.trim().split("=")[1]:-1;
/*开始日期*/
let beginDateTime=undefined;
/*结束日期*/
let endDateTime=undefined;
/*滚动事件的次数*/
let scrollNum=1;
// 事件绑定区
/*入口函数*/
$(function (){
  /*清空按钮*/
  $("#clear-name").click((e)=>{
    e.target.previousElementSibling.previousElementSibling.value=""
  })
  /*为可选按钮添加事件*/
  $("#client-name").change((e)=>{
    if(e.target.value.trim()!="")
      e.target.classList.remove("data-error")
  })
  $("#nickname").change((e)=>{
    if(e.target.value.trim()!="")
      e.target.classList.remove("data-error")
  })
  $("#project-work-type").change((e)=>{
    if(e.target.value.trim()!="")
      e.target.classList.remove("data-error")
  })
  $("#circumstance").change((e)=>{
    if(e.target.value.trim()!="")
      e.target.classList.remove("data-error")
  })
  /*为开始日期添加事件*/
  $("#begin-time").change((e)=>{
    const begin=$(e.target)
    beginDateTime= new Date(begin.val());
    $("#end-time").val(parseDate(beginDateTime))
    if($("#end-time").val()!=""){
      confirmTarget=skipFn;
      $("#log").text("已将结束日期设置为开始日期")
      $("#layer").removeClass("hidden")
    }
  })
  /*为结束时间添加事件*/
  $('#end-time').change((e)=>{
    const end=$(e.target);
    endDateTime= new Date(end.val());
    if(beginDateTime==undefined) return;
    if (endDateTime.getTime()<beginDateTime.getTime()){
      end.addClass("data-error")
      confirmTarget=skipFn;
      $("#log").text("结束日期应当大于等于起始日期")
      $("#layer").removeClass("hidden")
    }
    else end.removeClass("data-error")
  })
  $("#start-time-btn").click((e)=>{
    $(e.currentTarget).prev().trigger("select")
  })
  $("#end-time-btn").click((e)=>{
    $(e.currentTarget).prev().trigger("select")
  })
  /*获取主表和从表的全部数据*/
  $.ajax({
    url:`http://localhost:8080/beta/fetch/fetchCombine?id=${targetId}`,
    success:(resp)=>{
      const data=resp.data
      $("#client-name").change((e)=>{
        const value=$(e.target).val()
        if(value.trim()=="")$(e.target).addClass("data-error")
        else $(e.target).removeClass("data-error")
      })
      $("#nickname").change((e)=>{
        const value=$(e.target).val()
        if(value.trim()=="")$(e.target).addClass("data-error")
        else $(e.target).removeClass("data-error")
      })
      $("#circumstance").change((e)=>{
        const value=$(e.target).val()
        if(value.trim()=="")$(e.target).addClass("data-error")
        else $(e.target).removeClass("data-error")
      })
      $("#project-work-type").change((e)=>{
        const value=$(e.target).val()
        if(value.trim()=="")$(e.target).addClass("data-error")
        else $(e.target).removeClass("data-error")
      })
      if (targetId==-1)return
      targetObj.mainInfo=data[0][0];
      data.forEach(staff=>{
        targetObj.staffInfo.push(staff[1])
      })
      $("#client-name").val(targetObj.mainInfo.clientName)
      $("#nickname").val(targetObj.mainInfo.nickName)
      $("#project-name").val(targetObj.mainInfo.projectName)
      $("#circumstance").val(targetObj.mainInfo.circumstance)
      $("#project-work-type").val(targetObj.mainInfo.workType)
      $("#address").val(targetObj.mainInfo.address)
      $("#begin-time").val(parseDate(targetObj.mainInfo.startTime))
      beginDateTime=new Date(parseDate(targetObj.mainInfo.startTime))
      $("#end-time").val(parseDate(targetObj.mainInfo.endTime))
      $("#description").val(targetObj.mainInfo.description)
      $("#target").val(targetObj.mainInfo.purpose)
      $("#content").val(targetObj.mainInfo.content)
      $("#result").val(targetObj.mainInfo.result)
      $("#department").val(targetObj.mainInfo.department)
      $("#status").val(targetObj.mainInfo.status)
      $("#chief").val(targetObj.mainInfo.chief)
      targetObj.staffInfo.forEach(item=>{
        const ele=$(contentTemplate)
        if (item==null)return
        const value=item.staffType
        ele.attr("staffid",item.staffId)
        ele.find("#staff-type").val(item.staffType)
        ele.find("#staff-name").val(item.staffName)
        ele.find("#identity").val(item.identity)
        ele.find("#staff-identity").val(item.identity)
        ele.find("#department").val(item.staff_dept)
        ele.find("#org-name").val(item.orgName)
        ele.find("#company-branch").val(item.orgName)
        ele.find("#post").val(item.post)
        ele.find("#contact").val(item.contact)
        ele.find("#identity").change((e)=>{
          const value=$(e.target).val()
          if(value.trim()=="")$(e.target).addClass("data-error")
          else $(e.target).removeClass("data-error")
        })
        ele.find("#staff-type").change((e)=>{
          const value=$(e.target).val()
          if(value.trim()=="")$(e.target).addClass("data-error")
          else $(e.target).removeClass("data-error")
        })
        if(value=="1"){
          ele.find(".identity").removeClass("hidden")
          ele.find(".department").removeClass("hidden")
          ele.find(".org-name-container").addClass("hidden")
          ele.find(".org-name").addClass("hidden")
          ele.find(".post").addClass("hidden")
          ele.find(".contact").addClass("hidden")
          ele.find(".branch").addClass("hidden")
        }else if(value=="2"){
          ele.find(".identity").addClass("hidden")
          ele.find(".department").addClass("hidden")
          ele.find(".org-name-container").removeClass("hidden")
          ele.find(".org-name").addClass("hidden")
          ele.find(".post").removeClass("hidden")
          ele.find(".contact").removeClass("hidden")
          ele.find(".branch").removeClass("hidden")
        }else if(value==""){
          ele.find(".identity").addClass("hidden")
          ele.find(".department").addClass("hidden")
          ele.find(".org-name-container").addClass("hidden")
          ele.find(".org-name").addClass("hidden")
          ele.find(".post").addClass("hidden")
          ele.find(".contact").addClass("hidden")
          ele.find(".branch").addClass("hidden")
        }else{
          ele.find(".identity").addClass("hidden")
          ele.find(".department").addClass("hidden")
          ele.find(".org-name-container").removeClass("hidden")
          ele.find(".org-name").removeClass("hidden")
          ele.find(".post").removeClass("hidden")
          ele.find(".contact").removeClass("hidden")
          ele.find(".branch").addClass("hidden")
        }
        $(".add-info").append(ele)
        ele.find(".check-info").change(e=>{
          const status=e.target.checked
          if(status)
            $(e.target).closest("#staff-info").addClass("selected")
          else $(e.target).closest("#staff-info").removeClass("selected")
        })
        $(".staff-type").change((e)=>{
          const value=e.target.value
          const parent=$(e.target).closest("#staff-info")
          if(value=="1"){
            $(parent).children(".identity").removeClass("hidden")
            $(parent).children(".department").removeClass("hidden")
            $(parent).children(".org-name-container").addClass("hidden")
            $(parent).find(".org-name").addClass("hidden")
            $(parent).children(".post").addClass("hidden")
            $(parent).children(".contact").addClass("hidden")
            $(parent).find(".branch").addClass("hidden")
          }else if(value=="2"){
            $(parent).children(".identity").addClass("hidden")
            $(parent).children(".department").addClass("hidden")
            $(parent).children(".org-name-container").removeClass("hidden")
            $(parent).find(".org-name").addClass("hidden")
            $(parent).children(".post").removeClass("hidden")
            $(parent).children(".contact").removeClass("hidden")
            $(parent).find(".branch").removeClass("hidden")
          }else if(value==""){
            $(parent).children(".identity").addClass("hidden")
            $(parent).children(".department").addClass("hidden")
            $(parent).children(".org-name-container").addClass("hidden")
            $(parent).find(".org-name").addClass("hidden")
            $(parent).children(".post").addClass("hidden")
            $(parent).children(".contact").addClass("hidden")
            $(parent).find(".branch").addClass("hidden")
          }else{
            $(parent).children(".identity").addClass("hidden")
            $(parent).children(".department").addClass("hidden")
            $(parent).children(".org-name-container").removeClass("hidden")
            $(parent).find(".org-name").removeClass("hidden")
            $(parent).children(".post").removeClass("hidden")
            $(parent).children(".contact").removeClass("hidden")
            $(parent).find(".branch").addClass("hidden")
          }
        })
      })
    },
    timeout:5000,
    error:()=>{
      confirmTarget=skipFn;
      $("#log").text("服务器异常!")
      $("#layer").removeClass("hidden")
      return
    }
  })
  /*为添加员工添加事件*/
  $("#add-info").click(()=>{
      $.ajax({
        url:`http://localhost:8080/beta/fetch/currentStatus?id=${targetId}`,
        success:(data)=>{
          if(data.code==200){
            const length=document.querySelectorAll("#staff-info").length
            if(length==5){
              $("#add-info").addClass("disabled")
              confirmTarget=skipFn;
              $("#log").text("至多添加五个成员")
              $("#layer").removeClass("hidden")
              return
            }else $("#add-info").removeClass("disabled")
            const ele=$(contentTemplate)
            ele.attr("staffid","emptyId")
            window.scrollTo(0,190*scrollNum)
            scrollNum++
            $(".add-info").append(ele)

            ele.find("#identity").change((e)=>{
              const value=$(e.target).val()
              if(value.trim()=="")$(e.target).addClass("data-error")
              else $(e.target).removeClass("data-error")
            })
            ele.find("#staff-type").change((e)=>{
              const value=$(e.target).val()
              if(value.trim()=="")$(e.target).addClass("data-error")
              else $(e.target).removeClass("data-error")
            })

            $(".staff-type").change((e)=>{
              const value=e.target.value
              const parent=$(e.target).closest("#staff-info")
              if(value=="1"){
                $(parent).children(".identity").removeClass("hidden")
                $(parent).children(".department").removeClass("hidden")
                $(parent).children(".org-name-container").addClass("hidden")
                $(parent).find(".org-name").addClass("hidden")
                $(parent).children(".post").addClass("hidden")
                $(parent).children(".contact").addClass("hidden")
                $(parent).find(".branch").addClass("hidden")
              }else if(value=="2"){
                $(parent).children(".identity").addClass("hidden")
                $(parent).children(".department").addClass("hidden")
                $(parent).children(".org-name-container").removeClass("hidden")
                $(parent).find(".org-name").addClass("hidden")
                $(parent).children(".post").removeClass("hidden")
                $(parent).children(".contact").removeClass("hidden")
                $(parent).find(".branch").removeClass("hidden")
              }else if(value==""){
                $(parent).children(".identity").addClass("hidden")
                $(parent).children(".department").addClass("hidden")
                $(parent).children(".org-name-container").addClass("hidden")
                $(parent).find(".org-name").addClass("hidden")
                $(parent).children(".post").addClass("hidden")
                $(parent).children(".contact").addClass("hidden")
                $(parent).find(".branch").addClass("hidden")
              }else{
                $(parent).children(".identity").addClass("hidden")
                $(parent).children(".department").addClass("hidden")
                $(parent).children(".org-name-container").removeClass("hidden")
                $(parent).find(".org-name").removeClass("hidden")
                $(parent).children(".post").removeClass("hidden")
                $(parent).children(".contact").removeClass("hidden")
                $(parent).find(".branch").addClass("hidden")
              }
            })
            $(".check-info").change(e=>{
              const status=e.target.checked
              if(status)
                $(e.target).closest("#staff-info").addClass("selected")
              else $(e.target).closest("#staff-info").removeClass("selected")
            })
          }else{
            confirmTarget=skipFn;
            $("#log").text("已完成状态的现场办公数据不可编辑或删除!")
            $("#layer").removeClass("hidden")
            return
          }
        },
        timeout:5000,
        error:()=>{
          confirmTarget=skipFn;
          $("#log").text("服务器异常!")
          $("#layer").removeClass("hidden")
          return
        }
      })
  })
  /*为删除员工添加事件*/
  $("#delete-info").click(()=> {
    if(scrollNum!=1)
    scrollNum--
    $.ajax({
      url:`http://localhost:8080/beta/fetch/currentStatus?id=${targetId}`,
      success:(data)=>{
        if(data.code==200){
          $(".selected").each((idx,item)=>{
            const id=$(item).attr("staffid")
            staffElement.push({id:id,obj:item})
            console.log("pushed==>",{id:id,obj:item})
          })
          if(staffElement.length>0){
            confirmTarget=removeStaff
            $("#log").text("确定删除？")
            $("#layer").removeClass("hidden")
            $("#cancel").removeClass("hidden")
          }else{
            confirmTarget=skipFn
            $("#log").text("未选中成员！")
            $("#layer").removeClass("hidden")
          }
        }else{
          confirmTarget=skipFn;
          $("#log").text("已完成状态的现场办公数据不可编辑或删除!")
          $("#layer").removeClass("hidden")
          return
        }
      }
    });
  })
  /*为保存按钮添加事件*/
  $("#saveBtn").click(()=>{
    $.ajax({
      url:`http://localhost:8080/beta/fetch/currentStatus?id=${targetId}`,
      success:(data)=>{
        if(data.code==200){
          confirmTarget=saveAll;
          $("#log").text("确定保存?")
          $("#layer").removeClass("hidden")
          $("#cancel").removeClass("hidden")
        }else{
          confirmTarget=skipFn;
          $("#log").text("已完成状态的现场办公数据不可编辑或删除!")
          $("#layer").removeClass("hidden")
          return
        }
      }
    });
  })
})

//方法区
/*封装的日期格式转换的方法*/
function parseDate(date){
  return `${new Date(date).getFullYear()}/${new Date(date).getMonth()+1}/${new Date(date).getDate()}`
}
/*刷新当前页面*/
function refreshPage(){
  window.open(`edit.html?id=${targetId}`,"_self")
}
/*当前的idx*/
let curI;
/*选取的员工数组的长度*/
let staffLength;
/*更新主表*/
function updateMain(main){
  $.ajax({
    type: 'post',
    url: "http://localhost:8080/beta/edit/updateMain",
    data:{
      "id":targetId,
      "circumstance":main.find("#circumstance").val(),
      "workType":main.find("#project-work-type").val(),
      "address":main.find("#address").val(),
      "start_time":parseDate(new Date(main.find("#begin-time").val())),
      "end_time":parseDate(new Date(main.find("#end-time").val())),
      "description":main.find("#description").val(),
      "clientName":main.find("#client-name").val(),
      "nickName":main.find("#nickname").val(),
      "projectName":main.find("#project-name").val(),
      "department":main.find("#department").val(),
      "status":main.find("#status").val(),
      "chief":main.find("#chief").val(),
      "purpose":$("#target").val(),
      "content":$("#content").val(),
      "result":$("#result").val(),
    },
    success:(data)=>{
      targetId=data.data
      curI=0;
      staffLength=document.querySelectorAll(".staff").length
      iterateFn(new Promise((resolve,reject)=>{
        resolve('success')
      }),staffLength)
    },
  });
}
/*将异步请求依序发送*/
function iterateFn(fn,len) {
  if (curI < staffLength)
    fn.then((data) => {
      setTimeout(iterateFn(
          new Promise((resolve, reject) => {
            let element = document.querySelectorAll(".staff");
            const id=element[curI].getAttribute("staffid")
            const staff=$(element[curI])
            const order=generateOrder()
            $.ajax({
              type: 'post',
              url: "http://localhost:8080/beta/edit/updateStaff",
              data:{
                "staffId":id,
                "key":targetId,
                "staffType":staff.find("#staff-type").val(),
                "staffName":staff.find("#staff-name").val(),
                "identity":staff.find("#staff-identity").val(),
                "post":staff.find("#post").val(),
                "contact":staff.find("#contact").val(),
                "orgName": staff.find("#staff-type").val()!="2"?staff.find("#org-name").val():staff.find("#company-branch").val(),
                "staff_dept":staff.find("#department").val(),
                "order":order
              },
              success:(data)=>{
                if(data.code==200){
                  if(curI==len-1){
                    confirmTarget=refreshPage;
                    $("#log").text("更新成功！")
                    $("#layer").removeClass("hidden")
                  }
                }
                curI++;
                resolve('success')
              },
            });
          }),len
      ),200);
    }).catch((data) => {});
}
/*弹出框的中间函数*/
function confirmFn(fn,param){
  return fn(param)
}
/*定义不执行任何操作的跳过函数*/
function skipFn() {

}
/*检查data是否为空值*/
function assessData(){
  let clientName = $("#client-name").val();
  let nickName=$("#nickname").val();
  let circumstance=$("#circumstance").val();
  let workType=$("#project-work-type").val();
  if (clientName.trim()=="")$("#client-name").addClass("data-error")
  else $("#client-name").removeClass("data-error")
  if (nickName.trim()=="")$("#nickname").addClass("data-error")
  else $("#nickname").removeClass("data-error")
  if (circumstance.trim()=="")$("#circumstance").addClass("data-error")
  else $("#circumstance").removeClass("data-error")
  if (workType.trim()=="")$("#project-work-type").addClass("data-error")
  else $("#project-work-type").removeClass("data-error")
  $(".staff-type").each((index,item)=>{
    if($(item).val().trim()==""){
      $(item).addClass("data-error")
    }else{
      if($(item).val().trim()=="我司员工"){
        const ele=$(item).closest("#staff-info").find("#staff-identity")
        if (ele.val().trim()=="")ele.addClass("data-error")
        else ele.removeClass("data-error")
      }
    }
  })
  let length = $(".data-error").length;
  if (length>0){
    return false;
  }
  return true;
}
/*溢出员工*/
function removeStaff(){
  $("#add-info").removeClass("disabled")
  staffElement.forEach(item=>{
    if(item.id=="emptyId"){
      item.obj.remove()
      return
    }
    $.ajax({
      url:`http://localhost:8080/beta/edit/deleteStaff?id=${item.id}`,
      success:(data)=>{
        if(data.code==200){
          item.obj.remove()
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
/*保存数据*/
function saveAll(){
  if (assessData()) {
    if(!$("#baseInfo").find("#begin-time").val()||!$("#baseInfo").find("#end-time").val())
    {
      confirmTarget=skipFn;
      $("#log").text("请指定开始和结束日期！")
      $("#layer").removeClass("hidden")
      return
    }
    updateMain($("#baseInfo"))
  }
  else{
    confirmTarget=skipFn;
    $("#log").text("请保证表单数据正常！")
    $("#layer").removeClass("hidden")
  }
}
/*生成顺序(依据事件戳）*/
function generateOrder(){
  return new Date().getTime()
}
