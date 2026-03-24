package com.modulog.model.fields;

import com.modulog.model.activity.ActivityLog;
import jakarta.persistence.*;

@Entity
public class FieldValue {

    @Id
    @GeneratedValue
    private Long id;
    private String value;

    @ManyToOne
    @JoinColumn(name = "field_definition_id")
    private FieldDefinition definition;

    @ManyToOne
    @JoinColumn(name = "log_id")
    private ActivityLog log;

    public FieldValue() {}

    public FieldValue(String value, FieldDefinition definition, ActivityLog log) {
        this.value = value;
        this.definition = definition;
        this.log = log;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public FieldDefinition getDefinition() {
        return definition;
    }

    public void setDefinition(FieldDefinition definition) {
        this.definition = definition;
    }

    public ActivityLog getLog() {
        return log;
    }

    public void setLog(ActivityLog log) {
        this.log = log;
    }
}
