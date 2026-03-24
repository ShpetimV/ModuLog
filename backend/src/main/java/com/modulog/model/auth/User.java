package com.modulog.model.auth;

import com.modulog.model.module.ActivityModule;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="users")
public class User implements UserDetails {

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // converts your Role enum into Spring Security's format
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
        // e.g. Role.USER → "ROLE_USER"
    }

    @Override
    public String getPassword() {
        return passwordHash; // return your actual field name
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

    @Override
    public String getUsername() {
        return email; // Spring uses this as the unique identifier
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // implement properly later if needed
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
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

    public void setPassword(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setProvider(AuthProvider authProvider) {
        this.authProvider = authProvider;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setCreatedAt(LocalDateTime now) {
        this.createdAt = now;
    }
}
