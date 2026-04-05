import {
    Guitar, Dumbbell, BookOpen, Palette, Code, Music,
    Camera, Bike, Heart, Star, Zap, Coffee, Flame,
    Target, Trophy, Waves,
    type LucideIcon,
} from "lucide-react";

// ── Icon registry ──
// Each entry maps a persistable string key to a Lucide component.
// The key is what gets stored in the DB (via your CreateModuleRequest.icon),
// and the lookup function below resolves it back to a component at render time.

export interface IconEntry {
    name: string;
    icon: LucideIcon;
}

export const MODULE_ICONS: IconEntry[] = [
    { name: "Guitar",   icon: Guitar },
    { name: "Dumbbell", icon: Dumbbell },
    { name: "BookOpen", icon: BookOpen },
    { name: "Palette",  icon: Palette },
    { name: "Code",     icon: Code },
    { name: "Music",    icon: Music },
    { name: "Camera",   icon: Camera },
    { name: "Bike",     icon: Bike },
    { name: "Heart",    icon: Heart },
    { name: "Star",     icon: Star },
    { name: "Zap",      icon: Zap },
    { name: "Coffee",   icon: Coffee },
    { name: "Flame",    icon: Flame },
    { name: "Target",   icon: Target },
    { name: "Trophy",   icon: Trophy },
    { name: "Waves",    icon: Waves },
];

export function getModuleIcon(name: string): LucideIcon {
    return MODULE_ICONS.find((i) => i.name === name)?.icon ?? Star;
}

// ── Colors ──
// Hex values the user can pick from. Stored as-is in the DB.
export const MODULE_COLORS: string[] = [
    "#a78bfa", "#818cf8", "#6366f1",
    "#2dd4bf", "#34d399", "#4ade80",
    "#fb7185", "#f472b6", "#e879f9",
    "#fbbf24", "#fb923c", "#f87171",
    "#38bdf8", "#22d3ee", "#a3e635",
    "#94a3b8",
];

// ── Enums ──
// These mirror your backend enums so the frontend stays in sync.
// If you later generate types from an OpenAPI spec, these go away.
export const FREQUENCIES = [
    "DAILY",
    "SPECIFIC_DAYS",
    "WEEKLY",
    "MONTHLY",
    "YEARLY",
] as const;

export type FrequencyType = (typeof FREQUENCIES)[number];

export const FIELD_TYPES = ["NUMBER", "TEXT", "BOOLEAN"] as const;

export type FieldType = (typeof FIELD_TYPES)[number];

// ── Shared types ──
// These represent the shape of data flowing between components on this page.
// They're NOT your API response DTOs — keep those in lib/api/.

export interface FieldDefinitionForm {
    label: string;
    type: FieldType;
}

export interface ModuleFormData {
    name: string;
    description: string;
    icon: string;
    color: string;
    frequency: FrequencyType;
    fields: FieldDefinitionForm[];
}

export interface ActivityModuleView {
    id: number;
    name: string;
    description: string;
    icon: string;
    color: string;
    frequency: FrequencyType;
    fields: FieldDefinitionForm[];
}
