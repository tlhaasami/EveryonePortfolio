# EveryonePortfolio - Product Specification & Build Plan

Welcome to **EveryonePortfolio**, a full-stack, cloud-based **Portfolio Builder SaaS** that empowers users to build, customize, and manage professional portfolio websites, resume documents, and interactive experiences without writing a line of code.

This document serves as the project map and reference during the implementation phase.

---

## 🚀 Product Vision & Goal

To transform personal portfolios from static code files into a complete, database-driven **Professional Identity Platform**. 

- **Fully Dynamic & CMS-Driven:** Every section (Projects, Skills, Experience, Hero, etc.) is fully managed via a secure admin dashboard.
- **Multi-Tenant Architecture:** Secure, isolated user data via Supabase Row Level Security (RLS), served on dynamic URLs (`/u/username`).
- **Premium Aesthetics:** Stunning visuals, sleek dark/light modes, animations (Framer Motion, GSAP), and interactive 3D experiences (Three.js/React Three Fiber).
- **ATS-Friendly Resume Builder:** Generate professional PDF resumes using structured data directly from the portfolio.
- **Smart Assistant Layer:** Cost-free evaluation, recommendation, RAG portfolio chat, and skill gap tools operating without mandatory paid AI API costs.
- **Built-in Analytics:** Track views, traffic sources, project clicks, and download counts.

---

## 🛠️ Technology Stack

We are building EveryonePortfolio on a modern, robust, and scalable stack:

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Vanilla CSS
- **Component Library:** Shadcn/UI (Radix UI primitives)
- **Animations:** Framer Motion, GSAP, Lenis (Smooth Scroll)
- **3D Renderers:** Three.js, React Three Fiber (R3F), @react-three/drei
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Forms & Validation:** React Hook Form, Zod

### Backend & Database
- **Backend-as-a-Service:** Supabase
- **Database:** PostgreSQL (with RLS policies for multi-tenancy isolation)
- **Authentication:** Supabase Auth (OAuth, Email/Password, secure session management)
- **Storage:** Supabase Storage (for user assets, images, resume PDFs)
- **Edge Functions:** Supabase Edge Functions (for backend operations e.g. resume compilation, AI utilities)

---

## 📁 System Architecture & Directories

We will follow a modular architecture to organize our features, modules, and shared utilities:

```
src/
├── app/                  # Next.js App Router (Layouts, Pages, APIs)
│   ├── (auth)/           # Authentication routes (login, register, forgot-password)
│   ├── (dashboard)/      # Admin control panel for portfolio management
│   ├── u/[username]/     # Dynamic public portfolio rendering engine
│   └── page.tsx          # Landing website
├── components/           # UI Components
│   ├── shared/           # Common components (Buttons, Inputs, Modals)
│   ├── dashboard/        # Dashboard-specific CMS & settings editors
│   ├── portfolio/        # Portfolio-specific section components
│   └── three/            # 3D scenes and elements
├── hooks/                # Custom React Hooks
├── lib/                  # Library configurations (supabase, state stores)
├── modules/              # Core business logic divided by domains
│   ├── ai/               # Knowledge assistant, resume optimization, gap analysis
│   ├── analytics/        # Visitor tracking & data collection
│   ├── appearance/       # Styling options, layouts, light/dark themes
│   ├── resume/           # Resume compilation pipelines
│   └── seo/              # Dynamic meta-tags and preview helpers
├── public/               # Static assets
└── types/                # TypeScript type definitions and interfaces
```

---

## 📈 Next Steps

1. **Database Schema Design:** Configure Supabase tables (Users, Portfolios, Projects, Skills, Experience, Resumes, etc.) and Row Level Security.
2. **Landing Page & Authentication Flow:** Build the marketing frontpage and register/login portals.
3. **Admin Dashboard (CMS):** Establish the main forms to input, edit, and arrange profile details.
4. **Portfolio Rendering Engine:** Create responsive, high-performance web representations of the user portfolios.
5. **Aesthetics & 3D Integration:** Add interactive animations and the optional 3D Scene Layer.
6. **Resume Builder & AI Layer:** Design resume PDF generation and rule-based portfolio analyzers.
