"use client";
import { useState } from 'react';  
import ProductCard from './ProductCard';
import Button from '../shared/Button';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ initialProducts = [], showAll = false }) => {
  const [visibleProducts, setVisibleProducts] = useState(initialProducts.slice(0, 6));
  const [showAllProducts, setShowAllProducts] = useState(showAll);

  const handleViewAll = () => {
    setVisibleProducts(initialProducts);
    setShowAllProducts(true);
  };

  return (
    <div className={styles.productGridContainer}>
      <div 
        className={styles.productsContainer}
      >
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!showAllProducts && initialProducts.length > 6 && (
        <div className={styles.viewAllContainer}>
          <Button 
            variant="secondary" 
            className={styles.viewAllBtn}
            onClick={handleViewAll}
            icon={<i className="fas fa-arrow-right"></i>}
          >
            View All Flavors
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;