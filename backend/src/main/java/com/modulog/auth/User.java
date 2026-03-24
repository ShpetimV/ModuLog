package com.modulog.auth;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id @GeneratedValue
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

}
