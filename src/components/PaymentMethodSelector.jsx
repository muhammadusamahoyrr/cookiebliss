import { useState } from 'react';

const PaymentMethodSelector = ({ orderTotal }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const selectPayment = (method) => {
    setSelectedMethod(method);
    console.log('Selected payment method:', method);
  };

  const handlePayment = () => {
    if (selectedMethod) {
      // Redirect to respective payment gateway
      const paymentUrls = {
        'allied-bank': 'https://www.abl.com/personal-banking/digital-banking/abl-digital/',
        'jazzcash': 'https://www.jazzcash.com.pk/',
        'hbl-bank': 'https://www.hbl.com/personal/ways-to-bank/digital-banking/hbl-mobile-app/',
        'credit-card': 'https://secure.payment-gateway.com/credit-card' // Replace with actual credit card gateway
      };
      
      const url = paymentUrls[selectedMethod];
      if (url) {
        window.open(url, '_blank');
      } else {
        alert('Payment gateway not available. Please try another method.');
      }
    } else {
      alert('Please select a payment method.');
    }
  };

  const paymentMethods = [
    {
      id: 'allied-bank',
      name: 'Allied Bank',
      description: 'Online banking with Allied Bank',
      badge: 'Instant',
      badgeColor: 'orange',
      iconColor: 'blue',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7h20L12 2zM4 9v10h16V9H4zm2 2h2v6H6v-6zm4 0h2v6h-2v-6zm4 0h2v6h-2v-6z"/>
        </svg>
      )
    },
    {
      id: 'jazzcash',
      name: 'JazzCash',
      description: 'Pay with JazzCash wallet',
      badge: 'Popular',
      badgeColor: 'orange',
      iconColor: 'red',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
        </svg>
      )
    },
    {
      id: 'hbl-bank',
      name: 'HBL Bank',
      description: 'HBL Internet Banking',
      badge: 'Secure',
      badgeColor: 'brown',
      iconColor: 'green',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7h20L12 2zM4 9v10h16V9H4zm2 2h2v6H6v-6zm4 0h2v6h-2v-6zm4 0h2v6h-2v-6z"/>
        </svg>
      )
    },
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      description: 'Visa, MasterCard, American Express',
      badge: 'Global',
      badgeColor: 'brown',
      iconColor: 'purple',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="wrapper">
      <div className="container">
        <div className="header">
          <h1>Select Payment Method</h1>
        </div>
        
        <div className="payment-options">
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className={`payment-option ${selectedMethod === method.id ? 'selected' : ''}`}
              onClick={() => selectPayment(method.id)}
            >
              <div className={`payment-icon ${method.iconColor}`}>
                {method.icon}
              </div>
              <div className="payment-details">
                <div className="payment-name">{method.name}</div>
                <div className="payment-description">{method.description}</div>
              </div>
              <div className="payment-meta">
                <div className={`payment-badge ${method.badgeColor}`}>
                  {method.badge}
                </div>
                <div className="payment-arrow">→</div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedMethod && (
          <div className="payment-button-container">
            <div className="order-total-display">
              Total: <span>${orderTotal ? orderTotal.toFixed(2) : '0.00'}</span>
            </div>
            <button onClick={handlePayment} className="pay-now-button">
              Pay Now
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .wrapper {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 100%;
          max-width: 500px;
          border: 1px solid #e9ecef;
        }

        .header {
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
          padding: 24px;
          text-align: center;
        }

        .header h1 {
          color: white;
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }

        .payment-options {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .payment-option {
          display: flex;
          align-items: flex-start;
          padding: 16px;
          border: 2px solid #f8f9fa;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
          min-height: 76px;
        }

        .payment-option:hover {
          border-color: #dee2e6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .payment-option.selected {
          border-color: #D2691E;
          background: #fef9f6;
          box-shadow: 0 4px 12px rgba(210, 105, 30, 0.15);
        }

        .payment-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          margin-top: 2px;
          flex-shrink: 0;
          color: white;
        }

        .payment-icon.blue {
          background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
        }

        .payment-icon.red {
          background: linear-gradient(135deg, #d32f2f 0%, #c62828 100%);
        }

        .payment-icon.green {
          background: linear-gradient(135deg, #388e3c 0%, #2e7d32 100%);
        }

        .payment-icon.purple {
          background: linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%);
        }

        .payment-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          min-height: 48px;
          padding-top: 2px;
        }

        .payment-name {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
          line-height: 1.2;
          text-align: left;
        }

        .payment-description {
          font-size: 14px;
          color: #666;
          line-height: 1.2;
          text-align: left;
        }

        .payment-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .payment-badge {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .payment-badge.orange {
          background: #fff3cd;
          color: #b25d00;
          border: 1px solid #ffeb99;
        }

        .payment-badge.brown {
          background: #f8f4f0;
          color: #8B4513;
          border: 1px solid #e6d4c4;
        }

        .payment-arrow {
          font-size: 18px;
          color: #D2691E;
          font-weight: bold;
          transition: transform 0.2s ease;
        }

        .payment-option:hover .payment-arrow {
          transform: translateX(2px);
        }

        .payment-button-container {
          padding: 24px;
          border-top: 1px solid #f8f9fa;
          background: #fafbfc;
        }

        .pay-now-button {
          background: linear-gradient(135deg, #D2691E 0%, #8B4513 100%);
          color: white;
          padding: 16px 32px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .pay-now-button:hover {
          background: linear-gradient(135deg, #CD853F 0%, #A0522D 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);
        }

        .pay-now-button:active {
          transform: translateY(0);
        }

        .order-total-display {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          text-align: center;
          margin-bottom: 16px;
        }

        .order-total-display span {
          color: #D2691E;
        }

        @media (max-width: 480px) {
          .wrapper {
            padding: 16px;
          }
          
          .container {
            border-radius: 16px;
          }
          
          .header {
            padding: 20px;
          }
          
          .header h1 {
            font-size: 18px;
          }
          
          .payment-options {
            padding: 20px;
            gap: 10px;
          }
          
          .payment-option {
            padding: 14px;
            min-height: 72px;
          }
          
          .payment-icon {
            width: 44px;
            height: 44px;
            margin-right: 14px;
          }
          
          .payment-name {
            font-size: 15px;
          }
          
          .payment-description {
            font-size: 13px;
          }
          
          .payment-badge {
            font-size: 11px;
            padding: 3px 10px;
          }
          
          .payment-button-container {
            padding: 20px;
          }
          
          .pay-now-button {
            padding: 14px 28px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentMethodSelector;