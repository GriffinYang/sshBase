package ink.rongxinyang.hibernate.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Setter
@Table(name = "main_table")
public class MainTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "client_name")
    private String clientName;
    @Column(name = "nick_name")
    private String nickName;
    @Column(name = "project_name")
    private String projectName;
    @Column(name = "start_time")
    private Date startTime;
    @Column(name = "end_time")
    private Date endTime;
    @Column(name = "circumstance")
    private String circumstance;
    @Column(name = "work_type")
    private String workType;
    @Column(name = "status")
    private Integer status;
    @Column(name = "chief")
    private String chief;
    @Column(name = "department")
    private String department;
    @Column(name = "createTime")
    private Date createTime;
    @Column(name = "description")
    private String description;
    @Column(name = "result")
    private String result;
    @Column(name = "address")
    private String address;
    @Column(name = "purpose")
    private String purpose;
    @Column(name = "content")
    private String content;
    @Transient
    private String start;
    @Transient
    private String end;
    @Transient
    private String create;
    @Transient
    private Integer from;
    @Transient
    private Integer number;
    @Transient
    private Long total;
}
