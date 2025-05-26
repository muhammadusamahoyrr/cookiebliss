'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded after component mounts to trigger animations
    setIsLoaded(true);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={`${styles.heroText} ${isLoaded ? styles.visible : ''}`}>
            <h1 className={`${styles.heroTitle} ${isLoaded ? styles.visible : ''}`}>
              Delightful Cookies 
              <span className={styles.heroTitleSecond}>Crafted With Love</span>
            </h1>
            <div className={`${styles.divider} ${isLoaded ? styles.visible : ''}`}></div>
            <p className={`${styles.heroDescription} ${isLoaded ? styles.visible : ''}`}>
              Experience the perfect blend of tradition and innovation in every bite. 
              Our cookies are handcrafted using premium ingredients and family recipes 
              passed down through generations, delivering an extraordinary taste experience 
              that will transport you to cookie heaven.
            </p>
            <div className={`${styles.heroButtons} ${isLoaded ? styles.visible : ''}`}>
              <Link href="/collection" className={styles.primaryButton}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.buttonIcon}>
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 000-2H7.414l-.74-.74A.997.997 0 007 10h5a1 1 0 001-.99V7a1 1 0 00-1-1H5.414L4.707 5.293a1 1 0 00-1.414 0l-.293.293A1 1 0 003 6z" />
                </svg>
                Explore Collection
              </Link>
              <Link href="/story" className={styles.secondaryButton}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.buttonIcon}>
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H6z" clipRule="evenodd" />
                </svg>
                Our Story
              </Link>
            </div>
          </div>
          
          <div className={`${styles.heroVisual} ${isLoaded ? styles.visible : ''}`}>
            {/* Cookie Circles Design */}
            <div className={styles.cookiesContainer}>
              {/* Main large cookie */}
              <div className={styles.cookieLarge}>
                {/* Chocolate chips */}
                <div className={`${styles.chocolateChip} ${styles.chip1}`}></div>
                <div className={`${styles.chocolateChip} ${styles.chip2}`}></div>
                <div className={`${styles.chocolateChip} ${styles.chip3}`}></div>
                <div className={`${styles.chocolateChip} ${styles.chip4}`}></div>
                <div className={`${styles.chocolateChip} ${styles.chip5}`}></div>
              </div>
              
              {/* Medium cookie */}
              <div className={styles.cookieMedium}>
                <div className={`${styles.chocolateChip} ${styles.medChip1}`}></div>
                <div className={`${styles.chocolateChip} ${styles.medChip2}`}></div>
                <div className={`${styles.chocolateChip} ${styles.medChip3}`}></div>
              </div>
              
              {/* Small cookie */}
              <div className={styles.cookieSmall}>
                <div className={`${styles.chocolateChip} ${styles.smallChip1}`}></div>
              </div>
              
              {/* Extra small cookie */}
              <div className={styles.cookieExtraSmall}>
                <div className={`${styles.chocolateChip} ${styles.xsChip1}`}></div>
              </div>
              
              {/* Tiny cookie dots */}
              <div className={styles.cookieTiny1}></div>
              <div className={styles.cookieTiny2}></div>
            </div>
          </div>
        </div>
        
        <div className={`${styles.scrollIndicator} ${isLoaded ? styles.visible : ''}`}>
          <p>Scroll Down</p>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollDot}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;