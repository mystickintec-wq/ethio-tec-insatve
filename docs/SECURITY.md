# The EthioTech Initiative — Security & Threat Modeling

## 1. Threat Model & Security Controls

1. **API Key Confidentiality:**
   - The `GEMINI_API_KEY` is exclusively consumed server-side in `server.ts`.
   - Never exposed through client bundles or Vite client environment variables (`VITE_*`).
   - Requests carry `User-Agent: aistudio-build`.

2. **Input Validation & Sanitization:**
   - All client-submitted payloads (membership applications, contact messages, admin mutations) undergo strict payload type and length validations.
   - Text inputs are trimmed and escaped to guard against XSS and injection attacks.

3. **Access Control & Administrative Guardrails:**
   - Administrative API routes (`/api/admin/*`) require an authorization header (`Bearer <admin_token>` or PIN check).
   - Sensitive applicant data (personal contact info, academic transcripts) is withheld from public read endpoints.

4. **Rate Limiting & Abuse Prevention:**
   - AI generation endpoints implement a per-IP / per-session rate limit window (max 30 queries per 10 minutes) to prevent resource exhaustion.
