package ink.rongxinyang.hibernate.controller;

import ink.rongxinyang.hibernate.entity.WorkType;
import ink.rongxinyang.hibernate.util.Response;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("fetch")
public class MainController {
    @Autowired
    private SessionFactory sessionFactory;
    @RequestMapping("table")
    public Response fetchTable(){
        Response response = new Response();
        Session session = sessionFactory.openSession();
        String hql="from WorkType ";
        Query query = session.createQuery(hql);
        List<WorkType> list = query.list();
        session.close();
        response.setCode(200);
        response.setData(list);
        response.setMsg("success");
        return response;
    }
}
