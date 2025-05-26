'use client';

import { useState } from 'react';
import Button from '../shared/Button';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setIsSubmitted(false);
    
    try {
      // Call your backend contact form API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();

      if (response.ok) {
        // Handle successful submission
        console.log('Form submitted successfully:', data);
        
        // Reset form and show success state
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setIsSubmitted(true);

      } else {
        // Handle submission errors
        console.error('Form submission failed:', data.message);
        setError(data.message || 'Something went wrong. Please try again later.');
        setIsSubmitted(false);
      }

    } catch (err) {
      console.error('Contact form submission request error:', err);
      setError('An unexpected error occurred. Please try again later.');
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <div className={styles.contactFormContainer}>
      <div className={styles.formHeader}>
        <div className={styles.cookieIcon}>🍪</div>
        <h3>Sweet Message Form</h3>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>👤</span>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="First & Last Name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>✉️</span>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="your.email@example.com" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">How Can We Help?</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>📝</span>
              <select 
                id="subject" 
                name="subject" 
                required
                value={formData.subject}
                onChange={handleChange} 
              >
                <option value="" disabled>Select your inquiry type</option>
                <option value="general">General Questions</option>
                <option value="order">Order Inquiry</option>
                <option value="custom">Custom Cookie Order</option>
                <option value="event">Event Catering</option>
                <option value="feedback">Recipe Feedback</option>
                <option value="other">Other Sweet Stuff</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Your Delicious Details</label>
            <div className={`${styles.inputWrapper} ${styles.textareaWrapper}`}>
              <span className={`${styles.inputIcon} ${styles.textareaIcon}`}>💬</span>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Tell us about your cookie needs, special requests, or just share your favorite flavor..." 
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <Button 
            type="submit" 
            variant="primary" 
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            <span className={styles.btnText}>
              {isSubmitting ? 'Sending...' : 'Send Sweet Message'}
            </span>
            <span className={styles.btnIcon}>➡️</span>
          </Button>
        </form>
      ) : (
        <div className={styles.thankYouMessage}>
          <i className="fas fa-cookie-bite"></i>
          <h3>Thank You for Your Sweet Message!</h3>
          <p>We appreciate you taking the time to contact us.</p>
          <p>We'll get back to you as soon as possible!</p>
          <Button 
            variant="secondary" 
            className={styles.newMessageBtn}
            onClick={resetForm}
          >
            <i className="fas fa-plus"></i> Send Another Message
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;