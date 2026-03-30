<div align="center">

# 🧩 ModuLog

**A modular, customizable leisure activity tracker.**
Build your own tracking system — your activities, your fields, your rhythm.

![Java](https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL_16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)

</div>

---

## 📖 What is ModuLog?

Most habit trackers force you into their mold — fixed categories, rigid fields, someone else's idea of what matters.

**ModuLog flips that.** You define the modules. You define what gets tracked inside each one. Guitar practice with BPM and song name? Done. Gym sessions with sets, reps, and mood? Also done. ModuLog doesn't care what you track — it just gives you the infrastructure to do it cleanly.

Each **Activity Module** is a self-contained unit with:
- A name and frequency schedule (daily, weekly, specific days, etc.)
- Custom **Field Definitions** — the exact data points you care about
- **Activity Logs** — timestamped entries recording your actual sessions
- **Field Values** — the concrete data captured per log, per field

---

## ✨ Features

- 🧱 **Fully modular tracking** — create any activity with any shape of data
- 🔐 **JWT-based authentication** with secure register/login flows
- 🌐 **OAuth2 social login** via Google and GitHub
- 📦 **EAV data model** — flexible enough to handle any field structure
- 🐳 **Dockerized PostgreSQL** — zero-friction local database setup
- 🔒 **Spring Security** with stateless session management

---

## 🗂️ Project Structure
```
modulog/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/modulog/
│   │   │   │   ├── auth/            # JWT, OAuth2, Security config
│   │   │   │   ├── module/          # ActivityModule domain
│   │   │   │   ├── log/             # ActivityLog & FieldValue
│   │   │   │   ├── field/           # FieldDefinition
│   │   │   │   ├── user/            # User entity & repo
│   │   │   │   └── dto/
│   │   │   │       ├── request/     # Inbound DTOs
│   │   │   │       └── response/    # Outbound DTOs
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── docker-compose.yml
│   ├── pom.xml
│   └── .env                         # Local env vars (git-ignored)
└── README.md
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Java 21** | Core language |
| **Spring Boot 3.2** | Application framework |
| **Spring Security** | Authentication & authorization |
| **Spring Data JPA** | ORM & database access |
| **Hibernate** | JPA implementation |
| **JJWT 0.12.3** | JWT token generation & validation |
| **Spring OAuth2 Client** | Social login (Google, GitHub) |

### Database
| Technology | Purpose |
|---|---|
| **PostgreSQL 16** | Primary relational database |
| **Docker + Docker Compose** | Local database container |

### Build & Config
| Technology | Purpose |
|---|---|
| **Maven** | Build tool & dependency management |
| **spring-dotenv** | `.env` file support for local secrets |

---

## 🗄️ Data Model

ModuLog uses an **EAV (Entity-Attribute-Value)** pattern to support fully flexible activity tracking.
```
User
 └── ActivityModule        (e.g. "Guitar Practice")
      ├── FieldDefinition  (e.g. "BPM" → NUMBER, "Song" → TEXT)
      └── ActivityLog      (a single session entry)
           └── FieldValue  (e.g. BPM = 120, Song = "Blackbird")
```

**Enums:**
- `FieldType` — `NUMBER` | `TEXT` | `BOOLEAN`
- `FrequencyType` — `DAILY` | `WEEKLY` | `SPECIFIC_DAYS` | `MONTHLY` | `YEARLY`

---

## 🚀 Getting Started

### Prerequisites

- Java 21+
- Docker & Docker Compose
- Maven (or use the included `./mvnw` wrapper)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/modulog.git
cd modulog/backend
```

### 2. Set up environment variables

Create a `.env` file in the `backend/` directory:
```env
POSTGRES_NAME=modulog
POSTGRES_USER=modulog_user
POSTGRES_PASSWORD=modulog_pass
JWT_SECRET=your_super_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 3. Start the database
```bash
docker-compose up -d
```

### 4. Run the application
```bash
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

---

## 🔐 Authentication

ModuLog supports two authentication strategies:

**Email / Password**
```
POST /api/auth/register
POST /api/auth/login
```

**OAuth2 Social Login**
- Google → `/oauth2/authorization/google`
- GitHub → `/oauth2/authorization/github`

All protected routes require a valid JWT passed as a Bearer token in the `Authorization` header.

---

## 🤝 Contributing

This is a personal project in active development. If you'd like to suggest ideas or report issues, feel free to open an issue.

---

<div align="center">
  Built with focus and too much coffee ☕
</div>