# Quick Start Guide

## What Was Done

✅ **Cleared GitHub Repository**: Removed old Next.js/NestJS monorepo
✅ **Created Flutter Web App**: Complete sports academy management system
✅ **Replaced Supabase with Appwrite**: Full Appwrite integration
✅ **Dockerized for Deployment**: Multi-stage Dockerfile with nginx
✅ **Pushed to GitHub**: All code committed to `main` branch

## Repository Structure

```
Sportsacademy/
├── lib/
│   ├── main.dart                 # App entry point
│   ├── models/                   # Data models (Student, Class, etc.)
│   ├── providers/                # State management
│   ├── screens/                  # UI screens
│   ├── services/                 # Appwrite service
│   ├── router/                   # Navigation
│   └── theme/                    # App theming
├── web/                          # Web assets
├── Dockerfile                    # Production build
├── nginx.conf                    # Web server config
├── pubspec.yaml                  # Dependencies
├── APPWRITE_SCHEMA.md           # Database schema
└── DEPLOYMENT.md                # Full deployment guide
```

## Next Steps

### 1. Set Up Appwrite Database (Required)

You need to manually create the database collections in Appwrite:

1. **Go to Appwrite Console**: https://cloud.appwrite.io
2. **Create Project**: "Sports Academy"
3. **Create Database**: Note the Database ID
4. **Create Collections**: Follow `APPWRITE_SCHEMA.md`
   - students
   - classes
   - attendance
   - payments
   - activities

**Important**: Each collection needs specific attributes and indexes as defined in the schema.

### 2. Deploy to Dokploy

Dokploy should automatically pick up the changes from GitHub if webhooks are configured.

**Manual Deployment**:
1. Log in to Dokploy
2. Find your Sports Academy application
3. Go to Settings > Environment Variables
4. Add:
   ```
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=<your_project_id>
   APPWRITE_DATABASE_ID=<your_database_id>
   ```
5. Click "Redeploy" or "Deploy"

### 3. Configure CORS in Appwrite

Once deployed:
1. Go to Appwrite Console > Settings > Platforms
2. Add Web Platform
3. Enter your Dokploy domain (e.g., `https://yourdomain.com`)
4. Save

## Features Included

- **Dashboard**: Overview with statistics
- **Student Management**: Add, view, edit students
- **Class Management**: Sports classes with schedules
- **Attendance Tracking**: Mark and view attendance
- **Payment Management**: Invoices and payment tracking
- **Appwrite Integration**: Full CRUD operations
- **Responsive Design**: Works on all devices
- **Multi-language Support**: English/Greek ready

## Testing Locally

```bash
# Install dependencies
flutter pub get

# Run web app
flutter run -d chrome --dart-define=APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1 \
  --dart-define=APPWRITE_PROJECT_ID=your_id \
  --dart-define=APPWRITE_DATABASE_ID=your_db_id
```

## Troubleshooting

**App loads but shows no data?**
- Check environment variables in Dokploy
- Verify Appwrite collections are created
- Check browser console for errors

**Build fails in Dokploy?**
- Check Dokploy build logs
- Verify Dockerfile is correct
- Ensure Flutter version is compatible

**CORS errors?**
- Add your domain to Appwrite platforms
- Include both www and non-www versions

## Support Files

- `APPWRITE_SCHEMA.md` - Complete database schema
- `DEPLOYMENT.md` - Detailed deployment guide
- `README.md` - Project overview
- `.env.example` - Environment variable template

## What's Different from Before

**Old Stack**: Next.js + NestJS + Prisma + PostgreSQL
**New Stack**: Flutter Web + Appwrite

**Benefits**:
- Single codebase for web and mobile
- Simpler deployment (one container)
- Built-in backend with Appwrite
- No separate API server needed
- Better performance with Flutter web
