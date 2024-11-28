// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ShipperDashboard.css';

// const ShipperDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('all');

//   // Fetch orders available for shipping
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/orders/available')
//       .then(response => setOrders(response.data))
//       .catch(error => console.error('Error fetching orders:', error));
//   }, []);

//   const handleAcceptOrder = (orderId) => {
//     axios.post(`http://localhost:8080/api/orders/accept/${orderId}`, { shipperId: 1 }) // Replace 1 with logged-in shipper ID
//       .then(() => {
//         alert('Order accepted successfully!');
//         setOrders(orders.filter(order => order.id !== orderId)); // Remove the accepted order from the list
//       })
//       .catch(error => console.error('Error accepting order:', error));
//   };

//   // Filter and search logic
//   const filteredOrders = orders.filter(order => {
//     if (filter === 'all') return true;
//     return order.status === filter;
//   }).filter(order => order.title.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div className="shipper-dashboard">
//       <h1>Shipper Dashboard</h1>
      
//       <div className="filters">
//         <input 
//           type="text" 
//           placeholder="Search orders..." 
//           value={search} 
//           onChange={(e) => setSearch(e.target.value)} 
//         />
        
//         <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//           <option value="all">All Orders</option>
//           <option value="pending">Pending</option>
//           <option value="ready">Ready to Ship</option>
//         </select>
//       </div>

//       <div className="order-list">
//         {filteredOrders.length > 0 ? (
//           filteredOrders.map(order => (
//             <div key={order.id} className="order-card">
//               <h3>Order #{order.id}</h3>
//               <p><strong>Customer:</strong> {order.customerName}</p>
//               <p><strong>Address:</strong> {order.address}</p>
//               <p><strong>Status:</strong> {order.status}</p>
//               <button 
//                 className="accept-button" 
//                 onClick={() => handleAcceptOrder(order.id)}>
//                 Accept Order
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No orders available for shipping.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShipperDashboard;
