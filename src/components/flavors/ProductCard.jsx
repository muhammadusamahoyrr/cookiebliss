'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import Button from '../shared/Button';
import { useCart } from '../../context/CartContext';

const ProductCard = ({
  product = {
    id: '',
    title: '',
    description: '',
    price: 0,
    image: '',
    rating: 0,
    reviews: 0,
    badge: '', // 'bestseller', 'new', 'limited'
  }
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItemToCart } = useCart();

  // Helper function to render the star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  // Helper function to get badge class
  const getBadgeClass = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'bestseller':
        return styles.bestseller;
      case 'new':
        return styles.new;
      case 'limited':
        return styles.limited;
      default:
        return '';
    }
  };

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    addItemToCart(product);
  };

  return (
    <div 
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.productImage}>
        {product.image && (
          <Image 
            src={product.image} 
            alt={product.title} 
            width={280}
            height={220}
            className={isHovered ? styles.imageHovered : ''}
          />
        )}
        {product.badge && (
          <div className={`${styles.productBadge} ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </div>
        )}
      </div>

      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>
      
      <div className={styles.productRating}>
        {renderStars(product.rating)}
        <span>({product.reviews})</span>
      </div>

      <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
      
      <Button 
        variant="primary" 
        className={styles.addToCartBtn}
        icon={<i className="fas fa-shopping-cart"></i>}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;