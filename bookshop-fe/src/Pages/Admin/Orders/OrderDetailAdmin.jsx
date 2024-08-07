import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, getOrderItemsByOrderId, updateOrderStatus } from '../../../api';
import './OrderDetailAdmin.css';
import '../../User/Order/Order.css';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import OrderItem from '../../../Components/OrderItem/OrderItem';

const OrderDetailAdmin = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOrderItems = async () => {
      try {
        const orderItemsData = await getOrderItemsByOrderId(orderId);
        setOrderItems(orderItemsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
    fetchOrderItems();
  }, [orderId]);

  const changeStatusToShipping = async () => {
    if (!window.confirm('Chuyển đơn hàng sang đang giao?')) {
      return;
    }
    try {
      await updateOrderStatus(orderId, 'SHIPPING');
      // Cập nhật trạng thái đơn hàng sau khi hủy thành công
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: 'SHIPPING',
      }));
    } catch (error) {
      console.error('Failed to change status to shipping:', error);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Hủy đơn hàng?')) {
      return;
    }
    try {
      await updateOrderStatus(orderId, 'CANCELLED');
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: 'CANCELLED',
      }));
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  const handleCompleteOrder = async () => {
    if (!window.confirm('Chuyển đơn hàng sang đang giao?')) {
      return;
    }
    try {
      await updateOrderStatus(orderId, 'COMPLETED');
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: 'COMPLETED',
      }));
    } catch (error) {
      console.error('Failed to complete order:', error);
    }
  };


  if (!order) {
    return <div>Loading...</div>;
  }

  const { user, total, shippingFee, discount, receiverName, receiverPhone, receiverAddress, orderDate, status } = order;
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div>
      {/* <Header /> */}
      <div className="order-detail">
        <h2>Chi tiết đơn hàng</h2>

        <div className="order-info">
          <p><strong>Mã:</strong> {order.id}</p>
          <p><strong>Người đặt:</strong> {user.fullname}</p>
          {/* <p><strong>Email:</strong> {user.email}</p> */}
          <p><strong>Số điện thoại người nhận:</strong> {receiverPhone}</p>
          <p><strong>Địa chỉ người nhận:</strong> {receiverAddress}</p>
          <p><strong>Tên người nhận:</strong> {receiverName}</p>
          <p><strong>Ngày đặt hàng:</strong> {new Date(orderDate).toLocaleString()}</p>
          <p><strong>Trạng thái:</strong> {status === 'PLACED' ? 'Đã đặt hàng' : status === 'SHIPPING' ? 'Đang giao' : status === 'COMPLETED' ? 'Đã nhận' : 'Đã hủy'}</p>
        </div>

        <div className="cart">
          <h2>Sản phẩm trong đơn hàng</h2>
          {orderItems.length === 0 ? (
            <p>Trống.</p>
          ) : (
            <div>
              <div className="cart-header">
                <span>Sản phẩm</span>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
              </div>
              <div className="item-cart-andCb">
                {orderItems.map(item => (
                  <OrderItem
                    key={item.productId}
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="order-summary">
          <p><strong>Tổng tiền sản phẩm:</strong> {formatter.format(total-shippingFee-discount)}</p>
          <p><strong>Phí vận chuyển:</strong> {formatter.format(shippingFee)}</p>
          <p><strong>Giảm giá:</strong> {formatter.format(discount)}</p>
          <h3><strong>Tổng thanh toán:</strong> {formatter.format(total)}</h3>
        </div>
      </div>
      {/* //nếu đơn hàng đã đặt thì hiển thị nút chuyển sang đang giao và hủy đơn hàng, nếu đang giao thì hiển thị nút hoàn thành đơn hàng và hủy đơn hàng */}
      {status === 'PLACED' && (
        <div className="order-actions">
          <button className = "shipping" onClick={changeStatusToShipping}>Chuyển sang đang giao</button>
          <button className = "cancel" onClick={handleCancelOrder}>Hủy đơn hàng</button>
        </div>
      )}
      {status === 'SHIPPING' && (
        <div className="order-actions">
          <button className = "completed" onClick={handleCompleteOrder}>Hoàn thành đơn hàng</button>
          <button className = "cancel" onClick={handleCancelOrder}>Hủy đơn hàng</button>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default OrderDetailAdmin;
