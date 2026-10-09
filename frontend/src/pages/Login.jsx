import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [setupLoading, setSetupLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await login(formData.email, formData.password);
        if (response.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } catch (error) {
        setErrors({ general: error.message || 'Login failed' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const setupAdmin = async () => {
    setSetupLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/create-admin');
      const data = await response.json();
      alert(`${data.message}\nEmail: ${data.credentials.email}\nPassword: ${data.credentials.password}`);
    } catch (error) {
      alert('Error creating admin user');
    } finally {
      setSetupLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Login to TECHEDU</h1>
        {errors.general && <div className="error-banner">{errors.general}</div>}
        
        <form onSubmit={handleSubmit}>


          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <button 
          type="button" 
          className="btn-secondary" 
          onClick={setupAdmin}
          disabled={setupLoading}
          style={{marginTop: '10px', width: '100%'}}
        >
          {setupLoading ? 'Setting up...' : 'Setup Admin User'}
        </button>

        <p className="auth-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
