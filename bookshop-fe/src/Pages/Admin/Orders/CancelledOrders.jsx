import React, { useEffect, useState } from 'react';
import { getOrderByStatus, updateOrderStatus, reportFailedDelivery } from '../../../api';
import { Link } from 'react-router-dom';
const CancelledOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [failureReason, setFailureReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderByStatus('CANCELLED');
        const sortedData = data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate) 
        );
        setOrders(sortedData);
        setFilteredOrders(sortedData);
      } catch (error) {
        console.error('Failed to fetch accepted orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleSearch = () => {
    let results = orders;

    if (searchKeyword) {
      results = results.filter(order =>
        order.id.toString().includes(searchKeyword.trim())
      );
    }

    if (searchDate) {
      results = results.filter(order =>
        new Date(order.orderDate).toLocaleDateString('vi-VN') ===
        new Date(searchDate).toLocaleDateString('vi-VN')
      );
    }

    if (searchCustomer) {
      results = results.filter(order =>
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
    setCurrentPage(page);
  };

  const handleCompleteOrder = async (orderId) => {
    if (!window.confirm('Xác nhận giao hàng thành công?')) {
      return;
    }
    try {
      await updateOrderStatus(orderId, 'COMPLETED');
      setOrders(orders.filter(order => order.id !== orderId));
      setFilteredOrders(filteredOrders.filter(order => order.id !== orderId));
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
      setFilteredOrders(filteredOrders.filter(order => order.id !== selectedOrderId));
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
      <h2>ĐƠN HÀNG ĐÃ HỦY</h2>

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
        <button onClick={handleSearch}>Tìm kiếm</button>
        <button onClick={resetSearch}>Đặt lại</button>
      </div>

      {currentOrders.length === 0 ? (
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
              {currentOrders.map(order => (
                <tr key={order.id}>
                  <td>
                    <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
                  </td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                  <td>{order.user.fullname}</td>
                  {/* <td>{order.shipper ? order.shipper.fullname : 'Chưa phân công'}</td> */}
                  <td>
                    <button className="btn-view-detail" onClick={() => window.open(`/admin/orders/${order.id}`)}>Xem chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

     
    </div>
  );
};

export default CancelledOrders;
