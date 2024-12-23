import React, { useEffect, useState } from 'react';
import { getOrderByStatus, updateOrderStatus, cancelOrderByAdmin, updateAdminNoteOrder, sendMailSpring} from '../../../api';
import { Link } from 'react-router-dom';
import { MdCheckCircle, MdCancel, MdEmail } from 'react-icons/md';
import emailjs from 'emailjs-com';
import { message } from 'antd';
import './OrderManagement.css';

const FailedOrders = () => {
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
  const [showModal, setShowModal] = useState(false); // State để điều khiển việc hiển thị modal
  const [emailSubject, setEmailSubject] = useState('Thông báo về đơn hàng của bạn'); // Chủ đề email
  const [emailMessage, setEmailMessage] = useState('Đơn hàng của bạn sẽ hủy trong vòng 48h nếu không liên lạc'); // Tin nhắn email
  const [orderToSendEmail, setOrderToSendEmail] = useState(null); // Đơn hàng cần gửi email
  const [orderChangeNoteId, setOrderChangeNoteId] = useState(null); // Đơn hàng cần ghi chú
  const [adminNote, setAdminNote] = useState(''); // Ghi chú của admin
  const itemsPerPage = 10;

  const KeyMailJS = process.env.REACT_APP_MAILJS_PUBLIC_KEY;
  const KeyServiceMailJS = process.env.REACT_APP_MAILJS_SERVICE_ID;
  const KeyTemplateCancel = process.env.REACT_APP_MAILJS_TEMPLATE_CANCEL; 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderByStatus('FAILED');
        const sortedData = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(sortedData);
        setFilteredOrders(sortedData);
      } catch (error) {
        console.error('Failed to fetch placed orders:', error);
      }
    };
    fetchOrders();
    emailjs.init(KeyMailJS);
  }, []);

  const sendEmail = async (order) => {
    emailjs.send(KeyServiceMailJS, KeyTemplateCancel, {
      email_subject: emailSubject,
      reply_to: "xuanhuynh24@mc.com",
      to_email: order.user.email,
      to_name: order.user.fullname,
      order_id: order.id,
      order_date: new Date(order.orderDate).toLocaleString(),
      order_total: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total),
      message: emailMessage,
    })
    .then((result) => {
      console.log(result.text);
      alert(`Đã gửi email cho khách hàng: ${order.user.email}`);
      setShowModal(false); // Đóng modal sau khi gửi email thành công
    }, (error) => {
      console.error(error.text);
    });
  };

  const handleSendEmail = (order) => {
    // Mở modal để chỉnh sửa thông tin email trước khi gửi
    setOrderToSendEmail(order);
    setEmailSubject('Thông báo từ cửa hàng sách Bookshop');
    setEmailMessage('Chúng tôi đã cố gắng liên lạc với bạn nhưng không thành công.\nVui lòng kiểm tra lại thông tin đơn hàng và liên hệ với chúng tôi để được hỗ trợ. Nếu không, đơn hàng sẽ bị hủy sau 4 ngày.');
    setShowModal(true);
  };

  const handleConfirmSendEmail = () => {
    if (orderToSendEmail) {
      sendEmail(orderToSendEmail);
    }
  };

  
  const handleConfirmOrderAgain = async (orderId) => {
    if (!window.confirm('Xác nhận duyệt đơn hàng?')) {
      return;
    }
    try {
      await updateOrderStatus(orderId, 'SHIPPING');
      setOrders(orders.filter(order => order.id !== orderId));
      setFilteredOrders(filteredOrders.filter(order => order.id !== orderId));
      alert('Đã duyệt đơn hàng!');
    } catch (error) {
      console.error('Failed to confrim order:', error);
    }
  };
  //   const handleRescheduleDelivery = async (orderId) => {
  //   if (!window.confirm('Xác nhận giao lại đơn hàng?')) return;
  //   try {
  //     await updateOrderStatus(orderId, 'CONFIRMED');
  //     alert('Đã lên lịch giao lại đơn hàng!');
  //   } catch (error) {
  //     console.error('Failed to reschedule delivery:', error);
  //   }
  // };

  // const handleReturnDamagedGoods = async (orderId) => {
  //   if (!window.confirm('Xác nhận giao lại và thu hồi sách hư?')) return;
  //   try {
  //     await updateOrderStatus(orderId, 'RETURNED');
  //     alert('Đã xử lý sách hư và giao lại!');
  //   } catch (error) {
  //     console.error('Failed to handle damaged goods:', error);
  //   }
  // };


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

  const handleClickButtonUpdateNote = (orderId) => {
    setAdminNote(orders.find(order => order.id === orderId).note);
    setOrderChangeNoteId(orderId);
  };

    const handleUpdateNote = async () => {
      try {
        await updateAdminNoteOrder(orderChangeNoteId, adminNote);
        const updatedOrders = orders.map(order =>
          order.id === selectedOrderId ? { ...order, note } : order
        );
       
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        setOrderChangeNoteId(null);
      } catch (error) {
        console.error('Failed to update note:', error);
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
      await cancelOrderByAdmin(selectedOrderId, reasonToSend, note);
      setOrders(orders.filter(order => order.id !== selectedOrderId));
      setFilteredOrders(filteredOrders.filter(order => order.id !== selectedOrderId));
      alert('Đã huỷ đơn hàng!');
      setSelectedOrderId(null);
      setCancelledReason('');
      setCustomReason('');
      setNote('');
      await sendMailSpring(selectedOrderId,"CANCELLED");
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  return (
    <div className="orders-page">
      <h2>ĐƠN HÀNG GIAO THẤT BẠI</h2>

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
                <th>Lý do</th>
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
                  <td>{order.failureReason}</td>
                  <td>
                    {/* {order.failureReason === 'Không liên lạc được với người nhận' && ( */}
                      <button className="btn-email" onClick={() => handleSendEmail(order)}>
                        <MdEmail /> Email
                      </button>
                    {/* )} */}
                    <button className="btn-complete" onClick={() => handleConfirmOrderAgain(order.id)}>
                       <MdCheckCircle /> Giao lại
                   </button>
                    {/* {order.failureReason === 'Hoãn' && (
                      <button className="btn-reschedule" onClick={() => handleRescheduleDelivery(order.id)}>
                        <MdCheckCircle /> Duyệt lại
                      </button>
                    )} */}
                    {/* {order.failureReason === 'Hàng bị hỏng' && (
                      <button className="btn-return" onClick={() => handleReturnDamagedGoods(order.id)}>
                        <MdCheckCircle /> Thu hồi
                      </button>
                    )} */}
                    <button className="btn-failure" onClick={() => setSelectedOrderId(order.id)}>
                      <MdCancel /> Hủy
                    </button>
                   <span className="edit-note" onClick={() => handleClickButtonUpdateNote(order.id)}><i className="fa fa-edit"></i></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
          <h3>Hủy đơn hàng</h3>
          <label>
            Lý do hủy đơn:
            <select
              value={cancelledReason}
              onChange={(e) => setCancelledReason(e.target.value)}
            >
              <option value="">Chọn lý do</option>
              <option value="Không liên lạc được">Không liên lạc được</option>
              <option value="Hàng bị hỏng">Hàng bị hỏng</option>
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
          <textarea
            placeholder="Ghi chú thêm..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <div className="modal-buttons">
            <button onClick
            ={handleCancelOrder}>OK</button>
            <button onClick={() => setSelectedOrderId(null)}>Hủy</button>
          </div>
        </div>
      )}
      {orderChangeNoteId && (
  <div className="failed-orders-popup">
    <div className="failed-orders-popup-content">
      <span className="failed-orders-popup-close" onClick={() => setOrderChangeNoteId(null)}>&times;</span>
      {/* <span className="failed-orders-popup-close" >&times;</span> */}
      <h3 className="failed-orders-popup-title">Sửa ghi chú</h3>
      <textarea
        className="failed-orders-popup-textarea"
        value={adminNote}
        onChange={(e) => setAdminNote(e.target.value)}
        placeholder="Nhập ghi chú..."
      />
      <button className="failed-orders-popup-save-btn" onClick={handleUpdateNote}>Lưu</button>
      </div>
  </div>
)}      
  
      {showModal && orderToSendEmail && (
        <div className='failed-orders-popup'>
        <div className="email-modal">
          <h3>Gửi email cho khách hàng</h3>
          <div>
            <p><strong>Khách hàng:</strong> {orderToSendEmail.user.fullname}</p>
            <p><strong>Email:</strong> {orderToSendEmail.user.email}</p>
            <p><strong>Đơn hàng:</strong> {orderToSendEmail.id}</p>
            <p><strong>Thời gian đặt hàng:</strong> {new Date(orderToSendEmail.orderDate).toLocaleString()}</p>
            <p><strong>Giá trị đơn hàng:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderToSendEmail.total)}</p>
          </div>
          <div>
            <label>
              Chủ đề:
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Tin nhắn:
              <textarea
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
              />
            </label>
          </div>
          <div>
            <button onClick={handleConfirmSendEmail}>Gửi email</button>
            <button onClick={() => setShowModal(false)}>Đóng</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default FailedOrders;
