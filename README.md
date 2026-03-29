# InterviewForge

**AI-Powered Interview Preparation Platform**

A comprehensive interview preparation tool that analyzes resumes, generates personalized study plans, and provides realistic AI-driven mock interviews tailored to specific job descriptions.

---

## 🎯 Project Status

**Current Phase**: Foundation Complete (Phase 1-2 ✅)
- ✅ Project setup with Next.js 15, TypeScript, Tailwind v4
- ✅ Database schema (10 tables) with Drizzle ORM
- ✅ Authentication system with iron-session
- ✅ Basic app structure and routing

**Next Phase**: Feature Implementation (Phase 3-7 🚧)
- 68 remaining tasks tracked in [Issue #1](https://github.com/deepak78194/interviewforge/issues/1)
- See [BLUEPRINT.md](./BLUEPRINT.md) for complete feature specifications

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.14** (App Router, React 19, TypeScript strict mode)
- **Tailwind CSS v4** (with `@theme inline` configuration)
- **Radix UI** (Headless components for accessibility)
- **Lucide React** (Icon system)

### Backend
- **Drizzle ORM 0.45.2** (Type-safe database queries)
- **Neon Serverless Postgres** (with connection pooling)
- **iron-session 8.0.4** (Secure session management)

### AI Integration
- **Vercel AI SDK 4.1.13** (Multi-provider support)
- **Google Gemini 2.0 Flash** (Resume analysis, study plans)
- **OpenAI GPT-4o** (Interview simulation)
- **Anthropic Claude 3.5** (Code review, answer evaluation)

---

## 📁 Project Structure

```
my-app/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/       # Auth-protected routes
│   │   └── api/          # API routes
│   ├── drizzle/          # Database layer
│   │   ├── schema/       # Table definitions (10 schemas)
│   │   └── db.ts         # Database client
│   ├── lib/              # Utility functions
│   │   ├── ai/           # AI provider clients
│   │   ├── session.ts    # Authentication
│   │   └── utils.ts      # Helpers
│   └── components/       # React components (to be built)
├── BLUEPRINT.md          # Complete feature specifications
└── package.json          # 502 packages installed
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/deepak78194/interviewforge.git
   cd interviewforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env.local`:
   ```env
   # Database
   DATABASE_URL="postgresql://..."
   
   # AI Providers
   GOOGLE_GENERATIVE_AI_API_KEY="..."
   OPENAI_API_KEY="..."
   ANTHROPIC_API_KEY="..."
   
   # Session (generate 32-byte secret)
   SESSION_SECRET="your-32-character-secret-here"
   ```

4. **Push database schema**
   ```bash
   npm run db:push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   Navigate to http://localhost:3000

---

## 🗄️ Database Schema

**10 Tables (all defined in `src/drizzle/schema/`)**:
1. `users` - User accounts (single-user system)
2. `jobInfo` - Target job descriptions
3. `topics` - Interview topics/categories
4. `questions` - Interview questions bank
5. `answers` - User's practice answers
6. `interviews` - Mock interview sessions
7. `resumeAnalysis` - AI-parsed resume data
8. `studyPlan` - Generated study plans
9. `studyPlanDay` - Daily study breakdown
10. `studyPlanTask` - Individual tasks per day
11. `practiceHistory` - Answer evaluation tracking

---

## 🎯 Features to Build (68 Tasks Remaining)

### Phase 3: Resume & Job Analysis
- PDF resume upload with AI extraction
- Job description form with AI parsing
- Gap analysis and skill comparison

### Phase 4: Study Plan Generation
- 14-30 day adaptive study plans
- Daily task breakdown
- Progress tracking with checkboxes

### Phase 5: Practice Mode
- Topic-based question practice
- AI answer evaluation
- Confidence tracking

### Phase 6: Mock Interview
- Realistic interview simulation
- Real-time AI responses
- Performance feedback

### Phase 7: Progress Dashboard
- Visual progress charts
- Study plan tracking
- Interview readiness score

**See [Issue #1](https://github.com/deepak78194/interviewforge/issues/1) for complete task breakdown**

---

## 📝 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
npm run db:generate  # Generate migrations
```

---

## 🏗️ Architecture Decisions

### Authentication
- **iron-session** (single-user, password-only)
- No OAuth/multi-tenancy needed
- Session stored in encrypted cookies

### AI Strategy
- **Multi-provider**: Use best model for each task
- **Gemini 2.0 Flash**: Fast resume/job analysis
- **GPT-4o**: Interview conversation
- **Claude 3.5**: Code review, evaluation

### Mobile Strategy
- **Responsive-first**: Tailwind breakpoints
- **Progressive Enhancement**: Core features work on mobile
- **No Native App**: PWA approach for mobile web

### State Management
- **Server Components**: Default for data fetching
- **Client Components**: Only when needed (forms, interactions)
- **No Redux**: React hooks + Server Actions sufficient

---

## 🤝 Contributing

This project is currently in active development by autonomous AI agents. Progress is tracked in GitHub Issues.

**Current Work**: [Issue #1 - Feature Implementation](https://github.com/deepak78194/interviewforge/issues/1)

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🔗 Links

- **Blueprint**: [BLUEPRINT.md](./BLUEPRINT.md) - Complete feature specifications
- **Active Tasks**: [Issue #1](https://github.com/deepak78194/interviewforge/issues/1)
- **Database Schema**: [src/drizzle/schema/](./src/drizzle/schema/)

---

**Last Updated**: March 30, 2026  
**Build Status**: Foundation Complete ✅ | Features In Progress 🚧