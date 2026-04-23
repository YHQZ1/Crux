# CRUX — Full Project Context & Continuation Prompt

Use this file as a prompt to continue building the Crux project. It contains everything — architecture decisions, stack, structure, completed work, and what still needs to be built.

---

## Project Overview

**Name:** Crux
**Type:** Operations & Supply Chain Consultancy Website
**Purpose:** College project (CA2 Design Thinking) — but built like a real commercial product
**Marks:** 40 total

---

## Tech Stack (Finalised)

### Frontend

- Vite + React + TypeScript
- Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
- React Router DOM
- Axios (with auth interceptor)
- Recharts (for dashboard charts)
- Lucide React (icons)
- Google Fonts: Geist + Geist Mono

### Backend

- Node.js + Express + TypeScript
- ESM modules (`"type": "module"` in package.json)
- tsx (NOT ts-node — used for ESM compatibility)
- nodemon + tsx for dev
- JWT (jsonwebtoken) for auth
- bcrypt for password hashing
- @supabase/supabase-js for DB access
- dotenv, cors

### Database

- Supabase (PostgreSQL)

### Hosting

- Frontend: Vercel
- Backend: Render
- DB: Supabase (free tier)

---

## Monorepo Structure

```
Crux/
├── client/                          # Frontend
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.ts             # DONE — Axios instance, reads VITE_API_URL from .env, attaches JWT
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # DONE — fixed nav, theme toggle, auth-aware, lucide icons
│   │   │   ├── Footer.tsx           # TODO
│   │   │   └── ProtectedRoute.tsx   # DONE — redirects to /login if not authenticated
│   │   ├── context/
│   │   │   ├── AuthContext.ts       # DONE — createContext only, no hooks (fast refresh safe)
│   │   │   ├── AuthProvider.tsx     # DONE — lazy localStorage init, no useEffect setState
│   │   │   ├── ThemeContext.ts      # DONE — createContext only
│   │   │   └── ThemeProvider.tsx    # DONE — zero-delay theme toggle, kills transitions before switch
│   │   ├── hooks/
│   │   │   ├── useAuth.ts           # DONE
│   │   │   └── useTheme.ts          # DONE
│   │   ├── pages/
│   │   │   ├── Home.tsx             # DONE — hero split layout, stats, services grid, case studies list, CTA
│   │   │   ├── About.tsx            # TODO
│   │   │   ├── Services.tsx         # TODO
│   │   │   ├── Industries.tsx       # TODO
│   │   │   ├── CaseStudies.tsx      # TODO
│   │   │   ├── Blog.tsx             # TODO
│   │   │   ├── Contact.tsx          # TODO
│   │   │   ├── Login.tsx            # TODO
│   │   │   ├── Dashboard.tsx        # TODO — protected, recharts, simulated KPIs
│   │   │   └── ESGCalculator.tsx    # TODO — protected, posts to /api/esg, shows score
│   │   ├── App.tsx                  # DONE — all routes, ThemeProvider + AuthProvider wrapping
│   │   ├── main.tsx                 # DONE
│   │   └── index.css                # DONE — CSS vars for dark/light, Geist font, accent #0066FF
│   ├── .env                         # VITE_API_URL=http://localhost:3000
│   ├── index.html                   # Has Geist font Google Fonts link in <head>
│   ├── vite.config.ts               # Uses @tailwindcss/vite plugin
│   ├── tsconfig.json
│   └── package.json
│
└── server/                          # Backend
    ├── src/
    │   ├── config/
    │   │   └── supabase.ts          # DONE — createClient with SUPABASE_URL + SUPABASE_SERVICE_KEY
    │   ├── controllers/
    │   │   ├── auth.controller.ts   # DONE — register, login
    │   │   ├── contact.controller.ts # DONE — submitContact
    │   │   └── esg.controller.ts    # DONE — submitESG, fetchESGHistory
    │   ├── middleware/
    │   │   └── auth.middleware.ts   # DONE — protect(), attaches req.user from JWT
    │   ├── routes/
    │   │   ├── auth.routes.ts       # DONE — POST /register, POST /login
    │   │   ├── contact.routes.ts    # DONE — POST /
    │   │   └── esg.routes.ts        # DONE — POST / (protected), GET /history (protected)
    │   ├── services/
    │   │   ├── auth.service.ts      # DONE — registerUser, loginUser (bcrypt + JWT)
    │   │   ├── contact.service.ts   # DONE — saveContact to Supabase
    │   │   └── esg.service.ts       # DONE — calculateESGScore, saveESGResult, getESGHistory
    │   ├── types/
    │   │   └── index.ts             # DONE — User, ContactForm, ESGInput, JWTPayload interfaces
    │   ├── app.ts                   # DONE — express app, cors, routes mounted
    │   └── index.ts                 # DONE — dotenv.config(), app.listen()
    ├── .env                         # PORT, JWT_SECRET, SUPABASE_URL, SUPABASE_SERVICE_KEY
    ├── tsconfig.json                # module: NodeNext, moduleResolution: NodeNext
    └── package.json                 # type: module, dev: nodemon --exec tsx src/index.ts

```

