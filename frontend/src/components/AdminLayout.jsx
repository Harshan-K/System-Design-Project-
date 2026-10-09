import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <header className="header">
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/512/3976/3976625.png" alt="Logo" className="logo-icon" />
          TECHEDU Admin
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <Link 
            to="/admin" 
            className={location.pathname === '/admin' ? 'active-link' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/users" 
            className={location.pathname === '/admin/users' ? 'active-link' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Users
          </Link>
          <Link 
            to="/admin/courses" 
            className={location.pathname === '/admin/courses' ? 'active-link' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Courses
          </Link>
          <Link 
            to="/admin/contacts" 
            className={location.pathname === '/admin/contacts' ? 'active-link' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Contacts
          </Link>
          <Link 
            to="/admin/admissions" 
            className={location.pathname === '/admin/admissions' ? 'active-link' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Admissions
          </Link>
          <Link 
            to="/admin/profile" 
            className={location.pathname === '/admin/profile' ? 'active-link' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main className="admin-content">
        {children}
      </main>
      
      <footer className="admin-footer">
        <div className="footer-content">
          <div className="footer-left">
            <p>&copy; 2024 TECHEDU Admin Panel. All rights reserved.</p>
          </div>
          <div className="footer-right">
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>Administrator Dashboard</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AdminLayout;