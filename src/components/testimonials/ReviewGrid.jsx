"use client";

import { useState } from 'react';
import ReviewCard from './ReviewCard';
import Button from '../shared/Button';
import styles from './ReviewGrid.module.css';

const ReviewGrid = ({ initialReviews = [], showAll = false }) => {
  const [visibleReviews, setVisibleReviews] = useState(initialReviews.slice(0, 6));
  const [showAllReviews, setShowAllReviews] = useState(showAll);

  const handleViewAll = () => {
    setVisibleReviews(initialReviews);
    setShowAllReviews(true);
  };

  return (
    <div className={styles.reviewGridContainer}>
      <div className={styles.reviewGrid}>
        {visibleReviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>4.9</div>
          <div className={styles.stars}>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
          <div className={styles.statLabel}>Average Rating</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>2,450+</div>
          <div className={styles.statLabel}>Happy Customers</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>98%</div>
          <div className={styles.statLabel}>Would Recommend</div>
        </div>
      </div>

      {!showAllReviews && initialReviews.length > 6 && (
        <div className={styles.allReviewsBtn}>
          <Button 
            variant="primary" 
            onClick={handleViewAll}
          >
            Read More Sweet Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewGrid;