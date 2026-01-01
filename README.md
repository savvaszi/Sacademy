# Sports Academy Management System

Complete, feature-rich sports academy management application tailored for Cyprus, built with modern technologies.

## 🚀 Features

### Core Features
- **Multi-role Authentication**: Admin, Coach, Student, Parent roles with JWT and OAuth (Google, Facebook)
- **User Profiles**: Complete profiles with photos, certifications, medical information
- **Academy Management**: Multi-branch support, facility and equipment management
- **Session Scheduling**: Recurring events, conflict detection, waitlist management
- **Attendance Tracking**: QR code check-in, progress tracking, gamification
- **Payment Processing**: Stripe integration (EUR), JCC support, invoicing, VAT compliance (19%)
- **Real-time Communication**: In-app chat, WebSocket notifications
- **Analytics Dashboard**: Comprehensive reports and data exports
- **Mobile Support**: Offline capabilities, camera, GPS integration

### Cyprus-Specific Features
- **Currency**: Euro (EUR) with 19% VAT
- **Languages**: English and Greek (Ελληνικά)
- **Sports**: Football, Basketball, Swimming, Athletics, Water Sports
- **Compliance**: GDPR, Cyprus Sports Organization (KOA) standards
- **Integrations**: Cyprus holidays, local weather APIs

## 🏗️ Technology Stack

### Backend
- **Framework**: NestJS with Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Queue**: Bull/BullMQ
- **Authentication**: Passport.js with JWT
- **Payments**: Stripe, JCC Gateway
- **Storage**: S3-compatible (MinIO)
- **Real-time**: Socket.io

### Web Frontend
- **Framework**: Next.js 14 (App Router)
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS
- **UI Components**: Custom components with shadcn/ui patterns
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form with Zod validation

### Mobile App
- **Framework**: Flutter
- **State Management**: Provider
- **Authentication**: Firebase Auth
- **Notifications**: Firebase Cloud Messaging
- **Offline**: SQLite with drift

## 📋 Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 15
- Redis >= 7
- Docker & Docker Compose (for containerized deployment)
- Flutter SDK >= 3.16 (for mobile development)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/savvaszi/sportsacademy.git
cd sportsacademy
```

### 2. Environment Setup

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/sportsacademy"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email
SMTP_HOST="smtp.sendgrid.net"
SMTP_USER="apikey"
SMTP_PASSWORD="your-api-key"
EMAIL_FROM="noreply@sportsacademy.cy"

# APIs
OPENWEATHER_API_KEY="..."
GOOGLE_MAPS_API_KEY="..."
```

### 3. Install Dependencies

```bash
# Install root dependencies
npm install

# Install workspace dependencies
npm install --workspaces
```

### 4. Database Setup

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed
```

### 5. Start Development Servers

```bash
# Start all services
npm run dev

# Or start individually
npm run dev:backend  # Backend on http://localhost:3001
npm run dev:web      # Web on http://localhost:3000
```

## 🐳 Docker Deployment

### Local Development with Docker

```bash
docker-compose up -d
```

### Production Deployment

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🚢 Dokploy Deployment

### Prerequisites
- Dokploy instance running
- Domain configured with SSL
- Environment variables configured in Dokploy

### Deployment Steps

1. **Create PostgreSQL Database**
   - In Dokploy, create a PostgreSQL service
   - Note the connection string

2. **Create Redis Service**
   - Create a Redis service in Dokploy
   - Note the connection details

3. **Deploy Backend**
   ```bash
   # Push to GitHub
   git push origin main
   
   # In Dokploy:
   # - Create new application
   # - Connect to GitHub repository
   # - Set build path: ./backend
   # - Configure environment variables
   # - Deploy
   ```

4. **Deploy Web Frontend**
   ```bash
   # In Dokploy:
   # - Create new application
   # - Connect to GitHub repository
   # - Set build path: ./web
   # - Configure environment variables
   # - Deploy
   ```

5. **Configure Domains**
   - Backend: `api.sportsacademy.cy`
   - Frontend: `sportsacademy.cy`

## 📱 Mobile App Development

### Setup Flutter Environment

```bash
cd mobile
flutter pub get
```

### Run on iOS

```bash
flutter run -d ios
```

### Run on Android

```bash
flutter run -d android
```

### Build for Production

```bash
# iOS
flutter build ipa

# Android
flutter build apk --release
```

## 📚 API Documentation

Once the backend is running, access the Swagger documentation:

```
http://localhost:3001/api/docs
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage
```

### Web Tests

```bash
cd web
npm run test
```

### Mobile Tests

```bash
cd mobile
flutter test
```

## 📊 Database Schema

The application uses a comprehensive PostgreSQL schema with the following main entities:

- **Users**: Multi-role user system
- **Academies & Branches**: Multi-location support
- **Programs**: Sports programs and courses
- **Sessions**: Scheduled training sessions
- **Attendance**: Check-in/out tracking
- **Payments & Invoices**: Financial transactions
- **Bookings**: Facility reservations
- **Messages & Notifications**: Communication system

View the complete schema: `backend/prisma/schema.prisma`

## 🔐 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Rate limiting
- CORS configuration
- Helmet security headers
- Input validation
- SQL injection prevention (Prisma)
- XSS protection
- GDPR compliance features

## 🌍 Internationalization

The application supports:
- English (en)
- Greek (el - Ελληνικά)

Add new languages in:
- Backend: `backend/src/i18n/`
- Web: `web/src/locales/`
- Mobile: `mobile/lib/l10n/`

## 📈 Monitoring & Logging

- **Error Tracking**: Sentry integration
- **Logging**: Winston (backend)
- **Metrics**: Prometheus-compatible
- **Health Checks**: `/health` endpoint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@sportsacademy.cy or join our Slack channel.

## 🙏 Acknowledgments

- Built for Cyprus sports academies
- Compliant with Cyprus and EU regulations
- Supports local payment methods (JCC)
- Integrated with Cyprus-specific services

---

**Made with ❤️ in Cyprus** 🇨🇾
