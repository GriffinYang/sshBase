package ink.rongxinyang.hibernate.util;

import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.entity.StaffInfo;
import ink.rongxinyang.hibernate.service.FetchService;
import org.apache.commons.codec.binary.StringUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Component
public class ExcelHelper {
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    @Qualifier("fetchService")
    @Autowired
    private  FetchService service;
    @Autowired
    private SessionFactory factory;
    public void exportExcel(HttpServletResponse response){
        MainTable data = new MainTable();
        List<MainTable> list = service.fetchMainList(data);
        List<MainExcel> excel=new ArrayList<>();
        AtomicReference<Integer> index= new AtomicReference<>(1);
        for (MainTable i:list){
            String primary="";
            String secondary="";
            String others="";
            String start = simpleDateFormat.format(i.getStartTime());
            String end = simpleDateFormat.format(i.getEndTime());
            String create = simpleDateFormat.format(i.getCreateTime());
            i.setStart(start);
            i.setEnd(end);
            i.setCreate(create);
            String circumstance=null;
            switch (i.getCircumstance()){
                case 1:
                    circumstance="尽职调查";
                    break;
                case 2:
                    circumstance="租期检查";
                    break;
                case 3:
                    circumstance="签约现场";
                    break;
                case 4:
                    circumstance="投标现场";
                    break;
                case 5:
                    circumstance="拍卖现场";
                    break;
                case 6:
                    circumstance="其他";
            }
            String workType=null;
            switch (i.getWorkType()){
                case 1:
                    workType="项目营销";
                    break;
                case 2:
                    workType="正式尽调";
                    break;
                case 3:
                    workType="权属办理";
                    break;
                case 4:
                    workType="押品办理";
                    break;
                case 5:
                    workType="其他";
            }
            Session session = factory.openSession();
            String hql="from StaffInfo where key=:id";
            Query query = session.createQuery(hql);
            query.setParameter("id",i.getId());
            List<StaffInfo> staffs = query.list();
            for(StaffInfo staff:staffs) {
                if (staff.getIdentity().equals("1"))
                    primary += staff.getStaffName();
                else if(staff.getIdentity().equals("2"))
                    secondary+=staff.getStaffName();
                else
                    others+=staff.getStaffName()+",";
            }
                excel.add(new MainExcel(index.get(),i.getClientName(),i.getStart(),i.getEnd(),circumstance,workType,i.getStatus()==0?"执行中":"已完成",i.getChief(),i.getDepartment(),i.getCreate(),primary,secondary,others,i.getPurpose(),i.getContent(),i.getResult()));
            index.getAndSet(index.get() + 1);
        }
        ExcelWriter writer = ExcelUtil.getBigWriter();
        writer.addHeaderAlias("index","序号");
        writer.addHeaderAlias("clientName","客户名称");
        writer.addHeaderAlias("start","开始时间");
        writer.addHeaderAlias("end","结束时间");
        writer.addHeaderAlias("circumstance","业务场景");
        writer.addHeaderAlias("workType","工作类型");
        writer.addHeaderAlias("status","阶段");
        writer.addHeaderAlias("chief","负责人");
        writer.addHeaderAlias("department","所属部门");
        writer.addHeaderAlias("create","创建日期");
        writer.addHeaderAlias("primary","第一调查人");
        writer.addHeaderAlias("secondary","第二调查人");
        writer.addHeaderAlias("staffs","其他人员");
        writer.addHeaderAlias("goal","起因");
        writer.addHeaderAlias("process","过程");
        writer.addHeaderAlias("result","结果");

        writer.write(excel,true);
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        String name = StringUtils.newStringUtf8("export_demo".getBytes(StandardCharsets.UTF_8));
        response.setHeader("Content-Disposition", "attachment;filename=" + name + ".xlsx");
        ServletOutputStream out=null;
        try {
            out=response.getOutputStream();
            writer.flush(out,true);
        }catch (IOException e){
            e.printStackTrace();
        }finally {
            writer.close();
            try {
                out.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
