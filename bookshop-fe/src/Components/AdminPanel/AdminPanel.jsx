import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaClipboardList, FaBox, FaTags, FaUserEdit, FaBuilding, FaTag, FaSignOutAlt, FaUsers, FaChevronDown, FaShoppingCart, FaShippingFast, FaCheckCircle, FaBan } from 'react-icons/fa';
import './AdminPanel.css';
import { useContext } from 'react';
import AuthContext from '../../Pages/Auth/AuthContext';
const AdminPanel = () => {
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
    <div className="pannel-admin">
      <h2>Admin Bookshop</h2>
      <ul>
        <li><NavLink to="/admin/dashboard"><FaTachometerAlt className="icon" />Dashboard</NavLink></li>
        <li>
          <div onClick={toggleOrderSubmenu} className="submenu-toggle">
            <FaClipboardList className="icon" />Quản lý đơn hàng <FaChevronDown className="dropdown-icon" />
          </div>
          {showOrderSubmenu && (
            <ul className="submenu">
              <li><NavLink to="/admin/orders/ordered"><FaShoppingCart className="icon" />Đơn hàng đã đặt</NavLink></li>
              <li><NavLink to="/admin/orders/shipping"><FaShippingFast className="icon" />Đơn hàng đang giao</NavLink></li>
              <li><NavLink to="/admin/orders/cancelled"><FaBan className="icon" />Đơn hàng đã hủy</NavLink></li>
              <li><NavLink to="/admin/orders/completed"><FaCheckCircle className="icon" />Đơn hàng đã giao</NavLink></li>
            </ul>
          )}
        </li>
        <li>
          <div onClick={toggleProductSubmenu} className="submenu-toggle">
            <FaBox className="icon" />Quản lý sản phẩm <FaChevronDown className="dropdown-icon" />
          </div>
          {showProductSubmenu && (
            <ul className="submenu">
              <li><NavLink to="/admin/products"><FaBox className="icon" />Quản lý sản phẩm</NavLink></li>
              <li><NavLink to="/admin/categories"><FaTags className="icon" />Quản lý thể loại</NavLink></li>
              <li><NavLink to="/admin/authors"><FaUserEdit className="icon" />Quản lý tác giả</NavLink></li>
              <li><NavLink to="/admin/publishers"><FaBuilding className="icon" />Quản lý nhà xuất bản</NavLink></li>
              <li><NavLink to="/admin/tags"><FaTag className="icon" />Quản lý tag</NavLink></li>
            </ul>
          )}
        </li>
        {/* <li><NavLink to="/admin/customers"><FaUsers className="icon" />Quản lý khách hàng</NavLink></li> */}
         {/* <li><NavLink to="/logout"><FaSignOutAlt className="icon" />Đăng xuất</NavLink></li> */}
         
        <li className='li-logout' onClick={handleLogout}><FaSignOutAlt className="icon" />&ensp;Đăng xuất</li>
       


      </ul>
    </div>
  );
};

export default AdminPanel;
