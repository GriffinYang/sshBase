import cn.hutool.core.collection.CollUtil;
import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;

import java.util.Date;
import java.util.List;

public class ExcelTest {
    public static void main(String[] args) {
        ExcelWriter writer = ExcelUtil.getBigWriter("D:\\Test\\demo.xlsx");
        List<String> row1 = CollUtil.newArrayList("出差记录");
        List<String> row2 = CollUtil.newArrayList("2021-01-20至2021-02-25");
        List<String> row3 = CollUtil.newArrayList("客户名称一");
        List<String> row4 = CollUtil.newArrayList("开始时间","2023/3/2","结束时间","2023/3/7");
        List<String> row5 = CollUtil.newArrayList("地点","安徽合肥","事件\r(工作场景)","尽职调查");

        List<String> row6 = CollUtil.newArrayList("公司人员","刘晓琪","能源金融事业部","第一调查人");
        List<String> row7 = CollUtil.newArrayList("","卢钰","交通金融事业部","第二调查人");

        List<String> row8 = CollUtil.newArrayList("外部人员","张三","董事长","15510102940");
        List<String> row9 = CollUtil.newArrayList("","李四","分行领导"," 15510102120");

        List<String> row10 = CollUtil.newArrayList("目标\r(起因)","原因...");
        List<String> row11 = CollUtil.newArrayList("内容\r(经过)","内容...");
        List<String> row12 = CollUtil.newArrayList("效果\r(结果)","结果...");
        List<String> row13 = CollUtil.newArrayList("现场标签","");
        List<List<String>> rows = CollUtil.newArrayList(row1, row2, row3, row4, row5,row6,row7,row8,row9,row10,row11,row12,row13);
        //合并单元格后的标题行，使用默认标题样式
        writer.merge(0,0,0,3,null,false);
        writer.merge(1,1,0,3,null,false);
        writer.merge(2,2,0,3,null,false);
//        writer.merge(3,3,0,3,null,false);
        writer.merge(5,6,0,0,null,false);
        writer.merge(7,8,0,0,null,false);
        writer.merge(9,9,1,3,null,false);
        writer.merge(10,10,1,3,null,false);
        writer.merge(11,11,1,3,null,false);
        writer.merge(12,12,1,3,null,false);
//一次性写出内容，强制输出标题
        writer.write(rows, true);
//关闭writer，释放内存
        writer.close();
    }
}
