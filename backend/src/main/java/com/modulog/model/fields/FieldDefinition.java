package com.modulog.model.fields;


import com.modulog.model.module.ActivityModule;
import jakarta.persistence.*;

@Entity
public class FieldDefinition {

    @Id @GeneratedValue
    private Long id;
    private String label;
    private FieldType type;

    @ManyToOne @JoinColumn(name = "module_id")
    private ActivityModule module;


    public FieldDefinition() {
    }

    public FieldDefinition(String label, FieldType type, ActivityModule module) {
        this.label = label;
        this.type = type;
        this.module = module;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public FieldType getType() {
        return type;
    }

    public void setType(FieldType type) {
        this.type = type;
    }

    public ActivityModule getModule() {
        return module;
    }

    public void setModule(ActivityModule module) {
        this.module = module;
    }
}
