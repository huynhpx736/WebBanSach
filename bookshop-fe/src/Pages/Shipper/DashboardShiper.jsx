import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./DashboardShipper.css";

const DashboardShipper = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        successfulOrders: 0,
        failedOrders: 0,
    });

    useEffect(() => {
        axios.get("http://localhost:8080/api/shipper/dashboard-stats")
            .then((response) => setStats(response.data))
            .catch((error) => console.error("Error fetching stats:", error));
    }, []);

    return (
        <div className="dashboard-shipper">
            <h2>Thống kê</h2>
            <div className="stats">
                <div className="stat-box">
                    <h3>Tổng số đơn hàng</h3>
                    <p>{stats.totalOrders}</p>
                </div>
                <div className="stat-box">
                    <h3>Đơn hàng thành công</h3>
                    <p>{stats.successfulOrders}</p>
                </div>
                <div className="stat-box">
                    <h3>Đơn hàng thất bại</h3>
                    <p>{stats.failedOrders}</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardShipper;
