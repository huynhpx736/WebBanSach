// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getOrderById } from '../../../api';
// import './OrderDetail.css';
// import Header from '../../../Components/Header/Header';
// import Footer from '../../../Components/Footer/Footer';


// const OrderDetail = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const orderData = await getOrderById(orderId);
//         setOrder(orderData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   if (!order) {
//     return <div>Loading...</div>;
//   }

//   const { user, total, shippingFee, discount, receiverName, receiverPhone, receiverAddress, orderDate, status } = order;
//   const formatter = new Intl.NumberFormat('vi-VN', {
//     style: 'currency',
//     currency: 'VND',
//   });

//   return (
//     <div>
//       <Header />
//       <div className="order-detail">
//         <h2>Chi tiết đơn hàng</h2>

//         <div className="order-info">
//           <p><strong>ID Đơn hàng:</strong> {order.id}</p>
//           <p><strong>Người đặt:</strong> {user.fullname}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Số điện thoại người nhận:</strong> {receiverPhone}</p>
//           <p><strong>Địa chỉ người nhận:</strong> {receiverAddress}</p>
//           <p><strong>Tên người nhận:</strong> {receiverName}</p>
//           <p><strong>Ngày đặt hàng:</strong> {new Date(orderDate).toLocaleString()}</p>
//           <p><strong>Trạng thái:</strong> {status}</p>
//         </div>
//         <div className="order-summary">
//           <p><strong>Tổng tiền sản phẩm:</strong> {formatter.format(total)}</p>
//           <p><strong>Phí vận chuyển:</strong> {formatter.format(shippingFee)}</p>
//           <p><strong>Giảm giá:</strong> {formatter.format(discount)}</p>
//           <h3><strong>Tổng thanh toán:</strong> {formatter.format(total + shippingFee - discount)}</h3>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default OrderDetail;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getOrderById, getOrderItemsByOrderId } from '../../../api';
// import './OrderDetail.css';
// import Header from '../../../Components/Header/Header';
// import Footer from '../../../Components/Footer/Footer';
// import OrderItem from '../../../Components/OrderItem/OrderItem';

// const OrderDetail = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [orderItems, setOrderItems] = useState([]);
// //   const {UserLogin} = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {UserLogin: null};
//     const UserLogin = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const orderData = await getOrderById(orderId);
//         setOrder(orderData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     const fetchOrderItems = async () => {
//       try {
//         const orderItemsData = await getOrderItemsByOrderId(orderId);
//         setOrderItems(orderItemsData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchOrder();
//     fetchOrderItems();
//   }, [orderId]);

//   if (!order) {
//     return <div>Loading...</div>;
//   }

//   const { user, total, shippingFee, discount, receiverName, receiverPhone, receiverAddress, orderDate, status } = order;
//   const formatter = new Intl.NumberFormat('vi-VN', {
//     style: 'currency',
//     currency: 'VND',
//   });

//   return (
//     <div>
//       <Header />
//       <div className="order-detail">
//         <h2>Chi tiết đơn hàng</h2>

//         <div className="order-info">
//           <p><strong>Mã:</strong> {order.id}</p>
//           <p><strong>Người đặt:</strong> {user.fullname}</p>
//           {/* <p><strong>Email:</strong> {user.email}</p> */}
//           <p><strong>Số điện thoại người nhận:</strong> {receiverPhone}</p>
//           <p><strong>Địa chỉ người nhận:</strong> {receiverAddress}</p>
//           <p><strong>Tên người nhận:</strong> {receiverName}</p>
//           <p><strong>Ngày đặt hàng:</strong> {new Date(orderDate).toLocaleString()}</p>
//           {/* <p><strong>Trạng thái:</strong> {status}</p>
//            */}
//            {/* //nếu trạng thái là "PLACED" thì hiển thị "Đã đặt hàng", nếu trạng thái là "SHIPPING" thì hiển thị "Đang giao", nếu trạng thái là "COMPLETED" thì hiển thị "Đã nhận", nếu trạng thái là "CANCELLED" thì hiển thị "Đã hủy" */}
//             <p><strong>Trạng thái:</strong> {status === 'PLACED' ? 'Đã đặt hàng' : status === 'SHIPPING' ? 'Đang giao' : status === 'COMPLETED' ? 'Đã nhận' : 'Đã hủy'}</p>

