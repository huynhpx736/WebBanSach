import React, { useEffect, useState } from 'react';
import { getOrderByUserAndStatus } from '../../../api';
import './Order.css';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';

const Order = () => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const userId = localStorage.getItem('userId');
  const [placedOrders, setPlacedOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [shippingOrders, setShippingOrders] = useState([]);
  const [failedOrders, setFailedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const fetchOrders = async (status, setOrderState) => {
      try {
        const orders = await getOrderByUserAndStatus(userId, status);
        //sắp xếp đơn hàng mới nhất lên trước
        orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrderState(orders);
      } catch (error) {
        console.error(`Failed to fetch ${status} orders:`, error.message);
      }
    };

    fetchOrders('PLACED', setPlacedOrders);
    fetchOrders('CONFIRMED', setConfirmedOrders);
    fetchOrders('CANCELLED', setCancelledOrders);
    fetchOrders('SHIPPING', setShippingOrders);
    fetchOrders('FAILED', setFailedOrders);
    fetchOrders('COMPLETED', setCompletedOrders);
  }, [userId]);
  

  const renderOrders = (orders) => {
    if (orders.length === 0) {
      return <p>Không có đơn hàng.</p>;
    }

    return orders.map((order) => (
      //div chứa link tới chi tiết đơn hàng
      <div key={order.id} className="order-item">
        <a href={`/orderDetail/${order.id}`}>
          <p><strong>Mã đơn hàng:</strong> {order.id}</p>
          <p><strong>Ngày đặt hàng:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          <p><strong>Tổng tiền:</strong> {formatter.format(order.total)}</p>
        </a>
      </div>
      // <div key={order.id} className="order-item">

      //   <p><strong>Mã đơn hàng:</strong> {order.id}</p>
      //   <p><strong>Ngày đặt hàng:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
      //   <p><strong>Tổng tiền:</strong> {formatter.format(order.total)}</p>
      // </div>
    ));
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div>
      <Header />
      <div className="order-container">
        <div className="order-section">
        {/* //đơn hàng đã đặt gồm tất cả các đơn hàng có status là PLACED hoặc CONFIRMED */}
          <h2 onClick={() => toggleSection('PLACED')}>Đơn hàng đã đặt</h2>
          {activeSection === 'PLACED' && renderOrders(placedOrders.concat(confirmedOrders))}
       
        </div>
        <div className="order-section">
        {/* //đơn hàng đang giao gồm tất cả các đơn hàng có status là SHIPPING hoặc FAILED (vì fail có thể giao lại đến khi thành CANCELLED thì mới bỏ) */}
          <h2 onClick={() => toggleSection('SHIPPING')}>Đơn hàng đang giao</h2>
          {activeSection === 'SHIPPING' && renderOrders(shippingOrders.concat(failedOrders))}
        </div>
        <div className="order-section">
          <h2 onClick={() => toggleSection('CANCEL')}>Đơn hàng đã hủy</h2>
          {activeSection === 'CANCEL' && renderOrders(cancelledOrders)}
        </div>
        <div className="order-section">
          <h2 onClick={() => toggleSection('COMPLETED')}>Đơn hàng đã nhận</h2>
          {activeSection === 'COMPLETED' && renderOrders(completedOrders)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
