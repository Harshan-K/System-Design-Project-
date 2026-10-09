# 🎓 TechEdu - College Management System

A full-stack, modern College Management System built with **React**, **Node.js**, **Express**, and **MongoDB**. The platform includes authentication, role-based access control, an interactive student portal, contact/admission workflows, and a powerful administrative dashboard.

---

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Running the Application](#-running-the-application)
- [Default Credentials](#-default-credentials)
- [Environment Configuration](#-environment-configuration)
- [API Endpoints](#-api-endpoints)
- [Database Models](#-database-models)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### 👤 User / Student Portal
- **User Authentication**: Secure registration and login powered by JWT & bcrypt.
- **Course Catalog**: Browse available programs and academic offerings.
- **Admission Application**: Submit online admission requests with tracking.
- **Contact Inquiries**: Integrated query and message submission.
- **User Profile**: Update personal details and manage passwords.
- **Responsive UI**: Fully mobile-friendly and accessible design.

### 🛡️ Admin Dashboard
- **Analytics & Metrics**: Real-time stats (Total Users, Admissions, Queries, Active Students).
- **User Management**: View user list, toggle active/inactive status, and delete accounts.
- **Admission Processing**: Review, approve, or reject incoming admission applications.
- **Contact Management**: Track and update status of student queries (`new`, `in-progress`, `resolved`).
- **Admin Profile & Settings**: Manage administrator security and account data.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS (Custom Responsive Themes & Dashboard Design)
- **API Client**: Fetch API with custom service abstraction & JWT interceptor

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Local or MongoDB Atlas) via Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Validation**: Express Validator & CORS

---

## 📂 Project Architecture

```
college/
├── backend/
│   ├── middleware/        # Authentication & Authorization middlewares
│   ├── models/            # Mongoose schemas (User, Contact, Admission)
│   ├── routes/            # API Route handlers
│   ├── scripts/           # Administrative utility scripts (createAdmin)
│   ├── .env               # Backend environment variables
│   ├── package.json       # Backend dependencies & scripts
│   └── server.js          # Express app entrypoint
│
├── frontend/
│   ├── public/            # Static assets and index.html
│   ├── src/
│   │   ├── components/    # Reusable UI components & Navbar/Footer
│   │   ├── context/       # AuthContext for global auth state
│   │   ├── pages/         # User & Admin views (Home, About, AdminDashboard, etc.)
│   │   ├── services/      # API communication service layer
│   │   ├── App.jsx        # Main application router
│   │   └── index.js       # React root renderer
│   ├── .env               # Frontend environment variables
│   └── package.json       # Frontend dependencies & scripts
│
├── SETUP.md               # Quick setup guidelines
├── RENDER_DEPLOYMENT.md   # Cloud deployment instructions
├── package.json           # Root helper scripts
└── README.md              # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v8.0.0 or higher)
- **MongoDB** (Local MongoDB Server running on `localhost:27017` or a MongoDB Atlas connection string)

---

### Installation & Setup

#### 1. Clone the repository
```bash
git clone <repository-url>
cd college
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# (Optional) Seed the default Admin user
node scripts/createAdmin.js
```

#### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

---

## 🖥️ Running the Application

Open two terminal windows to run both servers simultaneously:

### Terminal 1: Backend Server
```bash
cd backend
npm run dev
```
> Backend runs on: **`http://localhost:5001`**

### Terminal 2: Frontend Client
```bash
cd frontend
npm start
# (or: npm run dev)
```
> Frontend runs on: **`http://localhost:3000`**

---

## 🔑 Default Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@techedu.com` | `Admin123!` | Full Admin Dashboard & User Management |
| **User** | _Self registered_ | _Custom_ | Student Portal & Applications |

---

## ⚙️ Environment Configuration

### Backend (`backend/.env`)
```env
MONGO_URL=mongodb://localhost:27017/college-management
JWT_SECRET=your_jwt_secret_key_here
PORT=5001
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_BACKEND_URL=http://localhost:5001
```

---

## 📡 API Endpoints

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Log in and receive JWT token | No |
| `GET` | `/api/auth/me` | Fetch current logged-in user info | Yes |
| `PUT` | `/api/auth/change-password` | Update current user's password | Yes |

### 👥 Users & Admin (`/api/users` & `/api/admin`)
| Method | Endpoint | Description | Role Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | List all registered users | `admin` |
| `PUT` | `/api/users/:id/toggle-status`| Toggle active status for user | `admin` |
| `DELETE` | `/api/users/:id` | Remove user | `admin` |
| `GET` | `/api/admin/stats` | Retrieve dashboard metrics | `admin` |
| `GET` | `/api/admin/contacts` | View all contact inquiries | `admin` |
| `GET` | `/api/admin/admissions` | View all admissions applications | `admin` |

### 📝 Public Inquiries & Admissions
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/contact` | Submit general contact message | No |
| `POST` | `/api/admissions/simple` | Submit online admission form | No |

---

## 🗄 Database Models

- **User**: `name`, `email` (unique), `password` (hashed), `phone`, `role` (`user` \| `admin`), `isActive` (`true` \| `false`), `timestamps`
- **Contact**: `name`, `email`, `phone`, `subject`, `message`, `status` (`new` \| `in-progress` \| `resolved`), `timestamps`
- **Admission**: `applicationNumber` (unique), `fullName`, `email`, `phone`, `course`, `message`, `status` (`pending` \| `approved` \| `rejected`), `timestamps`

---

## ❓ Troubleshooting

1. **MongoDB Connection Failure**:
   - Ensure your local MongoDB service is running:
     ```powershell
     Get-Service -Name *mongo*
     ```
   - Or start MongoDB service:
     ```powershell
     net start MongoDB
     ```
2. **Port Conflict on Port 5000/5001**:
   - Change `PORT` in `backend/.env` and update `REACT_APP_API_URL` in `frontend/.env` accordingly.
3. **CORS / API Network Error**:
   - Verify that the backend server is running before making frontend requests.

---

## 📄 License
This project is licensed under the MIT License.
