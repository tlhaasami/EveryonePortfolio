# EveryonePortfolio — Build Path & Requirements Guide

This document turns the PRD into an actionable build plan: what order to build things in, what accounts/tools you need, and — importantly — what content and assets **you personally need to supply** (images, text, credentials) at each stage.

---

## 1. How to Use This Guide

Build in phases, not all at once. Each phase below is something you could ship and test before moving to the next. Skipping straight to 3D/AI before auth + CMS work is the most common way these projects stall.

**Recommended order:**
1. Foundation & Auth
2. Database schema + multi-tenancy
3. Dashboard shell + Portfolio CMS (content editing)
4. Public portfolio rendering (`/u/username`)
5. Appearance engine (themes/customization)
6. Resume builder
7. Analytics
8. Smart Assistant (rule-based first, AI-optional later)
9. 3D experience layer
10. Super admin panel
11. Polish, SEO, deploy, custom domain

---

## 2. Accounts & Services You Need to Create

| Service | Purpose | Cost |
|---|---|---|
| GitHub | Version control, CI | Free |
| Vercel | Frontend hosting | Free tier |
| Supabase | Postgres DB, Auth, Storage, Edge Functions | Free tier |
| Resend / SendGrid (or Supabase email) | Email verification, password reset | Free tier |
| A LaTeX renderer (e.g. `latex.js`, `tectonic`, or a hosted LaTeX-to-PDF API) | Resume PDF generation | Free/OSS |
| (Optional, later) OpenAI/Anthropic/Ollama key | Only if you want smarter AI features beyond rule-based | Optional |
| Domain registrar (Namecheap, Cloudflare, etc.) | Future custom domains | Optional, paid |

You don't need any paid AI API to hit the MVP — the PRD explicitly designs the Smart Assistant layer to work rule-based/RAG-only first.

---

## 3. What YOU Need to Provide (Content & Assets Checklist)

This is the part most people underestimate. The CMS is only as good as the seed content you use to build and test it. Prepare these **before** or **while** building the CMS forms, since each field in the PRD maps to a real asset or piece of text.

### 3.1 Images Required

| Image | Recommended Size/Ratio | Used In |
|---|---|---|
| Profile / Hero photo | Square or 4:5, min 800×800px | Hero section |
| Favicon | 512×512px (png), will be resized | Browser tab |
| Open Graph / Social share image | 1200×630px | SEO / link previews |
| Background image or texture (optional) | 1920×1080px | Hero background |
| Project thumbnail (one per project) | 16:9, min 1280×720px | Projects grid |
| Project gallery images (multiple per project) | 16:9 or original screenshots | Project detail page |
| Architecture diagrams (per project, optional) | PNG/SVG | Project detail page |
| Certificate images (one per certificate) | Scanned/exported cert, portrait or landscape | Certificates section |
| Certificate PDFs (optional, alongside image) | PDF | Certificates section |
| Testimonial headshots | Square, 200×200px+ | Testimonials |
| Company/organization logos (for experience & certs) | PNG with transparent background preferred | Experience, Certificates |
| Skill icons | SVG/PNG, 64×64px (or use an icon library like Simple Icons / Devicon instead of uploading your own) | Skills section |

**Tip:** For skill icons you usually don't need to source your own — use an existing icon set (Devicon, Simple Icons, Lucide) and just store the icon *name* in the database, not an uploaded file.

### 3.2 Text Content Required

- Full name, title/role, subtitle/tagline
- Short intro (1–2 sentences) and longer bio (1–2 paragraphs)
- Personal timeline entries (year + short description)
- Personal stats (e.g., "3+ years experience", "20+ projects")
- Current focus / interests (short list)
- Skills list with: name, category, proficiency level, years of experience
- For each project: title, description, tech stack, key features, architecture summary, challenges faced, lessons learned, your role, duration, status, GitHub link, live demo link
- For each job/experience: company, position, dates, responsibilities, achievements, tech used
- For each education entry: institution, degree, dates, CGPA/GPA, relevant coursework
- For each certificate: name, issuing org, date, credential ID, verification link
- Achievements/awards list
- Testimonials: name, company, role, quote, rating
- Contact details: email, phone (optional), social links (GitHub, LinkedIn, X, etc.)
- SEO metadata: page title, meta description, keywords

### 3.3 Files Required for the Resume Builder

