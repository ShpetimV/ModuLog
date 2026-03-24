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
    private String username;

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

    public User() {
        this.createdAt = LocalDateTime.now();
    }

    public User(String firstName, String lastName, String username, String email, String passwordHash, AuthProvider authProvider) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.authProvider = authProvider;
        this.createdAt = LocalDateTime.now();
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
