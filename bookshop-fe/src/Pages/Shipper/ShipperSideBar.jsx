import React from "react";
import { Link } from "react-router-dom";
import "./ShipperSidebar.css";

const ShipperSidebar = () => {
    return (
        <nav className="shipper-sidebar">
            <ul>
                <li>
                    <Link to="/shipper/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/shipper/manage-orders">Quản lý đơn hàng</Link>
                </li>
                <li>
                    <Link to="/shipper/profile">Quản lý thông tin cá nhân</Link>
                </li>
            </ul>
        </nav>
    );
};

export default ShipperSidebar;
