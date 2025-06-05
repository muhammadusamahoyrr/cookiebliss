import SectionHeader from '@/components/shared/SectionHeader'; 
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import styles from './page.module.css';

export const metadata = {
  title: 'Contact Us | CookieBliss',
  description: 'Get in touch with CookieBliss. We\'re always happy to hear from cookie lovers!',
};

export default function ContactPage() {
  return (
    <main className={styles.contactPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <SectionHeader
            title="Let's Bake Something Special Together"
            subtitle="We're always happy to hear from cookie lovers! Whether you have questions about our recipes, want to place a custom order, or just want to share your cookie dreams."
            highlightWord="Special"
          />
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactContent}>
            <ContactForm />
            <ContactInfo />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className={`${styles.cookieDecoration} ${styles.cookie1}`}></div>
        <div className={`${styles.cookieDecoration} ${styles.cookie2}`}></div>
        <div className={`${styles.cookieDecoration} ${styles.cookie3}`}></div>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.mapWrapper}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108220.80204534476!2d73.04387415!3d33.7281435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38cf9ba036481e41%3A0xf772c00551e0e08a!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CookieBliss Location"
          ></iframe>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our cookies, ordering process, and more."
            highlightWord="Asked"
          />

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>How long do your cookies stay fresh?</h3>
              <p>
                Our cookies taste best when enjoyed within 7 days of baking. Store them in an airtight container at room temperature to maintain freshness. For longer storage, you can freeze them for up to 2 months.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Do you offer nationwide shipping?</h3>
              <p>
                Yes! We ship our cookies throughout the continental United States. Orders are shipped via priority mail to ensure they arrive fresh. International shipping is available for select countries.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Do you accommodate dietary restrictions?</h3>
              <p>
                We offer gluten-free and vegan options for several of our cookie flavors. All ingredients are clearly labeled, but please note that all cookies are made in a facility that processes nuts, dairy, and wheat.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>How far in advance should I order for an event?</h3>
              <p>
                For regular orders, we recommend placing your order at least 48 hours in advance. For custom or large orders (over 5 dozen), please contact us at least 7 days before your event.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Can I customize my cookie order?</h3>
              <p>
                Absolutely! We love creating custom cookie experiences. Contact us for personalized designs, corporate branding, or special flavor requests. Custom orders require a minimum of 2 dozen per flavor.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Do you offer subscriptions?</h3>
              <p>
                Yes, our Cookie Club subscription delivers a selection of seasonal and classic cookies to your door each month. Choose from 6, 12, or 24 cookies in each delivery, with flexible subscription terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}