# Deployment Guide

## Dokploy Deployment

### Step 1: Prepare Dokploy Project

1. Log in to your Dokploy instance
2. Create a new project named "SportsAcademy"

### Step 2: Create PostgreSQL Database

```bash
# In Dokploy UI:
1. Navigate to Databases
2. Click "Create Database"
3. Select PostgreSQL 15
4. Name: sportsacademy-db
5. Set strong password
6. Deploy
```

Save the connection string:
```
postgresql://postgres:PASSWORD@sportsacademy-db:5432/sportsacademy
```

### Step 3: Create Redis Service

```bash
# In Dokploy UI:
1. Navigate to Databases
2. Click "Create Database"
3. Select Redis 7
4. Name: sportsacademy-redis
5. Deploy
```

### Step 4: Deploy Backend API

```bash
# In Dokploy UI:
1. Navigate to Applications
2. Click "Create Application"
3. Name: sportsacademy-backend
4. Repository: https://github.com/savvaszi/sportsacademy
5. Branch: main
6. Build Path: ./backend
7. Port: 3001
```

**Environment Variables:**
```env
DATABASE_URL=postgresql://postgres:PASSWORD@sportsacademy-db:5432/sportsacademy
JWT_SECRET=your-super-secret-jwt-key-change-this
REDIS_HOST=sportsacademy-redis
REDIS_PORT=6379
NODE_ENV=production
BACKEND_PORT=3001

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG....
EMAIL_FROM=noreply@sportsacademy.cy

# OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...

# Storage
S3_ENDPOINT=https://s3.eu-central-1.amazonaws.com
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
S3_BUCKET=sportsacademy
S3_REGION=eu-central-1

# APIs
OPENWEATHER_API_KEY=...
GOOGLE_MAPS_API_KEY=...
```

**Domain Configuration:**
- Add domain: `api.sportsacademy.cy`
- Enable HTTPS (Let's Encrypt)
- Port: 3001

### Step 5: Deploy Web Frontend

```bash
# In Dokploy UI:
1. Navigate to Applications
2. Click "Create Application"
3. Name: sportsacademy-web
4. Repository: https://github.com/savvaszi/sportsacademy
5. Branch: main
6. Build Path: ./web
7. Port: 3000
```

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.sportsacademy.cy/api/v1
NEXT_PUBLIC_WS_URL=wss://api.sportsacademy.cy
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NODE_ENV=production
```

**Domain Configuration:**
- Add domain: `sportsacademy.cy`
- Add domain: `www.sportsacademy.cy`
- Enable HTTPS (Let's Encrypt)
- Port: 3000

### Step 6: Run Database Migrations

After backend deployment:

```bash
# SSH into backend container or use Dokploy terminal
npx prisma migrate deploy
```

### Step 7: Verify Deployment

1. **Backend Health Check:**
   ```bash
   curl https://api.sportsacademy.cy/health
   ```

2. **API Documentation:**
   Visit: `https://api.sportsacademy.cy/api/docs`

3. **Web Application:**
   Visit: `https://sportsacademy.cy`

## Post-Deployment Configuration

### 1. Configure Stripe Webhooks

```bash
# Stripe Dashboard:
1. Go to Developers > Webhooks
2. Add endpoint: https://api.sportsacademy.cy/api/v1/payments/webhook
3. Select events:
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
4. Copy webhook secret to STRIPE_WEBHOOK_SECRET
```

### 2. Configure OAuth Callbacks

**Google OAuth:**
- Authorized redirect URIs:
  - `https://api.sportsacademy.cy/api/v1/auth/google/callback`
  - `https://sportsacademy.cy/auth/callback/google`

**Facebook OAuth:**
- Valid OAuth Redirect URIs:
  - `https://api.sportsacademy.cy/api/v1/auth/facebook/callback`
  - `https://sportsacademy.cy/auth/callback/facebook`

### 3. Setup Monitoring

```bash
# In Dokploy:
1. Enable application monitoring
2. Configure alerts for:
   - High CPU usage (>80%)
   - High memory usage (>85%)
   - Application errors
   - Database connection issues
```

### 4. Configure Backups

```bash
# PostgreSQL Backups:
1. Navigate to Database settings
2. Enable automatic backups
3. Schedule: Daily at 2:00 AM UTC
4. Retention: 30 days
```

### 5. Setup CDN (Optional)

For better performance:
```bash
# Cloudflare:
1. Add sportsacademy.cy to Cloudflare
2. Enable CDN
3. Configure caching rules
4. Enable DDoS protection
```

## Scaling

### Horizontal Scaling

```bash
# In Dokploy:
1. Navigate to Application settings
2. Increase replicas:
   - Backend: 2-3 instances
   - Web: 2-3 instances
3. Enable load balancing
```

### Database Scaling

```bash
# For high traffic:
1. Upgrade PostgreSQL instance
2. Enable connection pooling (PgBouncer)
3. Add read replicas
4. Configure Redis for caching
```

## Troubleshooting

### Backend Not Starting

```bash
# Check logs
dokploy logs sportsacademy-backend

# Common issues:
1. Database connection failed
   - Verify DATABASE_URL
   - Check database is running
   
2. Missing environment variables
   - Review all required env vars
   
3. Migration errors
   - Run migrations manually
```

### Frontend Not Loading

```bash
# Check logs
dokploy logs sportsacademy-web

# Common issues:
1. API connection failed
   - Verify NEXT_PUBLIC_API_URL
   - Check CORS settings
   
2. Build errors
   - Check Node.js version
   - Verify dependencies
```

### Database Connection Issues

```bash
# Test connection
psql $DATABASE_URL

# Check connection pool
# In backend logs, look for:
# "Database connection pool exhausted"

# Solution: Increase connection limit
# In DATABASE_URL add: ?connection_limit=20
```

## Maintenance

### Update Application

```bash
# In Dokploy:
1. Navigate to Application
2. Click "Redeploy"
3. Or setup auto-deploy on git push
```

### Database Maintenance

```bash
# Vacuum database (monthly)
VACUUM ANALYZE;

# Check database size
SELECT pg_size_pretty(pg_database_size('sportsacademy'));

# Reindex (if needed)
REINDEX DATABASE sportsacademy;
```

### Monitor Performance

```bash
# Check application metrics
1. CPU usage
2. Memory usage
3. Response times
4. Error rates
5. Database queries

# Use Dokploy built-in monitoring
# Or integrate with external tools:
- Datadog
- New Relic
- Grafana
```

## Security Checklist

- [ ] All environment variables are set
- [ ] Strong database password configured
- [ ] JWT secret is secure and unique
- [ ] HTTPS enabled on all domains
- [ ] Firewall rules configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] OAuth credentials secured
- [ ] Stripe webhooks verified
- [ ] Database backups enabled
- [ ] Monitoring and alerts configured
- [ ] Security headers enabled (Helmet)
- [ ] Input validation active
- [ ] SQL injection protection (Prisma)
- [ ] XSS protection enabled

## Support

For deployment issues:
- Email: devops@sportsacademy.cy
- Dokploy Documentation: https://docs.dokploy.com
- GitHub Issues: https://github.com/savvaszi/sportsacademy/issues
