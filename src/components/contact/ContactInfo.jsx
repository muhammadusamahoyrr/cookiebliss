import Button from '../shared/Button';
import styles from './ContactInfo.module.css';

const ContactInfo = () => {
  return (
    <div className={styles.contactInfo}>
      {/* Visit Card */}
      <div className={`${styles.infoCard} ${styles.visitCard}`}>
        <div className={styles.infoCardContent}>
          <div className={styles.infoIconContainer}>
            <div className={styles.infoIcon}>📍</div>
          </div>
          <div className={styles.infoText}>
            <h3>Our Cozy Bakery</h3>
            <p>123 Blue Area<br/>Islamabad, Pakistan</p>
            <div className={styles.hoursContainer}>
              <div className={styles.hoursLabel}>Freshly Baked Hours:</div>
              <div className={styles.hoursDetails}>
                <div className={styles.hoursDay}>Mon-Fri: 7am-7pm</div>
                <div className={styles.hoursDay}>Sat-Sun: 8am-5pm</div>
              </div>
            </div>
            <div className={styles.mapLink}>
              <Button variant="ghost" className={styles.mapBtn} href="https://www.google.com/maps/search/Islamabad+Pakistan" target="_blank" rel="noopener noreferrer">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className={styles.infoCardsGrid}>
        <div className={`${styles.infoCard} ${styles.callCard}`}>
          <div className={styles.infoCardContent}>
            <div className={styles.infoIconContainer}>
              <div className={styles.infoIcon}>📞</div>
            </div>
            <div className={styles.infoText}>
              <h3>Call Us</h3>
              <p className={styles.phoneNumber}>(555) 123-COOKIE</p>
              <p className={styles.callNote}>For urgent orders or questions</p>
            </div>
          </div>
        </div>

        <div className={`${styles.infoCard} ${styles.emailCard}`}>
          <div className={styles.infoCardContent}>
            <div className={styles.infoIconContainer}>
              <div className={styles.infoIcon}>✉️</div>
            </div>
            <div className={styles.infoText}>
              <h3>Email Us</h3>
              <p className={styles.emailAddress}>
                <a href="mailto:hello@cookiebliss.com">hello@cookiebliss.com</a>
              </p>
              <p className={styles.emailNote}>Typically reply within 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social & Newsletter */}
      <div className={styles.socialCard}>
        <h3>Join Our Cookie Club</h3>
        <p>Be the first to know about new flavors, special deals, and exclusive cookie events!</p>

        <div className={styles.socialIcons}>
          <a href="#" className={styles.socialIcon} aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
        </div>

        <div className={styles.newsletter}>
          <h4>Sweet Updates Newsletter</h4>
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              name="newsletter-email" 
              placeholder="Your best email..." 
              aria-label="Email for newsletter" 
              required 
            />
            <button type="submit">Subscribe</button>
          </form>
          <p className={styles.privacyNote}>We'll never share your email. Pinky promise!</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;