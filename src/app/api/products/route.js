// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect.js';
import Product from '../../models/Product.js';
import { protectedRoute } from '../../lib/auth.js';

export async function GET(request) {
    try {
        await dbConnect();

        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const limit = parseInt(url.searchParams.get('limit')) || 10;
        const category = url.searchParams.get('category');
        const badge = url.searchParams.get('badge');
        const sortBy = url.searchParams.get('sortBy') || 'createdAt';
        const sortOrder = url.searchParams.get('sortOrder') || 'desc';
        const search = url.searchParams.get('search');

        // Build query
        const query = { isActive: true };

        if (category && category !== 'all') {
            query.category = category;
        }

        if (badge && badge !== 'all') {
            query.badge = badge;
        }

        if (search) {
            query.$text = { $search: search };
        }

        // Build sort object
        const sort = {};
        const validSortFields = ['createdAt', 'price', 'rating', 'title'];
        if (validSortFields.includes(sortBy)) {
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        } else {
            sort.createdAt = -1;
        }

        // Execute query with pagination
        const products = await Product.find(query)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('-__v');

        const total = await Product.countDocuments(query);

        return NextResponse.json({
            success: true,
            products,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Get products error:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to retrieve products',
            error: error.message 
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        // Verify admin access
        const auth = await protectedRoute(request, true);
        if (auth instanceof NextResponse) return auth;

        await dbConnect();

        const productData = await request.json();

        // Basic validation
        const requiredFields = ['title', 'description', 'price', 'image'];
        for (const field of requiredFields) {
            if (!productData[field]) {
                return NextResponse.json({
                    success: false,
                    message: `${field} is required`
                }, { status: 400 });
            }
        }

        // Create new product
        const newProduct = new Product({
            ...productData,
            isActive: true,
            rating: productData.rating || 0,
            reviews: productData.reviews || 0
        });

        const savedProduct = await newProduct.save();

        return NextResponse.json({
            success: true,
            message: 'Product created successfully',
            product: savedProduct
        }, { status: 201 });

    } catch (error) {
        console.error('Create product error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return NextResponse.json({ 
                success: false, 
                message: messages.join(', ') 
            }, { status: 400 });
        }

        return NextResponse.json({ 
            success: false, 
            message: 'Failed to create product',
            error: error.message 
        }, { status: 500 });
    }
}