# Deployment Guide - Dokploy & Appwrite

This guide covers deploying the Sports Academy Flutter web app to Dokploy with Appwrite backend.

## Prerequisites

1. Dokploy instance running
2. Appwrite instance (cloud.appwrite.io or self-hosted)
3. GitHub repository access

## Step 1: Set Up Appwrite Database

### 1.1 Create Project
1. Log in to your Appwrite console
2. Create a new project: "Sports Academy"
3. Note your **Project ID**

### 1.2 Create Database
1. Navigate to Databases
2. Create a new database: "sports_academy_db"
3. Note your **Database ID**

### 1.3 Create Collections
Follow the schema in `APPWRITE_SCHEMA.md` to create these collections:
- `students`
- `classes`
- `attendance`
- `payments`
- `activities`

For each collection:
1. Create the collection with the specified Collection ID
2. Add all attributes as defined in the schema
3. Create the specified indexes
4. Set permissions (use "Any" for development, restrict for production)

## Step 2: Deploy to Dokploy

### 2.1 Create Application in Dokploy
1. Log in to your Dokploy dashboard
2. Navigate to your project or create a new one
3. Click "Create Application"
4. Select "Git Provider" as source

### 2.2 Configure Git Repository
- **Repository**: `https://github.com/savvaszi/Sacademy`
- **Branch**: `main`
- **Build Type**: `dockerfile`
- **Dockerfile Path**: `./Dockerfile`

### 2.3 Set Environment Variables
Add these environment variables in Dokploy:

```
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id_here
APPWRITE_DATABASE_ID=your_database_id_here
```

Replace the values with your actual Appwrite credentials.

### 2.4 Configure Build Settings
- **Port**: 80
- **Build Command**: (handled by Dockerfile)
- **Health Check Path**: `/`

### 2.5 Deploy
1. Click "Deploy" to start the build process
2. Dokploy will:
   - Clone the repository
   - Build the Flutter web app using the Dockerfile
   - Create a container with nginx serving the app
   - Deploy to your domain

## Step 3: Configure Domain (Optional)

### 3.1 In Dokploy
1. Navigate to your application settings
2. Go to "Domains" section
3. Add your custom domain
4. Configure SSL certificate (Let's Encrypt)

### 3.2 DNS Configuration
Point your domain to your Dokploy server:
```
A Record: @ -> your_dokploy_server_ip
```

## Step 4: Verify Deployment

1. Access your deployed app via the Dokploy URL or custom domain
2. Open browser console to check for any errors
3. Verify Appwrite connection in the console logs
4. Test basic functionality:
   - Dashboard loads
   - Navigation works
   - Data loads from Appwrite (if you have test data)

## Troubleshooting

### Build Fails
- Check Dockerfile syntax
- Verify Flutter version compatibility
- Check build logs in Dokploy

### App Loads but No Data
- Verify environment variables are set correctly
- Check Appwrite project ID and database ID
- Ensure collections are created with correct IDs
- Check collection permissions in Appwrite

### CORS Errors
- In Appwrite console, go to Settings > Platforms
- Add your domain as a Web platform
- Include both with and without `www`

### Connection Errors
- Verify APPWRITE_ENDPOINT is correct
- Check if Appwrite instance is accessible
- Review browser console for specific errors

## Production Checklist

- [ ] Appwrite collections created with proper schema
- [ ] Appwrite permissions configured (not "Any" in production)
- [ ] Environment variables set in Dokploy
- [ ] Custom domain configured with SSL
- [ ] CORS configured in Appwrite for your domain
- [ ] Test all features (students, classes, attendance, payments)
- [ ] Monitor logs for errors
- [ ] Set up backup strategy for Appwrite data

## Updating the App

To deploy updates:
1. Push changes to GitHub main branch
2. Dokploy will auto-deploy if webhooks are configured
3. Or manually trigger deployment in Dokploy dashboard

## Support

For issues:
- Check Dokploy logs: Application > Logs
- Check browser console for client-side errors
- Review Appwrite logs in Appwrite console
- Verify all environment variables are correct
