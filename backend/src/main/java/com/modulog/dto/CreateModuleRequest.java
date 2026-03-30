package com.modulog.dto;


import com.modulog.model.module.FrequencyType;

public record CreateModuleRequest(
        String name,
        String description,
        String icon,
        String color,
        FrequencyType frequency
) {}
