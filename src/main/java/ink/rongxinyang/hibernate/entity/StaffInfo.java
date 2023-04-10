package ink.rongxinyang.hibernate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name = "staff_info")
@AllArgsConstructor
@NoArgsConstructor
public class StaffInfo implements Serializable {
    @Id
    @Column(name = "id")
    private String staffId;
    @Column(name = "staff_type")
    private String staffType;
    @Column(name = "staff_name")
    private String staffName;
    @Column(name = "department")
    private String staff_dept;
    @Column(name = "identity")
    private String identity;
    @Column(name = "post")
    private String post;
    @Column(name="contact")
    private String contact;
    @Column(name="org_name")
    private String orgName;
    @Column(name = "staff_order")
    private Long order;
    @Column(name = "relate_to_main")
    private Integer key;

    @Override
    public String toString() {
        return "StaffInfo{" +
                "staffId=" + staffId +
                ", staffType='" + staffType + '\'' +
                ", staffName='" + staffName + '\'' +
                ", department='" + staff_dept + '\'' +
                ", identity='" + identity + '\'' +
                ", post='" + post + '\'' +
                ", contact='" + contact + '\'' +
                ", orgName='" + orgName + '\'' +
                ", order=" + order +
                ", key=" + key +
                '}';
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
