// src/app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
    try {
        // Connect to database
        await dbConnect();

        const { email, password, confirmPassword, name } = await request.json();

        // Basic validation
        if (!email || !password || !confirmPassword) {
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ success: false, message: 'Passwords do not match' }, { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        if (password.length < 6) {
            return NextResponse.json({ success: false, message: 'Password must be at least 6 characters long' }, { status: 400 , headers: { 'Content-Type': 'application/json' }});
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'User with this email already exists' }, { status: 409, headers: { 'Content-Type': 'application/json' } });
        }

        // Hash the password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            email: email.toLowerCase(),
            password: hashedPassword,
            name: name || '',
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = generateToken(savedUser._id);

        // Return success response with user data (excluding password)
        const userData = {
            id: savedUser._id,
            email: savedUser.email,
            name: savedUser.name,
            role: savedUser.role
        };

        return NextResponse.json({
            success: true,
            message: 'Account created successfully',
            user: userData,
            token: token
        }, { status: 201, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error('Signup error:', error);

        // Handle MongoDB validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return NextResponse.json({ success: false, message: messages.join(', ') }, { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return NextResponse.json({ success: false, message: 'User with this email already exists' }, { status: 409, headers: { 'Content-Type': 'application/json' } });
        }

        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 , headers: { 'Content-Type': 'application/json' }});
    }
}