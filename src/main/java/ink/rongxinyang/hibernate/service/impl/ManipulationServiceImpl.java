package ink.rongxinyang.hibernate.service.impl;

import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.service.ManipulationService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
@Qualifier("manipulationService")
@Component
public class ManipulationServiceImpl implements ManipulationService {
    @Autowired
    private SessionFactory sessionFactory;
    @Override
    public boolean remove(Integer[] ids) {
        try {
            Session session = sessionFactory.openSession();
            Transaction transaction = session.beginTransaction();
            for (Integer id : ids) {
                String hql = "from MainTable where id=:id";
                Query query = session.createQuery(hql);
                query.setParameter("id", id);
                MainTable mainTable = (MainTable) query.uniqueResult();
                session.remove(mainTable);
            }
            transaction.commit();
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
