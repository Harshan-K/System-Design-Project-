import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalContacts: 0,
    totalAdmissions: 0
  });

  const [recentData, setRecentData] = useState({
    users: [],
    contacts: [],
    admissions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      console.log('📊 Loading dashboard data...');
      // Use API service for all calls
      const [usersRes, contactsRes, admissionsRes] = await Promise.all([
        apiService.getAllUsers(),
        apiService.getAllContacts(),
        apiService.getAllAdmissions()
      ]);
      
      const users = usersRes.users || [];
      const contacts = contactsRes.contacts || [];
      const admissions = admissionsRes.admissions || [];
      
      console.log('👥 Users:', users.length);
      console.log('📧 Contacts:', contacts.length);
      console.log('🎓 Admissions:', admissions.length);
      
      setStats({
        totalUsers: users.filter(u => u.role === 'user').length,
        totalAdmins: users.filter(u => u.role === 'admin').length,
        totalContacts: contacts.length,
        totalAdmissions: admissions.length
      });
      
      setRecentData({
        users: users.slice(0, 5),
        contacts: contacts.slice(0, 5),
        admissions: admissions.slice(0, 5)
      });
    } catch (error) {
      console.error('❌ Dashboard data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png', color: 'blue' },
    { title: 'Total Admins', value: stats.totalAdmins, icon: 'https://cdn-icons-png.flaticon.com/512/3330/3330315.png', color: 'green' },
    { title: 'Contact Messages', value: stats.totalContacts, icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828640.png', color: 'orange' },
    { title: 'Admissions', value: stats.totalAdmissions, icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828817.png', color: 'purple' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Administrator! Here's what's happening with your platform.</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              <img src={stat.icon} alt={stat.title} className="stat-icon-img" />
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Recent Activities</h2>
          <div className="activity-list">
            <h3>Recent Users</h3>
            {recentData.users.map((user) => (
              <div key={user._id} className="activity-item">
                <div className="activity-icon user">
                  <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user" className="activity-icon-img" />
                </div>
                <div className="activity-content">
                  <p><strong>{user.name}</strong></p>
                  <p>{user.email} • {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            
            <h3>Recent Contacts</h3>
            {recentData.contacts.map((contact) => (
              <div key={contact._id} className="activity-item">
                <div className="activity-icon contact">
                  <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" alt="contact" className="activity-icon-img" />
                </div>
                <div className="activity-content">
                  <p><strong>{contact.subject}</strong></p>
                  <p>by {contact.name} • {new Date(contact.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            
            <h3>Recent Admissions</h3>
            {recentData.admissions.map((admission) => (
              <div key={admission._id} className="activity-item">
                <div className="activity-icon admission">
                  <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="admission" className="activity-icon-img" />
                </div>
                <div className="activity-content">
                  <p><strong>{admission.fullName}</strong></p>
                  <p>{admission.course} • {new Date(admission.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-btn primary" onClick={() => window.location.href = '/admin/courses'}>
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="Add" className="btn-icon" />
              Add New Course
            </button>
            <button className="action-btn secondary" onClick={() => window.location.href = '/admin/users'}>
              <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Users" className="btn-icon" />
              Manage Users
            </button>
            <button className="action-btn tertiary" onClick={() => window.location.href = '/admin/profile'}>
              <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="Profile" className="btn-icon" />
              Admin Profile
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-section">
          <h3>User Growth</h3>
          <div className="chart-placeholder">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop" 
              alt="User Growth Chart"
              className="chart-image"
            />
          </div>
        </div>
        
        <div className="chart-section">
          <h3>Course Enrollment</h3>
          <div className="chart-placeholder">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop" 
              alt="Course Enrollment Chart"
              className="chart-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;