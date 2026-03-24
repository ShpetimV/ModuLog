package com.modulog.model.module;

import com.modulog.model.activity.ActivityLog;
import com.modulog.model.auth.User;
import com.modulog.model.fields.FieldDefinition;
import jakarta.persistence.*;

import java.time.DayOfWeek;
import java.util.List;

@Entity
public class ActivityModule {

   @Id @GeneratedValue
   private long id;
   private String name;
   private String description;
   @Enumerated(EnumType.STRING)
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
   private List<ActivityLog> logs;

   public ActivityModule() {}

   public ActivityModule(String name, String description, FrequencyType frequency, String icon, String color) {
         this.name = name;
         this.description = description;
         this.frequency = frequency;
         this.icon = icon;
         this.color = color;
    }

     public String getName() {
          return name;
     }

     public void setName(String name) {
          this.name = name;
     }

     public String getDescription() {
          return description;
     }

     public void setDescription(String description) {
          this.description = description;
     }

     public FrequencyType getFrequency() {
          return frequency;
     }

     public void setFrequency(FrequencyType frequency) {
          this.frequency = frequency;
     }

     public String getIcon() {
          return icon;
     }

     public void setIcon(String icon) {
          this.icon = icon;
     }

     public String getColor() {
          return color;
     }

     public void setColor(String color) {
          this.color = color;
     }

     public void setUser(User user) {
       this.user = user;
     }

}
