For something like myTeam (web + iOS + Android, Cyprus/EU reality), a modern monorepo with a single backend and two clients (web + Flutter) fits you best.[1]

## Recommended stack

- **Backend/API**
  - Language: **TypeScript** (you already use it heavily).
  - Framework: **NestJS** or Express + Zod (NestJS better for modules/roles).  
  - DB: **PostgreSQL** (multi-tenant friendly, works great in Dokploy).  
  - ORM: **Prisma** (fast schema iteration, migrations).  
  - Auth: JWT + refresh tokens, role-based (admin, manager, coach, parent, athlete).  
  - Payments: Integrations: **JCC / Viva / Stripe** for Cyprus/EU cards and SEPA.  
  - Notifications: Email (Resend/SendGrid) + push (Firebase Cloud Messaging).  

- **Web app (Backoffice + manager/coach portal)**
  - **Next.js 14 (app router) + TypeScript**.  
  - UI: **shadcn/ui + Tailwind CSS** for fast dashboards.  
  - Auth: next-auth or custom JWT session layer against the NestJS API.  

- **Mobile apps (Coaches, parents, athletes)**
  - **Flutter** (single codebase for iOS/Android).  
  - State mgmt: Riverpod or Bloc.  
  - API: REST/GraphQL to the NestJS backend, WebSockets for live attendance/notifications.  
  - Push: FCM + APNs via Firebase.  

- **Infrastructure (Dokploy)**
  - 3 services: **api**, **web**, **mobile CI/CD artifact** (or build Flutter separately), plus **Postgres** and **Redis** containers.  
  - Docker: multi-stage builds for api/web, external volume for Postgres, Traefik/nginx reverse proxy.  

## Core modules to implement (mirroring myTeam)

From the how-it-works pages:[1]

- Club & user management:
  - Clubs, academies, teams, age groups, facilities, training locations.  
  - Users with roles: admin, secretary, coach, parent, athlete.  

- Calendars & attendance:
  - Training/match events per team.  
  - RSVP and attendance tracking, push/email for changes.  

- Financials:
  - Recurring subscriptions per athlete/team.  
  - Invoices, payments, partial payments, overdue reminders.  
  - Basic accounting views (income/expenses, sponsor revenue).  

- Inventory & sponsors:
  - Products (kits, equipment) and stock.  
  - Sponsor entities, offers linked to members.  

- Communication:
  - Announcements per team/club.  
  - In-app push notifications and email broadcasts.  

## Prompt template for Windsurf AI (stack + features)

Use this as a base; adapt project names/ports.

