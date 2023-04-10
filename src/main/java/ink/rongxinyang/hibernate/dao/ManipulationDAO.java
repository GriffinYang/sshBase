package ink.rongxinyang.hibernate.dao;

import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.entity.StaffInfo;

public interface ManipulationDAO {
    boolean removeStaff(Integer[] ids);
    Integer updateMain(MainTable mainTable);
    Boolean updateStaff(StaffInfo staffInfo);
    Boolean removeStaff(String id);
}
