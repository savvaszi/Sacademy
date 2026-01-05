# Sports Academy Management Platform

A comprehensive sports academy management platform similar to [myTeam](https://my-team.co), built with a modern monorepo architecture.

## 🏗️ Architecture

This is a **monorepo** containing three main applications:

- **`apps/api`**: NestJS backend (REST + WebSockets)
- **`apps/web`**: Next.js 14 web application (admin/coach portal)
- **`apps/mobile`**: Flutter mobile app (iOS/Android for coaches, parents, athletes)

### Shared Packages

- **`packages/prisma`**: Database schema and Prisma client
- **`packages/types`**: Shared TypeScript types

## 🚀 Tech Stack

### Backend (`apps/api`)
- **NestJS** with TypeScript
- **Prisma** ORM with PostgreSQL
- **Redis** for caching and queues
- **JWT** authentication with refresh tokens
- **Role-based access control** (SUPER_ADMIN, CLUB_ADMIN, SECRETARY, COACH, PARENT, ATHLETE)
- **Firebase Cloud Messaging** for push notifications
- **Email** via SendGrid/Resend

### Web App (`apps/web`)
- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui** components
- **NextAuth** for authentication

### Mobile App (`apps/mobile`)
- **Flutter** for iOS and Android
- **Provider** for state management
- **Firebase** for push notifications
- Multi-language support (Greek/English)

### Database
- **PostgreSQL 15** (multi-tenant by club_id)
- **Redis 7** for caching

## 📦 Features

### Core Modules

1. **Club & User Management**
   - Clubs, facilities, teams, age groups
   - Users with roles and permissions
   - Multi-tenant architecture

2. **Calendars & Attendance**
   - Training and match events
   - Real-time attendance tracking
   - Push notifications for changes

3. **Financial Management**
   - Subscription plans and recurring billing
   - Invoice generation and payment tracking
   - Overdue payment reminders
   - Expense tracking

4. **Inventory Management**
   - Products (kits, equipment)
   - Stock tracking and movements

5. **Sponsors**
   - Sponsor management
   - Member offers and discounts

6. **Communication**
   - Team and club announcements
   - Push notifications and email broadcasts

## 🛠️ Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Docker** and **Docker Compose** (for local development)
- **Flutter** >= 3.0.0 (for mobile development)

### Local Development

1. **Clone the repository**

```bash
git clone <repository-url>
cd Sportsacademy
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://sportsacademy:changeme@localhost:5432/sportsacademy?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"

# API
API_PORT=3001
NEXT_PUBLIC_API_URL="http://localhost:3001"

# Email
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
SMTP_FROM="noreply@yourdomain.com"

# Firebase
FCM_SERVER_KEY="your-fcm-server-key"
FCM_PROJECT_ID="your-firebase-project-id"
```

4. **Start services with Docker Compose**

```bash
docker compose up -d postgres redis
```

5. **Generate Prisma client and run migrations**

```bash
npm run db:generate
npm run db:migrate
```

6. **Seed the database** (optional, creates demo data)

```bash
npm run db:seed
```

This creates:
- Demo club: "Demo Sports Academy"
- Admin user: `admin@demoacademy.com` / `password123`
- Coach user: `coach@demoacademy.com` / `password123`
- Parent user: `parent@demoacademy.com` / `password123`
- Athlete user: `athlete@demoacademy.com` / `password123`

7. **Start development servers**

```bash
# Start all apps
npm run dev

# Or start individually
cd apps/api && npm run dev
cd apps/web && npm run dev
```

8. **Access the applications**

- **API**: http://localhost:3001/api
- **Web App**: http://localhost:3000
- **API Documentation**: http://localhost:3001/api/docs (if Swagger is configured)

### Mobile Development

1. **Navigate to mobile app**

```bash
cd apps/mobile
```

2. **Get Flutter dependencies**

```bash
flutter pub get
```

3. **Run on emulator/device**

```bash
# iOS
flutter run -d ios

# Android
flutter run -d android
```

## 🐳 Docker Deployment

### Build Docker Images

```bash
# Build API
docker build -f apps/api/Dockerfile -t sportsacademy-api .

# Build Web
docker build -f apps/web/Dockerfile -t sportsacademy-web .
```

### Run with Docker Compose

```bash
docker compose up -d
```

This starts:
- PostgreSQL on port 5432
- Redis on port 6379
- API on port 3001
- Web on port 3000

### Dokploy Deployment

#### Required Environment Variables

Set these in your Dokploy project:

```env
# Database (use Dokploy Postgres service)
DATABASE_URL=postgresql://user:password@postgres:5432/sportsacademy?schema=public

# Redis (use Dokploy Redis service)
REDIS_URL=redis://redis:6379

# JWT Secrets (generate secure random strings)
JWT_SECRET=<generate-secure-random-string>
JWT_REFRESH_SECRET=<generate-secure-random-string>
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# API Configuration
API_PORT=3001
NODE_ENV=production

# Web Configuration
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXTAUTH_SECRET=<generate-secure-random-string>
NEXTAUTH_URL=https://yourdomain.com

# Email (SendGrid/Resend)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=<your-sendgrid-api-key>
SMTP_FROM=noreply@yourdomain.com

# Firebase Cloud Messaging
FCM_SERVER_KEY=<your-fcm-server-key>
FCM_PROJECT_ID=<your-firebase-project-id>

# Payment Providers (optional)
JCC_MERCHANT_ID=
JCC_API_KEY=
VIVA_MERCHANT_ID=
VIVA_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
```

#### Dokploy Services Configuration

1. **Create Postgres Service**
   - Service: PostgreSQL 15
   - Database: `sportsacademy`
   - Note the connection details for DATABASE_URL

2. **Create Redis Service**
   - Service: Redis 7
   - Note the connection URL for REDIS_URL

3. **Deploy API Service**
   - Type: Docker
   - Dockerfile: `apps/api/Dockerfile`
   - Port: 3001
   - Health check: `/api/health`
   - Startup command: Runs migrations automatically

4. **Deploy Web Service**
   - Type: Docker
   - Dockerfile: `apps/web/Dockerfile`
   - Port: 3000
   - Depends on: API service

#### Post-Deployment

1. **Run database migrations** (if not auto-run):

```bash
docker exec -it <api-container> sh -c "cd /app/packages/prisma && npx prisma migrate deploy"
```

2. **Seed database** (optional):

```bash
docker exec -it <api-container> sh -c "cd /app/packages/prisma && npx prisma db seed"
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/refresh` - Refresh access token

### Users
- `GET /api/users` - List users (admin only)
- `GET /api/users/:id` - Get user details
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

### Teams
- `GET /api/teams` - List teams
- `GET /api/teams/:id` - Get team details
- `POST /api/teams` - Create team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Events
- `GET /api/events?teamId=:id` - List events for team
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Attendance
- `POST /api/attendance/events/:eventId/bulk` - Mark bulk attendance
- `GET /api/attendance/events/:eventId` - Get event attendance
- `GET /api/attendance/athletes/:athleteId` - Get athlete attendance history

### Subscriptions & Payments
- `GET /api/subscriptions/plans` - List subscription plans
- `POST /api/subscriptions` - Create subscription
- `POST /api/payments/invoices` - Create invoice
- `POST /api/payments/invoices/:id/payments` - Record payment
- `GET /api/payments/overdue` - List overdue invoices

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run API tests
cd apps/api && npm run test

# Run with coverage
npm run test:cov
```

## 📝 Database Schema

Key entities:
- **Club**: Multi-tenant root entity
- **User**: With role-based permissions
- **Team**: Belongs to club and age group
- **AthleteProfile**: Linked to user
- **Event**: Training/match events
- **Attendance**: Event attendance tracking
- **Subscription**: Recurring billing
- **Invoice**: Payment tracking
- **Payment**: Payment records
- **Sponsor**: Sponsor management
- **Announcement**: Communication

## 🔐 Security

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Multi-tenancy by `club_id`
- Password hashing with bcrypt
- CORS configuration
- Input validation with class-validator

## 🌍 Internationalization

The mobile app supports:
- English (en)
- Greek (el)

## 📱 Mobile App Features

### For Coaches
- View today's sessions
- Mark attendance
- Add player notes
- View team roster

### For Parents/Athletes
- View schedule
- Check fees status
- Read announcements
- Receive push notifications
- View profile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🆘 Support

For support, email support@yourdomain.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Tournament management
- [ ] Social media integration
- [ ] Advanced analytics and reporting
- [ ] Video analysis tools
- [ ] Parent portal enhancements
- [ ] Mobile app offline mode
- [ ] WhatsApp integration
- [ ] Advanced payment provider integrations (JCC, Viva, Stripe)

---

**Built with ❤️ for sports academies**