> You are an expert full-stack engineer.  
> Goal: Build a sports academy management platform similar to myTeam (https://my-team.co/en/how-it-works/) with:
> - Web app for admins/secretariat/coaches.
> - Mobile apps (Flutter) for coaches, parents, athletes.
> - API backend deployed on Dokploy (Docker, Postgres, Redis).
> 
> ### Architecture
> - Monorepo with three apps:
>   - `apps/api`: NestJS + TypeScript backend (REST + WebSockets).
>   - `apps/web`: Next.js 14 + TypeScript + app router + shadcn/ui + Tailwind.
>   - `apps/mobile`: Flutter app for iOS/Android.
> - Shared:
>   - `packages/prisma`: Prisma schema + migrations.
>   - `packages/types`: Shared TypeScript types (OpenAPI-generated).
> - Database: PostgreSQL.
> - Cache/queues: Redis.
> - Auth:
>   - JWT + refresh tokens.
>   - Roles: SUPER_ADMIN, CLUB_ADMIN, SECRETARY, COACH, PARENT, ATHLETE.
> 
> ### Backend requirements (`apps/api`)
> 1. Set up NestJS project with modules:
>    - `auth`, `users`, `clubs`, `teams`, `athletes`, `events`, `attendance`, `subscriptions`, `payments`, `inventory`, `sponsors`, `notifications`.
> 2. Prisma schema:
>    - `Club`, `Facility`, `Team`, `AgeGroup`, `User`, `AthleteProfile`, `ParentLink`, `Event` (training/match), `Attendance`, `SubscriptionPlan`, `Subscription`, `Invoice`, `Payment`, `Expense`, `Product`, `StockMovement`, `Sponsor`, `SponsorOffer`, `Announcement`.
> 3. REST endpoints:
>    - CRUD for main entities (club, team, athlete, event, subscription, invoice, payment, sponsor, announcement).
>    - Attendance endpoints:
>      - POST `/events/:id/attendance/bulk` to mark presence/absence.
>    - Financial:
>      - Generate monthly invoices per athlete/plan.
>      - Mark payments, calculate overdue, send reminders.
> 4. Notifications:
>    - Email via SendGrid/Resend.
>    - Push via FCM: store `DeviceToken` per user.
> 5. Security:
>    - Role-based guards for each module.
>    - Multi-tenancy by `club_id` on all entities.
> 
> ### Web app requirements (`apps/web`)
> 1. Next.js 14 (app router) + TypeScript.
> 2. Auth:
>    - Login via email/password hitting API.
>    - Store tokens securely, refresh on expiry.
> 3. Dashboards:
>    - Club overview: registrations, financial summary, upcoming events, attendance stats.
>    - Financial view: invoices, paid/unpaid, revenue vs expenses.
> 4. Management screens:
>    - CRUD pages for players/athletes, teams, events, subscriptions, sponsors, inventory.
>    - Calendars with drag-and-drop event editing.
> 
> ### Mobile app requirements (`apps/mobile`)
> 1. Flutter app with three roles UI:
>    - Coach: today’s sessions, attendance list, player notes.
>    - Parent/Athlete: schedule, fees status, announcements, push notifications, profile.
> 2. Features:
>    - Offline-friendly attendance marking with sync.
>    - Push notifications for new events, changes, overdue fees.
>    - Multi-language (Greek/English).
> 
> ### Dokploy + Docker
> 1. Create Dockerfiles:
>    - `apps/api/Dockerfile`: multi-stage (build + runtime, Node 20).
>    - `apps/web/Dockerfile`: multi-stage Next.js production build.
> 2. Write `docker-compose.yml` suitable for Dokploy:
>    - Services: `api`, `web`, `postgres`, `redis`.
>    - Expose `api` on port 3001, `web` on 3000.
>    - Use environment variables: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL`, etc.
> 3. Provide exact commands:
>    - Prisma migrations on startup.
>    - Seed script for a demo club with teams, coaches, athletes.
> 
> ### Tasks
> 1. Scaffold the monorepo structure and base configs (tsconfig, eslint, prettier, Dockerfiles, docker-compose).
> 2. Implement Prisma schema and generate clients.
> 3. Implement NestJS modules, controllers, DTOs, guards.
> 4. Implement Next.js admin dashboard with core CRUD and dashboard widgets.
> 5. Implement basic Flutter app screens and API integration.
> 6. Generate a `README.md` with:
>    - How to run with Dokploy (environment variables, deployment steps).
>    - Local dev commands (`docker compose up`, `npm run dev` etc.).
> 
> Focus on clean architecture and clear folder names so I can extend modules later (tournaments, social media, analytics).

## Dokploy deployment notes to include

- For Windsurf:

> Add a section in README:
> - “Dokploy deployment”:
>   - Explain building Docker images for `api` and `web`.
>   - List required env vars for Dokploy (DATABASE_URL pointing to Dokploy Postgres, REDIS_URL, JWT_SECRET, SMTP settings, FCM keys).
>   - Include sample Dokploy app definitions (ports, health checks).

If you want, a next step can be a concrete `docker-compose.yml` + sample Prisma schema you can paste directly into Windsurf as starting context.

[1](https://my-team.co)