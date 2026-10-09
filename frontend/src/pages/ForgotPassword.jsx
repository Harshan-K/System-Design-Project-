import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError('Email is required');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);

    if (user) {
      setSuccess('Password reset link sent to your email!');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError('Email not found');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Forgot Password</h1>
        {error && <div className="error-banner">{error}</div>}
        {success && <div className="success-banner">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className={error ? 'error' : ''}
            />
          </div>

          <button type="submit" className="btn-primary">Reset Password</button>
        </form>

        <p className="auth-link">
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
