# InterviewForge — Complete App Blueprint (Enhanced for Single User)

> **Personal-use only.** Single-user, zero-cost, zero-compromise. This app is locked to you alone via a password — no multi-user auth, no subscriptions, no vendor lock-in.

Source inspiration: https://github.com/WebDevSimplified/ai-powered-job-prep.git

## 1. App Name + Elevator Pitch

**InterviewForge** — Forge your way into any job.

InterviewForge is a **personal, mobile-friendly interview preparation platform** that uses AI to:
- Generate tailored questions and give scored feedback
- Conduct voice mock interviews (free, browser-native)
- Analyze your resume against a job description
- Let you write and run code in a browser editor
- Track daily progress with a **structured study plan**
- Show improvement over time with charts and streaks

Built for one person (you). Locked behind a password. Deployed to Vercel for free. Total cost: $0/month.

---

## 2. Full Tech Stack

| Concern | Tool | Why | Cost |
|---|---|---|---|
| **Framework** | Next.js 15 (App Router) | RSC + Server Actions + Streaming. Monorepo. | Free |
| **Language** | TypeScript (strict) | Type safety across AI schemas, DB, forms. | Free |
| **Database** | Neon.tech PostgreSQL | Serverless Postgres, 0.5 GB free, autoscales to zero. | Free |
| **ORM** | Drizzle ORM | Type-safe, lightweight, great migration tooling. | Free |
| **Auth** | `iron-session` + password | Single-user: one env var password, encrypted cookie. No Clerk needed. | Free |
| **AI SDK** | Vercel AI SDK (`ai` package) | Model-agnostic. Streaming built-in. | Free |
| **AI Models** | Gemini 2.5 Flash (default), GPT-4.1, Claude Sonnet 4.5 | Via your existing API keys / GitHub Copilot access. | Free |
| **Voice Interview** | Web Speech API | Runs 100% in browser. Zero cost. Unlimited. | Free |
| **Rate Limiting** | In-memory (single user) | No Upstash needed — you're the only user. Add it only if deploying publicly. | Free |
| **UI Components** | shadcn/ui + Tailwind CSS v4 | Excellent mobile support. Radix primitives. | Free |
| **Charts** | Recharts | Lightweight React charts for progress tracking. | Free |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) | VS Code in the browser. Perfect for coding questions. | Free |
| **Notifications** | Web Push API (self-hosted VAPID) | Browser push with no third-party service. | Free |
| **Hosting** | Vercel (Hobby) | Auto deploys, edge functions, image optimization. | Free |
| **File Storage** | Vercel Blob | Resume uploads. Integrates natively. 500 MB free. | Free |
| **Caching** | Next.js `unstable_cache` + revalidation tags | No external cache needed for single user. | Free |

**Total monthly cost: $0**

See BLUEPRINT.md in local repo for full content (18 sections, ~1900 lines covering schema, auth design, folder structure, AI prompts, mobile strategy, migration plan, and implementation steps).
