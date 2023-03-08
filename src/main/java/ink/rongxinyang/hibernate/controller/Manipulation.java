package ink.rongxinyang.hibernate.controller;

import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.entity.StaffInfo;
import ink.rongxinyang.hibernate.service.ManipulationService;
import ink.rongxinyang.hibernate.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("edit")
public class Manipulation {
    @Qualifier("manipulationService")
    @Autowired
    private ManipulationService service;
    @RequestMapping("delete")
    public Response deleteRecord(Integer[] ids){
        Response response = new Response();
        boolean remove = service.remove(ids);
        if(remove){
            response.setMsg("success");
            response.setData(200);
        }else{
            response.setMsg("fail");
            response.setData(500);
        }
        return response;
    }
    @PostMapping("updateMain")
    public Response updateMain(MainTable main){
        Response response = new Response();
        Integer update = service.updateMain(main);
        if(update!=-1) {
            response.setCode(200);
            response.setMsg("success");
            response.setData(update);
        }else{
            response.setCode(500);
            response.setMsg("fail");
        }
        return response;
    }
    @PostMapping("updateStaff")
    public Response updateStaff(StaffInfo staffInfo){
        Response response = new Response();
        boolean update = service.updateStaff(staffInfo);
        if(update) {
            response.setCode(200);
            response.setMsg("success");
        }else{
            response.setCode(500);
            response.setMsg("fail");
        }
        return response;
    }
    @RequestMapping("deleteStaff")
    public Response deleteStaff(String id){
        Boolean deleted = service.removeStaff(id);
        Response response = new Response();
        if(deleted){
            response.setCode(200);
            response.setMsg("success");
        }else{
            response.setCode(500);
            response.setMsg("fail");
        }
        return response;
    }
}
