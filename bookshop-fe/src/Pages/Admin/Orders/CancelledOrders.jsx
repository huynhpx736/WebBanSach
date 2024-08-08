// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getOrderByStatus } from '../../../api';
// // import './CancelledOrders.css';

// const CancelledOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await getOrderByStatus('CANCELLED');
//         setOrders(data);
//       } catch (error) {
//         console.error('Failed to fetch orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="cancelled-orders">
//       <h2>Đơn hàng đã hủy</h2>
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
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order.id}>
//                 <td><Link to={`/admin/orders/${order.id}`}>{order.id}</Link></td>
//                 <td>{new Date(order.orderDate).toLocaleString()}</td>
//                 <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
//                 <td>{order.user.fullname}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CancelledOrders;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderByStatus } from '../../../api';
import './OrderManagement.css';

const CancelledOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderByStatus('CANCELLED');
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>ĐƠN HÀNG ĐÃ HỦY</h2>
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
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td><Link to={`/admin/orders/${order.id}`}>{order.id}</Link></td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                <td>{order.user.fullname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CancelledOrders;

