package ink.rongxinyang.hibernate.service.impl;

import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.service.FetchService;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.List;
@Component
@Qualifier("fetchService")
public class FetchServiceImpl implements FetchService {
    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List fetchMainList(MainTable data) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        List<MainTable> list =null;
        try {
            Session session = sessionFactory.openSession();
            Criteria criteria = queryAll(data, session);
            Long total = (Long) criteria.setProjection(Projections.rowCount()).uniqueResult();
            criteria.setProjection(null);
            if(data.getFrom()!=null) {
                criteria.setFirstResult(data.getFrom());
                criteria.setMaxResults(data.getNumber());
            }
            list = criteria.list();
            list.forEach(item->{
                String start = simpleDateFormat.format(item.getStartTime());
                String end = simpleDateFormat.format(item.getEndTime());
                String create = simpleDateFormat.format(item.getCreateTime());
                item.setStart(start);
                item.setEnd(end);
                item.setCreate(create);
                item.setTotal(total);
            });
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
        return list;
    }

    @Override
    public List fetchCombine(Integer id) {
        Session session = sessionFactory.openSession();
        String combine="from MainTable m left join StaffInfo s on m.id=s.key where m.id=:id order by s.order asc";
        Query query = session.createQuery(combine);
        query.setParameter("id",id);
        List list = query.list();
        return list;
    }

    @Override
    public Boolean changeable(Integer id) {
        Session session = sessionFactory.openSession();
        MainTable mainTable = session.get(MainTable.class, id);
        if(mainTable.getStatus()==0)return true;
        else return false;
    }

    private Criteria queryAll(MainTable data,Session session) {
        Criteria criteria = session.createCriteria(MainTable.class);
        if (include(data.getClientName()))
            criteria.add(Restrictions.eq("clientName",data.getClientName()));
        if(include(data.getCircumstance()))
            criteria.add(Restrictions.eq("circumstance",data.getCircumstance()));
        if(include(data.getWorkType()))
            criteria.add(Restrictions.eq("workType",data.getWorkType()));
        if(include(data.getStatus()))
            criteria.add(Restrictions.eq("status",data.getStatus()));
        if(include(data.getDepartment()))
            criteria.add(Restrictions.eq("department",data.getDepartment()));
        if(include(data.getDepartment()))
            criteria.add(Restrictions.eq("chief",data.getChief()));
        criteria.addOrder(Order.desc("createTime"));
        return criteria;
    }
    private boolean include(Integer status) {
        if(status!=null)return true;
        return false;
    }

    private boolean include(String data){
        if (data!=null) {
            if (!data.trim().equals("")) return true;
        }
        return false;
    }
}
