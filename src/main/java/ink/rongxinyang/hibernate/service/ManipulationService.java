package ink.rongxinyang.hibernate.service;

import org.springframework.stereotype.Service;

@Service
public interface ManipulationService {
    boolean remove(Integer[] ids);
}
