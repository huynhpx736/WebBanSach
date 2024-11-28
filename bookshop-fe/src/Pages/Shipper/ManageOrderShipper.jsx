import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./ManageOrdersShipper.css";

const ManageOrdersShipper = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/shipper/orders")
            .then((response) => setOrders(response.data))
            .catch((error) => console.error("Error fetching orders:", error));
    }, []);

    const reportFailed = (orderId) => {
        const reason = prompt("Nhập lý do giao hàng không thành công:");
        if (reason) {
            axios.post(`http://localhost:8080/api/shipper/orders/report-failed/${orderId}`, { reason })
                .then(() => alert("Đã báo cáo đơn hàng không thành công"))
                .catch((error) => console.error("Error reporting failed delivery:", error));
        }
    };

    return (
        <div className="manage-orders-shipper">
            <h2>Quản lý đơn hàng</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Người nhận</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.receiverName}</td>
                            <td>{order.receiverAddress}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => reportFailed(order.id)}>
                                    Báo cáo thất bại
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageOrdersShipper;
