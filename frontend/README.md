# TECHEDU - College Management System

A comprehensive React-based college management system with separate admin and user interfaces.

## Features

### User Features
- User registration and authentication
- Course browsing and enrollment
- Profile management
- Responsive design for all devices

### Admin Features
- Complete admin dashboard with analytics
- User management (view, activate/deactivate, delete users)
- Course management (add, edit, delete courses)
- Admin profile management
- Real-time statistics and activity monitoring
- Fully responsive admin interface

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd react_project
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will open at `http://localhost:3000`

## Login Credentials

### Admin Access
- **Username:** admin
- **Email:** admin@techedu.com
- **Password:** Admin123!

### Regular User
Create a new account through the signup page or use any existing user credentials.

## Admin Dashboard Features

### Dashboard Overview
- User statistics (total users, active users, new registrations)
- Course statistics
- Recent activity feed
- Quick action buttons
- Analytics charts

### User Management
- View all registered users
- Search and filter users
- Activate/deactivate user accounts
- Delete user accounts
- View detailed user profiles
- User role management

### Course Management
- Add new courses with complete details
- Edit existing courses
- Activate/deactivate courses
- Delete courses
- Upload course images
- Set course pricing and duration

### Profile Management
- Edit admin profile information
- Change password
- Security settings
- Account statistics
- Permission management

## Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers (1024px and above)
- Tablets (768px - 1023px)
- Mobile phones (320px - 767px)

## Technology Stack

- **Frontend:** React 18
- **Routing:** React Router DOM
- **Styling:** CSS3 with Flexbox and Grid
- **Storage:** Local Storage (for demo purposes)
- **Icons:** Unicode emojis and symbols
- **Images:** Unsplash API for realistic images

## File Structure

```
src/
├── components/
│   ├── AdminLayout.jsx          # Admin dashboard layout
│   ├── AdminProtectedRoute.jsx  # Admin route protection
│   └── ProtectedRoute.jsx       # User route protection
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.jsx   # Main admin dashboard
│   │   ├── UserManagement.jsx   # User management page
│   │   ├── CourseManagement.jsx # Course management page
│   │   └── AdminProfile.jsx     # Admin profile page
│   ├── About.jsx
│   ├── Admissions.jsx
│   ├── Contact.jsx
│   ├── Courses.jsx
│   ├── ForgotPassword.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Signup.jsx
├── App.jsx                      # Main application component
├── App.css                      # Main styles
├── AdminStyles.css              # Admin-specific styles
└── index.js                     # Application entry point
```

## Key Features Implementation

### Authentication System
- Role-based authentication (admin/user)
- Protected routes for both user and admin areas
- Persistent login state using localStorage

### Admin Dashboard
- Comprehensive statistics and analytics
- Real-time data updates
- Intuitive user interface
- Mobile-first responsive design

### User Management
- Complete CRUD operations for users
- Advanced filtering and search
- User status management
- Detailed user profiles

### Course Management
- Full course lifecycle management
- Rich course information forms
- Image upload support
- Course status management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.