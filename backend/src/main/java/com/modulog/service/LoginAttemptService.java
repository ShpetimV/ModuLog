package com.modulog.service;

import com.modulog.dto.Attemptinfo;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptService {

    private static final int MAX_ATTEMPTS = 5;
    private static final int LOCK_MINUTES = 1;

    private final ConcurrentHashMap<String, Attemptinfo> attempts = new ConcurrentHashMap<>();

    public void loginFailed(String email) {
        Attemptinfo attemptinfo = attempts.getOrDefault(email, new Attemptinfo(0, null));
        attempts.put(email, new Attemptinfo(attemptinfo.counter() + 1, LocalDateTime.now()));
    }

    public void loginSucceeded(String email) {
        Attemptinfo attemptinfo = attempts.getOrDefault(email, new Attemptinfo(0, null));
        attempts.remove(email);
    }

    public boolean isUserLocked(String email) {
        Attemptinfo attemptinfo = attempts.get(email);
        if (attemptinfo == null || attemptinfo.counter() < MAX_ATTEMPTS) {
            return false;
        }

        if (attemptinfo.lastAttempt().plusMinutes(LOCK_MINUTES).isBefore(LocalDateTime.now())) {
            attempts.remove(email);
            return false;
        }
        return true;
    }

    public int getRemainingAttempts(String email) {
        Attemptinfo attemptinfo = attempts.get(email);
        if (attemptinfo == null || attemptinfo.counter() < MAX_ATTEMPTS) {
            return MAX_ATTEMPTS - (attemptinfo == null ? 0 : attemptinfo.counter());
        }
        return Math.max(0,MAX_ATTEMPTS - attemptinfo.counter());
    }
}
