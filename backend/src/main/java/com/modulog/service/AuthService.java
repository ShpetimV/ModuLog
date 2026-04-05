package com.modulog.service;
import com.modulog.dto.LoginRequest;
import com.modulog.dto.RegisterRequest;
import com.modulog.exception.AccountLockedException;
import com.modulog.exception.AuthException;
import com.modulog.model.auth.AuthProvider;
import com.modulog.model.auth.Role;
import com.modulog.model.auth.User;
import com.modulog.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // BCrypt, wired in SecurityConfig
    private final JwtService jwtService;
    private final LoginAttemptService loginAttemptService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       LoginAttemptService loginAttemptService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.loginAttemptService = loginAttemptService;
    }

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new AuthException("Email is already in use", HttpStatus.CONFLICT); // 409 CONFLICT
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

        if(loginAttemptService.isUserLocked(request.email())) {
            throw new AccountLockedException("Too many failed login attempts. Please try again later.");
        }

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new AuthException("Invalid credentials", HttpStatus.UNAUTHORIZED)); // 401


        if(!passwordEncoder.matches(request.password(), user.getPassword())) {
            loginAttemptService.loginFailed(request.email());
            int remainingAttempts = loginAttemptService.getRemainingAttempts(request.email());
            String message = remainingAttempts <= 3
                    ? "Invalid credentials. " + remainingAttempts + (remainingAttempts == 1 ? " attempt" : " attempts") + " remaining."
                    : "Invalid credentials";
            throw new AuthException(message, HttpStatus.UNAUTHORIZED);
        }

        loginAttemptService.loginSucceeded(request.email());
        return jwtService.generateToken(user);
    }
}
