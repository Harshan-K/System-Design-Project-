import React, { useState } from 'react';
import './App.css';
import './AdminStyles.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CourseManagement from './pages/admin/CourseManagement';
import ContactManagement from './pages/admin/ContactManagement';
import AdmissionManagement from './pages/admin/AdmissionManagement';
import AdminProfile from './pages/admin/AdminProfile';

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  // If not authenticated, show only auth pages
  if (!isAuthenticated) {
    return (
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    );
  }

  // If authenticated as admin, show admin interface
  if (user && user.role === 'admin') {
    return (
      <div className="App">
        <Routes>
          <Route path="/admin" element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } />
          <Route path="/admin/users" element={
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          } />
          <Route path="/admin/courses" element={
            <AdminLayout>
              <CourseManagement />
            </AdminLayout>
          } />
          <Route path="/admin/contacts" element={
            <AdminLayout>
              <ContactManagement />
            </AdminLayout>
          } />
          <Route path="/admin/admissions" element={
            <AdminLayout>
              <AdmissionManagement />
            </AdminLayout>
          } />
          <Route path="/admin/profile" element={
            <AdminLayout>
              <AdminProfile />
            </AdminLayout>
          } />
          <Route path="*" element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } />
        </Routes>
      </div>
    );
  }

  // If authenticated as regular user, show user interface
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/512/3976/3976625.png" alt="Logo" className="logo-icon" />
          TECHEDU
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link>
          <Link to="/admissions" onClick={() => setMenuOpen(false)}>Admissions</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <footer className="footer">
        <p>&copy; 2025 TECHEDU. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
