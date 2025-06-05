import SectionHeader from '@/components/shared/SectionHeader';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <SectionHeader
          title="Our Cookie Story"
          subtitle="From family recipes to your table, discover how CookieBliss began and our commitment to quality ingredients."
          highlightWord="Cookie"
        />
        
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            <div className={styles.imageWrapper}>
              {/* Replace with your bakery image */}
              <img src="/assests/images/image.png" alt="Our cozy bakery" className={styles.mainImage} />
              {/* Replace with your 'Baking with Love' image */}
              <img src="/assests/images/image.png" alt="Baking with Love image" className={styles.accentImage} />
            </div>
            
            <div className={styles.floatingStars}>
              <div className={`${styles.star} ${styles.s1}`}>★</div>
              <div className={`${styles.star} ${styles.s2}`}>★</div>
              <div className={`${styles.star} ${styles.s3}`}>★</div>
            </div>
          </div>
          
          <div className={styles.aboutText}>
            <h3>Baking Happiness Since 2015</h3>
            <p>
              CookieBliss began in a small kitchen with a passion for creating 
              the perfect chocolate chip cookie. Founded by Sarah Thompson, 
              what started as weekend baking for friends and family quickly 
              grew into something more as word spread about these extraordinary 
              treats.
            </p>
            <p>
              Every cookie we craft is made with premium ingredients - organic 
              flour, European butter, artisanal chocolate, and our secret family 
              recipes passed down through generations. We believe that what goes 
              into our cookies matters, which is why we never use preservatives 
              or artificial flavors.
            </p>
            <p>
              Today, our cozy bakery delivers happiness one cookie at a time, 
              combining traditional baking methods with innovative flavor 
              combinations that surprise and delight our customers.
            </p>
            
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>30+</span>
                <span className={styles.statText}>Unique Flavors</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>15k</span>
                <span className={styles.statText}>Cookies Monthly</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statText}>Natural Ingredients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;