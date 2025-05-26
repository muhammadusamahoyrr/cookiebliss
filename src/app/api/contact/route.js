// src/app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '../../lib/dbConnect.js';
import Contact from '../../models/Contact.js';
import { rateLimiter, requireAdmin } from '../../lib/auth.js';

export async function POST(request) {
    try {
        // Apply rate limiting
        const rateLimitResult = rateLimiter(request);
        if (rateLimitResult) return rateLimitResult;

        // Connect to database
        await dbConnect();

        const { name, email, phone, subject, message, category } = await request.json();

        // Basic validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json({
                success: false,
                message: 'Name, email, subject, and message are required'
            }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                message: 'Please enter a valid email address'
            }, { status: 400 });
        }

        // Create contact message
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

        // Save contact message
        const savedContact = await contactMessage.save();

        // Send email notifications (optional)
        try {
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                const transporter = nodemailer.createTransporter({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                // Email to admin
                const adminMailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.CONTACT_EMAIL_RECIPIENT || process.env.EMAIL_USER,
                    subject: `New Contact Form: ${subject}`,
                    html: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                    `,
                };

                // Send email (don't wait for it)
                transporter.sendMail(adminMailOptions).catch(emailError => {
                    console.error('Email sending error:', emailError);
                });
            }
        } catch (emailError) {
            console.error('Email configuration error:', emailError);
        }

        return NextResponse.json({
            success: true,
            message: 'Your message has been sent successfully! We\'ll get back to you soon.',
            contactId: savedContact._id
        }, { status: 200 });

    } catch (error) {
        console.error('Contact form submission error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return NextResponse.json({
                success: false,
                message: messages.join(', ')
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        }, { status: 500 });
    }
}

// GET method to retrieve contact messages (admin only)
export async function GET(request) {
    try {
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
        console.error('Get contacts error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to retrieve contacts'
        }, { status: 500 });
    }
}