// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { generateToken, verifyAuth } from '@/lib/auth';

export async function POST(request) {
    try {
        await dbConnect();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ 
                success: false, 
                message: 'Email and password are required' 
            }, { status: 400 });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json({ 
                success: false, 
                message: 'Invalid credentials' 
            }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ 
                success: false, 
                message: 'Invalid credentials' 
            }, { status: 401 });
        }

        const token = generateToken(user._id);
        const userResponse = user.toObject();
        delete userResponse.password;

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            user: userResponse,
            token: token
        }, { status: 200 });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return NextResponse.json({ 
                success: false, 
                message: 'Invalid input data' 
            }, { status: 400 });
        }

        return NextResponse.json({ 
            success: false, 
            message: 'Internal server error' 
        }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await dbConnect();

        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({
                success: false,
                message: 'No token provided'
            }, { status: 401 });
        }

        const auth = await verifyAuth(request);

        if (!auth.isAuthenticated) {
            return NextResponse.json({
                success: false,
                message: auth.error
            }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            user: {
                id: auth.user._id,
                email: auth.user.email,
                name: auth.user.name,
                role: auth.user.role
            }
        }, { status: 200 });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json({
                success: false,
                message: 'Invalid token'
            }, { status: 401 });
        }

        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 });
    }
}