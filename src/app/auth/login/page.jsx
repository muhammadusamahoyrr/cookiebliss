'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('cookiebliss_token');
    if (token) {
      // User is already logged in, redirect to flavors
      router.push('/flavors');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear general error when user makes changes
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({}); // Clear any previous errors
    
    try {
      console.log('Attempting login with:', { email: formData.email });
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response from server');
      }

      console.log('Login response:', { status: response.status, data });

      if (response.ok && data.success) {
        // Handle successful login
        console.log('Login successful:', data);
        
        // Store user data and token
        if (data.token) {
          localStorage.setItem('cookiebliss_token', data.token);
        }
        if (data.user) {
          localStorage.setItem('cookiebliss_user', JSON.stringify(data.user));
        }
        
        // Show success message briefly
        setErrors({ general: '' });
        
        // Redirect based on user role
        if (data.user?.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/flavors');
        }
        
      } else {
        // Handle login errors
        console.error('Login failed:', data);
        setErrors({ 
          general: data.message || 'Login failed. Please check your credentials and try again.' 
        });
      }

    } catch (error) {
      console.error('Login request error:', error);
      setErrors({ 
        general: 'Unable to connect to server. Please check your internet connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <span>Cookie</span><span>Bliss</span>
        </div>

        <h1 className={styles.title}>Welcome Back!</h1>
        <p className={styles.subtitle}>
          Sign in to your account and continue your sweet journey with us
        </p>

        {errors.general && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#dc2626',
            fontSize: '0.875rem',
            marginBottom: '20px',
            lineHeight: '1.4'
          }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
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
              disabled={isLoading}
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
            {errors.password && (
              <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                {errors.password}
              </span>
            )}
          </div>

          <div className={styles.optionsRow}>
            <div className={styles.rememberMe}>
              <input
                type="checkbox"
                id="remember"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link href="/auth/forgot-password" className={styles.forgotPasswordLink}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span style={{ marginRight: '8px' }}>⏳</span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Test Credentials Section */}
        <div style={{
          backgroundColor: '#f3f4f6',
          padding: '16px',
          borderRadius: '8px',
          marginTop: '20px',
          fontSize: '0.875rem',
          border: '1px solid #d1d5db'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#374151', fontWeight: '600' }}>
            🧪 Test Credentials:
          </h4>
          <div style={{ color: '#6b7280' }}>
            <strong>Admin:</strong> admin@cookiebliss.com / admin123456<br />
            <strong>User:</strong> john.doe@example.com / password123
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          padding: '20px 0',
          borderTop: '1px solid #e5e7eb',
          color: '#6b7280',
          fontSize: '0.875rem'
        }}>
          Don't have an account?{' '}
          <Link
            href="/auth/signup"
            style={{
              color: '#9d6209',
              fontWeight: '600',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}