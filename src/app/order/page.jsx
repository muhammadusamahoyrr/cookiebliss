'use client';

import React, { useState } from 'react';
// Import the CSS module
import styles from './OrderPage.module.css';
import PaymentMethodSelector from '@/components/PaymentMethodSelector';
import { useCart } from '@/context/CartContext';

export default function OrderPage() {
  // In a real app, you would fetch order details here
  const { cartItems, getCartTotal } = useCart();

  const orderItems = cartItems;
  const orderTotal = getCartTotal();

  return (
    <div className={styles.orderContainer}>
      <h1 className={styles.orderTitle}>Order Summary</h1>
      <p className={styles.orderSummaryText}>Review your order details below.</p>
      
      {orderItems.length === 0 ? (
        <p className={styles.placeholderMessage}>No items in this order.</p>
      ) : (
        <div>
          <div className={styles.orderItemsList}>
            {orderItems.map(item => (
              <div key={item.id} className={styles.orderItem}>
                <div className={styles.itemDetails}>
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <span className={styles.orderItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className={styles.orderTotal}>
            Total: ${orderTotal.toFixed(2)}
          </div>

          {/* Integrate PaymentMethodSelector component here */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <PaymentMethodSelector orderTotal={orderTotal.toFixed(2)} />
          </div>
        </div>
      )}
    </div>
  );
} 