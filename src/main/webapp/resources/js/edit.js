// 配置区
const home = document.querySelector('.back');
const date=new Date()
home.onclick = () => {
  window.open('index.html',"_self");
};
$('#begin-time').datepicker({
  format: 'yyyy/mm/dd',
  autoclose: true,
  todayBtn : true,
  startDate:date,
  todayHighlight:true
});
$('#end-time').datepicker({
  format: 'yyyy/mm/dd',
  autoclose: true,
  todayBtn : true,
  startDate: date,
  todayHighlight: true
});

//全局变量区
let contentTemplate=`
        <div class="w-100 d-flex flex-wrap justify-content-start info border-shadow position-relative" id="staff-info">
          <input type="checkbox" class="check-info position-absolute" />
<!--        类型-->
        <div class="staffs pt-4 w-50">
          <div class="form-group row d-flex justify-content-center">
            <label for="staff-type" class="col-2">类型</label>
            <div class="col-6">
              <select name="staff-type" id="staff-type" class="form-control staff-type">
                <option value="">请选择</option>
                <option value="我司员工">我司人员</option>
                <option value="分行人员">分行人员</option>
                <option value="客户人员">客户人员</option>
                <option value="其他">其他</option>
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
              <select id="identity"  class="form-control bg-light" name="identity">
                <option value="">请选择</option>
                <option value="第一调查人">第一调查人</option>
                <option value="第一调查人">第二调查人</option>
                <option value="第一调查人">其他调查人</option>
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
                <option value="北京分部">北京分部</option>
                <option value="深圳分部">深圳分部</option>
                <option value="上海分部">上海分部</option>
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
let targetObj={mainInfo:undefined,staffInfo:[]};
const targetId=window.location.href.trim().split("=")[1]
// 事件绑定区
$(function (){
  $("#start-time-btn").click((e)=>{
    $(e.currentTarget).prev().trigger("select")
  })
  $("#end-time-btn").click((e)=>{
    $(e.currentTarget).prev().trigger("select")
  })
  $.ajax({
    url:`http://localhost:8080/beta/fetch/fetchCombine?id=${targetId}`,
    success:(resp)=>{
      const data=resp.data
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
      $("#end-time").val(parseDate(targetObj.mainInfo.endTime))
      $("#description").val(targetObj.mainInfo.description)
      $("#target").val(targetObj.mainInfo.purpose)
      $("#content").val(targetObj.mainInfo.content)
      $("#result").val(targetObj.mainInfo.result)
      targetObj.staffInfo.forEach(item=>{
        const ele=$(contentTemplate)
        const value=item.staffType
        ele.find("#staff-type").val(item.staffType)
        ele.find("#staff-name").val(item.staffName)
        ele.find("#identity").val(item.identity)
        ele.find("#department").val(item.department)
        ele.find("#org-name").val(item.orgName)
        ele.find("#company-branch").val(item.orgName)
        ele.find("#post").val(item.post)
        ele.find("#contact").val(item.contact)
        if(value=="我司员工"){
          ele.find(".identity").removeClass("hidden")
          ele.find(".department").removeClass("hidden")
          ele.find(".org-name-container").addClass("hidden")
          ele.find(".org-name").addClass("hidden")
          ele.find(".post").addClass("hidden")
          ele.find(".contact").addClass("hidden")
          ele.find(".branch").addClass("hidden")
        }else if(value=="分行人员"){
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
      })
    }
  })
  $("#add-info").click(()=>{
    const ele=$(contentTemplate)
    $(".add-info").append(ele)
    $(".staff-type").change((e)=>{
      const value=e.target.value
      const parent=$(e.target).closest("#staff-info")
      if(value=="我司员工"){
        $(parent).children(".identity").removeClass("hidden")
        $(parent).children(".department").removeClass("hidden")
        $(parent).children(".org-name-container").addClass("hidden")
        $(parent).find(".org-name").addClass("hidden")
        $(parent).children(".post").addClass("hidden")
        $(parent).children(".contact").addClass("hidden")
        $(parent).find(".branch").addClass("hidden")
      }else if(value=="分行人员"){
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
  })
  $("#delete-info").click(()=> {
    document.querySelectorAll(".selected").forEach(item=>{
      const id=item.getAttribute("staff-id")
      if(id==undefined)item.remove()
    })
  }
  )
})

//方法区
function parseDate(date){
  return `${new Date(date).getFullYear()}/${new Date(date).getMonth()+1}/${new Date(date).getDate()}`
}