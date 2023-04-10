package ink.rongxinyang.hibernate.dao;

import ink.rongxinyang.hibernate.entity.MainTable;
import org.hibernate.Criteria;
import org.hibernate.Session;

import java.util.List;

public interface FetchDAO {
    List fetchMainList(MainTable data);
    List fetchCombine(Integer id);
    Boolean changeable(Integer id);
    Criteria queryAll(MainTable data, Session session);
}
