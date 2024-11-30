// import React, { useEffect, useState } from 'react';
// import { getOrderByStatus, acceptOrder } from '../../../api';
// import { Link } from 'react-router-dom';
// // import './WaitingOrders.css';

// // const WaitingOrders = ({ shipperId }) => {
// const WaitingOrders = () => {
//   const shipperId = localStorage.getItem('userId');
//   if (!shipperId) {
//     shipperId = 30;
//   }
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await getOrderByStatus('PLACED');
//         console.log(data);

//         setOrders(data);
//       } catch (error) {
//         console.error('Failed to fetch waiting orders:', error);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleAcceptOrder = async (orderId) => {
//     try {
//       await acceptOrder(orderId, shipperId);
//       setOrders(orders.filter(order => order.id !== orderId));
//       alert('Đã nhận đơn hàng!');
//     } catch (error) {
//       console.error('Failed to accept order:', error);
//     }
//   };

//   // return (
//   //   <div className="waiting-orders">
//   //     <h1>Đơn hàng đang chờ</h1>
//   //     <ul>
//   //       {orders.map(order => (
//   //         <li key={order.id}>
         
//   //           <p><strong>Mã đơn hàng:</strong> {order.id}</p>
//   //           <p><strong>Địa chỉ:</strong> {order.receiverAddress}</p>

//   //           <button onClick={() => handleAcceptOrder(order.id)}>Nhận giao hàng</button>
//   //         </li>
//   //       ))}
//   //     </ul>
//   //   </div>
//   // );

  
//   return (
//     <div className="orders-page">
//       <h2>ĐƠN HÀNG ĐANG CHỜ</h2>
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
//                 <td><Link to={`/shipper/orders/${order.id}`}>{order.id}</Link></td>
//                 <td>{new Date(order.orderDate).toLocaleString()}</td>
//                 <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
//                 <td>{order.user.fullname}</td>
//                 <td className="action-buttons">
//                   {/* <button className="button-processing" onClick={() => handleProcessing(order.id)}><FaShippingFast /> Đang giao</button> */}
//                   <button onClick={() => handleAcceptOrder(order.id)}>Nhận giao hàng</button>

//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// // };

// export default WaitingOrders;

// import React, { useEffect, useState } from 'react';
// import { getOrderByStatus, acceptOrder } from '../../../api';
// import { Link } from 'react-router-dom';
// import { FaShippingFast } from 'react-icons/fa'; // Import biểu tượng từ FontAwesome
// import './WaitingOrders.css';

// const WaitingOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [searchDate, setSearchDate] = useState('');
//   const [searchCustomer, setSearchCustomer] = useState('');
//   const itemsPerPage = 10;
//   const shipperId = localStorage.getItem('userId') || 30;

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await getOrderByStatus('PLACED');
//         const sortedData = data.sort(
//           (a, b) => new Date(b.orderDate) - new Date(a.orderDate) // Sắp xếp giảm dần theo ngày đặt
//         );
//         setOrders(sortedData);
//         setFilteredOrders(sortedData); // Hiển thị danh sách mặc định
//       } catch (error) {
//         console.error('Failed to fetch waiting orders:', error);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleAcceptOrder = async (orderId) => {
//     try {
//       await acceptOrder(orderId, shipperId);
//       setOrders(orders.filter(order => order.id !== orderId));
//       setFilteredOrders(filteredOrders.filter(order => order.id !== orderId)); // Cập nhật danh sách đã lọc
//       alert('Đã nhận đơn hàng!');
//     } catch (error) {
//       console.error('Failed to accept order:', error);
//     }
//   };

//   const handleSearch = () => {
//     let results = orders;

//     if (searchKeyword) {
//       results = results.filter(order =>
//         order.id.toString().includes(searchKeyword.trim())
//       );
//     }

//     if (searchDate) {
//       results = results.filter(order =>
//         new Date(order.orderDate).toLocaleDateString('vi-VN') ===
//         new Date(searchDate).toLocaleDateString('vi-VN')
//       );
//     }

//     if (searchCustomer) {
//       results = results.filter(order =>
//         order.user.fullname.toLowerCase().includes(searchCustomer.trim().toLowerCase())
//       );
//     }

//     setFilteredOrders(results);
//     setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
//   };

