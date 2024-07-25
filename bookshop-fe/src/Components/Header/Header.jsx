// import React from 'react';
// // import Navbar from "../Navbar/Navbar";
// // import SearchForm from "../SearchForm/SearchForm";
// import "./Header.css";

// const Header = () => {
//   return (
//     <div className='holder'>
//         <header className='header'>
//             {/* <Navbar /> */}
//             <div className='header-content flex flex-c text-center text-white'>
//                 <h2 className='header-title text-capitalize'>find your book of choice.</h2><br />
//                 <p className='header-text fs-18 fw-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae sapiente quibusdam consequatur perspiciatis facere laboriosam non nesciunt at id repudiandae, modi iste? Eligendi, rerum!</p>
//                 {/* <SearchForm /> */}
//             </div>
//         </header>
//     </div>
//   )
// }

// export default Header
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">BookStore</Link>
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            {/* <li><Link to="/contact">Contact</Link></li> */}
          </ul>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search for books..." />
          <button>Search</button>
        </div>
        <div className="cart-icon">
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
