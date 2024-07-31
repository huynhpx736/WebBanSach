// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Order.css';
// import Header from '../../../Components/Header/Header';
// import Footer from '../../../Components/Footer/Footer';

// // const Order = ({ userId }) => {
// const Order = () => {

//     //ham formatPrice de chuyen doi gia tien sang dang VND
//     const formatter = new Intl.NumberFormat('vi-VN', {
//         style: 'currency',
//         currency: 'VND',
//     });
//     const userId  = localStorage.getItem('userId');

//   const [orders, setOrders] = useState({
//     PLACED: [],
//     CANCEL: [],
//     SHIPPING: [],
//     COMPLETED: [],
//   });

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const placedOrders = await axios.get(`http://localhost:8080/api/orders/get-by-user-and-status?userId=${userId}&status=PLACED`);
//         // const cancelledOrders = await axios.get(`/api/orders/get-by-user-and-status?userId=${userId}&status=CANCEL`);
//         // const shippingOrders = await axios.get(`/api/orders/get-by-user-and-status?userId=${userId}&status=SHIPPING`);
//         // const completedOrders = await axios.get(`/api/orders/get-by-user-and-status?userId=${userId}&status=COMPLETED`);

//         setOrders({
//           PLACED: placedOrders.data.data,
//         //   CANCEL: cancelledOrders.data.data,
//         //   SHIPPING: shippingOrders.data.data,
//         //   COMPLETED: completedOrders.data.data,
//         });
//       } catch (error) {
//         console.error('Failed to fetch orders:', error);
//       }
//     };

//     fetchOrders();
//   }, [userId]);

//   const renderOrderSection = (title, orderList) => (
//     <div className="order-section">
//       <h2>{title}</h2>
//       {orderList.length > 0 ? (
//         <ul>
//           {orderList.map(order => (
//             <li key={order.id}>
//               <div className="order-item">
//                 <p>Mã đơn hàng: {order.id}</p>
//                 {/* <p>Status: {order.status}</p> */}
//                 <p>Ngày đặt hàng: {order.createdAt}</p>
//                 <p>Tổng tiền: {formatter.format(order.total)}</p>
//                 {/* <p>Tổng tiền: formatter</p> */}
//                 {/* <p>Tổng tiền: {order.total}</p> */}
//                 {/* <p>Receiver: {order.receiverName}</p>
//                 <p>Address: {order.receiverAddress}</p>
//                 <p>Phone: {order.receiverPhone}</p> */}
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Không có đơn hàng.</p>
//       )}
//     </div>
//   );

//   return (
//     <div>
//         <Header />
//     <div className="order-container">
//       {renderOrderSection('Đơn hàng đã đặt', orders.PLACED)}
//       {/* {renderOrderSection('Đơn hàng đã hủy', orders.CANCEL)}
//       {renderOrderSection('Đơn hàng đang giao', orders.SHIPPING)}
//       {renderOrderSection('Đơn hàng đã nhận', orders.COMPLETED)} */}
//     </div>
//     <Footer />
//     </div>
//   );
// };

// export default Order;

// import React, { useEffect, useState } from 'react';
// import { getOrderByUserAndStatus } from '../../../api';
// import './Order.css';
// import Header from '../../../Components/Header/Header';
// import Footer from '../../../Components/Footer/Footer';

// // const Order = ({ userId }) => {
// const Order = () => {
//     //  ham formatPrice de chuyen doi gia tien sang dang VND
//     const formatter = new Intl.NumberFormat('vi-VN', {
//         style: 'currency',
//         currency: 'VND',
//     });
//   const userId = localStorage.getItem('userId');
//   const [placedOrders, setPlacedOrders] = useState([]);
//   const [cancelledOrders, setCancelledOrders] = useState([]);
//   const [shippingOrders, setShippingOrders] = useState([]);
//   const [completedOrders, setCompletedOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async (status, setOrderState) => {
//       try {
//         const orders = await getOrderByUserAndStatus(userId, status);
//         setOrderState(orders);
//       } catch (error) {
//         console.error(`Failed to fetch ${status} orders:`, error.message);
//       }
//     };

//     fetchOrders('PLACED', setPlacedOrders);
//     fetchOrders('CANCEL', setCancelledOrders);
//     fetchOrders('SHIPPING', setShippingOrders);
//     fetchOrders('COMPLETED', setCompletedOrders);
//   }, [userId]);

//   const renderOrders = (orders) => {
//     if (orders.length === 0) {
//       return <p>Không có đơn hàng.</p>;
//     }

//     return orders.map((order) => (
//       <div key={order.id} className="order-item">
//         <p><strong>ID:</strong> {order.id}</p>
//         {/* <p><strong>Trạng thái:</strong> {order.status}</p> */}
//         <p><strong>Ngày đặt hàng:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
//         <p><strong>Tổng tiền:</strong> {formatter.format(order.total)}</p>

//       </div>
//     ));
//   };

//   return (
//     <div>
//     <Header />
//     <div className="order-container">
//       <div className="order-section">
//         <h2>Đơn hàng đã đặt</h2>
//         {renderOrders(placedOrders)}
//       </div>
//       <div className="order-section">
//         <h2>Đơn hàng đã hủy</h2>
//         {renderOrders(cancelledOrders)}
//       </div>
//       {/* <div className="order-section">
//         <h2>Đơn hàng đang giao</h2>
//         {renderOrders(shippingOrders)}
//       </div> */}
//       <div className="order-section">
//         <h2>Đơn hàng đã nhận</h2>
//         {renderOrders(completedOrders)}
//       </div>
//     </div>
//     <Footer />
//     </div>
//   );
// };

// export default Order;


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
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [shippingOrders, setShippingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const fetchOrders = async (status, setOrderState) => {
      try {
        const orders = await getOrderByUserAndStatus(userId, status);
        setOrderState(orders);
      } catch (error) {
        console.error(`Failed to fetch ${status} orders:`, error.message);
      }
    };

    fetchOrders('PLACED', setPlacedOrders);
    fetchOrders('CANCEL', setCancelledOrders);
    fetchOrders('SHIPPING', setShippingOrders);
    fetchOrders('COMPLETED', setCompletedOrders);
  }, [userId]);

  const renderOrders = (orders) => {
    if (orders.length === 0) {
      return <p>Không có đơn hàng.</p>;
    }

    return orders.map((order) => (
      <div key={order.id} className="order-item">
        <p><strong>Mã đơn hàng:</strong> {order.id}</p>
        <p><strong>Ngày đặt hàng:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
        <p><strong>Tổng tiền:</strong> {formatter.format(order.total)}</p>
      </div>
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
          <h2 onClick={() => toggleSection('PLACED')}>Đơn hàng đã đặt</h2>
          {activeSection === 'PLACED' && renderOrders(placedOrders)}
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