//   const resetSearch = () => {
//     setSearchKeyword('');
//     setSearchDate('');
//     setSearchCustomer('');
//     setFilteredOrders(orders);
//     setCurrentPage(1); // Reset về trang đầu tiên
//   };

//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
//   const currentOrders = filteredOrders.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="orders-page">
//       <h2>ĐƠN HÀNG ĐANG CHỜ</h2>

//       {/* Thanh tìm kiếm */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Tìm theo mã đơn hàng..."
//           value={searchKeyword}
//           onChange={(e) => setSearchKeyword(e.target.value)}
//         />
//         <input
//           type="date"
//           value={searchDate}
//           onChange={(e) => setSearchDate(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Tìm theo người đặt..."
//           value={searchCustomer}
//           onChange={(e) => setSearchCustomer(e.target.value)}
//         />
//         <button onClick={handleSearch}>Tìm kiếm</button>
//         <button onClick={resetSearch}>Đặt lại</button>
//       </div>

//       {currentOrders.length === 0 ? (
//         <p className="no-orders">Không có đơn hàng nào</p>
//       ) : (
//         <>
//           <table className="orders-table">
//             <thead>
//               <tr>
//                 <th>Mã đơn</th>
//                 <th>Ngày đặt</th>
//                 <th>Tổng tiền</th>
//                 <th>Người đặt</th>
//                 <th>Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentOrders.map(order => (
//                 <tr key={order.id}>
//                   <td><Link to={`/shipper/orders/${order.id}`}>{order.id}</Link></td>
//                   <td>{new Date(order.orderDate).toLocaleString()}</td>
//                   <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
//                   <td>{order.user.fullname}</td>
//                   <td>
//                     <button className="accept-button" onClick={() => handleAcceptOrder(order.id)}>
//                       <FaShippingFast /> Nhận giao hàng
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Phân trang */}
//           <div className="pagination">
//             {[...Array(totalPages)].map((_, index) => (
//               <button
//                 key={index}
//                 className={currentPage === index + 1 ? 'active' : ''}
//                 onClick={() => goToPage(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default WaitingOrders;

import React, { useEffect, useState, useCallback } from 'react';
import { getOrderByStatus, acceptOrder } from '../../../api';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaSearch, FaRedo, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './ShipperOrders.css';
import './WaitingOrders.css';

const WaitingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const shipperId = localStorage.getItem('userId') || 30;

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getOrderByStatus('PLACED');
      const sortedData = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      setOrders(sortedData);
      setFilteredOrders(sortedData);
    } catch (error) {
      console.error('Failed to fetch waiting orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleAcceptOrder = async (orderId) => {
    try {
      await acceptOrder(orderId, shipperId);
      setFilteredOrders((prev) => prev.filter((order) => order.id !== orderId));
      alert('Đã nhận đơn hàng!');
    } catch (error) {
      console.error('Failed to accept order:', error);
    }
  };

  const handleSearch = () => {
    let results = orders;

    if (searchKeyword) {
      results = results.filter((order) =>
        order.id.toString().includes(searchKeyword.trim())
      );
    }

    if (searchDate) {
      results = results.filter((order) =>
        new Date(order.orderDate).toLocaleDateString('vi-VN') ===
        new Date(searchDate).toLocaleDateString('vi-VN')
      );
    }

    if (searchCustomer) {
      results = results.filter((order) =>
        order.user.fullname.toLowerCase().includes(searchCustomer.trim().toLowerCase())
      );
    }

    setFilteredOrders(results);
    setCurrentPage(1);
  };

  const resetSearch = () => {
    setSearchKeyword('');
    setSearchDate('');
    setSearchCustomer('');
    setFilteredOrders(orders);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="orders-page">
      <h2>ĐƠN HÀNG ĐANG CHỜ</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm theo mã đơn hàng..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tìm theo người đặt..."
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FaSearch /> Tìm kiếm
        </button>
        <button onClick={resetSearch}>
          <FaRedo /> Đặt lại
        </button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : currentOrders.length === 0 ? (
        <p className="no-orders">Không có đơn hàng nào</p>
      ) : (
        <>
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
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link to={`/shipper/orders/${order.id}`}>{order.id}</Link>
                  </td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(order.total)}
                  </td>
                  <td>{order.user.fullname}</td>
                  <td>
                    <button
                      className="accept-button"
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      <FaShippingFast /> Nhận giao hàng
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              <FaArrowLeft />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WaitingOrders;
