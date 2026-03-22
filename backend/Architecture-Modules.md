# ModuLog — Architecture Reference
> Spring Boot 3.2 · PostgreSQL · Java 21

---

## Request Flow
```
React Frontend → Controller → Service → Repository → PostgreSQL (Docker)
```

---

## Entities

### Module
| Field | Type | Note |
|-------|------|------|
| id | Long | PK |
| name | String | |
| userId | String | |
| frequencyType | FrequencyType | enum |
| specificDays | List\<DayOfWeek\> | only if SPECIFIC_DAYS |
| icon | String | optional |
| color | String | optional |
| createdAt | LocalDateTime | |
| fields | List\<FieldDefinition\> | OneToMany |
| logs | List\<ActivityLog\> | OneToMany |

### FieldDefinition
| Field | Type | Note |
|-------|------|------|
| id | Long | PK |
| label | String | |
| type | FieldType | enum |
| position | int | display order |
| module | Module | FK → module_id |

### ActivityLog
| Field | Type | Note |
|-------|------|------|
| id | Long | PK |
| loggedAt | LocalDateTime | |
| notes | String | optional |
| module | Module | FK → module_id |
| values | List\<FieldValue\> | OneToMany |

### FieldValue
| Field | Type | Note |
|-------|------|------|
| id | Long | PK |
| value | String | always stored as text |
| log | ActivityLog | FK → log_id |
| fieldDefinition | FieldDefinition | FK → field_def_id |

---

## Enums

```java
enum FrequencyType { DAILY, SPECIFIC_DAYS, MONTHLY }
enum FieldType     { NUMBER, TEXT, BOOLEAN }
// DayOfWeek is built into java.time
```

---

## Relationships
- `Module` → `FieldDefinition` — OneToMany (one module has many field definitions)
- `Module` → `ActivityLog` — OneToMany (one module has many log entries)
- `ActivityLog` → `FieldValue` — OneToMany (one log has many field values)
- `FieldValue` → `FieldDefinition` — ManyToOne (many values reference one field def)

---

## Package Structure
```
com.modulog/
├── model/
│   ├── Module.java
│   ├── FieldDefinition.java
│   ├── ActivityLog.java
│   ├── FieldValue.java
│   ├── FrequencyType.java
│   └── FieldType.java
├── repository/
│   ├── ModuleRepository.java
│   ├── FieldDefinitionRepository.java
│   ├── ActivityLogRepository.java
│   └── FieldValueRepository.java
├── service/
│   ├── ModuleService.java
│   ├── ActivityLogService.java
│   └── FrequencyService.java
└── controller/
    ├── ModuleController.java
    └── ActivityLogController.java
```

---

## REST Endpoints

### Modules
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/modules | get all modules for a user |
| POST | /api/modules | create module with field definitions |
| GET | /api/modules/{id} | get single module with its fields |
| PUT | /api/modules/{id} | update module name, frequency, fields |
| DELETE | /api/modules/{id} | delete module and all its logs |

### Logs
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/modules/{id}/logs | get all logs for a module |
| POST | /api/modules/{id}/logs | log a new session with field values |
| DELETE | /api/logs/{id} | delete a specific log entry |

### Status
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/modules/{id}/status | isOnTrack(), current streak |

---

## Build Order
1. **Enums + entities** — FrequencyType, FieldType, all 4 entity classes
2. **Repositories** — one JpaRepository per entity
3. **Module CRUD** — ModuleService + ModuleController, test with Postman
4. **Activity logging** — ActivityLogService + ActivityLogController
5. **Frequency logic** — FrequencyService, isOnTrack(), streak, /status endpoint