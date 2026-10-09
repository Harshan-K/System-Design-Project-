import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';
import '../../EnhancedAdminStyles.css';

function AdmissionManagement() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');

  useEffect(() => {
    loadAdmissions();
  }, []);

  const loadAdmissions = async () => {
    try {
      console.log('🔄 Loading admissions...');
      const data = await apiService.getAllAdmissions();
      console.log('📊 Received data:', data);
      console.log('📋 Admissions array:', data.admissions);
      setAdmissions(data.admissions || []);
    } catch (error) {
      console.error('❌ Error loading admissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAdmissionModal = (admission) => {
    setSelectedAdmission(admission);
    setShowModal(true);
  };

  const updateAdmissionStatus = async (admissionId, status) => {
    try {
      await apiService.updateAdmissionStatus(admissionId, status);
      setAdmissions(admissions.map(a => 
        a._id === admissionId ? { ...a, status } : a
      ));
      console.log(`🔄 Updated admission ${admissionId} status to ${status}`);
    } catch (error) {
      console.error('Error updating admission:', error);
    }
  };

  const filteredAdmissions = admissions.filter(admission => {
    const matchesSearch = admission.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admission.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || admission.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || admission.course === courseFilter;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const getCourseIcon = (course) => {
    switch(course) {
      case 'cs': return '💻';
      case 'ba': return '💼';
      case 'eng': return '⚙️';
      case 'med': return '🎩';
      case 'arts': return '🎨';
      case 'sci': return '🔬';
      default: return '🎓';
    }
  };

  const getCourseName = (course) => {
    switch(course) {
      case 'cs': return 'Computer Science';
      case 'ba': return 'Business Administration';
      case 'eng': return 'Engineering';
      case 'med': return 'Medicine';
      case 'arts': return 'Arts & Humanities';
      case 'sci': return 'Science';
      default: return course;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return '⏳';
      case 'approved': return '✅';
      case 'rejected': return '❌';
      default: return '📄';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f39c12';
      case 'approved': return '#27ae60';
      case 'rejected': return '#e74c3c';
      default: return '#6c757d';
    }
  };

  const uniqueCourses = [...new Set(admissions.map(a => a.course))];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading admissions...</p>
      </div>
    );
  }

  return (
    <div className="admission-management">
      <div className="page-header">
        <div className="header-content">
          <h1>🎓 Admission Management</h1>
          <p>Review and manage student admission applications</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{admissions.length}</span>
            <span className="stat-label">Total Applications</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{admissions.filter(a => a.status === 'pending').length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{admissions.filter(a => a.status === 'approved').length}</span>
            <span className="stat-label">Approved</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search by name, email, or application number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Courses</option>
            {uniqueCourses.map(course => (
              <option key={course} value={course}>
                {getCourseIcon(course)} {getCourseName(course)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="admissions-grid">
        {filteredAdmissions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <h3>No applications found</h3>
            <p>No admission applications match your current filters.</p>
          </div>
        ) : (
          filteredAdmissions.map((admission) => (
            <div key={admission._id} className="admission-card">
              <div className="admission-header">
                <div className="admission-title">
                  <div className="student-avatar">
                    <span>{admission.fullName.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="student-info">
                    <h3>{admission.fullName}</h3>
                    <span className="application-number">#{admission.applicationNumber}</span>
                  </div>
                </div>
                <span 
                  className={`status-badge ${admission.status}`}
                  style={{ backgroundColor: getStatusColor(admission.status) }}
                >
                  {getStatusIcon(admission.status)} {admission.status}
                </span>
              </div>
              
              <div className="admission-info">
                <div className="info-row">
                  <span className="info-icon">📧</span>
                  <span className="info-text">{admission.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📱</span>
                  <span className="info-text">{admission.phone}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">{getCourseIcon(admission.course)}</span>
                  <span className="info-text">{getCourseName(admission.course)}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📅</span>
                  <span className="info-text">{new Date(admission.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {admission.message && (
                <div className="admission-preview">
                  <p>📝 {admission.message.substring(0, 100)}...</p>
                </div>
              )}

              <div className="admission-actions">
                <button
                  className="btn-view"
                  onClick={() => openAdmissionModal(admission)}
                >
                  👁️ View Details
                </button>
                
                <select
                  value={admission.status}
                  onChange={(e) => updateAdmissionStatus(admission._id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="approved">✅ Approved</option>
                  <option value="rejected">❌ Rejected</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && selectedAdmission && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <div className="modal-avatar">
                  <span>{selectedAdmission.fullName.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h2>{selectedAdmission.fullName}</h2>
                  <span className="modal-subtitle">Application #{selectedAdmission.applicationNumber}</span>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="admission-details-grid">
                <div className="detail-card">
                  <div className="detail-icon">🆔</div>
                  <div className="detail-content">
                    <label>Application Number</label>
                    <span>{selectedAdmission.applicationNumber}</span>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="detail-icon">👤</div>
                  <div className="detail-content">
                    <label>Full Name</label>
                    <span>{selectedAdmission.fullName}</span>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="detail-icon">📧</div>
                  <div className="detail-content">
                    <label>Email Address</label>
                    <span>{selectedAdmission.email}</span>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="detail-icon">📱</div>
                  <div className="detail-content">
                    <label>Phone Number</label>
                    <span>{selectedAdmission.phone}</span>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="detail-icon">{getCourseIcon(selectedAdmission.course)}</div>
                  <div className="detail-content">
                    <label>Selected Course</label>
                    <span>{getCourseName(selectedAdmission.course)}</span>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="detail-icon">📅</div>
                  <div className="detail-content">
                    <label>Application Date</label>
                    <span>{new Date(selectedAdmission.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="detail-icon">{getStatusIcon(selectedAdmission.status)}</div>
                  <div className="detail-content">
                    <label>Current Status</label>
                    <span 
                      className={`status-badge ${selectedAdmission.status}`}
                      style={{ backgroundColor: getStatusColor(selectedAdmission.status) }}
                    >
                      {selectedAdmission.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedAdmission.message && (
                <div className="message-section">
                  <h4>📝 Additional Information</h4>
                  <div className="message-content">
                    <p className="full-message">{selectedAdmission.message}</p>
                  </div>
                </div>
              )}
              
              <div className="modal-actions">
                <select
                  value={selectedAdmission.status}
                  onChange={(e) => {
                    updateAdmissionStatus(selectedAdmission._id, e.target.value);
                    setSelectedAdmission({...selectedAdmission, status: e.target.value});
                  }}
                  className="status-select-modal"
                >
                  <option value="pending">⏳ Pending Review</option>
                  <option value="approved">✅ Approved</option>
                  <option value="rejected">❌ Rejected</option>
                </select>
                
                <button
                  className="btn-email"
                  onClick={() => window.open(`mailto:${selectedAdmission.email}?subject=Admission Application - ${selectedAdmission.applicationNumber}`)}
                >
                  📧 Contact Student
                </button>
                
                <button
                  className="btn-download"
                  onClick={() => {
                    const data = `Application Details\n\nName: ${selectedAdmission.fullName}\nEmail: ${selectedAdmission.email}\nPhone: ${selectedAdmission.phone}\nCourse: ${getCourseName(selectedAdmission.course)}\nApplication Number: ${selectedAdmission.applicationNumber}\nDate: ${new Date(selectedAdmission.createdAt).toLocaleString()}\nStatus: ${selectedAdmission.status}\n\nMessage:\n${selectedAdmission.message || 'No additional message'}`;
                    const blob = new Blob([data], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `admission-${selectedAdmission.applicationNumber}.txt`;
                    a.click();
                  }}
                >
                  💾 Download Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdmissionManagement;