package ink.rongxinyang.hibernate.util;

import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.service.FetchService;
import org.apache.commons.codec.binary.StringUtils;
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

@Component
public class ExcelHelper {
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    @Qualifier("fetchService")
    @Autowired
    private  FetchService service;
    public void exportExcel(HttpServletResponse response){
        MainTable data = new MainTable();
        List<MainTable> list = service.fetchMainList(data);
        List<MainExcel> excel=new ArrayList<>();
        list.forEach(i->{
            String start = simpleDateFormat.format(i.getStartTime());
            String end = simpleDateFormat.format(i.getEndTime());
            String create = simpleDateFormat.format(i.getCreateTime());
            i.setStart(start);
            i.setEnd(end);
            i.setCreate(create);
            excel.add(new MainExcel(i.getClientName(),i.getStart(),i.getEnd(),i.getCircumstance(),i.getWorkType(),i.getStatus()==0?"执行中":"已完成",i.getChief(),i.getDepartment(),i.getCreate()));
        });
        ExcelWriter writer = ExcelUtil.getBigWriter();
        writer.addHeaderAlias("clientName","客户名称");
        writer.addHeaderAlias("start","开始时间");
        writer.addHeaderAlias("end","结束时间");
        writer.addHeaderAlias("circumstance","业务场景");
        writer.addHeaderAlias("workType","工作类型");
        writer.addHeaderAlias("status","阶段");
        writer.addHeaderAlias("chief","负责人");
        writer.addHeaderAlias("department","所属部门");
        writer.addHeaderAlias("create","创建日期");


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
