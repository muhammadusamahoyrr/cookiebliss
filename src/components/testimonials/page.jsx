"use client";

import React, { useState } from 'react';
import styles from './TestimonialsPage.module.css';

// Sample reviews data
const sampleReviews = [
  {
    id: '1',
    text: 'These cookies are absolutely divine! The chocolate chip ones remind me of my grandmother\'s recipe but even better. Perfect balance of crispy edges and chewy centers with just the right amount of chocolate.',
    author: {
      name: 'Sarah Johnson',
      initials: 'SJ'
    },
    rating: 5,
    date: '2 days ago',
    verified: true
  },
  {
    id: '2',
    text: 'The oatmeal raisin cookies were perfect - not too sweet and incredibly soft. My kids absolutely loved them and they disappeared in minutes! Will definitely be ordering again for our weekly family movie nights.',
    author: {
      name: 'Michael Rodriguez',
      initials: 'MR'
    },
    rating: 4.5,
    date: '1 week ago',
    verified: true
  },
  {
    id: '3',
    text: 'I ordered these for a company event and everyone was impressed! The presentation was beautiful and the taste was exceptional. The variety pack was a hit - something for everyone. Customer service was outstanding too!',
    author: {
      name: 'Emma Wilson',
      initials: 'EW'
    },
    rating: 5,
    date: '3 days ago',
    verified: true
  },
  {
    id: '4',
    text: 'Amazing quality and fast delivery! The sugar cookies were perfectly decorated and tasted incredible. My daughter loved them for her birthday party.',
    author: {
      name: 'David Chen',
      initials: 'DC'
    },
    rating: 5,
    date: '5 days ago',
    verified: true
  },
  {
    id: '5',
    text: 'Best cookies I\'ve ever had! The texture is perfect and they arrived fresh. Will definitely be a repeat customer.',
    author: {
      name: 'Lisa Brown',
      initials: 'LB'
    },
    rating: 4.5,
    date: '1 week ago',
    verified: true
  },
  {
    id: '6',
    text: 'The peanut butter cookies are outstanding! Not too sweet, great texture, and packaged beautifully. Highly recommend!',
    author: {
      name: 'Tom Wilson',
      initials: 'TW'
    },
    rating: 5,
    date: '3 days ago',
    verified: true
  }
];

const initialForm = {
  reviewerName: "",
  reviewerEmail: "",
  rating: 0,
  reviewText: "",
  cookieTypes: [],
  reviewPhoto: null,
};

const cookieOptions = [
  "Chocolate Chip",
  "Oatmeal Raisin",
  "Sugar Cookie",
  "Peanut Butter",
  "White Chocolate Macadamia",
  "Gluten Free",
  "Vegan",
];

// ReviewCard Component
const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className={styles.ratingStarFilled}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" className={styles.ratingStarFilled}>☆</span>);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className={styles.ratingStarEmpty}>☆</span>);
    }
    
    return stars;
  };

  const getInitials = () => {
    if (review.author?.initials) {
      return review.author.initials;
    }
    if (review.author?.name) {
      return review.author.name.charAt(0).toUpperCase();
    }
    return '?';
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.quoteIcon}>"</div>
      <div className={styles.reviewText}>
        <p>{review.text}</p>
      </div>
      <div className={styles.reviewerInfo}>
        <div className={styles.reviewerAvatar}>
          {getInitials()}
        </div>
        <div className={styles.reviewerDetails}>
          <h4>{review.author?.name || 'Anonymous'}</h4>
          <div className={styles.ratingStars}>
            {renderStars(review.rating || 5)}
          </div>
          <div className={styles.reviewMeta}>
            {review.verified && 'Verified Buyer • '}
            {review.date || 'Recently'}
          </div>
        </div>
      </div>
    </div>
  );
};

