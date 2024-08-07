// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getOrderByStatus, updateOrderStatus, cancelOrder } from '../../../api';
// // import './ShippingOrders.css';
// import { FaCheck, FaBan } from 'react-icons/fa';

// const ShippingOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await getOrderByStatus('SHIPPING');
//         setOrders(data);
//       } catch (error) {
//         console.error('Failed to fetch orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleUpdateStatus = async (orderId, status) => {
//     try {
//       await updateOrderStatus(orderId, status);
//       setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
//     } catch (error) {
//       console.error('Failed to update order status:', error);
//     }
//   };

//   const handleCancelOrder = async (orderId) => {
//     try {
//       await cancelOrder(orderId, 'CANCELLED');
//       setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
//     } catch (error) {
//       console.error('Failed to cancel order:', error);
//     }
//   };

//   return (
//     <div className="shipping-orders">
//       <h2>Đơn hàng đang giao</h2>
//       {orders.length === 0 ? (
//         <p>Không có đơn hàng nào</p>
//       ) : (
//         <table className="orders-table">
//           <thead>
//             <tr>
//               <th>Mã đơn</th>
//               <th>Ngày đặt</th>
//               <th>Tổng tiền</th>
//               <th>Người đặt</th>
//               <th>Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order.id}>
//                 <td><Link to={`/admin/orders/${order.id}`}>{order.id}</Link></td>
//                 <td>{new Date(order.orderDate).toLocaleString()}</td>
//                 <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
//                 <td>{order.user.fullname}</td>
//                 <td>
//                   <button className="action-button complete-button" onClick={() => handleUpdateStatus(order.id, 'COMPLETED')}>
//                     <FaCheck /> Đã giao
//                   </button>
//                   <button className="action-button cancel-button" onClick={() => handleCancelOrder(order.id)}>
//                     <FaBan /> Hủy đơn
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ShippingOrders;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderByStatus, updateOrderStatus, cancelOrder } from '../../../api';
import './OrderManagement.css';
import { FaCheckCircle, FaBan } from 'react-icons/fa';

const ShippingOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderByStatus('SHIPPING');
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleCompleted = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'COMPLETED');
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId, 'CANCELLED');
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  return (
    <div className="orders-page">
      <h2>Đơn hàng đang giao</h2>
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
                  <button className="button-completed" onClick={() => handleCompleted(order.id)}><FaCheckCircle /> Đã giao</button>
                  <button className="button-cancel" onClick={() => handleCancel(order.id)}><FaBan /> Hủy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShippingOrders;

