import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';
import '../../EnhancedAdminStyles.css';

function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      console.log('🔄 Loading contacts...');
      const data = await apiService.getAllContacts();
      console.log('📧 Contacts response:', data);
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('❌ Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId, status) => {
    try {
      await apiService.updateContactStatus(contactId, status);
      setContacts(contacts.map(c => 
        c._id === contactId ? { ...c, status } : c
      ));
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      await apiService.deleteContact(contactId);
      setContacts(contacts.filter(c => c._id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const openContactModal = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'new': return '🆕';
      case 'in-progress': return '⏳';
      case 'resolved': return '✅';
      default: return '📧';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return '#e74c3c';
      case 'in-progress': return '#f39c12';
      case 'resolved': return '#27ae60';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="contact-management">
      <div className="page-header">
        <div className="header-content">
          <h1>📧 Contact Management</h1>
          <p>Manage and respond to contact form submissions</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{contacts.length}</span>
            <span className="stat-label">Total Contacts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{contacts.filter(c => c.status === 'new').length}</span>
            <span className="stat-label">New</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search contacts by name, email, or subject..."
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
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="contacts-grid">
        {filteredContacts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No contacts found</h3>
            <p>No contacts match your current filters.</p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div key={contact._id} className="contact-card">
              <div className="contact-header">
                <div className="contact-title">
                  <span className="contact-icon">{getStatusIcon(contact.status)}</span>
                  <h3>{contact.subject}</h3>
                </div>
                <span 
                  className={`status-badge ${contact.status}`}
                  style={{ backgroundColor: getStatusColor(contact.status) }}
                >
                  {contact.status.replace('-', ' ')}
                </span>
              </div>
              
              <div className="contact-info">
                <div className="info-row">
                  <span className="info-icon">👤</span>
                  <span className="info-text">{contact.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📧</span>
                  <span className="info-text">{contact.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📱</span>
                  <span className="info-text">{contact.phone}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📅</span>
                  <span className="info-text">{new Date(contact.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="contact-message">
                <p>{contact.message.substring(0, 120)}...</p>
              </div>

              <div className="contact-actions">
                <button
                  className="btn-view"
                  onClick={() => openContactModal(contact)}
                >
                  👁️ View Details
                </button>
                
                <select
                  value={contact.status}
                  onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                  className="status-select"
                >
                  <option value="new">🆕 New</option>
                  <option value="in-progress">⏳ In Progress</option>
                  <option value="resolved">✅ Resolved</option>
                </select>
                
                <button
                  className="btn-delete"
                  onClick={() => deleteContact(contact._id)}
                  title="Delete contact"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && selectedContact && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-icon">{getStatusIcon(selectedContact.status)}</span>
                <h2>{selectedContact.subject}</h2>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="contact-details-grid">
                <div className="detail-card">
                  <div className="detail-icon">👤</div>
                  <div className="detail-content">
                    <label>Full Name</label>
                    <span>{selectedContact.name}</span>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="detail-icon">📧</div>
                  <div className="detail-content">
                    <label>Email Address</label>
                    <span>{selectedContact.email}</span>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="detail-icon">📱</div>
                  <div className="detail-content">
                    <label>Phone Number</label>
                    <span>{selectedContact.phone}</span>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="detail-icon">📅</div>
                  <div className="detail-content">
                    <label>Submitted Date</label>
                    <span>{new Date(selectedContact.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="detail-icon">{getStatusIcon(selectedContact.status)}</div>
                  <div className="detail-content">
                    <label>Current Status</label>
                    <span 
                      className={`status-badge ${selectedContact.status}`}
                      style={{ backgroundColor: getStatusColor(selectedContact.status) }}
                    >
                      {selectedContact.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="message-section">
                <h4>📝 Message Content</h4>
                <div className="message-content">
                  <p className="full-message">{selectedContact.message}</p>
                </div>
              </div>
              
              <div className="modal-actions">
                <select
                  value={selectedContact.status}
                  onChange={(e) => {
                    updateContactStatus(selectedContact._id, e.target.value);
                    setSelectedContact({...selectedContact, status: e.target.value});
                  }}
                  className="status-select-modal"
                >
                  <option value="new">🆕 New</option>
                  <option value="in-progress">⏳ In Progress</option>
                  <option value="resolved">✅ Resolved</option>
                </select>
                
                <button
                  className="btn-email"
                  onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`)}
                >
                  📧 Reply via Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactManagement;