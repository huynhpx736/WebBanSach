// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getOrderByStatus, updateOrderStatus, cancelOrder } from '../../../api';
// import './PlacedOrders.css';
// import { FaTruck, FaBan } from 'react-icons/fa';

// const PlacedOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await getOrderByStatus('PLACED');
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
//     <div className="placed-orders">
//       <h2>Đơn hàng đã đặt</h2>
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
//                   <button className="action-button" onClick={() => handleUpdateStatus(order.id, 'SHIPPING')}>
//                     <FaTruck /> Đang giao
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

// export default PlacedOrders;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderByStatus, updateOrderStatus, cancelOrder } from '../../../api';
import './OrderManagement.css';
import { FaShippingFast, FaBan } from 'react-icons/fa';

const PlacedOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderByStatus('PLACED');
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleProcessing = async (orderId) => {
    try {
      //hỏi xác nhận
      if (!window.confirm('Chuyển đơn hàng sang đang giao?')) {
        return;
      }

      await updateOrderStatus(orderId, 'SHIPPING');
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      //hỏi xác nhận
      if (!window.confirm('Hủy đơn hàng?')) {
        return;
      }
      await cancelOrder(orderId, 'CANCELLED');
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  return (
    <div className="orders-page">
      <h2>ĐƠN HÀNG ĐÃ ĐẶT</h2>
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
                  <button className="button-processing" onClick={() => handleProcessing(order.id)}><FaShippingFast /> Đang giao</button>
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

export default PlacedOrders;
