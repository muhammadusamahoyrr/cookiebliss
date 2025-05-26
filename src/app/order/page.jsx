'use client';

import React, { useState } from 'react';
// Import the CSS module
import styles from './OrderPage.module.css';

export default function OrderPage() {
  // In a real app, you would fetch order details here
  const orderItems = [
    // Example placeholder items - replace with actual order data
    { id: 1, title: 'Chocolate Chip Cookies', quantity: 2, price: 5.99 },
    { id: 2, title: 'Oatmeal Raisin Cookies', quantity: 1, price: 4.99 },
  ];

  const orderTotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProceedToPayment = async () => {
    // In a real app, you might want to add more validation or confirmation steps here

    setIsLoading(true); // Assuming you have an isLoading state in this component

    try {
      // Prepare the order data to send to the backend
      const orderDetails = {
        items: orderItems.map(item => ({ // Map to backend-friendly structure if needed
          productId: item.id, // Use actual product ID
          quantity: item.quantity,
          // Include other necessary item details like price if not validated on backend
        })),
        total: orderTotal, // Send calculated total (backend should re-calculate/validate)
        // Add other relevant order details like shipping address, payment method, etc.
      };

      // Call your backend order creation API endpoint
      const response = await fetch('/api/order/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful order creation (e.g., redirect to order confirmation page)
        console.log('Order created successfully:', data);
        alert(`Order placed! Order ID: ${data.orderId}`); // Simple success feedback
        // Example: router.push(`/order/confirmation/${data.orderId}`);
      } else {
        // Handle order creation errors (e.g., show error message)
        console.error('Order creation failed:', data.message);
        alert(`Failed to place order: ${data.message || 'Unknown error'}`); // Simple error feedback
      }

    } catch (error) {
      console.error('Order creation request error:', error);
      alert('An unexpected error occurred while placing the order.'); // Simple error feedback
    } finally {
      setIsLoading(false);
    }
  };

  // Add an isLoading state to the component if you haven't already
  const [isLoading, setIsLoading] = useState(false); // Add this near other useState calls

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
                <div className={styles.orderItemDetails}>
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

          {/* Add payment processing components/logic here later */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button 
                style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                onClick={handleProceedToPayment} // Add the click handler
                disabled={isLoading || orderItems.length === 0} // Disable button when loading or cart is empty
              >
                {isLoading ? 'Processing Order...' : 'Proceed to Payment'} {/* Update button text based on loading state */}
              </button>
          </div>

        </div>
      )}
    </div>
  );
} 