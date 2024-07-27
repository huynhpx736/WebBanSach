import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  return (
    <div className="pannel-admin">
      <h2>Admin Bookshop</h2>
      <ul>
        <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/admin/orders">Quản lý đơn hàng</NavLink></li>
        <li><NavLink to="/admin/products">Quản lý sản phẩm</NavLink></li>
        <li><NavLink to="/admin/categories">Quản lý thể loại</NavLink></li>
        <li><NavLink to="/admin/authors">Quản lý tác giả</NavLink></li>
        <li><NavLink to="/admin/publishers">Quản lý nhà xuất bản</NavLink></li>
        <li><NavLink to="/admin/tags">Quản lý tag</NavLink></li>
      </ul>
    </div>
  );
};

export default AdminPanel;
