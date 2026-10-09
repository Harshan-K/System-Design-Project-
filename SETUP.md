# College Management System - Setup Guide

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   - The `.env` file is already configured with MongoDB Atlas connection
   - JWT_SECRET is set for token generation

4. **Create Admin User:**
   ```bash
   npm run create-admin
   ```
   This creates an admin user with:
   - Email: admin@techedu.com
   - Password: Admin123!

5. **Start Backend Server:**
   ```bash
   npm run dev
   ```
   Server will run on http://localhost:5000

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Frontend:**
   ```bash
   npm start
   ```
   Frontend will run on http://localhost:3000

## Testing the System

1. **Test Backend (Optional):**
   ```bash
   node test-backend.js
   ```

2. **Login Credentials:**
   - **Admin:** admin@techedu.com / Admin123!
   - **User:** Create new account via signup

## Features Implemented

### Authentication System
- ✅ User Registration with validation
- ✅ User Login with JWT tokens
- ✅ Protected routes with middleware
- ✅ Role-based access (admin/user)
- ✅ Password hashing with bcrypt
- ✅ Token-based authentication

### Backend API Endpoints
- ✅ POST /api/auth/register - User registration
- ✅ POST /api/auth/login - User login
- ✅ GET /api/auth/me - Get current user
- ✅ PUT /api/auth/profile - Update profile
- ✅ PUT /api/auth/change-password - Change password
- ✅ GET /api/users - Get all users (admin)
- ✅ PUT /api/users/:id/toggle-status - Toggle user status (admin)
- ✅ DELETE /api/users/:id - Delete user (admin)
- ✅ POST /api/contact - Submit contact form

### Frontend Features
- ✅ Login/Signup forms with validation
- ✅ Authentication context for state management
- ✅ Protected routes for authenticated users
- ✅ Admin dashboard with user management
- ✅ Contact form integration with backend
- ✅ Responsive design
- ✅ Loading states and error handling

### Security Features
- ✅ Password hashing
- ✅ JWT token authentication
- ✅ Input validation and sanitization
- ✅ Protected admin routes
- ✅ CORS configuration
- ✅ Error handling middleware

## Database Models

### User Model
- name (required, min 2 chars)
- email (required, unique, validated)
- password (required, min 6 chars, hashed)
- phone (required, 10 digits)
- role (user/admin, default: user)
- isActive (boolean, default: true)
- timestamps

### Contact Model
- name (required, min 2 chars)
- email (required, validated)
- subject (required, min 5 chars)
- message (required, min 10 chars)
- timestamps

## API Usage Examples

### Register User
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

### Login User
```javascript
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User (Protected)
```javascript
GET /api/auth/me
Headers: { "Authorization": "Bearer <token>" }
```

## Troubleshooting

1. **MongoDB Connection Issues:**
   - Check internet connection
   - Verify MongoDB Atlas credentials in .env

2. **CORS Issues:**
   - Backend is configured to accept requests from frontend
   - Check if both servers are running

3. **Token Issues:**
   - Tokens expire in 7 days
   - Clear localStorage and login again if needed

4. **Admin Access:**
   - Run `npm run create-admin` in backend directory
   - Use admin@techedu.com / Admin123! to login