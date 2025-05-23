import React, { useState } from 'react';
import Navbar from './navbar'; // <-- Import the Navbar
import './inquiry.css';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';
import firebaseConfig from './firebaseConfig'; // Adjust path if needed

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const InquiryForm = () => {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    inquiryType: '',
    fullName: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save to Firebase Realtime Database
    const inquiriesRef = ref(db, 'inquiries');
    const newInquiryRef = push(inquiriesRef);
    await set(newInquiryRef, {
      inquiryType: form.inquiryType,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      message: form.message,
      consent: form.consent,
      timestamp: Date.now(),
    });
    setSuccess(true);
    setForm({
      inquiryType: '',
      fullName: '',
      email: '',
      phone: '',
      message: '',
      consent: false,
    });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <Navbar /> {/* <-- Add the Navbar here */}
      <div className="inquiry-container">
        {/* Left Side - Form */}
        <div className="form-section">
          <h2 className="heading">INQUIRIES</h2>
          <form className="inquiry-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Inquiry Type<span className="required">*</span>
              </label>
              <select
                name="inquiryType"
                value={form.inquiryType}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="General">General</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                Full Name<span className="required">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Email<span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Phone<span className="required">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Message<span className="required">*</span>
              </label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Submit</button>

            {success && (
              <div className="success-message">
                <span>✔️ Success!</span>
                <span className="cloudflare">
                  <img src="https://static.cloudflareinsights.com/beacon.min.js" alt="Cloudflare" style={{ height: '1rem' }} />
                </span>
              </div>
            )}

            {/* Consent & Terms */}
            <div className="terms">
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  style={{ marginTop: '0.2rem' }}
                  required
                />
                <span>
                  I affirm that I have read, and understand hereby accept the{' '}
                  <a href="#">Terms and Conditions</a> of the Website's{' '}
                  <a href="#">Privacy Policy</a> and that I consent to the collection, storage, use, disclosure and processing by the company and any third party it authorizes...
                </span>
              </label>
            </div>
          </form>
        </div>

        {/* Right Side - Contact */}
        <div className="contact-section">
          <h2 className="heading">CONTACT US</h2>
          <div className="contact-info">
            <h3>ADDRESS</h3>
          </div>
          <div className="contact-info">
            <h3>CONTACT DETAILS</h3>
            
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps?q=Camella%20Worldwide%20Corporate%20Center,%20Mandaluyong&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;