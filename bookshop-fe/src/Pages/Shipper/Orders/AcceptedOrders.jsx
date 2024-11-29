// import React, { useEffect, useState } from 'react';
// import { fetchOrdersByShipper, fetchOrdersByShipperAndStatus, updateOrderStatus } from '../../../api';
// import { Link } from 'react-router-dom';
// // import './AcceptedOrders.css';
// const AcceptedOrders = () => {
//   const shipperId = localStorage.getItem('userId');

//     //nếu shipperId không tồn tại thì sẽ gán shipperId = 30
//   if (!shipperId) {
//     shipperId = 30;
//   }

//   const [orders, setOrders] = useState([]);
//   const [failureReason, setFailureReason] = useState('Không liên lạc được với người nhận');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         // const data = await fetchOrdersByShipper(shipperId);
//         // setOrders(data.filter(order => order.status === 'SHIPPING'));
//         const data = await fetchOrdersByShipperAndStatus(shipperId, 'SHIPPING');
//         setOrders(data);
//         console.log(data);
//       } catch (error) {
//         console.error('Failed to fetch accepted orders:', error);
//       }
//     };
//     fetchOrders();
//   }, [shipperId]);

//   const handleCompleteOrder = async (orderId) => {
//     try {
//       await updateOrderStatus(orderId, 'COMPLETED');
//       setOrders(orders.filter(order => order.id !== orderId));
//       alert('Giao hàng thành công!');
//     } catch (error) {
//       console.error('Failed to complete order:', error);
//     }
//   };

//   const handleFailureOrder = async (orderId) => {
//     try {
//       await updateOrderStatus(orderId, 'FAILURE', { reason: failureReason });
//       setOrders(orders.filter(order => order.id !== orderId));
//       alert('Đã báo giao thất bại!');
//     } catch (error) {
//       console.error('Failed to mark order as failed:', error);
//     }
//   };

//   return (
//     <div className="orders-page">
//       <h2>ĐƠN HÀNG ĐÃ NHẬN</h2>
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
//                 <button onClick={() => handleCompleteOrder(order.id)}>Giao thành công</button>
//                 <button onClick={() => handleFailureOrder(order.id)}>Giao thất bại</button>
//                 <textarea
//                  placeholder="Lý do thất bại..."
//                 onChange={(e) => setFailureReason(e.target.value)}
//             />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };
// export default AcceptedOrders;
//   // return (
//   //   <div className="accepted-orders">
//   //     <h1>Đơn hàng đã nhận</h1>
//   //     <ul>
//   //       {orders.map(order => (
//   //         <li key={order.id}>
//   //           <p><strong>Mã đơn hàng:</strong> {order.id}</p>
//   //           <p><strong>Địa chỉ:</strong> {order.receiverAddress}</p>
//   //           <button onClick={() => handleCompleteOrder(order.id)}>Giao thành công</button>
//   //           <button onClick={() => handleFailureOrder(order.id)}>Giao thất bại</button>
//   //           <textarea
//   //             placeholder="Lý do thất bại..."
//   //             onChange={(e) => setFailureReason(e.target.value)}
//   //           />
//   //         </li>
//   //       ))}
//   //     </ul>
//   //   </div>
//   // );



// import React, { useEffect, useState } from 'react';
// import { fetchOrdersByShipperAndStatus, updateOrderStatus, reportFailedDelivery } from '../../../api';
// import { Link } from 'react-router-dom';
// import './ShipperOrders.css';

// const AcceptedOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [failureReason, setFailureReason] = useState('');
//   const [customReason, setCustomReason] = useState('');
//   const [note, setNote] = useState(null);
//   const shipperId = localStorage.getItem('userId') || 30;

//   const reasons = [
//     'Không liên lạc được với người nhận',
//     'Khách hàng từ chối nhận hàng',
//     'Địa chỉ không đúng hoặc không tìm thấy',
//   ];

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await fetchOrdersByShipperAndStatus(shipperId, 'SHIPPING');
//         setOrders(data);
//       } catch (error) {
//         console.error('Failed to fetch accepted orders:', error);
//       }
//     };
//     fetchOrders();
//   }, [shipperId]);

//   const handleCompleteOrder = async (orderId) => {
//     try {
//       await updateOrderStatus(orderId, 'COMPLETED');
//       setOrders(orders.filter(order => order.id !== orderId));
//       alert('Giao hàng thành công!');
//     } catch (error) {
//       console.error('Failed to complete order:', error);
//     }
//   };

