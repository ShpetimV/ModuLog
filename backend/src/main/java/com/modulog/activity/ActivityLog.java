package com.modulog.activity;

import com.modulog.fields.FieldValue;
import com.modulog.module.ActivityModule;
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
}
