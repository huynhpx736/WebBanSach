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
              <li><NavLink to="/shipper/orders/waiting"><FaShoppingCart className="icon" />Đơn hàng đang chờ</NavLink></li>
              <li><NavLink to="/shipper/orders/accepted"><FaShippingFast className="icon" />Đơn hàng đã nhận</NavLink></li>
              <li><NavLink to="/shipper/orders/cancelled"><FaBan className="icon" />Đơn hàng đã hủy</NavLink></li>
              <li><NavLink to="/shipper/orders/completed"><FaCheckCircle className="icon" />Đơn hàng đã giao thành công</NavLink></li>
              <li><NavLink to="/shipper/orders/failure"><FaBan className="icon" />Đơn hàng thất bại</NavLink></li>

            </ul>
          )}
        </li>
       
         <li><NavLink to="/shipper/profile"><FaPersonBooth className="icon" />Thông tin cá nhân</NavLink></li>
        <li className='li-logout' onClick={handleLogout}><FaSignOutAlt className="icon" />&ensp;Đăng xuất</li>
       


      </ul>
    </div>
  );
};

export default ShipperPanel;
