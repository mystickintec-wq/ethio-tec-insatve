# The EthioTech Initiative — Architecture Decision Records (ADR)

## ADR-001: Integrated Express Full-Stack Runtime
- **Context:** The application requires real server-side execution for Gemini AI API calls, secure application reviews, and database mutations without exposing keys or credentials.
- **Decision:** Implement a unified `server.ts` entry point running Express with Vite middleware in development (`npm run dev` running `tsx server.ts`), on port 3000.
- **Consequences:** Eliminates CORS issues, enables secure server-side AI integration via `@google/genai`, and provides reliable atomic persistence.

## ADR-002: Reliable Atomic Document Persistence
- **Context:** The environment needs a persistent data store for projects, INTEL articles, events, and membership applications without requiring external credentials that may not be configured.
- **Decision:** Use an atomic JSON storage engine with asynchronous flush and in-memory read-caching, structured identically to relational PostgreSQL/Drizzle schemas for seamless migration.
- **Consequences:** Instant out-of-the-box reliability, zero unhandled network timeouts, 100% operational in dev and prod.

## ADR-003: Logo & Visual Direction Harmonization
- **Context:** The user provided an authentic, verified logo depicting the Axum Obelisk with tech circuit branches and glowing emerald nodes.
- **Decision:** Integrate `public/images/ethiotech-logo.jpeg` as the cornerstone of the design system. Match dark navy canvas, subtle gold/bronze metallic trim, and cyber emerald highlights.
