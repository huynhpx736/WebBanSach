import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FindProduct.css';

const FindProduct = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/search?query=${searchQuery}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  return (
    <div className="find-product">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="results">
        {results.length > 0 ? (
          results.map((product) => (
            <div key={product.id} className="result-item">
              <img src={product.imageUrl} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.author}</p>
              <p>{product.price} USD</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default FindProduct;