//         </div>

//         <div className="cart">
//           <h2>Sản phẩm trong đơn hàng</h2>
//           {orderItems.length === 0 ? (
//             <p>Trống.</p>
//           ) : (
//             <div>
//               <div className="cart-header">
//                 <span>Sản phẩm</span>
//                 <span>Đơn giá</span>
//                 <span>Số lượng</span>
//                 <span>Thành tiền</span>
//               </div>
//               <div className="item-cart-andCb">
//                 {orderItems.map(item => (
//                   <OrderItem
//                     key={item.productId}
//                     item={item}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="order-summary">
//           <p><strong>Tổng tiền sản phẩm:</strong> {formatter.format(total)}</p>
//           <p><strong>Phí vận chuyển:</strong> {formatter.format(shippingFee)}</p>
//           <p><strong>Giảm giá:</strong> {formatter.format(discount)}</p>
//           <h3><strong>Tổng thanh toán:</strong> {formatter.format(total + shippingFee - discount)}</h3>
//         </div>
//       </div>
//       {/* nếu đơn hàng có trạng thái "PLACED" và người dùng có role là 1 thì hiển thị nút "Hủy đơn hàng" */}
//         {status === 'PLACED' && UserLogin.role === 1 && (
//             <button className="cancel-button">Hủy đơn hàng</button>
//         )}
        
//       <Footer />
//     </div>
//   );
// };

// export default OrderDetail;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, getOrderItemsByOrderId, updateOrderStatus } from '../../../api';
import './OrderDetail.css';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import OrderItem from '../../../Components/OrderItem/OrderItem';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOrderItems = async () => {
      try {
        const orderItemsData = await getOrderItemsByOrderId(orderId);
        setOrderItems(orderItemsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
    fetchOrderItems();
  }, [orderId]);

  const handleCancelOrder = async () => {
    //Hỏi người dùng có chắc chắn muốn hủy đơn hàng không
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      return;
    }
    try {
      await updateOrderStatus(orderId, 'CANCELLED');
      // Cập nhật trạng thái đơn hàng sau khi hủy thành công
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: 'CANCELLED',
      }));
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  const { user, total, shippingFee, discount, receiverName, receiverPhone, receiverAddress, orderDate, status } = order;
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div>
      <Header />
      <div className="order-detail">
        <h2>Chi tiết đơn hàng</h2>

        <div className="order-info">
          <p><strong>Mã:</strong> {order.id}</p>
          <p><strong>Người đặt:</strong> {user.fullname}</p>
          {/* <p><strong>Email:</strong> {user.email}</p> */}
          <p><strong>Số điện thoại người nhận:</strong> {receiverPhone}</p>
          <p><strong>Địa chỉ người nhận:</strong> {receiverAddress}</p>
          <p><strong>Tên người nhận:</strong> {receiverName}</p>
          <p><strong>Ngày đặt hàng:</strong> {new Date(orderDate).toLocaleString()}</p>
          <p><strong>Trạng thái:</strong> {status === 'PLACED' ? 'Đã đặt hàng' : status === 'SHIPPING' ? 'Đang giao' : status === 'COMPLETED' ? 'Đã nhận' : 'Đã hủy'}</p>
        </div>

        <div className="cart">
          <h2>Sản phẩm trong đơn hàng</h2>
          {orderItems.length === 0 ? (
            <p>Trống.</p>
          ) : (
            <div>
              <div className="cart-header">
                <span>Sản phẩm</span>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
              </div>
              <div className="item-cart-andCb">
                {orderItems.map(item => (
                  <OrderItem
                    key={item.productId}
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="order-summary">
          <p><strong>Tổng tiền sản phẩm:</strong> {formatter.format(total-shippingFee-discount)}</p>
          <p><strong>Phí vận chuyển:</strong> {formatter.format(shippingFee)}</p>
          <p><strong>Giảm giá:</strong> {formatter.format(discount)}</p>
          <h3><strong>Tổng thanh toán:</strong> {formatter.format(total)}</h3>
        </div>
      </div>
      {status === 'PLACED' && (
        <div className="cancel-order">
          <button onClick={handleCancelOrder}>Hủy đơn hàng</button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default OrderDetail;