---

## Supabase Tables (already created)

```sql
create table users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password text not null,
  role text default 'client',
  created_at timestamp default now()
);

create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  service text,
  message text,
  created_at timestamp default now()
);

create table esg_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  score integer,
  inputs jsonb,
  created_at timestamp default now()
);
```

---

## API Endpoints

| Method | Route              | Auth Required    | Description                      |
| ------ | ------------------ | ---------------- | -------------------------------- |
| POST   | /api/auth/register | No               | Register new user                |
| POST   | /api/auth/login    | No               | Returns JWT + user object        |
| POST   | /api/contact       | No               | Save contact form to Supabase    |
| POST   | /api/esg           | Yes (Bearer JWT) | Submit ESG inputs, returns score |
| GET    | /api/esg/history   | Yes (Bearer JWT) | Returns user's past ESG results  |
| GET    | /health            | No               | Health check                     |

---

## Auth Flow

1. User hits `/login` page, submits email + password
2. Frontend POSTs to `/api/auth/login`
3. Backend validates, returns `{ token, user }`
4. Frontend stores token in `localStorage` via `AuthProvider.login()`
5. Axios interceptor attaches `Authorization: Bearer <token>` to all requests
6. `/dashboard` and `/esg-calculator` are wrapped in `<ProtectedRoute>` — redirects to `/login` if no token

---

## Design System

### Colors (CSS variables)

```css
/* Accent */
--accent: #0066ff --accent-hover: #0052cc
  --accent-subtle: rgba(0, 102, 255, 0.08) /* Dark theme */ --bg: #0d0d0d
  --bg-secondary: #141414 --bg-tertiary: #1c1c1c --border: #222222
  --text-primary: #f2f2f2 --text-secondary: #777777 --text-muted: #444444
  --card-bg: #111111 /* Light theme */ --bg: #fafafa --bg-secondary: #f3f3f3
  --bg-tertiary: #ebebeb --border: #e4e4e4 --text-primary: #0d0d0d
  --text-secondary: #666666 --text-muted: #aaaaaa --card-bg: #ffffff;
```

### Typography

- Display/Headings: `Geist` (700–900 weight)
- Body: `Geist` (300–500 weight)
- Labels/Mono: `Geist Mono` (numbers, tags, IDs)

### Design Principles

- No gradients
- No border-radius above 8px
- No transition delays — all transitions either instant or removed
- Full width layout (no max-width container on outer sections)
- Internal padding: `32px` horizontal on all sections
- Lucide React for all icons — no emojis
- SaaS/fintech aesthetic (Linear, Stripe, Vercel energy)

---

## Pages — What Each Should Contain

### About (`/about`)

- Company origin story
- Vision & mission statements
- Leadership/team section (3-4 fake profiles with names, roles, short bios)
- "Why Crux" differentiators (4 points)
- Stats bar (same as homepage)

### Services (`/services`)

- Hero with tagline
- Each of the 7 services as full detail cards:
  1. Supply Chain Management
  2. Vendor Development
  3. Procurement & Purchase Strategy
  4. Six Sigma & Process Excellence
  5. Logistics & Distribution
  6. Inventory Management
  7. ESG Advisory
