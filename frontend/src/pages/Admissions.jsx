import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

function Admissions() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    profileImage: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('admissionFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    localStorage.setItem('admissionFormData', JSON.stringify(newData));
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newData = { ...formData, profileImage: reader.result };
        setFormData(newData);
        setImagePreview(reader.result);
        localStorage.setItem('admissionFormData', JSON.stringify(newData));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.course) newErrors.course = 'Please select a course';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const admissionData = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          course: formData.course,
          message: formData.message
        };
        
        await apiService.submitAdmission(admissionData);
        setSuccess(true);
        setFormData({ fullName: '', email: '', phone: '', course: '', message: '', profileImage: '' });
        setImagePreview('');
        localStorage.removeItem('admissionFormData');
        setTimeout(() => setSuccess(false), 5000);
      } catch (error) {
        setErrors({ general: error.message || 'Failed to submit application' });
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
        <h1>Admissions</h1>
        <p>Start your journey with TECHEDU</p>
      </section>

      <section className="admission-content">
        <div className="admission-info">
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80" alt="Admissions" />
          <h2>Admission Requirements</h2>
          <ul>
            <li>Completed high school diploma or equivalent</li>
            <li>Official transcripts from previous institutions</li>
            <li>Standardized test scores (SAT/ACT)</li>
            <li>Letters of recommendation</li>
            <li>Personal statement or essay</li>
          </ul>
        </div>

        <form className="admission-form" onSubmit={handleSubmit}>
          <h2>Apply Now</h2>
          {success && <div className="success-banner">Application submitted successfully!</div>}
          {errors.general && <div className="error-banner">{errors.general}</div>}
          
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
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
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Course *</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={errors.course ? 'error' : ''}
            >
              <option value="">Select a course</option>
              <option value="cs">Computer Science</option>
              <option value="ba">Business Administration</option>
              <option value="eng">Engineering</option>
              <option value="med">Medicine</option>
              <option value="arts">Arts & Humanities</option>
              <option value="sci">Science</option>
            </select>
            {errors.course && <span className="error-msg">{errors.course}</span>}
          </div>

          <div className="form-group">
            <label>Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{marginBottom: '10px'}}
            />
            {imagePreview && (
              <div style={{textAlign: 'center', marginTop: '10px'}}>
                <img 
                  src={imagePreview} 
                  alt="Profile Preview" 
                  style={{width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #3498db'}}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Additional Information</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Admissions;
