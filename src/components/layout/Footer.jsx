'use client';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.logo}>
              <span className={styles.logoFirst}>Cookie</span>
              <span className={styles.logoSecond}>Bliss</span>
            </div>
            <p className={styles.footerText}>
              Experience the perfect blend of tradition and innovation in every bite. Our cookies are handcrafted using premium ingredients.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/" className={styles.footerLink}>Home</Link></li>
              <li><Link href="/flavors" className={styles.footerLink}>Flavors</Link></li>
              <li><Link href="/about" className={styles.footerLink}>About Us</Link></li>
              <li><Link href="/testimonials" className={styles.footerLink}>Testimonials</Link></li>
              <li><Link href="/contact" className={styles.footerLink}>Contact</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Contact</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.contactIcon}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>123 Cookie Lane, Sweet City, SC 12345</span>
              </li>
              <li className={styles.contactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.contactIcon}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>(555) 123-4567</span>
              </li>
              <li className={styles.contactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.contactIcon}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>info@cookiebliss.com</span>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Newsletter</h3>
            <p className={styles.newsletterText}>Subscribe to our newsletter for updates and exclusive offers.</p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Your email" className={styles.newsletterInput} />
              <button type="submit" className={styles.newsletterButton}>Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} CookieBliss. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <a href="#" className={styles.footerBottomLink}>Privacy Policy</a>
            <a href="#" className={styles.footerBottomLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;