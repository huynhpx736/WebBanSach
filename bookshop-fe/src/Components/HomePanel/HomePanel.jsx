// import React from "react";
// import { Link } from "react-router-dom";
// import "./HomePanel.css";

// const HomePanel = () => {
//     return (
//         <div className="home-panel">
//             <h1>Welcome to Bookshop</h1>
//             <p>Find your favorite books and order them online</p>
//             <Link to="/books" className="btn btn-primary">View Books</Link>
//         </div>
//     );
// }

// export default HomePanel;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePanel.css';

const HomePanel = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories
    axios.get('http://localhost:8080/api/categories/get-all')
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(err => {
        setError('Failed to fetch categories.');
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="side-panel">
      <h2>Thể loại</h2>
      <ul>
        {categories.length > 0 ? categories.map(category => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        )) : <p>No categories available</p>}
      </ul>
    </div>
  );
};

export default HomePanel;
