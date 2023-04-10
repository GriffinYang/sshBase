package ink.rongxinyang.hibernate.service.impl;

import ink.rongxinyang.hibernate.dao.FetchDAO;
import ink.rongxinyang.hibernate.entity.MainTable;
import ink.rongxinyang.hibernate.service.FetchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.List;
@Component
@Qualifier("fetchService")
public class FetchServiceImpl implements FetchService {
    @Autowired
    private FetchDAO fetchDAO;

    @Override
    public List fetchMainList(MainTable data) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        List<MainTable> list = null;
        try {
            list = fetchDAO.fetchMainList(data);
            List<MainTable> finalList = list;
            list.forEach(item -> {
                String start = simpleDateFormat.format(item.getStartTime());
                String end = simpleDateFormat.format(item.getEndTime());
                String create = simpleDateFormat.format(item.getCreateTime());
                item.setStart(start);
                item.setEnd(end);
                item.setCreate(create);
                item.setTotal(finalList.get(0).getTotal());
            });
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return list;
    }
    @Override
    public List fetchCombine(Integer id) {
        return fetchDAO.fetchCombine(id);
    }

    @Override
    public Boolean changeable(Integer id) {
      return fetchDAO.changeable(id);
    }

}
