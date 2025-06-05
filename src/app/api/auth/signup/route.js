// src/app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
    try {
        await dbConnect();

        const { email, password, confirmPassword, name } = await request.json();

        if (!email || !password || !confirmPassword) {
            return NextResponse.json({ 
                success: false, 
                message: 'All fields are required' 
            }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ 
                success: false, 
                message: 'Passwords do not match' 
            }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ 
                success: false, 
                message: 'Password must be at least 6 characters long' 
            }, { status: 400 });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json({ 
                success: false, 
                message: 'User with this email already exists' 
            }, { status: 409 });
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            email: email.toLowerCase(),
            password: hashedPassword,
            name: name || '',
        });

        const savedUser = await newUser.save();
        const token = generateToken(savedUser._id);

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
        }, { status: 201 });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return NextResponse.json({ 
                success: false, 
                message: messages.join(', ') 
            }, { status: 400 });
        }

        if (error.code === 11000) {
            return NextResponse.json({ 
                success: false, 
                message: 'User with this email already exists' 
            }, { status: 409 });
        }

        return NextResponse.json({ 
            success: false, 
            message: 'Internal server error' 
        }, { status: 500 });
    }
}