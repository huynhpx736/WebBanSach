import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { navigate } from '@reach/router';
import { Navigate } from "react-router-dom";
import './Header.css';
import AuthContext from '../../Pages/Auth/AuthContext'; // Điều chỉnh đường dẫn nếu cần

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = '/';

  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="/logoweb.jpg" className="logo-image" alt="BookShop Logo" />
          </Link>
          <Link to="/" className="logo-text">BookShop</Link>
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search for books..." />
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
        {/* <div style ={{width:200}}></div> <div></div> <div></div> */}

       
        {isLoggedIn ? (
          <div className="cart-icon">
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        
        {/* <div className="cart-icon">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div> */}
        <div className="user-actions">
          {isLoggedIn ? (
            <div className="user-icon">
              <div className="dropdown">
                <button className="dropbtn">
                  <i className="fas fa-user"></i>
                </button>
                <div className="dropdown-content">
                  <Link to="/profile">Thông tin cá nhân</Link>
                  <Link to="/orders">Đơn hàng</Link>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/register">Đăng kí</Link>
              <Link to="/login">Đăng nhập</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
