package com.modulog.security;

import com.modulog.model.auth.AuthProvider;
import com.modulog.model.auth.Role;
import com.modulog.model.auth.User;
import com.modulog.repository.UserRepository;
import com.modulog.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public OAuth2SuccessHandler(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException {

        // Spring gives us the user info that came back from Google/GitHub
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // save to DB if first time logging in with OAuth2
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setFirstName(name);
            newUser.setPassword(null); // no password for OAuth2 users
            newUser.setProvider(AuthProvider.GOOGLE); // or GITHUB
            newUser.setRole(Role.USER);
            newUser.setCreatedAt(LocalDateTime.now());
            return userRepository.save(newUser);
        });

        // give them a JWT — same as email/password login
        String token = jwtService.generateToken(user);

        // redirect to frontend with token in URL
        // your React app reads this and stores it
        response.sendRedirect("http://localhost:3000/oauth2/callback?token=" + token);
    }
}
