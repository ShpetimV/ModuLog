package com.modulog.fields;


import com.modulog.module.ActivityModule;
import jakarta.persistence.*;

@Entity
public class FieldDefinition {

    @Id @GeneratedValue
    private Long id;
    private String label;
    private FieldType type;

    @ManyToOne @JoinColumn(name = "module_id")
    private ActivityModule module;


}
