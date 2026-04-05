package com.modulog.dto;

import java.time.LocalDateTime;

public record Attemptinfo(int counter, LocalDateTime lastAttempt) {
}
