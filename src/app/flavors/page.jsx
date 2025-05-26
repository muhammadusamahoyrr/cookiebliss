import SectionHeader from '@/components/shared/SectionHeader';
import ProductGrid from '@/components/flavors/ProductGrid';
import styles from './page.module.css';

// Sample data for products
const allProducts = [
  {
    id: '1',
    title: 'Chocolate Chip',
    description: 'Classic chocolate chips with a buttery cookie base',
    price: 5.99,
    image: '/assests/images/heros.png',
    rating: 4.5,
    reviews: 254,
    badge: 'bestseller'
  },
  {
    id: '2',
    title: 'Caramel Pecan',
    description: 'Rich caramel swirls with crunchy pecan pieces',
    price: 6.49,
    image: '/assests/images/image0.png',
    rating: 5,
    reviews: 126,
    badge: 'new'
  },
  {
    id: '3',
    title: 'Double Chocolate',
    description: 'Intense chocolate cookie with premium cocoa chunks',
    price: 5.99,
    image: '/assests/images/image1.jpg',
    rating: 4,
    reviews: 189
  },
  {
    id: '4',
    title: 'Lemon Blueberry',
    description: 'Zesty lemon with sweet blueberry pieces',
    price: 6.99,
    image: '/assests/images/image2.jpg',
    rating: 4.5,
    reviews: 142,
    badge: 'limited'
  },
  {
    id: '5',
    title: 'Oatmeal Raisin',
    description: 'Hearty oatmeal with plump, juicy raisins',
    price: 5.49,
    image: '/assests/images/image3.png',
    rating: 4,
    reviews: 98
  },
  {
    id: '6',
    title: 'White Chocolate Macadamia',
    description: 'Creamy white chocolate with crunchy macadamia nuts',
    price: 6.99,
    image: '/assests/images/image4.png',
    rating: 4.5,
    reviews: 176
  },
  {
    id: '7',
    title: 'Peanut Butter',
    description: 'Rich peanut butter flavor in every bite',
    price: 5.99,
    image: '/assests/images/image5.png',
    rating: 4,
    reviews: 122
  },
  {
    id: '8',
    title: 'Sugar Cookie',
    description: 'Simple, classic sugar cookie with a hint of vanilla',
    price: 4.99,
    image: '/assests/images/image.png',
    rating: 4.5,
    reviews: 156
  },
  {
    id: '9',
    title: 'Snickerdoodle',
    description: 'Soft cookie rolled in cinnamon sugar',
    price: 5.49,
    image: '/assests/images/heros.png',
    rating: 4,
    reviews: 88
  }
];

export const metadata = {
  title: 'Our Flavors | CookieBliss',
  description: 'Discover our delicious range of handcrafted cookie crumbles. From classic chocolate chip to innovative seasonal flavors.',
};

export default function FlavorsPage() {
  return (
    <main className={styles.flavorsPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <SectionHeader
            title="Our Flavors"
            subtitle="Discover our delicious range of handcrafted cookie crumbles"
            highlightWord="Flavors"
          />
        </div>
      </section>
      
      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.filters}>
            <div className={styles.filterCategories}>
              <button className={`${styles.filterBtn} ${styles.active}`}>All Cookies</button>
              <button className={styles.filterBtn}>Bestsellers</button>
              <button className={styles.filterBtn}>New Arrivals</button>
              <button className={styles.filterBtn}>Limited Edition</button>
              <button className={styles.filterBtn}>Dietary Options</button>
            </div>
            
            <div className={styles.sortOptions}>
              <label htmlFor="sort">Sort by:</label>
              <select id="sort" className={styles.sortSelect}>
                <option value="popularity">Popularity</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          
          <ProductGrid initialProducts={allProducts} showAll={true} />
        </div>
      </section>
      
      <section className={styles.customOrders}>
        <div className="container">
          <div className={styles.customOrdersContent}>
            <div className={styles.customOrdersText}>
              <h2>Custom Cookie Orders</h2>
              <p>
                Planning a special event? We offer custom cookie platters, 
                personalized designs, and bulk ordering options for any occasion.
              </p>
              <ul className={styles.customFeatures}>
                <li><i className="fas fa-check"></i> Corporate events & gifting</li>
                <li><i className="fas fa-check"></i> Weddings & celebrations</li>
                <li><i className="fas fa-check"></i> Holiday specials</li>
                <li><i className="fas fa-check"></i> Custom flavors available</li>
              </ul>
              <button className={styles.inquireBtn}>
                <i className="fas fa-envelope"></i> Inquire Now
              </button>
            </div>
            
            <div className={styles.customOrdersImage}>
              <div className={styles.imageWrapper}>
                <img 
                  src=".image" 
                  alt="Custom cookie platter"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}