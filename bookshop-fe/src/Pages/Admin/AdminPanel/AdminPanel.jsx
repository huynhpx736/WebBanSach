import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaClipboardList, FaBox, FaTags, FaUserEdit, FaBuilding, FaTag, FaSignOutAlt, FaUsers, FaChevronDown, FaShoppingCart, FaShippingFast, FaCheckCircle, FaBan, FaPersonBooth, FaMotorcycle, FaPeopleCarry, FaPeopleArrows } from 'react-icons/fa';
import './AdminPanel.css';
import { useContext } from 'react';
import AuthContext from '../../Auth/AuthContext';
const AdminPanel = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    window.location.href = '/';

  };
  const [showProductSubmenu, setShowProductSubmenu] = useState(false);
  const [showOrderSubmenu, setShowOrderSubmenu] = useState(false);
  const [showShipperSubmenu, setShowShipperSubmenu] = useState(false);

  const toggleProductSubmenu = () => {
    setShowProductSubmenu(!showProductSubmenu);
  };

  const toggleOrderSubmenu = () => {
    setShowOrderSubmenu(!showOrderSubmenu);
  };
  const toggleShipperSubmenu = () => {
    setShowShipperSubmenu(!showShipperSubmenu);
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
              <li><NavLink to="/admin/orders/ordered"><FaShoppingCart className="icon" />Đơn hàng đang chờ</NavLink></li>
              <li><NavLink to="/admin/orders/confirmed"><FaShoppingCart className="icon" />Đơn hàng đã duyệt</NavLink></li>
              <li><NavLink to="/admin/orders/shipping"><FaShippingFast className="icon" />Đơn hàng đang giao</NavLink></li>
              <li><NavLink to="/admin/orders/completed"><FaCheckCircle className="icon" />Đơn hàng thành công</NavLink></li>
              <li><NavLink to="/admin/orders/failed"><FaCheckCircle className="icon" />Đơn hàng thất bại</NavLink></li>
              <li><NavLink to="/admin/orders/cancelled"><FaBan className="icon" />Đơn hàng đã hủy</NavLink></li>
            </ul>
          )}
        </li>
        <li>
          <div onClick={toggleProductSubmenu} className="submenu-toggle">
            <FaBox className="icon" />Quản lý sản phẩm <FaChevronDown className="dropdown-icon" />
          </div>
          {showProductSubmenu && (
            <ul className="submenu">
              <li><NavLink to="/admin/products"><FaBox className="icon" />Quản lý sách</NavLink></li>
              <li><NavLink to="/admin/categories"><FaTags className="icon" />Quản lý thể loại</NavLink></li>
              <li><NavLink to="/admin/authors"><FaUserEdit className="icon" />Quản lý tác giả</NavLink></li>
              <li><NavLink to="/admin/publishers"><FaBuilding className="icon" />Quản lý nhà xuất bản</NavLink></li>
              <li><NavLink to="/admin/tags"><FaTag className="icon" />Quản lý tag</NavLink></li>
            </ul>
          )}
        </li>
        <li>
          <div onClick={toggleShipperSubmenu} className="submenu-toggle">
            <FaMotorcycle className="icon" />Quản lý shipper <FaChevronDown className="dropdown-icon" />
          </div>
          {showShipperSubmenu && (
            <ul className="submenu">
              <li><NavLink to="/admin/manage-shipper"><FaPeopleCarry className="icon" />Quản lý shipper</NavLink></li>
              <li><NavLink to="/admin/manage-customer"><FaPeopleArrows className="icon" />Quản lý khách hàng</NavLink></li>             
            </ul>
          )}
        </li>       
        <li className='li-logout' onClick={handleLogout}><FaSignOutAlt className="icon" />&ensp;Đăng xuất</li>
       


      </ul>
    </div>
  );
};

export default AdminPanel;
