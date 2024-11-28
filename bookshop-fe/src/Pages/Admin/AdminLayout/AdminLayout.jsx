import React from 'react';
import { Outlet } from 'react-router-dom';
import './AdminLayout.css';
import AdminPanel from '../AdminPanel/AdminPanel';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminPanel />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
