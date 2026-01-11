# Sports Academy Management System

A comprehensive Flutter web application for managing sports academies, built with Appwrite backend.

## Features

- **Student Management**: Track student profiles, enrollments, and medical information
- **Class Management**: Manage sports classes, schedules, and capacity
- **Attendance Tracking**: Mark and monitor student attendance
- **Payment Management**: Handle invoices, payments, and billing cycles
- **Parent Portal**: Parent-facing interface for student information
- **Coach Dashboard**: Coach-specific tools and views
- **Multi-language Support**: English and Greek localization

## Tech Stack

- **Frontend**: Flutter Web
- **Backend**: Appwrite
- **State Management**: Provider
- **Routing**: GoRouter
- **Deployment**: Dokploy with Docker

## Environment Variables

Create a `.env` file with:

```
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_DATABASE_ID=your_database_id
```

## Deployment

The app is containerized and deployed via Dokploy. See `Dockerfile` for build configuration.

## Database Collections

See `APPWRITE_SCHEMA.md` for detailed database schema.
