package com.modulog.service;

import com.modulog.model.auth.User;
import com.modulog.model.module.ActivityModule;
import com.modulog.model.module.FrequencyType;
import com.modulog.repository.ActivityModuleRepository;
import com.modulog.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityModuleService {

    private final ActivityModuleRepository moduleRepository;
    private final UserRepository userRepository;

    public ActivityModuleService(ActivityModuleRepository moduleRepository, UserRepository userRepository) {
        this.moduleRepository = moduleRepository;
        this.userRepository = userRepository;
    }

    public List<ActivityModule> getModulesByUser(User user) {
        return moduleRepository.findByUser(user);
    }

    public Optional<ActivityModule> getModuleById(Long id) {
        return moduleRepository.findById(id);
    }

    public ActivityModule createNewModule(String name, String description, FrequencyType frequency, String icon, String color, User user) {
        ActivityModule module = new ActivityModule();
        module.setName(name);
        module.setDescription(description);
        module.setFrequency(frequency);
        module.setIcon(icon);
        module.setColor(color);
        module.setUser(user);
        return moduleRepository.save(module);
    }

    public ActivityModule updateModule(Long id, String name, String description, FrequencyType frequency, String icon, String color) {
        ActivityModule module = moduleRepository.findById(id).orElse(null);
        if(module != null) {
            module.setName(name);
            module.setDescription(description);
            module.setFrequency(frequency);
            module.setIcon(icon);
            module.setColor(color);
            return moduleRepository.save(module);
        }
        return null;
    }

    public void deleteModule(Long id) {
        moduleRepository.deleteById(id);
    }





}
