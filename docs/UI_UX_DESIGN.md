# The EthioTech Initiative — UI/UX Design System Specification

## 1. Visual Direction & Identity

- **Atmosphere:** Dark, futuristic, refined, premium, and engineering-centric.
- **Rooted Inspiration:** Ethiopian architectural monuments (Axum Stele) fused with modern computational circuits and glowing neural network synapses, directly harmonized with the verified official logo.
- **Anti-AI Slop Enforcement:**
  - Zero pill containers for static metadata (tags, dates, statuses use quiet text with `·` separators).
  - No decorative status/pulsing green dots on static content.
  - No `//` comment syntax on section headings.
  - No fake telemetry ("ONLINE // LATENCY: 12ms") or fabricated AI scores.
  - No asymmetric thick left accent borders (`border-l-4`).
  - Standard, human button labels (`"Submit Application"`, `"Read Article"`, `"Ask Mentor"`).

---

## 2. Color Palette & Semantic Tokens

```css
/* Color Distribution: 60% Canvas, 30% Structural, 10% Accent */
--canvas-primary: #070b14;        /* Deep obsidian / night sky */
--canvas-secondary: #0b1322;      /* Midnight navy */
--surface-card: #0f1b2d;          /* Card background */
--surface-card-hover: #16263f;    /* Card hover state */
--border-subtle: rgba(255, 255, 255, 0.08); /* Hairline card boundary */
--border-accent: rgba(16, 185, 129, 0.25);  /* Subtle emerald accent boundary */

/* Accent Palette (10%) */
--accent-emerald: #10b981;        /* Tech node glowing green */
--accent-emerald-glow: #34d399;   /* Synapse highlight */
--accent-gold: #e5b842;           /* Axum bronze-gold */
--accent-gold-dark: #b88e28;      /* Deep gold */

/* Typography */
--text-primary: #f8fafc;          /* High-contrast white */
--text-secondary: #94a3b8;        /* Muted slate prose */
--text-muted: #64748b;            /* Subdued metadata */
```

---

## 3. Typographic Hierarchy

- **Display Headline:** `Plus Jakarta Sans`, font weights 700–800, tight tracking (`tracking-tight`), `text-wrap: balance`.
- **Section Headings:** Sized 24px–36px, clean editorial title case.
- **Body Prose:** `Plus Jakarta Sans`, 15px–16px, line-height 1.6, max measure 65–75ch.
- **Tabular Data & Code:** `JetBrains Mono`, `tabular-nums`, font weights 400–600.

---

## 4. Top Bar Navigation Contract

- **Zone 1 (Brand Wordmark):** Verified logo (`public/images/ethiotech-logo.jpeg`) accompanied by a clean, single-element title: "The EthioTech Initiative".
- **Zone 2 (Nav Links):** Single-line links with subtle underline hover (`Home`, `Projects`, `Intel`, `Events`, `Departments`, `AI Mentor`).
- **Zone 3 (Primary Action):** Single prominent action button (`Apply to Join` / `Member Portal`).