// ReviewGrid Component
const ReviewGrid = ({ initialReviews = [], showAll = false }) => {
  const [visibleReviews, setVisibleReviews] = useState(initialReviews.slice(0, 6));
  const [showAllReviews, setShowAllReviews] = useState(showAll);

  const handleViewAll = () => {
    setVisibleReviews(initialReviews);
    setShowAllReviews(true);
  };

  return (
    <div className={styles.reviewsGridContainer}>
      <div className={styles.reviewsGrid}>
        {visibleReviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>4.9</div>
          <div className={styles.ratingStars}>★★★★★</div>
          <div className={styles.statLabel}>Average Rating</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>2,450+</div>
          <div className={styles.statLabel}>Happy Customers</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>98%</div>
          <div className={styles.statLabel}>Would Recommend</div>
        </div>
      </div>

      {!showAllReviews && initialReviews.length > 6 && (
        <div className={styles.readMoreButtonContainer}>
          <button 
            onClick={handleViewAll}
            className={styles.readMoreButton}
          >
            Read More Sweet Reviews
          </button>
        </div>
      )}
    </div>
  );
};

// ReviewForm Component
const ReviewForm = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        cookieTypes: checked
          ? [...prev.cookieTypes, value]
          : prev.cookieTypes.filter((v) => v !== value),
      }));
    } else if (type === "file") {
      setForm((prev) => ({
        ...prev,
        reviewPhoto: files?.[0] || null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRating = (rating) => {
    setForm((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.reviewerName.trim()) {
      alert("Please enter your name");
      return;
    }
    
    if (form.rating === 0) {
      alert("Please select a rating");
      return;
    }
    
    if (!form.reviewText.trim()) {
      alert("Please write a review");
      return;
    }
    
    console.log("Review submitted:", form);
    setSubmitted(true);
  };

  const handleNewReview = () => {
    setForm(initialForm);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className={styles.thankYouMessage}>
        <div className={styles.icon}>🍪</div>
        <h3>Thank You for Your Sweet Review!</h3>
        <p>
          We appreciate you taking the time to share your cookie experience with us.
        </p>
        <p>
          Here's a 10% off coupon for your next order:{" "}
          <strong className={styles.couponCode}>COOKIELOVER10</strong>
        </p>
        <button
          onClick={handleNewReview}
          className={styles.writeAnotherReviewButton}
        >
          ✏️ Write Another Review
        </button>
      </div>
    );
  }

  return (
    <div className={styles.reviewFormContainer}>
      <h2>Share Your Cookie Experience</h2>
      <p>
        We'd love to hear about your delicious cookie journey!
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Your Name</label>
          <input
            type="text"
            name="reviewerName"
            placeholder="Sweet cookie lover"
            required
            value={form.reviewerName}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email (optional - for updates only)</label>
          <input
            type="email"
            name="reviewerEmail"
            placeholder="you@example.com"
            value={form.reviewerEmail}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Your Rating</label>
          <div className={styles.ratingStarsForm}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                className={`${styles.ratingStarButton} ${form.rating >= star ? styles.filled : styles.empty}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Which cookies did you try? (Select all that apply)
          </label>
          <div className={styles.cookieOptionsGrid}>
            {cookieOptions.map((cookie) => {
              const cookieId = cookie.replace(/\s+/g, "").toLowerCase();
              return (
                <label key={cookie} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="cookieTypes"
                    value={cookie}
                    checked={form.cookieTypes.includes(cookie)}
                    onChange={handleChange}
                    className={styles.checkboxInput}
                  />
                  <span>{cookie}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Your Review</label>
          <textarea
            name="reviewText"
            placeholder="Tell us about your cookie experience... What did you love? Any suggestions for improvement?"
            required
            value={form.reviewText}
            onChange={handleChange}
            rows={5}
            className={styles.formTextarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Upload a photo (optional)</label>
          <input
            type="file"
            name="reviewPhoto"
            accept="image/*"
            onChange={handleChange}
            className={styles.uploadPhotoInput}
          />
          {form.reviewPhoto && (
            <p className={styles.uploadPhotoFileName}>
              Selected: {form.reviewPhoto.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
        >
          <span>✈️</span>
          <span>Submit Review</span>
        </button>
      </form>
    </div>
  );
};

// Main TestimonialsPage Component
const TestimonialsPage = () => {
  return (
    <main className={styles.mainContent}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <h1 >
            <span className={styles.sweetWords}>Sweet</span>
            {' '}Words From Our Customers
          </h1>
          <p>
            Don't just take our word for it - hear what our cookie lovers have to say!
          </p>
        </div>
        
        {/* Reviews Grid */}
        <ReviewGrid initialReviews={sampleReviews} />
        
        {/* Review Form */}
        <ReviewForm />
      </div>
    </main>
  );
};

export default TestimonialsPage;