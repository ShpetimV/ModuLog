package com.modulog.module;

import com.modulog.auth.User;
import com.modulog.fields.FieldDefinition;
import jakarta.persistence.*;

import java.time.DayOfWeek;
import java.util.List;

@Entity
public class ActivityModule {

   @Id @GeneratedValue
   private long id;
   private String name;
   private String description;
   private FrequencyType frequency;
   private String icon;
   private String color;

   @ManyToOne @JoinColumn(name = "user_id")
   private User user;

   @ElementCollection @Enumerated(EnumType.STRING)
   private List<DayOfWeek> specificDays;


   @OneToMany(mappedBy = "module")
   private List<FieldDefinition> fields;

   @OneToMany(mappedBy = "module")
   private List<ActivityModule> logs;



}
