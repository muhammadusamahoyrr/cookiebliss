// src/app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';
import { rateLimiter, requireAdmin } from '@/lib/auth';

export async function POST(request) {
    try {
        const rateLimitResult = rateLimiter(request);
        if (rateLimitResult) return rateLimitResult;

        await dbConnect();

        const { name, email, phone, subject, message, category } = await request.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({
                success: false,
                message: 'Name, email, subject, and message are required'
            }, { status: 400 });
        }

        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                message: 'Please enter a valid email address'
            }, { status: 400 });
        }

        const contactMessage = new Contact({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone?.trim() || '',
            subject: subject.trim(),
            message: message.trim(),
            category: category || 'general',
            status: 'new',
            priority: 'medium'
        });

        const savedContact = await contactMessage.save();

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully',
            contact: savedContact
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to send message'
        }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const adminCheck = await requireAdmin(request);
        if (adminCheck instanceof NextResponse) return adminCheck;

        await dbConnect();

        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const limit = parseInt(url.searchParams.get('limit')) || 10;

        const contacts = await Contact.find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit);

        const total = await Contact.countDocuments({});

        return NextResponse.json({
            success: true,
            contacts,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to retrieve contacts'
        }, { status: 500 });
    }
}