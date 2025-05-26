'use client';

import { useEffect } from 'react';
import styles from './ScrollIndicator.module.css';

const ScrollIndicator = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollIndicator = document.querySelector(`.${styles.scrollIndicator}`);
      if (scrollIndicator) {
        if (window.scrollY > 100) {
          scrollIndicator.style.opacity = '0';
        } else {
          scrollIndicator.style.opacity = '1';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.scrollIndicator} onClick={scrollDown}>
      <p>Scroll Down</p>
      <div className={styles.scrollIcon}></div>
    </div>
  );
};

export default ScrollIndicator;