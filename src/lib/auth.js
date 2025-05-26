// lib/auth.js
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// Simple in-memory rate limiting (consider using Redis for production)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // Maximum requests per window

export async function verifyAuth(request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { isAuthenticated: false, error: 'No token provided' };
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists
    const user = await User.findById(decoded.userId).select('-password role');
    if (!user) {
      return { isAuthenticated: false, error: 'User not found' };
    }

    return { 
      isAuthenticated: true, 
      userId: user._id, 
      user: user 
    };
  } catch (error) {
    return { 
      isAuthenticated: false, 
      error: error.message === 'jwt expired' ? 'Token expired' : 'Invalid token' 
    };
  }
}

export function generateToken(userId) {
  return jwt.sign(
    { userId }, 
    "JWT_SECRET"||process.env.JWT_SECRET, 
    { expiresIn: '24h' }
  );
}

// Middleware function for protected routes
export async function requireAuth(request) {
  const auth = await verifyAuth(request);
  if (!auth.isAuthenticated) {
    return NextResponse.json(
      { success: false, message: auth.error || 'Authentication required' },
      { status: 401 }
    );
  }
  return auth;
}

// Middleware function for admin-only routes
export async function requireAdmin(request) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth; // Return error response if auth failed

  if (auth.user.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Admin access required' },
      { status: 403 }
    );
  }
  return auth;
}

// Rate limiting middleware
export function rateLimiter(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  // Clean up old entries
  for (const [key, value] of rateLimit.entries()) {
    if (value.timestamp < windowStart) {
      rateLimit.delete(key);
    }
  }

  // Get or create rate limit entry for this IP
  const rateLimitInfo = rateLimit.get(ip) || { count: 0, timestamp: now };
  
  // Check if rate limit is exceeded
  if (rateLimitInfo.count >= MAX_REQUESTS) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  // Update rate limit info
  rateLimitInfo.count++;
  rateLimitInfo.timestamp = now;
  rateLimit.set(ip, rateLimitInfo);

  return null; // No rate limit exceeded
}

// Combined middleware for protected routes with rate limiting
export async function protectedRoute(request, requireAdminRole = false) {
  // Check rate limit first
  const rateLimitResult = rateLimiter(request);
  if (rateLimitResult) return rateLimitResult;

  // Then check authentication and admin role if required
  return requireAdminRole ? requireAdmin(request) : requireAuth(request);
}