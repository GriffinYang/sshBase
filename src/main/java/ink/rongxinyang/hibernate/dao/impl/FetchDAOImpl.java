package ink.rongxinyang.hibernate.dao.impl;

import ink.rongxinyang.hibernate.dao.FetchDAO;
import ink.rongxinyang.hibernate.entity.MainTable;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class FetchDAOImpl implements FetchDAO {
    @Autowired
    private SessionFactory sessionFactory;
    @Override
    public List fetchMainList(MainTable data) {
        List<MainTable> list =null;
        Session session=null;
        try {
            session = sessionFactory.openSession();
            Criteria criteria = queryAll(data, session);
            Long total = (Long) criteria.setProjection(Projections.rowCount()).uniqueResult();
            criteria.setProjection(null);
            if(data.getFrom()!=null) {
                criteria.setFirstResult(data.getFrom());
                criteria.setMaxResults(data.getNumber());
            }
            list = criteria.list();
            if(list.get(0)!=null)
            list.get(0).setTotal(total);
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
        session.close();
        return list;
    }

    @Override
    public Boolean changeable(Integer id) {
        Session session = sessionFactory.openSession();
        MainTable mainTable = session.get(MainTable.class, id);
        session.close();
        if(mainTable.getStatus()==0)return true;
        else return false;
    }

    @Override
    public Criteria queryAll(MainTable data, Session session) {
        Criteria criteria = session.createCriteria(MainTable.class);

        System.out.println("chief->"+data.getChief());
        if (include(data.getClientName()))
            criteria.add(Restrictions.ilike("clientName","%"+data.getClientName().trim()+"%"));
        if(include(data.getCircumstance()))
            criteria.add(Restrictions.eq("circumstance",data.getCircumstance()));
        if(include(data.getWorkType()))
            criteria.add(Restrictions.eq("workType",data.getWorkType()));
        if(include(data.getStatus()))
            criteria.add(Restrictions.eq("status",data.getStatus()));
        if(include(data.getDepartment()))
            criteria.add(Restrictions.ilike("department","%"+data.getDepartment().trim()+"%"));
        if(include(data.getChief()))
            criteria.add(Restrictions.ilike("chief","%"+data.getChief().trim()+"%"));
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