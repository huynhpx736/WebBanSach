import React, { useEffect, useState } from 'react';
// import { fetchOrdersByShipperAndStatus, updateOrderStatus, reportFailedDelivery } from '../../../api';
import { getOrderByStatus, updateOrderStatus, cancelOrderByAdmin, sendMailSpring } from '../../../api';

import { Link } from 'react-router-dom';
import { MdCheckCircle, MdCancel } from 'react-icons/md'; 
const PlacedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelledReason, setCancelledReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const itemsPerPage = 10;

  const reasons = [
    'Không chuẩn bị được hàng',
    'Địa chỉ hiện không thể giao hàng'
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderByStatus('PLACED');
        const sortedData = data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate) // Sắp xếp đơn hàng mới nhất lên trước
        );
        setOrders(sortedData);
        setFilteredOrders(sortedData);
      } catch (error) {
        console.error('Failed to fetch placed orders:', error);
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
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  const resetSearch = () => {
    setSearchKeyword('');
    setSearchDate('');
    setSearchCustomer('');
    setFilteredOrders(orders);
    setCurrentPage(1); // Reset về trang đầu tiên
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleConfirmOrder = async (orderId) => {
    if (!window.confirm('Xác nhận duyệt đơn hàng?')) {
      return;
    }
    try {
      await updateOrderStatus(orderId, 'CONFIRMED');
      setOrders(orders.filter(order => order.id !== orderId));
      setFilteredOrders(filteredOrders.filter(order => order.id !== orderId));
      window.alert('Đã duyệt đơn hàng');
      // Gửi email thông báo
      // await sendMailSpring(orderId, 'CONFIRMED');
      // console.log('Email sent successfully.');     
    } catch (error) {
      console.error('Failed to confrim order:', error);
    }
  };
 

  const handleCancelOrder = async () => {
    if (!cancelledReason || (cancelledReason === 'Khác' && !customReason)) {
      setError('Vui lòng chọn lý do hủy đơn!');
      return;
    }
    setError('');
    const reasonToSend = cancelledReason === 'Khác' ? customReason : cancelledReason;

    try {
      // await reportFailedDelivery(selectedOrderId, reasonToSend, note || null);
      await cancelOrderByAdmin(selectedOrderId, reasonToSend, note);
      setOrders(orders.filter(order => order.id !== selectedOrderId));
      setFilteredOrders(filteredOrders.filter(order => order.id !== selectedOrderId));
      alert('Đã huỷ đơn hàng và gửi email thông báo cho khách hàng!');
      setSelectedOrderId(null);
      setCancelledReason('');
      setCustomReason('');
      setNote('');
      await sendMailSpring(selectedOrderId, 'CANCELLED');
      console.log('Email sent successfully.');

    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  return (
    <div className="orders-page">
      <h2>ĐƠN HÀNG ĐANG CHỜ</h2>

      {/* Thanh tìm kiếm */}
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
                  <td>
                    <button className="btn-complete" onClick={() => handleConfirmOrder(order.id)}>
                      <MdCheckCircle /> Duyệt
                    </button>
                    <button className="btn-failure" onClick={() => setSelectedOrderId(order.id)}>
                      <MdCancel /> Hủy
                    </button>
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

      {selectedOrderId && (
        <div className="failure-modal">
          {/* <h3>Hủy đơn hàng: {selectedOrderId}</h3> */}
          <h3>Hủy đơn hàng </h3>
          <label>
            Lý do hủy đơn:
            <select
              value={cancelledReason}
              onChange={(e) => setCancelledReason(e.target.value)}
            >
              <option value="">Chọn lý do</option>
              {reasons.map((reason, index) => (
                <option key={index} value={reason}>{reason}</option>
              ))}
              <option value="Khác">Khác</option>
            </select>
          </label>
          {cancelledReason === 'Khác' && (
            <textarea
              placeholder="Nhập lý do khác..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />
          )}
          {/* <textarea
            placeholder="Ghi chú thêm..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          /> */}
          {error && <p className="error-message">{error}</p>}
          <div className="modal-buttons">
            <button onClick={handleCancelOrder}>OK</button>
            <button onClick={() => setSelectedOrderId(null)}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacedOrders;
