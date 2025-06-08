'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.css';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, removeItemFromCart } = useCart();
  const router = useRouter();

  const handleProceedToCheckout = () => {
    router.push('/order');
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <div>
          <div className={styles.cartItemsList}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemDetails}>
                  <h2>{item.title}</h2>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </div>

          <div className={styles.checkoutButtonContainer}>
              <button 
                className={styles.checkoutButton}
                onClick={handleProceedToCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
          </div>
        </div>
      )}
    </div>
  );
} 