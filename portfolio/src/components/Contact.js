import React, { useState } from 'react';
import './Contact.css';

const API_URL_CONTACT = process.env.REACT_APP_API_URL_CONTACT;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(API_URL_CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <h2 className="section-title">Contact Info</h2>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Contact Me!</h3>
          <p>
            Feel free to reach out to me! I'm always interested in new opportunities and exciting projects!
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">
                <div className="icon-circle"></div>
              </div>
              <div>
                <h4>Email</h4>
                <p>aidan.ngu98@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <div className="icon-circle"></div>
              </div>
              <div>
                <h4>Location</h4>
                <p>Washington D.C., USA</p>
              </div>
            </div>

          </div>
          <div className="social-links">
            <a href="https://github.com/Stunned1" className="social-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/anguy98/" className="social-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/ainguy98/" className="social-link" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 