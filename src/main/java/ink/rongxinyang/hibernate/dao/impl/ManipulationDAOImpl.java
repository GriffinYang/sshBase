package ink.rongxinyang.hibernate.dao.impl;

import ink.rongxinyang.hibernate.dao.ManipulationDAO;
import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.entity.StaffInfo;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ManipulationDAOImpl implements ManipulationDAO {
    @Autowired
    private SessionFactory sessionFactory;
    @Override
    public boolean removeStaff(Integer[] ids) {
        Session session=null;
        Transaction transaction=null;
        try {
            session = sessionFactory.openSession();
            transaction = session.beginTransaction();
            if (ids==null)return false;
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
        session.close();
        return false;
    }

    @Override
    public Integer updateMain(MainTable mainTable) {
        MainTable main=null;
        Session session=sessionFactory.openSession();
        if(mainTable.getId()!=-1) {
            String hql = "from MainTable where id=:id";
            Query query = session.createQuery(hql);
            query.setParameter("id",mainTable.getId());
            main = (MainTable) query.uniqueResult();
            main.setAddress(main.getAddress());
            main.setClientName(mainTable.getClientName());
            main.setWorkType(mainTable.getWorkType());
            main.setProjectName(mainTable.getProjectName());
            main.setCircumstance(mainTable.getCircumstance());
            main.setNickName(mainTable.getNickName());
            main.setStartTime(mainTable.getStartTime());
            main.setEndTime(mainTable.getEndTime());
            main.setChief(mainTable.getChief());
            main.setStatus(mainTable.getStatus());
            main.setDescription(mainTable.getDescription());
            main.setDepartment(mainTable.getDepartment());
            main.setPurpose(mainTable.getPurpose());
            main.setContent(mainTable.getContent());
            main.setResult(mainTable.getResult());
        }else{
            main=new MainTable();
            main.setId(null);
            main.setCreateTime(new java.util.Date().getTime());
            main.setAddress(mainTable.getAddress());
            main.setClientName(mainTable.getClientName());
            main.setWorkType(mainTable.getWorkType());
            main.setProjectName(mainTable.getProjectName());
            main.setCircumstance(mainTable.getCircumstance());
            main.setNickName(mainTable.getNickName());
            main.setChief(mainTable.getChief());
            main.setStatus(mainTable.getStatus());
            main.setDescription(mainTable.getDescription());
            main.setStartTime(mainTable.getStartTime());
            main.setEndTime(mainTable.getEndTime());
            main.setDepartment(mainTable.getDepartment());
            main.setPurpose(mainTable.getPurpose());
            main.setContent(mainTable.getContent());
            main.setResult(mainTable.getResult());
        }
        System.out.println("nickname->"+main.getNickName());
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(main);
        transaction.commit();
        session.close();
        return main.getId();
    }

    @Override
    public Boolean updateStaff(StaffInfo staffTable) {
        Session session = sessionFactory.openSession();
        StaffInfo result=null;
        try {
            if (!staffTable.getStaffId().equals("emptyId")) {
                System.out.println("staffTable===>" + staffTable);
                String hql = "from StaffInfo where staffId=:staffId";
                Query query = session.createQuery(hql);
                query.setParameter("staffId", staffTable.getStaffId());
                result = (StaffInfo) query.uniqueResult();
                result.setStaffName(staffTable.getStaffName());
                result.setStaff_dept(staffTable.getStaff_dept());
                result.setIdentity(staffTable.getIdentity());
                result.setPost(staffTable.getPost());
                result.setContact(staffTable.getContact());
                result.setOrgName(staffTable.getOrgName());
                result.setKey(staffTable.getKey());
                result.setStaffType(staffTable.getStaffType());
                Transaction transaction = session.beginTransaction();
                session.update(result);
                transaction.commit();
            } else {
                result = new StaffInfo();
                result.setStaffId(staffTable.getStaffId());
                result.setStaffName(staffTable.getStaffName());
                result.setStaff_dept(staffTable.getStaff_dept());
                result.setIdentity(staffTable.getIdentity());
                result.setPost(staffTable.getPost());
                result.setOrder(staffTable.getOrder());
                result.setContact(staffTable.getContact());
                result.setOrgName(staffTable.getOrgName());
                result.setKey(staffTable.getKey());
                result.setStaffType(staffTable.getStaffType());
                Transaction transaction = session.beginTransaction();
                session.save(result);
                transaction.commit();
            }
        }catch (Exception e){
           e.printStackTrace();
            return false;
        }finally {
            session.close();
        }
        return true;
    }

    @Override
    public Boolean removeStaff(String id) {
        Session session=null;
        try {
            session = sessionFactory.openSession();
            Transaction transaction = session.beginTransaction();
            StaffInfo staffInfo = session.get(StaffInfo.class, id);
            session.remove(staffInfo);
            transaction.commit();
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }finally {
            session.close();
        }
        return true;
    }
}
