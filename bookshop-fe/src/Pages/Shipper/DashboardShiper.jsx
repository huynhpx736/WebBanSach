// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import "./DashboardShipper.css";

// const DashboardShipper = () => {
//     const [stats, setStats] = useState({
//         totalOrders: 0,
//         successfulOrders: 0,
//         failedOrders: 0,
//     });

//     useEffect(() => {
//         axios.get("http://localhost:8080/api/shipper/dashboard-stats")
//             .then((response) => setStats(response.data))
//             .catch((error) => console.error("Error fetching stats:", error));
//     }, []);

//     return (
//         <div className="dashboard-shipper">
//             <h2>Thống kê</h2>
//             <div className="stats">
//                 <div className="stat-box">
//                     <h3>Tổng số đơn hàng</h3>
//                     <p>{stats.totalOrders}</p>
//                 </div>
//                 <div className="stat-box">
//                     <h3>Đơn hàng thành công</h3>
//                     <p>{stats.successfulOrders}</p>
//                 </div>
//                 <div className="stat-box">
//                     <h3>Đơn hàng thất bại</h3>
//                     <p>{stats.failedOrders}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardShipper;
import React, { useEffect, useState } from 'react';
import { getAllOrdersByUserId } from '../../api';
// import './DashboardShipper.css';

// const DashboardShipper = ({ shipperId }) => {
const DashboardShipper = () => {
    const shipperId = localStorage.getItem('userId');
  const [stats, setStats] = useState({
    received: 0,
    successful: 0,
    failed: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const orders = await getAllOrdersByUserId(shipperId);
        const received = orders.filter(order => order.status === 'SHIPPING').length;
        const successful = orders.filter(order => order.status === 'COMPLETED').length;
        const failed = orders.filter(order => order.status === 'FAILURE').length;
        setStats({ received, successful, failed });
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchStats();
  }, [shipperId]);

  return (
    <div className="shipper-dashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-item">
          <h3>Đơn hàng đã nhận</h3>
          <p>{stats.received}</p>
        </div>
        <div className="stat-item">
          <h3>Giao thành công</h3>
          <p>{stats.successful}</p>
        </div>
        <div className="stat-item">
          <h3>Giao thất bại</h3>
          <p>{stats.failed}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardShipper;
