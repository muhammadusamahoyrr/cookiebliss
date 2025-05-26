'use client';

import Link from 'next/link';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  href, 
  onClick,
  icon,
  className = '',
  ...props 
}) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${className}`;

  // If a href is provided, render as link
  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.text}>{children}</span>
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button 
      className={buttonClasses} 
      onClick={onClick}
      type={props.type || 'button'}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default Button;