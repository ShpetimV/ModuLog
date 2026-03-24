package com.modulog.model.activity;

import com.modulog.model.fields.FieldValue;
import com.modulog.model.module.ActivityModule;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class ActivityLog {

    @Id
    @GeneratedValue
    private long id;
    private LocalDateTime loggedAt;
    private String notes;

    @ManyToOne
    @JoinColumn(name="module_id")
    private ActivityModule module;

    @OneToMany(mappedBy = "log")
    private List<FieldValue> values;

    public ActivityLog() {}

    public ActivityLog(LocalDateTime loggedAt, String notes, ActivityModule module, List<FieldValue> values) {
        this.loggedAt = loggedAt;
        this.notes = notes;
        this.module = module;
        this.values = values;
    }


    public LocalDateTime getLoggedAt() {
        return loggedAt;
    }

    public void setLoggedAt(LocalDateTime loggedAt) {
        this.loggedAt = loggedAt;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<FieldValue> getValues() {
        return values;
    }

    public void setValues(List<FieldValue> values) {
        this.values = values;
    }

    public ActivityModule getModule() {
        return module;
    }

    public void setModule(ActivityModule module) {
        this.module = module;
    }
}
