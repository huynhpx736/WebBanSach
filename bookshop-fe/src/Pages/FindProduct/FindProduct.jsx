

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProductsByKeyword } from '../../api';
import './FindProduct.css';
import BookCard from '../../Components/BookCard/BookCard';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';

const FindResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const results = await searchProductsByKeyword(keyword);
        setProducts(results);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    if (keyword) {
      fetchProducts();
    }
  }, [keyword]);

  // Lấy sản phẩm hiện tại trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='find-product-container'>
      <Header />

      <div className="find-results">
        <h2>Kết quả tìm kiếm cho: "{keyword}"</h2>
        {loading ? (
          <p>Đang tải...</p>
        ) : currentProducts.length > 0 ? (
          <div className="product-list">
            {currentProducts.map(product => (
              <BookCard key={product.id} book={product} />
            ))}
          </div>
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>

      {/* Pagination */}
      {products.length > productsPerPage && (
        <div className="pagination">
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
            <button 
              key={number + 1} 
              onClick={() => paginate(number + 1)} 
              className={number + 1 === currentPage ? 'active' : ''}
            >
              {number + 1}
            </button>
          ))}
        </div>
      )}
      
      <Footer />
    </div>
  );
};


export default FindResults;
