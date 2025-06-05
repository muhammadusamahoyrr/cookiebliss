'use client';

import { useState, useEffect } from 'react';
import styles from './CookieVisual.module.css';

const CookieVisual = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Show animation on component mount
    setTimeout(() => setIsVisible(true), 100);
    
    // Track mouse position for interactive effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      className={styles.cookieVisual}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Plate with shadow */}
      <div className={styles.cookiePlate}></div>
      
      {/* Main cookie */}
      <div 
        className={`${styles.cookie} ${styles.cookieMain} ${isVisible ? styles.visible : ''} ${isHovered ? styles.hovered : ''}`}
        style={{
          transform: isHovered ? 
            `translateY(0) rotate(${mousePosition.x * 5}deg) scale(1.05)` : 
            'translateY(0) rotate(0) scale(1)'
        }}
      >
        {/* Cookie bite */}
        <div className={styles.cookieBite}></div>
        
        {/* Chocolate chips */}
        <div className={`${styles.chocoChip} ${styles.mainChip1}`}></div>
        <div className={`${styles.chocoChip} ${styles.mainChip2}`}></div>
        <div className={`${styles.chocoChip} ${styles.mainChip3}`}></div>
        <div className={`${styles.chocoChip} ${styles.mainChip4}`}></div>
        <div className={`${styles.chocoChip} ${styles.mainChip5}`}></div>
        <div className={`${styles.chocoChip} ${styles.mainChip6}`}></div>
        
        {/* Steam effects */}
        <div className={`${styles.steam} ${styles.steam1}`}></div>
        <div className={`${styles.steam} ${styles.steam2}`}></div>
        <div className={`${styles.steam} ${styles.steam3}`}></div>
      </div>
      
      {/* Side cookies */}
      <div 
        className={`${styles.cookie} ${styles.cookieSide1} ${isVisible ? styles.visible : ''}`}
        style={{
          transform: isHovered ? 
            `translateY(0) rotate(${mousePosition.x * -3}deg) scale(1.03)` : 
            'translateY(0) rotate(0) scale(1)'
        }}
      >
        <div className={`${styles.chocoChip} ${styles.side1Chip1}`}></div>
        <div className={`${styles.chocoChip} ${styles.side1Chip2}`}></div>
        <div className={`${styles.chocoChip} ${styles.side1Chip3}`}></div>
        <div className={styles.cookieBar}></div>
        <div className={styles.cookieBar}></div>
      </div>
      
      <div className={`${styles.cookie} ${styles.cookieSide2} ${isVisible ? styles.visible : ''}`}>
        <div className={`${styles.chocoChip} ${styles.side2Chip1}`}></div>
        <div className={`${styles.chocoChip} ${styles.side2Chip2}`}></div>
        <div className={styles.cookieBar}></div>
        <div className={styles.cookieBar}></div>
      </div>
      
      <div className={`${styles.cookie} ${styles.cookieSide3} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.cookieBar}></div>
        <div className={styles.cookieBar}></div>
      </div>
      
      {/* Floating crumbs */}
      <div className={`${styles.crumb} ${styles.crumb1} ${isVisible ? styles.visible : ''}`}></div>
      <div className={`${styles.crumb} ${styles.crumb2} ${isVisible ? styles.visible : ''}`}></div>
      <div className={`${styles.crumb} ${styles.crumb3} ${isVisible ? styles.visible : ''}`}></div>
      <div className={`${styles.crumb} ${styles.crumb4} ${isVisible ? styles.visible : ''}`}></div>
      <div className={`${styles.crumb} ${styles.crumb5} ${isVisible ? styles.visible : ''}`}></div>
    </div>
  );
};

export default CookieVisual;