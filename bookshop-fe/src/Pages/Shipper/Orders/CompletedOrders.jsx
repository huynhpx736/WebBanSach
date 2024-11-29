import React, { useEffect, useState } from 'react';
import { fetchOrdersByShipper, fetchOrdersByShipperAndStatus, updateOrderStatus } from '../../../api';
import { Link } from 'react-router-dom';
// import './AcceptedOrders.css';
const CompletedOrdersShipper = () => {
  const shipperId = localStorage.getItem('userId');

    //nếu shipperId không tồn tại thì sẽ gán shipperId = 30
  if (!shipperId) {
    shipperId = 30;
  }

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
      <h2>ĐƠN HÀNG ĐÃ NHẬN</h2>
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
                <td><Link to={`/admin/orders/${order.id}`}>{order.id}</Link></td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                <td>{order.user.fullname}</td>
                <td className="action-buttons">
                {/* <button onClick={() => handleCompleteOrder(order.id)}>Giao thành công</button> */}
                {/* <button onClick={() => handleFailureOrder(order.id)}>Giao thất bại</button> */}
                {/* <button onClick={() =>>Xem chi tiết</button>
                 */}

                //nút xem chi tiết đơn hàng mở ra trang tab mới để xem chi tiết đơn hàng
                <button onClick={() => window.open(`/admin/orders/${order.id}`)}>Xem chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  // return (
  //   <div className="accepted-orders">
  //     <h1>Đơn hàng đã nhận</h1>
  //     <ul>
  //       {orders.map(order => (
  //         <li key={order.id}>
  //           <p><strong>Mã đơn hàng:</strong> {order.id}</p>
  //           <p><strong>Địa chỉ:</strong> {order.receiverAddress}</p>
  //           <button onClick={() => handleCompleteOrder(order.id)}>Giao thành công</button>
  //           <button onClick={() => handleFailureOrder(order.id)}>Giao thất bại</button>
  //           <textarea
  //             placeholder="Lý do thất bại..."
  //             onChange={(e) => setFailureReason(e.target.value)}
  //           />
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default CompletedOrdersShipper;
