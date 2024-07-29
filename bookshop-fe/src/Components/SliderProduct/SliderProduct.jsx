import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SliderProduct.css';
import { fetchProductsByCategory, fetchAllProducts } from '../../api'; // Đảm bảo đường dẫn chính xác

const SliderProduct = ({ categoryId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  useEffect(() => {
    const fetchProducts = categoryId ? fetchProductsByCategory(categoryId) : fetchAllProducts;

    fetchProducts()
      .then(data => setRelatedProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, [categoryId]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : 0);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex < relatedProducts.length - 4 ? prevIndex + 1 : prevIndex);
  };

  return (
    <div className="related-products-slider">
      <div className="slider-container">
        <button className="slider-arrow left" onClick={handlePrev}>&#9664;</button>
        <div className="slider">
          {relatedProducts.slice(currentIndex, currentIndex + 4).map(product => (
            <div key={product.id} className="slider-item">
              <Link to={`/product/${product.id}`} className="slider-item-link">
                <img src={product.image} alt={product.title} className="slider-item-image" />
              </Link>
              <p className="slider-item-title">{product.title}</p>
              <p className="slider-item-price">{formatter.format(product.price)}</p>
              {/* <p className="slider-item-price">{product.price} đồng</p> */}
            </div>
          ))}
        </div>
        <button className="slider-arrow right" onClick={handleNext}>&#9654;</button>
      </div>
    </div>
  );
};

export default SliderProduct;
