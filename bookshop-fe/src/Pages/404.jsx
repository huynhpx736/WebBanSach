//write page not found component here
import React from 'react';
import { Link } from 'react-router-dom';
// import './404.css';
const NotFound = () => {
  return (
    <div className="not-found">
      {/* <h1>404</h1> */}
      <h2>Page Not Found</h2>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};
export default NotFound;