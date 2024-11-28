import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaClipboardList, FaBox, FaTags, FaUserEdit, FaBuilding, FaTag, FaSignOutAlt, FaUsers, FaChevronDown, FaShoppingCart, FaShippingFast, FaCheckCircle, FaBan, FaPersonBooth } from 'react-icons/fa';
import './ShipperPannel.css';
import { useContext } from 'react';
import AuthContext from '../../Auth/AuthContext';
const ShipperPanel = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    window.location.href = '/';

  };
  const [showProductSubmenu, setShowProductSubmenu] = useState(false);
  const [showOrderSubmenu, setShowOrderSubmenu] = useState(false);

  const toggleProductSubmenu = () => {
    setShowProductSubmenu(!showProductSubmenu);
  };

  const toggleOrderSubmenu = () => {
    setShowOrderSubmenu(!showOrderSubmenu);
  };

  return (
    <div className="pannel-shipper">
      <h2>Shipper Bookshop</h2>
      <ul>
        <li><NavLink to="/shipper/dashboard"><FaTachometerAlt className="icon" />Dashboard</NavLink></li>
        <li>
          <div onClick={toggleOrderSubmenu} className="submenu-toggle">
            <FaClipboardList className="icon" />Quản lý đơn hàng <FaChevronDown className="dropdown-icon" />
          </div>
          {showOrderSubmenu && (
            <ul className="submenu">
              <li><NavLink to="/shipper/orders/ordered"><FaShoppingCart className="icon" />Đơn hàng đã đặt</NavLink></li>
              <li><NavLink to="/shipper/orders/shipping"><FaShippingFast className="icon" />Đơn hàng đang giao</NavLink></li>
              <li><NavLink to="/shipper/orders/cancelled"><FaBan className="icon" />Đơn hàng đã hủy</NavLink></li>
              <li><NavLink to="/shipper/orders/completed"><FaCheckCircle className="icon" />Đơn hàng đã giao</NavLink></li>
            </ul>
          )}
        </li>
        <li>
          <div onClick={toggleProductSubmenu} className="submenu-toggle">
            <FaBox className="icon" />Quản lý sản phẩm <FaChevronDown className="dropdown-icon" />
          </div>
          {showProductSubmenu && (
            <ul className="submenu">
              <li><NavLink to="/shipper/products"><FaBox className="icon" />Quản lý sách</NavLink></li>
              <li><NavLink to="/shipper/categories"><FaTags className="icon" />Quản lý thể loại</NavLink></li>
              <li><NavLink to="/shipper/authors"><FaUserEdit className="icon" />Quản lý tác giả</NavLink></li>
              <li><NavLink to="/shipper/publishers"><FaBuilding className="icon" />Quản lý nhà xuất bản</NavLink></li>
              <li><NavLink to="/shipper/tags"><FaTag className="icon" />Quản lý tag</NavLink></li>
            </ul>
          )}
        </li>
        {/* <li><NavLink to="/shipper/customers"><FaUsers className="icon" />Quản lý khách hàng</NavLink></li> */}
         {/* <li><NavLink to="/logout"><FaSignOutAlt className="icon" />Đăng xuất</NavLink></li> */}
         <li><NavLink to="/shipper/profile"><FaPersonBooth className="icon" />Thông tin cá nhân</NavLink></li>

        {/* <li className='profile' onClick={handleLogout}><FaSignOutAlt className="icon" />&ensp;Đăng xuất</li> */}
        <li className='li-logout' onClick={handleLogout}><FaSignOutAlt className="icon" />&ensp;Đăng xuất</li>
       


      </ul>
    </div>
  );
};

export default ShipperPanel;
