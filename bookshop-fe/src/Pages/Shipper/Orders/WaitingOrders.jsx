import React, { useEffect, useState } from 'react';
import { getOrderByStatus, acceptOrder } from '../../../api';
import { Link } from 'react-router-dom';
// import './WaitingOrders.css';

// const WaitingOrders = ({ shipperId }) => {
const WaitingOrders = () => {
  const shipperId = localStorage.getItem('userId');
  if (!shipperId) {
    shipperId = 30;
  }
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderByStatus('PLACED');
        console.log(data);

        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch waiting orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      await acceptOrder(orderId, shipperId);
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Đã nhận đơn hàng!');
    } catch (error) {
      console.error('Failed to accept order:', error);
    }
  };

  // return (
  //   <div className="waiting-orders">
  //     <h1>Đơn hàng đang chờ</h1>
  //     <ul>
  //       {orders.map(order => (
  //         <li key={order.id}>
         
  //           <p><strong>Mã đơn hàng:</strong> {order.id}</p>
  //           <p><strong>Địa chỉ:</strong> {order.receiverAddress}</p>

  //           <button onClick={() => handleAcceptOrder(order.id)}>Nhận giao hàng</button>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  
  return (
    <div className="orders-page">
      <h2>ĐƠN HÀNG ĐANG CHỜ</h2>
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
                  {/* <button className="button-processing" onClick={() => handleProcessing(order.id)}><FaShippingFast /> Đang giao</button> */}
                  <button onClick={() => handleAcceptOrder(order.id)}>Nhận giao hàng</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// };

export default WaitingOrders;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getOrderByStatus, updateOrderStatus, cancelOrder } from '../../../api';
// // import '.../Admin/Orders/OrderManagement.css';
// import { FaShippingFast, FaBan } from 'react-icons/fa';

// const WaitingOrders = () => {
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

//   const handleProcessing = async (orderId) => {
//     try {
//       //hỏi xác nhận
//       if (!window.confirm('Chuyển đơn hàng sang đang giao?')) {
//         return;
//       }

//       await updateOrderStatus(orderId, 'SHIPPING');
//       setOrders(orders.filter(order => order.id !== orderId));
//     } catch (error) {
//       console.error('Failed to update order status:', error);
//     }
//   };

//   const handleCancel = async (orderId) => {
//     try {
//       //hỏi xác nhận
//       if (!window.confirm('Hủy đơn hàng?')) {
//         return;
//       }
//       await cancelOrder(orderId, 'CANCELLED');
//       setOrders(orders.filter(order => order.id !== orderId));
//     } catch (error) {
//       console.error('Failed to cancel order:', error);
//     }
//   };

//   return (
//     <div className="orders-page">
//       <h2>ĐƠN HÀNG ĐÃ ĐẶT</h2>
//       {orders.length === 0 ? (
//         <p className="no-orders">Không có đơn hàng nào</p>
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
//                 <td className="action-buttons">
//                   <button className="button-processing" onClick={() => handleProcessing(order.id)}><FaShippingFast /> Đang giao</button>
//                   <button className="button-cancel" onClick={() => handleCancel(order.id)}><FaBan /> Hủy</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default WaitingOrders;
