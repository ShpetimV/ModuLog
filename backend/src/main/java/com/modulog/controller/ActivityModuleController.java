package com.modulog.controller;

import com.modulog.dto.CreateModuleRequest;
import com.modulog.model.auth.User;
import com.modulog.model.module.ActivityModule;
import com.modulog.service.ActivityModuleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activity-modules")
public class ActivityModuleController {

    private final ActivityModuleService activityModuleService;

    public ActivityModuleController(ActivityModuleService activityModuleService) {
        this.activityModuleService = activityModuleService;
    }

    @GetMapping
    public ResponseEntity<List<ActivityModule>> getAll(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(activityModuleService.getModulesByUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityModule> getById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(activityModuleService.getModuleById(id).orElse(null));
    }

    @PostMapping
    public ResponseEntity<ActivityModule> create(@AuthenticationPrincipal User user, @RequestBody CreateModuleRequest createModuleRequest) {
        System.out.println("Current user: " + user.getEmail());
        ActivityModule module = activityModuleService.createNewModule(
                createModuleRequest.name(),
                createModuleRequest.description(),
                createModuleRequest.frequency(),
                createModuleRequest.icon(),
                createModuleRequest.color(),
                user
        );
        return ResponseEntity.status(201).body(module);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActivityModule> update(@PathVariable Long id, @RequestBody CreateModuleRequest updateModuleRequest) {
        ActivityModule module = activityModuleService.updateModule(
                id,
                updateModuleRequest.name(),
                updateModuleRequest.description(),
                updateModuleRequest.frequency(),
                updateModuleRequest.icon(),
                updateModuleRequest.color()
        );
        if(module != null) {
            return ResponseEntity.ok(module);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        activityModuleService.deleteModule(id);
        return ResponseEntity.noContent().build();
    }


}
