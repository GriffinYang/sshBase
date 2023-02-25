package ink.rongxinyang.hibernate.util;

import lombok.Data;

@Data
public class Response {
    private Integer code;
    private Object data;
    private String msg;
}
