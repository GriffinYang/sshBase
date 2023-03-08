import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.entity.StaffInfo;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
public class MainExcel {
    public static void main(String[] args) {
        ArrayList<MainTable> mainTables = new ArrayList<>();
        ArrayList<StaffInfo> staffInfos = new ArrayList<>();
        MainTable mainTable = new MainTable();
        mainTable.setStartTime(new Date(new java.util.Date("2023/3/15").getTime()));
        mainTable.setStartTime(new Date(new java.util.Date("2023/3/20").getTime()));
        mainTable.setClientName("南京市政厅");
        mainTable.setAddress("江苏南京");
        mainTable.setCircumstance(1);
        mainTable.setWorkType(1);
        StaffInfo staffInfoAlpha = new StaffInfo();
        staffInfoAlpha.setStaffName("张三");
        staffInfoAlpha.setIdentity("第一调查人");
        staffInfoAlpha.setStaff_dept("能源金融事业部");
    }
    public boolean createExcel(List info){

        return true;
    }
}
