import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    localStorage.setItem('contactFormData', JSON.stringify(newData));
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    else if (formData.subject.trim().length < 5) newErrors.subject = 'Subject must be at least 5 characters';
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        await apiService.submitContact(formData);
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        localStorage.removeItem('contactFormData');
        setTimeout(() => setSuccess(false), 5000);
      } catch (error) {
        setErrors({ general: error.message || 'Failed to send message' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Contact Us</h1>
        <p>We're here to help</p>
      </section>

      <section className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send us a Message</h2>
          {success && <div className="success-banner">Message sent successfully!</div>}
          {errors.general && <div className="error-banner">{errors.general}</div>}
          
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter 10-digit phone number"
            />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? 'error' : ''}
            />
            {errors.subject && <span className="error-msg">{errors.subject}</span>}
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={errors.message ? 'error' : ''}
            ></textarea>
            {errors.message && <span className="error-msg">{errors.message}</span>}
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="contact-info">
          <div className="contact-item">
            <h3>📍 Address</h3>
            <p>123 Education Street<br/>Tech City, TC 12345</p>
          </div>
          <div className="contact-item">
            <h3>📞 Phone</h3>
            <p>+1 (555) 123-4567<br/>+1 (555) 987-6543</p>
          </div>
          <div className="contact-item">
            <h3>✉️ Email</h3>
            <p>info@techedu.com<br/>support@techedu.com</p>
          </div>
          <div className="contact-item">
            <h3>🕒 Hours</h3>
            <p>Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat: 10:00 AM - 4:00 PM</p>
          </div>
        </div>
      </section>

      <section className="map-section">
        <h2>Find Us</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2007731.8936812766!2d76.5!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0x559475cc463361f0!2sTamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            width="100%"
            height="450"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            title="Tamil Nadu, India"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Contact;
