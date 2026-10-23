# The EthioTech Initiative — API Reference

## Base URL: `/api`

### 1. Projects
- `GET /api/projects` — List all projects. Supports optional `?category=...&status=...`.
- `GET /api/projects/:id` — Retrieve single project by ID.
- `POST /api/projects` — Create project (Admin).
- `PUT /api/projects/:id` — Update project (Admin).
- `DELETE /api/projects/:id` — Delete project (Admin).

### 2. ETHIOTECH INTEL Articles
- `GET /api/articles` — List published articles. Supports `?category=...&tag=...&search=...`.
- `GET /api/articles/:slug` — Retrieve article by slug.
- `POST /api/articles` — Create article (Admin/Editor).
- `PUT /api/articles/:slug` — Update article (Admin/Editor).

### 3. Events
- `GET /api/events` — List tech events, hackathons, and workshops.
- `POST /api/events` — Create new event (Admin).

### 4. Membership Applications
- `POST /api/applications` — Submit new student membership application.
- `GET /api/applications/status?code=...` — Query application state and feedback.
- `GET /api/admin/applications` — List all submitted applications (Admin).
- `PUT /api/admin/applications/:id` — Update status (Shortlisted, Accepted, Archived) (Admin).

### 5. AI Learning Assistant
- `POST /api/ai/ask` — Submit inquiry to EthioTech AI Mentor.
  - Body: `{ prompt: string, history?: Array<{ role: string, content: string }> }`
  - Response: `{ answer: string, sources?: string[] }`

### 6. Contact Inquiries
- `POST /api/contact` — Submit general or partnership inquiry.
