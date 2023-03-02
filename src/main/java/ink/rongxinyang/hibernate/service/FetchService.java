package ink.rongxinyang.hibernate.service;

import ink.rongxinyang.hibernate.entity.MainTable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("")
public interface FetchService {

    List fetchMainList(MainTable data);
    List fetchCombine(Integer id);
}
