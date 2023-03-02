package ink.rongxinyang.hibernate.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Setter
@Table(name = "staff_info")
public class StaffInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "staff_type")
    private String staffType;
    @Column(name = "staff_name")
    private String staffName;
    @Column(name = "department")
    private String department;
    @Column(name = "identity")
    private String identity;
    @Column(name = "post")
    private String post;
    @Column(name="contact")
    private String contact;
    @Column(name="org_name")
    private String orgName;
    @Column(name = "order")
    private Date order;
    @Column(name = "relate_to_main")
    private Integer key;
}
