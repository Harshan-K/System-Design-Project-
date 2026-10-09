import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';
import '../../EnhancedAdminStyles.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterRole]);

  const loadUsers = async () => {
    try {
      console.log('🔄 Loading users...');
      const response = await apiService.getAllUsers();
      console.log('👥 Users response:', response);
      setUsers(response.users || []);
    } catch (error) {
      console.error('❌ Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    setFilteredUsers(filtered);
  };

  const handleUserAction = async (user, action) => {
    try {
      if (action === 'delete') {
        if (window.confirm('Are you sure you want to delete this user?')) {
          await apiService.deleteUser(user._id);
          setUsers(users.filter(u => u._id !== user._id));
        }
      } else {
        await apiService.toggleUserStatus(user._id);
        loadUsers(); // Reload users after status change
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user: ' + error.message);
    }
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <div className="header-content">
          <h1>👥 User Management</h1>
          <p>Manage and monitor all platform users</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{users.length}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{users.filter(u => u.role === 'admin').length}</span>
            <span className="stat-label">Admins</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{users.filter(u => u.role === 'user').length}</span>
            <span className="stat-label">Users</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="user">Users</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <h3>No users found</h3>
              <p>No users match your current filters.</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-header">
                  <div className="user-avatar">
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className={`role-badge ${user.role}`}>
                    {user.role === 'admin' ? '🔑' : '👤'} {user.role}
                  </span>
                </div>
                
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <div className="info-row">
                    <span className="info-icon">📧</span>
                    <span className="info-text">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="info-row">
                      <span className="info-icon">📱</span>
                      <span className="info-text">{user.phone}</span>
                    </div>
                  )}
                  <div className="info-row">
                    <span className="info-icon">{user.isActive ? '✅' : '❌'}</span>
                    <span className="info-text">{user.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-icon">📅</span>
                    <span className="info-text">{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="user-actions">
                  <button
                    className="btn-view"
                    onClick={() => openUserModal(user)}
                  >
                    👁️ View
                  </button>
                  
                  <button
                    className="btn-delete"
                    onClick={() => handleUserAction(user, 'delete')}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>👥 User Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="user-detail-avatar">
                <div className="avatar-circle">
                  <span>{selectedUser.name.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              
              <div className="user-details">
                <div className="detail-row">
                  <label>👤 Name:</label>
                  <span>{selectedUser.name}</span>
                </div>
                <div className="detail-row">
                  <label>📧 Email:</label>
                  <span>{selectedUser.email}</span>
                </div>
                {selectedUser.phone && (
                  <div className="detail-row">
                    <label>📱 Phone:</label>
                    <span>{selectedUser.phone}</span>
                  </div>
                )}
                <div className="detail-row">
                  <label>🔑 Role:</label>
                  <span className={`role-badge ${selectedUser.role}`}>{selectedUser.role}</span>
                </div>
                <div className="detail-row">
                  <label>✅ Status:</label>
                  <span className={`status-badge ${selectedUser.isActive ? 'active' : 'inactive'}`}>
                    {selectedUser.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="detail-row">
                  <label>📅 Registration Date:</label>
                  <span>{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <label>🔄 Last Updated:</label>
                  <span>{new Date(selectedUser.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;