- Each card: icon, title, description, bullet points of deliverables, CTA

### Industries (`/industries`)

- 4 industries: Manufacturing, FMCG, Automotive, Pharma
- Each with: pain points specific to that industry + how Crux solves them
- Visual layout — 2x2 grid or tabbed

### Case Studies (`/case-studies`)

- 3 detailed case studies:
  1. Supply chain cost reduction for auto manufacturer (31% savings)
  2. Six Sigma defect reduction for Pune manufacturer (4.2% → 0.3%)
  3. ESG framework for FMCG logistics (carbon neutral roadmap)
- Each: client industry, challenge, approach, results with metrics, timeline

### Blog (`/blog`)

- 3 article cards minimum:
  1. "The Hidden Cost of Poor Vendor Development"
  2. "Why ESG is No Longer Optional for Manufacturers"
  3. "Six Sigma in 2025: Still Relevant?"
- Each card: tag, title, date, excerpt, read more link
- Individual article pages optional

### Contact (`/contact`)

- Form fields: Name, Email, Company, Service (dropdown), Message
- On submit: POST to `/api/contact`, show success state
- Side panel: address, email, phone (fake but realistic)
- "We respond within 24 hours" messaging

### Login (`/login`)

- Clean centered card
- Email + password fields
- Error state for wrong credentials
- On success: store token, redirect to `/dashboard`
- Link: "Not a client yet? Book a consultation →" to `/contact`

### ESG Calculator (`/esg-calculator`) — PROTECTED

- Input fields:
  - Energy consumption (kWh/month)
  - Waste generated (tonnes/month)
  - Employee count
  - Training hours per employee per year
  - Compliance score (0–100, self-reported)
- On submit: POST to `/api/esg`, display score (0–100)
- Show score with label: Poor / Average / Good / Excellent
- Show breakdown by category
- History table of past submissions (GET /api/esg/history)

### Dashboard (`/dashboard`) — PROTECTED

- Header: "Welcome back, [user email]"
- KPI cards: Active Projects, Completed Milestones, ESG Score, Next Review Date
- Line chart (Recharts): project progress over 6 months
- Bar chart (Recharts): cost savings by quarter
- Recent activity feed (static/simulated)
- Quick links: ESG Calculator, Contact, Logout

---

## ESG Score Logic (already implemented in backend)

```ts
const energyScore = Math.max(0, 100 - inputs.energy_consumption / 100);
const wasteScore = Math.max(0, 100 - inputs.waste_generated / 50);
const socialScore = Math.min(
  100,
  (inputs.training_hours / inputs.employee_count) * 20,
);
const complianceScore = inputs.compliance_score;
score = Math.round(
  (energyScore + wasteScore + socialScore + complianceScore) / 4,
);
```

---

## What's Left to Build (TODO)

Frontend pages:

- [ ] Footer.tsx
- [ ] About.tsx
- [ ] Services.tsx
- [ ] Industries.tsx
- [ ] CaseStudies.tsx
- [ ] Blog.tsx
- [ ] Contact.tsx (POST to /api/contact)
- [ ] Login.tsx (POST to /api/auth/login, store token)
- [ ] Dashboard.tsx (protected, recharts, simulated data)
- [ ] ESGCalculator.tsx (protected, POST to /api/esg, show score + history)

Deployment:

- [ ] Push to GitHub
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Render
- [ ] Add production env vars to both

---

## Important Notes

- All imports in server use `.js` extension (required for NodeNext ESM)
- `tsx` is used instead of `ts-node` for ESM compatibility
- Theme toggle kills all transitions before switching (zero delay flicker)
- `AuthProvider` uses lazy useState init from localStorage — no useEffect setState
- Context and Provider are split into separate files for Vite fast refresh compatibility
- Axios baseURL comes from `VITE_API_URL` env var — no hardcoded URLs
- Server CORS is set to `http://localhost:5173` for dev — update for production

---

## Running the Project

```bash
# Backend (port 3000)
cd server && npm run dev

# Frontend (port 5173)
cd client && npm run dev
```

Health check: `curl http://localhost:3000/health`
