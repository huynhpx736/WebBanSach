import React, { useEffect, useState } from 'react';
import { fetchOrdersByShipper, fetchOrdersByShipperAndStatus, updateOrderStatus } from '../../../api';
import { Link } from 'react-router-dom';
// import './AcceptedOrders.css';
const CompletedOrdersShipper = () => {
  // const shipperId = localStorage.getItem('userId');

  // if (!shipperId) {
  //   shipperId = 30;
  // }
  const shipperId = localStorage.getItem('userId') || 30;

  const [orders, setOrders] = useState([]);
  const [failureReason, setFailureReason] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const data = await fetchOrdersByShipper(shipperId);
        // setOrders(data.filter(order => order.status === 'SHIPPING'));
        const data = await fetchOrdersByShipperAndStatus(shipperId, 'COMPLETED');
        setOrders(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch accepted orders:', error);
      }
    };
    fetchOrders();
  }, [shipperId]);

  const handleCompleteOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'COMPLETED');
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Giao hàng thành công!');
    } catch (error) {
      console.error('Failed to complete order:', error);
    }
  };

  const handleFailureOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'FAILURE', { reason: failureReason });
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Đã báo giao thất bại!');
    } catch (error) {
      console.error('Failed to mark order as failed:', error);
    }
  };

  return (
    <div className="orders-page">
      <h2>ĐƠN HÀNG ĐÃ GIAO THÀNH CÔNG</h2>
      {orders.length === 0 ? (
        <p className="no-orders">Không có đơn hàng nào</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Người đặt</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td><Link to={`/shipper/orders/${order.id}`}>{order.id}</Link></td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                <td>{order.user.fullname}</td>
                <td className="action-buttons">                
                <button onClick={() => window.open(`/shipper/orders/${order.id}`)}>Xem chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
};

export default CompletedOrdersShipper;
