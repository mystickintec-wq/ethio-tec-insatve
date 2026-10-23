# The EthioTech Initiative — Backend & Database Schema Specification

## 1. Database Architecture & Evaluation

The platform supports a production-grade data layer with full relational schema design and atomic document persistence.

- **Storage Engine:** Express-integrated persistent data repository with transactional write synchronization. Designed to map directly to PostgreSQL (via Drizzle ORM) or Cloud SQL while operating zero-dependency in this environment.
- **Data Location:** Localized at `data/ethiotech_db.json` with in-memory write caching and atomic fs-write operations.

---

## 2. Entity Relational Definitions

### 2.1 Projects (`projects`)
- `id` (string, PK): Unique slug or UUID (e.g., `guzo-ai`, `agritech-vision`).
- `title` (string, required): Project display name.
- `tagline` (string, required): 1-line impact summary.
- `description` (string, required): Full technical overview and methodology.
- `category` (enum: `'AI & Machine Learning'`, `'AgriTech & Robotics'`, `'Systems & Cloud'`, `'IoT & Telematics'`).
- `status` (enum: `'Active Development'`, `'Pilot Research'`, `'Deployed'`).
- `technologies` (string array): List of frameworks/languages (e.g., `["Python", "PyTorch", "FastAPI", "React"]`).
- `githubUrl` (string, optional): Open-source repository link.
- `demoUrl` (string, optional): Live demonstration link.
- `lead` (string): Lead engineer / researcher name.
- `featured` (boolean): Whether highlighted on homepage.
- `createdAt` / `updatedAt` (ISO timestamp).

### 2.2 Articles (`articles` — ETHIOTECH INTEL)
- `id` (string, PK): Slug identifier.
- `title` (string, required): Headline.
- `slug` (string, unique).
- `category` (enum: `'AI & ML'`, `'Engineering'`, `'Cybersecurity'`, `'Robotics'`, `'Ecosystem & News'`, `'Opportunities'`).
- `summary` (string, required): 2-line executive summary.
- `content` (string, markdown): Full article body.
- `author` (object): Name, role, avatar.
- `readTimeMinutes` (number): Estimated reading time.
- `publishedAt` (ISO timestamp).
- `status` (enum: `'published'`, `'draft'`).
- `tags` (string array).

### 2.3 Events (`events`)
- `id` (string, PK).
- `title` (string, required).
- `type` (enum: `'Hackathon'`, `'Workshop'`, `'Symposium'`, `'Tech Talk'`).
- `date` (string): Human readable and ISO date.
- `time` (string): EAT (East Africa Time).
- `location` (string): Campus or virtual platform (e.g. `AAU 4-Kilo Campus, ICT Hall & Virtual`).
- `description` (string).
- `speakers` (array of speaker objects).
- `registrationUrl` (string).
- `capacity` (number).
- `status` (enum: `'Upcoming'`, `'Completed'`, `'Registration Open'`).

### 2.4 Applications (`applications`)
- `id` (string, PK, e.g. `ET-2026-XXXX`).
- `fullName` (string, required).
- `email` (string, required, validated).
- `phone` (string, optional).
- `institution` (string, e.g., `Addis Ababa University`, `ASTU`, `AASTU`, etc.).
- `fieldOfStudy` (string).
- `track` (enum: `'AI & Machine Learning'`, `'Full-Stack & Cloud Systems'`, `'Robotics, IoT & Embedded Systems'`, `'Cybersecurity & Networks'`).
- `experienceLevel` (enum: `'Beginner'`, `'Intermediate'`, `'Advanced'`).
- `githubUrl` (string, optional).
- `portfolioUrl` (string, optional).
- `statement` (string, required): Statement of purpose.
- `status` (enum: `'Pending Review'`, `'Shortlisted'`, `'Accepted'`, `'Archived'`).
- `reviewerNotes` (string, optional).
- `submittedAt` (ISO timestamp).

### 2.5 Contact Submissions (`contact_submissions`)
- `id` (string, PK).
- `name` (string, required).
- `email` (string, required).
- `subject` (string, required).
- `message` (string, required).
- `type` (enum: `'Partnership'`, `'University Chapter'`, `'Press & Media'`, `'General'`).
- `receivedAt` (ISO timestamp).
