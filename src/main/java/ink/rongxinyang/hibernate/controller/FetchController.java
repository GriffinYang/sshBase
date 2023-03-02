package ink.rongxinyang.hibernate.controller;

import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.service.FetchService;
import ink.rongxinyang.hibernate.util.ExcelHelper;
import ink.rongxinyang.hibernate.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("fetch")
public class FetchController {
    @Qualifier("fetchService")
    @Autowired
    private FetchService service;
    @Autowired
    private ExcelHelper helper;
    @RequestMapping("main")
    public Response fetchMain(@RequestParam(required = false)Integer from,@RequestParam(required = false)Integer number,@RequestParam(required = false) String clientName,@RequestParam(required = false) String circumstance,@RequestParam(required = false) String workType,@RequestParam(required = false) String status,@RequestParam(required = false) String chief,@RequestParam(required = false) String department){
        Response response = new Response();
        MainTable data = new MainTable();
        data.setFrom((from-1)*number);
        data.setNumber(number);
        data.setClientName(clientName);
        data.setCircumstance(circumstance);
        data.setWorkType(workType);
        if (!status.trim().equals(""))
        data.setStatus(status.equals("已完成")?1:0);
        data.setChief(chief);
        data.setDepartment(department);
        List list = service.fetchMainList(data);
        return getResponse(response,list);
    }
    @RequestMapping("export")
    public Response export(HttpServletResponse resp){
        Response response = new Response();
        try{
            helper.exportExcel(resp);
            response.setMsg("success");
            response.setData(200);
        }catch (Exception e){
            e.printStackTrace();
            response.setMsg("fail");
            response.setData(500);
            return response;
        }
        return null;
    }
    @RequestMapping("fetchCombine")
    public Response fetchCombine(Integer id){
        Response response = new Response();
        try {
            List list = service.fetchCombine(id);
            response.setCode(200);
            response.setData(list);
            response.setMsg("success");
        }catch (Exception e){
            e.printStackTrace();
            response.setCode(500);
            response.setMsg("fail");
        }
        return response;
    }
    private Response getResponse(Response response, List list) {
        if(list!=null){
            response.setCode(200);
            response.setData(list);
            response.setMsg("success");
        }else{
            response.setCode(500);
            response.setData(null);
            response.setMsg("fail");
        }
        return response;
    }
}
