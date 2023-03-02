package ink.rongxinyang.hibernate.controller;

import ink.rongxinyang.hibernate.service.ManipulationService;
import ink.rongxinyang.hibernate.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
}
