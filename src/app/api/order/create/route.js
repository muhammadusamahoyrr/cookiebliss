// src/app/api/order/create/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
// Ensure the path to your Order model is correct. It might be in src/models/Order.js
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import { protectedRoute } from '@/lib/auth';
import mongoose from 'mongoose';

export async function POST(request) {
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Verify authentication
        const auth = await protectedRoute(request);
        if (auth instanceof NextResponse) return auth;
        const userId = auth.userId;
        const customerInfo = {
            name: auth.user.name || '',
            email: auth.user.email,
            phone: auth.user.phone || '',
        };

        // Connect to database
        await dbConnect();

        const { items, shippingAddress, paymentMethod, notes } = await request.json();

        // Validate required fields
        if (!items || !Array.isArray(items) || items.length === 0) {
            await session.abortTransaction();
            return NextResponse.json({ success: false, message: 'Order must contain items' }, { status: 400 });
        }

        // Validate shipping address
        if (!shippingAddress || !shippingAddress.street || !shippingAddress.city ||
            !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country) {
            await session.abortTransaction();
            return NextResponse.json({ success: false, message: 'Shipping address is incomplete' }, { status: 400 });
        }

        // Validate payment method
        const validPaymentMethods = ['card', 'paypal', 'bank_transfer', 'cash_on_delivery'];
        if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) {
            await session.abortTransaction();
            return NextResponse.json({ success: false, message: 'Invalid payment method' }, { status: 400 });
        }

        // Fetch and validate products with session
        const productIds = items.map(item => item.productId);
        const products = await Product.find({ _id: { $in: productIds } }).session(session);

        if (products.length !== items.length) {
            await session.abortTransaction();
            return NextResponse.json({ success: false, message: 'One or more products not found' }, { status: 400 });
        }

        // Calculate totals and validate inventory
        let totalAmount = 0;
        const orderItems = [];
        const inventoryUpdates = [];

        for (const item of items) {
            const product = products.find(p => p._id.toString() === item.productId);
            if (!product) {
                await session.abortTransaction();
                return NextResponse.json({
                    success: false,
                    message: `Product with ID ${item.productId} not found`
                }, { status: 400 });
            }

            if (item.quantity <= 0) {
                await session.abortTransaction();
                return NextResponse.json({
                    success: false,
                    message: `Invalid quantity for product ${product.title}`
                }, { status: 400 });
            }

            // Check inventory with session
            if (product.inventory < item.quantity) {
                await session.abortTransaction();
                return NextResponse.json({
                    success: false,
                    message: `Not enough stock for ${product.title}. Available: ${product.inventory}`
                }, { status: 400 });
            }

            const subtotal = product.price * item.quantity;
            totalAmount += subtotal;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price,
                subtotal
            });

            // Prepare inventory update
            inventoryUpdates.push({
                updateOne: {
                    filter: { _id: product._id },
                    update: { $inc: { inventory: -item.quantity } }
                }
            });
        }

        // Create the order with session
        const order = new Order({
            user: userId,
            items: orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod,
            notes: notes || '',
            status: 'pending',
            customerInfo
        });

        // Save order and update inventory in transaction
        await order.save({ session });
        await Product.bulkWrite(inventoryUpdates, { session });

        // Commit the transaction
        await session.commitTransaction();

        return NextResponse.json({
            success: true,
            message: 'Order created successfully',
            order
        }, { status: 201 });

    } catch (error) {
        // Abort transaction on error
        await session.abortTransaction();
        console.error('Order creation error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return NextResponse.json({ success: false, message: messages.join(', ') }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            message: 'Failed to create order. Please try again.'
        }, { status: 500 });
    } finally {
        session.endSession();
    }
}