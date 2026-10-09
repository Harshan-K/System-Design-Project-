const API_BASE_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : 'https://techedu-backend-3hqq.onrender.com/api');

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return await this.request('/auth/me');
  }

  async updateProfile(userData) {
    return await this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(passwordData) {
    return await this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  }

  async getAllUsers() {
    return await this.request('/users');
  }

  async toggleUserStatus(userId) {
    return await this.request(`/users/${userId}/toggle-status`, {
      method: 'PUT',
    });
  }

  async deleteUser(userId) {
    return await this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Admin Dashboard APIs
  async getDashboardStats() {
    return await this.request('/admin/stats');
  }

  async getAllContacts() {
    return await this.request('/admin/contacts');
  }

  async getAllAdmissions() {
    return await this.request('/admin/admissions');
  }

  async getSimpleAdmissions() {
    console.log('🔍 API: Fetching simple admissions...');
    const result = await this.request('/admissions/all');
    console.log('📊 API: Simple admissions result:', result);
    return result;
  }

  async updateContactStatus(contactId, status) {
    return await this.request(`/admin/contacts/${contactId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteContact(contactId) {
    return await this.request(`/admin/contacts/${contactId}`, {
      method: 'DELETE',
    });
  }

  async updateAdmissionStatus(admissionId, status) {
    return await this.request(`/admin/admissions/${admissionId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteAdmission(admissionId) {
    return await this.request(`/admin/admissions/${admissionId}`, {
      method: 'DELETE',
    });
  }

  async submitContact(contactData) {
    return await this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async submitAdmission(admissionData) {
    return await this.request('/admissions/simple', {
      method: 'POST',
      body: JSON.stringify(admissionData),
    });
  }

  logout() {
    this.setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  }
}

export default new ApiService();