package ink.rongxinyang.hibernate.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MainExcel {
    private String clientName;
    private String start;
    private String end;
    private String circumstance;
    private String workType;
    private String status;
    private String chief;
    private String department;
    private String create;
}

