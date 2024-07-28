import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SliderProduct.css';
import Cover from '../../images/biasach.jpg';
import { Link } from 'react-router-dom';

const SliderProduct = ({ categoryId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (categoryId) {
      axios.get(`http://localhost:8080/api/products/category/${categoryId}`)
        .then(response => {
          setRelatedProducts(response.data.data);
        })
        .catch(error => console.error("Error fetching related products:", error));
    } else {
      axios.get(`http://localhost:8080/api/products/get-all`)
        .then(response => {
          setRelatedProducts(response.data.data);
        })
        .catch(error => console.error("Error fetching all products:", error));
    }
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
        {/* <button className="slider-arrow left" onClick={handlePrev}>&#9664;</button> */}
        <div className="slider">
          {relatedProducts.slice(currentIndex, currentIndex + 4).map(product => (
            <div key={product.id} className="slider-item">
            <Link to={`/product/${product.id}`} className="slider-item-link">
              <img src={product.image} alt={product.title} className="slider-item-image" />
              {/* <img src={"/biasach.jpg"} className="slider-item-image" /> */}
              {/* <img src={Cover} className="slider-item-image" /> */}
                </Link>
                {/* <p>{product.image}</p> */}
              <p className="slider-item-title">{product.title}</p>
              <p className="slider-item-price">{product.price} đồng</p>
            </div>
          ))}
        </div>
        {/* <button className="slider-arrow right" onClick={handleNext}>&#9654;</button> */}
      </div>
    </div>
  );
};

export default SliderProduct;
