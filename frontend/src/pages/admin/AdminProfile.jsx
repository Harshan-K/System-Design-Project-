import React, { useState, useEffect } from 'react';

function AdminProfile() {
  const [profileData, setProfileData] = useState({
    name: 'Administrator',
    email: 'admin@techedu.com',
    username: 'admin',
    phone: '+1 (555) 123-4567',
    department: 'IT Administration',
    joinDate: '2023-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [imagePreview, setImagePreview] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [systemStats, setSystemStats] = useState({
    totalLogins: 156,
    lastLogin: new Date().toISOString(),
    accountCreated: '2023-01-15',
    permissions: ['User Management', 'Course Management', 'System Settings', 'Reports']
  });

  useEffect(() => {
    // Load admin profile from localStorage if exists
    const savedProfile = localStorage.getItem('adminProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setProfileData(profile);
      setFormData(profile);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfileData(formData);
    localStorage.setItem('adminProfile', JSON.stringify(formData));
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    // In a real app, you would validate the current password
    alert('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordForm(false);
  };

  const cancelEdit = () => {
    setFormData({ ...profileData });
    setIsEditing(false);
  };

  return (
    <div className="admin-profile">
      <div className="page-header">
        <h1>Admin Profile</h1>
        <p>Manage your administrator account settings</p>
      </div>

      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar-section">
            <img src={profileData.avatar} alt="Admin Avatar" className="profile-avatar" />
            <h2>{profileData.name}</h2>
            <p className="profile-role">System Administrator</p>
            <div className="profile-status">
              <span className="status-indicator active"></span>
              Online
            </div>
          </div>

          <div className="profile-stats">
            <h3>Account Statistics</h3>
            <div className="stat-item">
              <span className="stat-label">Total Logins:</span>
              <span className="stat-value">{systemStats.totalLogins}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Last Login:</span>
              <span className="stat-value">{new Date(systemStats.lastLogin).toLocaleDateString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Account Created:</span>
              <span className="stat-value">{new Date(systemStats.accountCreated).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="profile-permissions">
            <h3>Permissions</h3>
            <ul className="permissions-list">
              {systemStats.permissions.map((permission, index) => (
                <li key={index} className="permission-item">
                  <span className="permission-icon">✓</span>
                  {permission}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-section">
            <div className="section-header">
              <h3>Personal Information</h3>
            </div>

            {!isEditing ? (
              <>
                <div className="profile-info-grid">
                  <div className="info-card">
                    <div className="info-icon">
                      <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="Name" className="info-icon-img" />
                    </div>
                    <div className="info-content">
                      <label>Full Name</label>
                      <span>{profileData.name}</span>
                    </div>
                  </div>
                  
                  <div className="info-card">
                    <div className="info-icon">
                      <img src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png" alt="Username" className="info-icon-img" />
                    </div>
                    <div className="info-content">
                      <label>Username</label>
                      <span>{profileData.username}</span>
                    </div>
                  </div>
                  
                  <div className="info-card">
                    <div className="info-icon">
                      <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" className="info-icon-img" />
                    </div>
                    <div className="info-content">
                      <label>Email Address</label>
                      <span>{profileData.email}</span>
                    </div>
                  </div>
                  
                  <div className="info-card">
                    <div className="info-icon">
                      <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="Phone" className="info-icon-img" />
                    </div>
                    <div className="info-content">
                      <label>Phone Number</label>
                      <span>{profileData.phone}</span>
                    </div>
                  </div>
                  
                  <div className="info-card">
                    <div className="info-icon">
                      <img src="https://cdn-icons-png.flaticon.com/512/684/684809.png" alt="Department" className="info-icon-img" />
                    </div>
                    <div className="info-content">
                      <label>Department</label>
                      <span>{profileData.department}</span>
                    </div>
                  </div>
                  
                  <div className="info-card">
                    <div className="info-icon">
                      <img src="https://cdn-icons-png.flaticon.com/512/833/833593.png" alt="Date" className="info-icon-img" />
                    </div>
                    <div className="info-content">
                      <label>Join Date</label>
                      <span>{new Date(profileData.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="profile-actions">
                  <button className="btn-edit-bottom" onClick={() => setIsEditing(true)}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="Edit" className="btn-icon" />
                    Edit Profile
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="edit-actions-top">
                  <button className="btn-cancel" onClick={cancelEdit}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="Cancel" className="btn-icon" />
                    Cancel
                  </button>
                  <button className="btn-save" form="profile-form">
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" alt="Save" className="btn-icon" />
                    Save Changes
                  </button>
                </div>
              <div className="profile-edit-container">
                <div className="profile-image-edit">
                  <div className="current-image">
                    <img 
                      src={imagePreview || formData.avatar} 
                      alt="Profile" 
                      className="edit-profile-image"
                    />
                  </div>
                  <label className="image-upload-btn">
                    <img src="https://cdn-icons-png.flaticon.com/512/685/685655.png" alt="Camera" className="btn-icon" />
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{display: 'none'}}
                    />
                  </label>
                </div>
                
                <form id="profile-form" onSubmit={handleProfileSubmit} className="profile-edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Username *</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Department</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              </>
            )}
          </div>

          <div className="profile-section">
            <div className="section-header">
              <h3>Security Settings</h3>
              <button 
                className="btn-secondary"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                Change Password
              </button>
            </div>

            {showPasswordForm && (
              <form onSubmit={handlePasswordSubmit} className="password-form">
                <div className="form-group">
                  <label>Current Password *</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>New Password *</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Confirm New Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowPasswordForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            )}

            <div className="security-info">
              <div className="security-item">
                <span className="security-icon">🔒</span>
                <div>
                  <strong>Two-Factor Authentication</strong>
                  <p>Enhance your account security with 2FA</p>
                </div>
                <button className="btn-enable">Enable</button>
              </div>
              
              <div className="security-item">
                <span className="security-icon">📱</span>
                <div>
                  <strong>Login Notifications</strong>
                  <p>Get notified of new login attempts</p>
                </div>
                <button className="btn-enabled">Enabled</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;