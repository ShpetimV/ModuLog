package com.modulog.auth;

import com.modulog.activity.ActivityLog;
import com.modulog.module.ActivityModule;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id @GeneratedValue
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique=true, nullable=false)
    private String email;

    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    private String providerId;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user")
    private List<ActivityModule> modules;

}
