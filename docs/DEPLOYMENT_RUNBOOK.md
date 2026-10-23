# The EthioTech Initiative — Deployment Runbook

## 1. Local Development Environment
```bash
# Start full-stack development server on port 3000
npm run dev
```

## 2. Production Build & Execution
```bash
# Step 1: Compile TypeScript client and backend
npm run build

# Step 2: Launch production server
npm start
```

## 3. Environment Variable Configuration
- `GEMINI_API_KEY`: Injected automatically at runtime by AI Studio.
- `PORT`: Defaults to `3000`.
- `ADMIN_SECRET`: Configurable secret token for administrative dashboard actions.
