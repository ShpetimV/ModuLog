package com.modulog.repository;

import com.modulog.model.auth.User;
import com.modulog.model.module.ActivityModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActivityModuleRepository extends JpaRepository<ActivityModule, Long> {

    ActivityModule findByName(String name);
    List<ActivityModule> findByUser(User user);
    Optional<ActivityModule> findById(long id);
}
