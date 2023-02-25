package ink.rongxinyang.hibernate.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "work_type")
public class WorkType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "type_name")
    private String typeName;

    @Override
    public String toString() {
        return "WorkType{" +
                "id=" + id +
                ", typeName='" + typeName + '\'' +
                '}';
    }
}
