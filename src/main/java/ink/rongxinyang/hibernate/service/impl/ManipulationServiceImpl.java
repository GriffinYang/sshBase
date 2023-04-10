package ink.rongxinyang.hibernate.service.impl;

import ink.rongxinyang.hibernate.dao.ManipulationDAO;
import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.entity.StaffInfo;
import ink.rongxinyang.hibernate.service.ManipulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.sql.Date;

@Qualifier("manipulationService")
@Component
public class ManipulationServiceImpl implements ManipulationService {
    @Autowired
    private ManipulationDAO manipulationDAO;
    @Override
    public boolean remove(Integer[] ids) {
       return manipulationDAO.removeStaff(ids);
    }

    @Override
    public Integer updateMain(MainTable mainTable) {
        String[] splitStart = mainTable.getStart_time().split("/");
        java.util.Date startDate = new java.util.Date(Integer.valueOf(splitStart[0])-1900,Integer.valueOf(splitStart[1])-1,Integer.valueOf(splitStart[2]));
        String[] splitEnd = mainTable.getEnd_time().split("/");
        java.util.Date endDate = new java.util.Date(Integer.valueOf(splitEnd[0])-1900,Integer.valueOf(splitEnd[1])-1,Integer.valueOf(splitEnd[2]));
        mainTable.setStartTime(new Date(startDate.getTime()));
        mainTable.setEndTime(new Date(endDate.getTime()));
        return manipulationDAO.updateMain(mainTable);
    }

    @Override
    public Boolean updateStaff(StaffInfo staffTable) {
        return manipulationDAO.updateStaff(staffTable);
    }

    @Override
    public Boolean removeStaff(String id) {
        return manipulationDAO.removeStaff(id);
    }
}
