package com.modulog.fields;

import com.modulog.activity.ActivityLog;
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
}