//   const handleFailureOrder = async (orderId) => {
//     const reasonToSend = failureReason === 'Khác' ? customReason : failureReason;
//     try {
//       await reportFailedDelivery(orderId, reasonToSend, note);
//       setOrders(orders.filter(order => order.id !== orderId));
//       alert('Đã báo giao thất bại!');
//     } catch (error) {
//       console.error('Failed to report failed delivery:', error);
//     }
//   };

//   return (
//     <div className="orders-page">
//       <h2>ĐƠN HÀNG ĐÃ NHẬN</h2>
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
//                 <td>
//                   <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
//                 </td>
//                 <td>{new Date(order.orderDate).toLocaleString()}</td>
//                 <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
//                 <td>{order.user.fullname}</td>
//                 <td>
//                   <button onClick={() => handleCompleteOrder(order.id)}>Giao thành công</button>
//                   <button onClick={() => setSelectedOrderId(order.id)}>Giao thất bại</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {selectedOrderId && (
//         <div className="failure-modal">
//           <h3>Giao thất bại: {selectedOrderId}</h3>
//           <label>
//             Lý do thất bại:
//             <select
//               value={failureReason}
//               onChange={(e) => setFailureReason(e.target.value)}
//             >
//               <option value="">Chọn lý do</option>
//               {reasons.map((reason, index) => (
//                 <option key={index} value={reason}>{reason}</option>
//               ))}
//               <option value="Khác">Khác</option>
//             </select>
//           </label>
//           {failureReason === 'Khác' && (
//             <textarea
//               placeholder="Nhập lý do khác..."
//               value={customReason}
//               onChange={(e) => setCustomReason(e.target.value)}
//             />
//           )}
//           <textarea
//             placeholder="Ghi chú thêm..."
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//           />
//           <button onClick={() => handleFailureOrder(selectedOrderId)}>Xác nhận</button>
//           <button onClick={() => setSelectedOrderId(null)}>Hủy</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AcceptedOrders;


import React, { useEffect, useState } from 'react';
import { fetchOrdersByShipperAndStatus, updateOrderStatus, reportFailedDelivery } from '../../../api';
import { Link } from 'react-router-dom';
// import './AcceptedOrders.css';
import './ShipperOrders.css';

const AcceptedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [failureReason, setFailureReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const shipperId = localStorage.getItem('userId') || 30;

  const reasons = [
    'Không liên lạc được với người nhận',
    'Khách hàng từ chối nhận hàng',
    'Địa chỉ không đúng hoặc không tìm thấy',
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchOrdersByShipperAndStatus(shipperId, 'SHIPPING');
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch accepted orders:', error);
      }
    };
    fetchOrders();
  }, [shipperId]);

  const handleCompleteOrder = async (orderId) => {
    //hỏi lại xác nhận
    if (!window.confirm('Xác nhận giao hàng thành công?')) {
      return;
    }
    try {
      await updateOrderStatus(orderId, 'COMPLETED');
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Giao hàng thành công!');
    } catch (error) {
      console.error('Failed to complete order:', error);
    }
  };

  const handleFailureOrder = async () => {
    if (!failureReason || (failureReason === 'Khác' && !customReason)) {
      setError('Vui lòng chọn lý do thất bại!');
      return;
    }
    setError('');
    const reasonToSend = failureReason === 'Khác' ? customReason : failureReason;

    try {
      await reportFailedDelivery(selectedOrderId, reasonToSend, note || null);
      setOrders(orders.filter(order => order.id !== selectedOrderId));
      alert('Đã báo giao thất bại!');
      setSelectedOrderId(null);
      setFailureReason('');
      setCustomReason('');
      setNote('');
    } catch (error) {
      console.error('Failed to report failed delivery:', error);
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
                <td>
                  <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
                </td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                <td>{order.user.fullname}</td>
                <td>
                  <button onClick={() => handleCompleteOrder(order.id)}>Giao thành công</button>
                  <button onClick={() => setSelectedOrderId(order.id)}>Giao thất bại</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedOrderId && (
        <div className="failure-modal">
          <h3>Giao thất bại: {selectedOrderId}</h3>
          <label>
            Lý do thất bại:
            <select
              value={failureReason}
              onChange={(e) => setFailureReason(e.target.value)}
            >
              <option value="">Chọn lý do</option>
              {reasons.map((reason, index) => (
                <option key={index} value={reason}>{reason}</option>
              ))}
              <option value="Khác">Khác</option>
            </select>
          </label>
          {failureReason === 'Khác' && (
            <textarea
              placeholder="Nhập lý do khác..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />
          )}
          <textarea
            placeholder="Ghi chú thêm..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <div className="modal-buttons">
            <button onClick={handleFailureOrder}>OK</button>
            <button onClick={() => setSelectedOrderId(null)}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedOrders;
