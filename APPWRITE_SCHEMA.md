# Appwrite Database Schema

This document describes the database collections and attributes required for the Sports Academy Management System.

## Database Setup

1. Create a new database in your Appwrite console
2. Note the Database ID and add it to your environment variables
3. Create the following collections with their respective attributes

## Collections

### 1. Students Collection
**Collection ID**: `students`

| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| firstName | String | 255 | Yes | No | - |
| lastName | String | 255 | Yes | No | - |
| dateOfBirth | String | 255 | Yes | No | - |
| gender | String | 50 | Yes | No | - |
| parentName | String | 255 | Yes | No | - |
| parentEmail | Email | 255 | Yes | No | - |
| parentPhone | String | 50 | Yes | No | - |
| emergencyContactName | String | 255 | Yes | No | - |
| emergencyContactPhone | String | 50 | Yes | No | - |
| medicalInfo | String | 1000 | No | No | - |
| allergies | String | 1000 | No | No | - |
| enrolledProgramIds | String | 50 | No | Yes | [] |
| enrollmentDate | String | 255 | Yes | No | - |
| isActive | Boolean | - | Yes | No | true |
| photoUrl | URL | 2000 | No | No | - |
| notes | String | 5000 | No | No | - |

**Indexes**:
- `firstName` (ASC)
- `lastName` (ASC)
- `isActive` (ASC)

### 2. Classes Collection
**Collection ID**: `classes`

| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| name | String | 255 | Yes | No | - |
| sport | String | 100 | Yes | No | - |
| coachId | String | 255 | Yes | No | - |
| coachName | String | 255 | Yes | No | - |
| capacity | Integer | - | Yes | No | 0 |
| enrolledCount | Integer | - | Yes | No | 0 |
| ageGroup | String | 50 | Yes | No | - |
| level | String | 50 | Yes | No | - |
| schedules | String | 5000 | Yes | No | - |
| location | String | 255 | Yes | No | - |
| monthlyFee | Float | - | Yes | No | 0 |
| annualFee | Float | - | Yes | No | 0 |
| isActive | Boolean | - | Yes | No | true |
| description | String | 1000 | No | No | - |
| createdAt | String | 255 | Yes | No | - |

**Indexes**:
- `sport` (ASC)
- `isActive` (ASC)

**Note**: `schedules` is stored as JSON string

### 3. Attendance Collection
**Collection ID**: `attendance`

| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| studentId | String | 255 | Yes | No | - |
| studentName | String | 255 | Yes | No | - |
| classId | String | 255 | Yes | No | - |
| className | String | 255 | Yes | No | - |
| sport | String | 100 | Yes | No | - |
| date | String | 255 | Yes | No | - |
| time | String | 50 | Yes | No | - |
| status | String | 50 | Yes | No | - |
| notes | String | 1000 | No | No | - |
| markedBy | String | 255 | Yes | No | - |
| markedAt | String | 255 | Yes | No | - |

**Indexes**:
- `studentId` (ASC)
- `classId` (ASC)
- `date` (DESC)

### 4. Payments Collection
**Collection ID**: `payments`

| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| invoiceNumber | String | 100 | Yes | No | - |
| studentId | String | 255 | Yes | No | - |
| studentName | String | 255 | Yes | No | - |
| parentName | String | 255 | Yes | No | - |
| parentEmail | Email | 255 | Yes | No | - |
| classId | String | 255 | Yes | No | - |
| className | String | 255 | Yes | No | - |
| amount | Float | - | Yes | No | 0 |
| status | String | 50 | Yes | No | pending |
| billingCycle | String | 50 | Yes | No | - |
| issueDate | String | 255 | Yes | No | - |
| dueDate | String | 255 | Yes | No | - |
| paidDate | String | 255 | No | No | - |
| paymentMethod | String | 50 | No | No | - |
| lineItems | String | 5000 | Yes | No | - |
| notes | String | 1000 | No | No | - |

**Indexes**:
- `studentId` (ASC)
- `status` (ASC)
- `dueDate` (ASC)

**Note**: `lineItems` is stored as JSON string

### 5. Activities Collection
**Collection ID**: `activities`

| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| type | String | 100 | Yes | No | - |
| title | String | 255 | Yes | No | - |
| description | String | 1000 | Yes | No | - |
| timestamp | String | 255 | Yes | No | - |
| relatedId | String | 255 | No | No | - |
| relatedType | String | 100 | No | No | - |

**Indexes**:
- `timestamp` (DESC)
- `type` (ASC)

## Permissions

For each collection, set the following permissions:

### Development/Testing
- **Create**: Any
- **Read**: Any
- **Update**: Any
- **Delete**: Any

### Production
- **Create**: Users (authenticated)
- **Read**: Users (authenticated)
- **Update**: Users (authenticated)
- **Delete**: Users (authenticated) or Admin role

## Environment Variables

Add these to your deployment configuration:

```
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id_here
APPWRITE_DATABASE_ID=your_database_id_here
```

## Notes

- All date fields are stored as ISO 8601 strings
- JSON fields (schedules, lineItems) are serialized/deserialized in the app
- Array fields use Appwrite's native array support
- Ensure proper indexes are created for optimal query performance
