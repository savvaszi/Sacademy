Create a complete, feature-rich cross-platform sports academy management application based on the following specifications. Use the technology stack: Next.js for the web frontend, Flutter for iOS and Android mobile frontends, NestJS with Node.js for the backend, and PostgreSQL as the database. Host the frontend and database on Dokploy (provide deployment scripts/instructions). Tailor the app to Cyprus reality: use Euro currency, support Greek/English languages, focus on local sports like football, basketball, swimming, athletics, and water sports; comply with EU/GDPR regs; integrate Cyprus holidays and weather APIs for scheduling.
Make it as feature-rich as possible, including:

User auth/roles (admin, coach, student, parent) with JWT and social login.
Profiles with photos, certifications, medical info.
Academy branch management, facility/equipment booking.
Scheduling calendar with recurring events, conflicts, waitlists.
Attendance via QR codes, progress tracking, gamification.
Payments with Stripe (Euro), invoicing, reports.
In-app chat, push/email notifications.
Analytics dashboards, data exports.
Integrations: Google Maps, weather API, calendar sync, video streaming.
Security: RBAC, audit logs.
Mobile: Offline support, camera/GPS.
Web: SEO-optimized public pages.
Advanced: AI training suggestions, wearable integrations.

Structure the project:

Backend: NestJS monorepo with modules for users, scheduling, payments, etc. Use Prisma for ORM with PostgreSQL schema (define full DB schema with tables for users, academies, sessions, payments, etc.).
Web Frontend: Next.js app with pages for login, dashboard, scheduling, etc. Use Redux for state, Tailwind CSS for styling.
Mobile Frontend: Flutter app with screens mirroring web, using Provider for state, Firebase for auth/notifications.
Shared: Define shared types/models in a separate package if possible.

Provide:

Full code for all components, including setup files (package.json, pubspec.yaml, etc.).
Database migration scripts.
API documentation (Swagger).
Testing setup (Jest for backend/Next.js, Flutter tests).
Deployment guide for Dokploy: Dockerfiles, compose files for backend, web, and Postgres.
README with setup instructions, environment variables (e.g., DB_URL, STRIPE_KEY).

Ensure the app is responsive, secure, and performant. Generate the entire codebase in a zipped project or as multi-file outputs.