package ink.rongxinyang.hibernate.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Setter
@Table(name = "main_table")
public class MainTable implements Cloneable{
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
    private Integer circumstance;
    @Column(name = "work_type")
    private Integer workType;
    @Column(name = "status")
    private Integer status;
    @Column(name = "chief")
    private String chief;
    @Column(name = "department")
    private String department;
    @Column(name = "createTime")
    private Long createTime;
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
    @Transient
    private String start_time;
    @Transient
    private String end_time;

    @Override
    public String toString() {
        return "MainTable{" +
                "id=" + id +
                ", clientName='" + clientName + '\'' +
                ", nickName='" + nickName + '\'' +
                ", projectName='" + projectName + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", circumstance='" + circumstance + '\'' +
                ", workType='" + workType + '\'' +
                ", status=" + status +
                ", chief='" + chief + '\'' +
                ", department='" + department + '\'' +
                ", createTime=" + createTime +
                ", description='" + description + '\'' +
                ", result='" + result + '\'' +
                ", address='" + address + '\'' +
                ", purpose='" + purpose + '\'' +
                ", content='" + content + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                ", create='" + create + '\'' +
                ", from=" + from +
                ", number=" + number +
                ", total=" + total +
                ", start_time='" + start_time + '\'' +
                ", end_time='" + end_time + '\'' +
                '}';
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
