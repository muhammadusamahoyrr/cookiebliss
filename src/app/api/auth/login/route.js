// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { generateToken, verifyAuth } from '@/lib/auth';

export async function POST(request) {
    try {
        // Connect to database
        await dbConnect();

        const { email, password } = await request.json();

        // Basic validation
        if (!email || !password) {
            return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Return success response with user data (excluding password)
        const userResponse = user.toObject();
        delete userResponse.password;

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            user: userResponse,
            token: token
        }, { status: 200 });

    } catch (error) {
        console.error('Login error:', error);

        // Handle specific errors if needed (e.g., database errors)

        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

// Optional: GET method to check if user is already logged in
export async function GET(request) {
    try {
        await dbConnect();

        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response(JSON.stringify({
                success: false,
                message: 'No token provided'
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Use the verifyAuth function directly
        const auth = await verifyAuth(request);

        if (!auth.isAuthenticated) {
            return new Response(JSON.stringify({
                success: false,
                message: auth.error
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({
            success: true,
            user: {
                id: auth.user._id,
                email: auth.user.email,
                name: auth.user.name,
                role: auth.user.role
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Auth check error:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Internal server error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}