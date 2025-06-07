'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './navbar.module.css';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const cartCount = getItemCount();
  const router = useRouter();

  const handleOrderNowClick = (e) => {
    e.preventDefault();
    router.push('/auth/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoFirst}>Cookie</span>
          <span className={styles.logoSecond}>Bliss</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/flavors" className={styles.navLink}>Flavors</Link>
          <Link href="/about" className={styles.navLink}>About Us</Link>
          <Link href="/testimonials" className={styles.navLink}>Testimonials</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </div>
        
        <div className={styles.navActions}>
          <Link href="/cart" className={styles.cartIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
          </Link>
          
          <Link href="/order" className={styles.orderButton} onClick={handleOrderNowClick}>
            Order Now
          </Link>
          
          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <button
              onClick={() => setMenuOpen(false)}
              className={styles.closeButton}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className={styles.mobileMenuLinks}>
            <Link href="/" className={styles.mobileNavLink}>Home</Link>
            <Link href="/flavors" className={styles.mobileNavLink}>Flavors</Link>
            <Link href="/about" className={styles.mobileNavLink}>About Us</Link>
            <Link href="/testimonials" className={styles.mobileNavLink}>Testimonials</Link>
            <Link href="/contact" className={styles.mobileNavLink}>Contact</Link>
            <Link href="/order" className={styles.mobileOrderButton} onClick={handleOrderNowClick}>
              Order Now
            </Link>
            <Link href="/cart" className={styles.mobileNavLink}>
                Cart ({cartCount})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;