package ink.rongxinyang.hibernate.service.impl;

import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.entity.StaffInfo;
import ink.rongxinyang.hibernate.service.ManipulationService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.UUID;

@Qualifier("manipulationService")
@Component
public class ManipulationServiceImpl implements ManipulationService {
    @Autowired
    private SessionFactory sessionFactory;
    @Override
    public boolean remove(Integer[] ids) {
        Session session=null;
        Transaction transaction=null;
        try {
            session = sessionFactory.openSession();
            transaction = session.beginTransaction();
            System.out.println("ids len "+ids.length);
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
        return true;
    }

    @Override
    public Integer updateMain(MainTable mainTable) {
        String chief = mainTable.getChief();
        Integer status = mainTable.getStatus();
        String description = mainTable.getDescription();
        String[] splitStart = mainTable.getStart_time().split("/");
        java.util.Date startDate = new java.util.Date(Integer.valueOf(splitStart[0])-1900,Integer.valueOf(splitStart[1])-1,Integer.valueOf(splitStart[2]));
        String[] splitEnd = mainTable.getEnd_time().split("/");
        java.util.Date endDate = new java.util.Date(Integer.valueOf(splitEnd[0])-1900,Integer.valueOf(splitEnd[1])-1,Integer.valueOf(splitEnd[2]));
        mainTable.setStartTime(new Date(startDate.getTime()));
        mainTable.setEndTime(new Date(endDate.getTime()));
        Date startTime = mainTable.getStartTime();
        Date endTime = mainTable.getEndTime();
        Integer circumstance = mainTable.getCircumstance();

        String department = mainTable.getDepartment();
        String nickName = mainTable.getNickName();
        String clientName = mainTable.getClientName();
        String projectName = mainTable.getProjectName();
        Integer id = mainTable.getId();
        String purpose = mainTable.getPurpose();
        String content = mainTable.getContent();
        String result = mainTable.getResult();
        String address = mainTable.getAddress();
        Integer workType = mainTable.getWorkType();
        Session session = sessionFactory.openSession();
        MainTable main=null;

        if(mainTable.getId()!=-1) {
            String hql = "from MainTable where id=:id";
            Query query = session.createQuery(hql);
            query.setParameter("id",id);
            main = (MainTable) query.uniqueResult();
            main.setAddress(address);
            main.setClientName(clientName);
            main.setWorkType(workType);
            main.setProjectName(projectName);
            main.setCircumstance(circumstance);
            main.setNickName(nickName);
            main.setStartTime(startTime);
            main.setEndTime(endTime);
            main.setChief(chief);
            main.setStatus(status);
            main.setDescription(description);
            main.setDepartment(department);
            main.setPurpose(purpose);
            main.setContent(content);
            main.setResult(result);
        }else{
            main=new MainTable();
            main.setId(null);
            main.setCreateTime(new java.util.Date().getTime());
            main.setAddress(address);
            main.setClientName(clientName);
            main.setWorkType(workType);
            main.setProjectName(projectName);
            main.setCircumstance(circumstance);
            main.setNickName(nickName);
            main.setChief(chief);
            main.setStatus(status);
            main.setDescription(description);
            main.setStartTime(startTime);
            main.setEndTime(endTime);
            main.setDepartment(department);
            main.setPurpose(purpose);
            main.setContent(content);
            main.setResult(result);
        }
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(main);
        transaction.commit();
        session.close();
        return main.getId();
    }

    @Override
    public Boolean updateStaff(StaffInfo staffTable) {
        Long order = staffTable.getOrder();
        String staffType = staffTable.getStaffType();
        String staffName = staffTable.getStaffName();
        String staffDept = staffTable.getStaff_dept();
        String identity = staffTable.getIdentity();
        String post = staffTable.getPost();
        String contact = staffTable.getContact();
        String orgName = staffTable.getOrgName();
        Integer key = staffTable.getKey();
        Session session = sessionFactory.openSession();
        StaffInfo result=null;
        if(!staffTable.getStaffId().equals("emptyId")){
            System.out.println("staffTable===>"+staffTable);
            String hql="from StaffInfo where staffId=:staffId";
            Query query = session.createQuery(hql);
            query.setParameter("staffId",staffTable.getStaffId());
            result = (StaffInfo) query.uniqueResult();
            result.setStaffName(staffName);
            result.setStaff_dept(staffDept);
            result.setIdentity(identity);
            result.setPost(post);
            result.setContact(contact);
            result.setOrgName(orgName);
            result.setKey(key);
            result.setStaffType(staffType);
            Transaction transaction = session.beginTransaction();
            session.update(result);
            transaction.commit();
        }else{
            result=new StaffInfo();
            result.setStaffId(generateId());
            result.setStaffName(staffName);
            result.setStaff_dept(staffDept);
            result.setIdentity(identity);
            result.setPost(post);
            result.setOrder(order);
            result.setContact(contact);
            result.setOrgName(orgName);
            result.setKey(key);
            result.setStaffType(staffType);
            Transaction transaction = session.beginTransaction();
            session.save(result);
            transaction.commit();
        }
        session.close();
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
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
            session.close();

        return true;
    }
    private String generateId(){
        String id = UUID.randomUUID().toString().replace("-", "").substring((int) (Math.random()*3),8);
        char[] chars ={'q','w','e','r','t','y','u','i','o','p','{','}','a','s','d','f','g','h','j','k','l',';'};
        String append= String.valueOf(chars[(int) (Math.random()*chars.length)]+chars[(int) (Math.random()*chars.length)]+chars[(int) (Math.random()*chars.length)]);
        return id+append;
    }
}
