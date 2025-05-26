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
            <p>123 Cookie Lane<br/>Sweet Town, ST 12345</p>
            <div className={styles.hoursContainer}>
              <div className={styles.hoursLabel}>Freshly Baked Hours:</div>
              <div className={styles.hoursDetails}>
                <div className={styles.hoursDay}>Mon-Fri: 7am-7pm</div>
                <div className={styles.hoursDay}>Sat-Sun: 8am-5pm</div>
              </div>
            </div>
            <div className={styles.mapLink}>
              <Button variant="ghost" className={styles.mapBtn} href="https://maps.google.com" target="_blank">
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
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className={styles.socialIcon} aria-label="TikTok">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Pinterest">
            <i className="fab fa-pinterest-p"></i>
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