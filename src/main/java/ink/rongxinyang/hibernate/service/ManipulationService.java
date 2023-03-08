package ink.rongxinyang.hibernate.service;

import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.entity.StaffInfo;
import org.springframework.stereotype.Service;

@Service
public interface ManipulationService {
    boolean remove(Integer[] ids);
    Integer updateMain(MainTable mainTable);
    Boolean updateStaff(StaffInfo mainTable);
    Boolean removeStaff(String id);
}
