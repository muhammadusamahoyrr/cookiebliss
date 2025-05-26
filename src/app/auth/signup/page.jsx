'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SignupPage.module.css'; // Import the signup CSS module
import Link from 'next/link'; // Import Link for navigation

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear confirm password error if password changes
    if (name === 'password' && errors.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Call your backend signup API endpoint
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful signup (e.g., show success message, redirect)
        console.log('Signup successful:', data);
        alert('Signup successful! You can now log in.'); // Simple success feedback
        router.push('/auth/login'); // Redirect to login page after successful signup
      } else {
        // Handle signup errors (e.g., show error message)
        console.error('Signup failed:', data.message);
        setErrors({ general: data.message || 'Signup failed. Please try again.' });
      }

    } catch (error) {
      console.error('Signup request error:', error);
      setErrors({ general: 'An unexpected error occurred. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}> {/* Use the main container class */}
      <div className={styles.signupContainer}> {/* Use the signup container class */}
        <div className={styles.logo}> {/* Placeholder for logo */}
          <span>Cookie</span><span>Bliss</span> {/* Example logo text */}
        </div>

        <h1 className={styles.title}>Join CookieBliss!</h1> {/* Use title class */}
        <p className={styles.subtitle}>Create your account to start ordering delicious cookies</p> {/* Use subtitle class */}

        {errors.general && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#dc2626',
            fontSize: '0.875rem',
            marginBottom: '20px'
          }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.signupForm}> {/* Use signupForm class */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && (
              <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`${styles.formInput} ${errors.password ? styles.error : ''}`}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && (
              <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                {errors.password}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ''}`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {errors.confirmPassword && (
              <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className={styles.toggleText}> {/* Use toggleText class */}
          Already have an account?{' '}
          <Link href="/auth/login" className={styles.toggleLink}> {/* Use Link for navigation */}
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
} 