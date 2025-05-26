"use client";

import Image from 'next/image';
import styles from './ReviewCard.module.css';

const ReviewCard = ({
  review = {
    id: '',
    text: '',
    author: {
      name: '',
      avatar: '',
      initials: '',
    },
    rating: 5,
    date: '',
    verified: true,
  }
}) => {
  // Helper function to render star rating
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

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewContent}>
        <p className={styles.reviewText}>{review.text}</p>
      </div>

      <div className={styles.reviewAuthor}>
        <div className={styles.authorAvatar}>
          {review.author.avatar ? (
            <Image 
              src={review.author.avatar} 
              alt={review.author.name}
              width={50}
              height={50}
            />
          ) : (
            <span>{review.author.initials || review.author.name.charAt(0)}</span>
          )}
        </div>
        <div className={styles.authorInfo}>
          <h4>{review.author.name}</h4>
          <div className={styles.stars}>
            {renderStars(review.rating)}
          </div>
          <div className={styles.reviewMeta}>
            {review.verified && 'Verified Buyer • '}
            {review.date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;