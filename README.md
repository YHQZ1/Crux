# Crux — Operations & Supply Chain Consultancy Platform

> CA2 Design Thinking Project | Symbiosis Institute of Technology, Pune
> Department of Computer Science Engineering | Batch 2023–27, Semester VI

---

## Problem Statement

**Consultancy Startup — Website**

Design and develop a fully functional, industry-ready website for a startup providing training and consultancy services in Supply Chain Management, Vendor Development, Procurement Strategy, Six Sigma, Logistics, Inventory Management, and ESG.

---

## Design Thinking Process

### Stage 1 — Empathy

We identified two primary user groups through interviews and surveys:

**Target Users:**

- Operations managers and supply chain heads at mid-size manufacturing firms
- Procurement leads at FMCG and logistics companies
- C-suite executives evaluating consultancy partnerships

**Key Pain Points Discovered (from 7 user interviews):**

- Difficulty finding a consultancy that specialises specifically in operations rather than general business strategy
- No transparent view of deliverables or past results before engagement
- Lack of digital tools to self-assess operational efficiency (ESG, procurement health)
- Trust barriers — hard to evaluate credibility of a new consultancy without case studies and social proof

**Empathy Summary:** Users do not just want a brochure website. They want to feel confident that the consultancy understands their specific industry problems and has solved them before.

---

### Stage 2 — Define

**Problem Statement:**

Operations-heavy companies struggle to find credible, specialised consultancies with transparent track records and digital tools that let them assess fit before committing to an engagement.

**HMW (How Might We) Statement:**

How might we design a consultancy website that builds trust, demonstrates domain expertise, and gives potential clients a way to self-qualify their needs — all before a single conversation?

---

### Stage 3 — Ideate

**Ideation Techniques Used:**

1. **Brainstorming (team of 4)** — generated 30+ feature ideas in 20 minutes; voted on impact vs effort
2. **Mind Mapping** — mapped from core problem outward: Trust → Proof → Tools → Engagement

**Ideas Generated:**

- ESG self-assessment calculator (shortlisted)
- Client dashboard with project tracking (shortlisted)
- Interactive case study timelines
- Industry-specific landing pages
- Chatbot for initial scoping
- Video testimonials section
- Downloadable whitepapers

**Finalized Solution:** A full-stack consultancy website with public marketing pages, a functional ESG calculator, and a protected client dashboard — combining credibility-building content with actual utility.

---

### Stage 4 — Prototype

**What We Built:**

A full-stack web application named **Crux** — built with React + TypeScript on the frontend and Node + Express + Supabase on the backend.

**Pages:**

| Page           | Type      | Purpose                                                  |
| -------------- | --------- | -------------------------------------------------------- |
| Home           | Public    | Hero, stats, services overview, case study previews, CTA |
| About          | Public    | Vision, mission, team, company story                     |
| Services       | Public    | All 7 service areas with detail                          |
| Industries     | Public    | Manufacturing, FMCG, Automotive, Pharma solutions        |
| Case Studies   | Public    | 3 detailed simulated client stories with metrics         |
| Blog           | Public    | Insights and thought leadership articles                 |
| Contact        | Public    | Consultation booking form (saved to Supabase)            |
| Login          | Auth      | JWT-based client authentication                          |
| ESG Calculator | Protected | Interactive calculator — inputs mapped to ESG score      |
| Dashboard      | Protected | Client portal with project status, KPIs, charts          |

**Tech Stack:**

- Frontend: Vite + React + TypeScript + Tailwind CSS v4
- Backend: Node.js + Express + TypeScript (ESM modules)
- Database: Supabase (PostgreSQL)
- Auth: JWT + bcrypt
- Hosting: Vercel (frontend) + Render (backend)

---

### Stage 5 — Test

**User Testing:**

Shared the working prototype with 5 users (mix of students, working professionals).

**Feedback Summary:**

| What Worked                             | What Needs Improvement                       |
| --------------------------------------- | -------------------------------------------- |
| Clean, professional aesthetic           | Mobile responsiveness needs refinement       |
| ESG calculator felt genuinely useful    | More case study detail requested             |
| Login flow was smooth                   | Dashboard needs more real data visualisation |
| Services section was clear and detailed | Blog needs more articles                     |

**Iterations Made:**

- v1: Basic page structure, static content
- v2: Added ESG calculator logic, protected routes, auth flow
- v3: Polished UI, added case studies, client strip, CTA sections

---

## Project Structure

```
Crux/
├── client/                   # React + TypeScript frontend
│   ├── src/
│   │   ├── api/              # Axios instance with auth interceptor
│   │   ├── components/       # Navbar, Footer, ProtectedRoute
│   │   ├── context/          # AuthContext, ThemeContext
│   │   ├── hooks/            # useAuth, useTheme
│   │   └── pages/            # All 10 pages
│   └── vite.config.ts
│
└── server/                   # Node + Express + TypeScript backend
    └── src/
        ├── config/           # Supabase client
        ├── controllers/      # auth, contact, esg
        ├── middleware/       # JWT auth middleware
        ├── routes/           # API route definitions
        ├── services/         # Business logic
        └── types/            # Shared TypeScript interfaces
```

---

## API Endpoints

| Method | Route              | Auth | Description                |
| ------ | ------------------ | ---- | -------------------------- |
| POST   | /api/auth/register | No   | Register new user          |
| POST   | /api/auth/login    | No   | Login, returns JWT         |
| POST   | /api/contact       | No   | Submit contact form        |
| POST   | /api/esg           | Yes  | Submit ESG data, get score |
| GET    | /api/esg/history   | Yes  | Get user's ESG history     |

---

## Running Locally

**Backend:**

```bash
cd server
npm install
npm run dev        # runs on port 3000
```

**Frontend:**

```bash
cd client
npm install
npm run dev        # runs on port 5173
```

**Environment Variables:**

`server/.env`

```
PORT=3000
JWT_SECRET=your_secret
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_key
```

`client/.env`

```
VITE_API_URL=http://localhost:3000
```

---

## Team

| Name             |
| ---------------- |
| Jeel Patel       |
| Kisna Kanti      |
| Rut Vaghani      |
| Uttkarsh Ruparel |

**Problem Statement Chosen:** Consultancy Startup — Website (Option 3)

---

## Innovations Introduced

- ESG Calculator with real scoring logic backed by a database
- JWT-protected client portal — not just a static page
- Full-stack architecture with persistent data storage
- Theme system (dark/light) with zero-delay toggle
- Simulated client dashboard with data visualisation

## Challenges Faced

- ESM module resolution with ts-node required switching to `tsx`
- Tailwind v4 configuration differs significantly from v3
- Supabase RLS (Row Level Security) needed to be configured for protected routes

## Future Scope

- Real client onboarding with document upload
- Live project tracking integrated with tools like Asana or Jira
- AI-powered supply chain diagnostics module
- Multi-tenant dashboard for different client organisations
- Mobile app version for on-the-go project tracking