- A LaTeX resume template (or you pick one of the common open-source ones: Awesome-CV, Deedy, Modern-Resume) to adapt into a dynamic template
- Decide which portfolio fields map into which resume sections (this becomes your template's variable list)

### 3.4 Technical/Deployment Inputs

- A chosen platform username scheme (this becomes each user's `/u/username`)
- Environment variables you'll need to fill in `.env`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
  - `RESEND_API_KEY` or equivalent email provider key
  - (Optional) `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / local Ollama endpoint

---

## 4. Phase-by-Phase Build Path

### Phase 1 — Foundation
- Init monorepo using the folder structure from the PRD (`apps/web`, `packages/*`, `modules/*`, `services/*`)
- Set up Next.js (App Router) + TypeScript + Tailwind + Shadcn/UI
- Set up ESLint, Prettier, Husky, lint-staged
- Connect GitHub repo, deploy a "Hello World" to Vercel to confirm the pipeline works

### Phase 2 — Auth & Multi-Tenancy
- Set up Supabase project, enable Auth
- Build Register/Login/Logout/Forgot Password/Email Verification flows
- Add username reservation logic (uniqueness check on register)
- Design the database schema with a `users` table + one table per CMS section (projects, skills, experience, education, certificates, testimonials, etc.), all foreign-keyed to `user_id`
- Enable Row Level Security so each user can only read/write their own rows
- Add protected route middleware for `/dashboard/*`

### Phase 3 — Portfolio CMS
- Build CRUD forms (React Hook Form + Zod validation) for every section in 3.2 above
- Wire up Supabase Storage for image uploads (profile photo, project images, certificate images/PDFs)
- This is where you'll actually use the assets/content you gathered in Section 3

### Phase 4 — Public Portfolio Rendering
- Build `/u/[username]` route that server-fetches that user's published content
- Render Hero, About, Skills, Projects, Experience, Education, Certificates, Achievements, Testimonials, Services, Contact
- Add SEO metadata generation per user (dynamic `<title>`, meta description, OG image)

### Phase 5 — Appearance Engine
- Store per-user theme settings (colors, fonts, radius, shadows, layout, section order/visibility) in a `theme_settings` table
- Build a live-preview settings panel in the dashboard
- Apply theme via CSS variables at render time

### Phase 6 — Resume Builder
- Build a template-filling pipeline: portfolio data → LaTeX template → compiled PDF
- Let users pick which projects/skills/experience/certs to include per resume version
- Add live preview and PDF download

### Phase 7 — Analytics
- Track page views, visitor country/device/browser, project click-throughs, resume download counts
- Store in Supabase; show charts in dashboard (e.g., using Recharts)

### Phase 8 — Smart Assistant Layer (rule-based first)
- Portfolio Health Analyzer: rule checks against completeness of each section, scored
- Resume Optimizer & Skill Gap Analyzer: rule-based matching against a curated skills/career-profile dataset you create
- Portfolio Knowledge Assistant (RAG chatbot): only needs an AI key if you want a real LLM to answer; otherwise can start as simple keyword search over the user's own content
- Career Roadmap Generator: predefined learning-path JSON data mapped against user's existing skills

### Phase 9 — 3D Experience Layer
- Add React Three Fiber + Drei + Three.js scene(s)
- Let users toggle 3D on/off and pick a scene + accent color
- Keep this optional/lazy-loaded so it doesn't hurt performance for users who disable it

### Phase 10 — Super Admin Panel
- Build an admin-only route (role-gated) for user management, platform settings, feature flags, storage/usage monitoring

### Phase 11 — Polish & Launch
- Accessibility pass, responsive QA, Playwright/Vitest test coverage
- Final SEO pass, sitemap, robots.txt
- Deploy, then (optional) wire up custom domain support

---

## 5. Quick-Start Checklist (What to Prepare This Week)

- [ ] GitHub + Vercel + Supabase accounts created
- [ ] Your own profile photo, hero background, favicon, OG image ready
- [ ] At least 2–3 real projects with thumbnails, gallery images, and full descriptions written out
- [ ] Skills list drafted with categories and levels
- [ ] Experience & education history written out
- [ ] Certificates collected (images/PDFs + verification links)
- [ ] 1–2 testimonials (real or placeholder) with headshots
- [ ] A LaTeX resume template chosen
- [ ] `.env` file scaffolded with the keys listed in Section 3.4

Once these are in hand, Phases 1–4 above will move quickly since you won't be blocked waiting on content while building the CMS.


this is for testing what was happening here