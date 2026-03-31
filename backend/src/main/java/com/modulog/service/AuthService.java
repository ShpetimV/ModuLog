package com.modulog.service;
import com.modulog.dto.LoginRequest;
import com.modulog.dto.RegisterRequest;
import com.modulog.model.auth.AuthProvider;
import com.modulog.model.auth.Role;
import com.modulog.model.auth.User;
import com.modulog.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // BCrypt, wired in SecurityConfig
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password())); // BCrypt hashes here
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setProvider(AuthProvider.LOCAL); // not Google/GitHub
        user.setRole(Role.USER);
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
        return jwtService.generateToken(user); // return token immediately after register
    }

    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // BCrypt compares the raw password against the stored hash
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(user);
    }
}
