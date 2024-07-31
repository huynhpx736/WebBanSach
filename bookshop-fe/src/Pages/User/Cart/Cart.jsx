// // src/components/Cart.js
// import React, { useState, useEffect } from 'react';
// import CartItem from '../../../Components/CartItem/CartItem';
// import axios from 'axios';
// import Footer from '../../../Components/Footer/Footer';
// import Header from '../../../Components/Header/Header';
// import './Cart.css';
// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
// // const { userId } = useContext(AuthContext);
//   const UserId = localStorage.getItem('userId');
//   const [User, setUser] = useState([]);
//   useEffect(() => {
//     // Fetch cart items from API
//     axios.get('http://localhost:8080/api/orderdetails/get-cart-items/' + UserId)
//       .then(response => {
//         setCartItems(response.data.data);
//         calculateTotalPrice(response.data.data);
//       })
//       .catch(error => console.error('Error fetching cart items:', error));
//   }, []);

//   const calculateTotalPrice = (items) => {
//     const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   };

 
//   const handleQuantityChange = (id, newQuantity) => {
//     if (newQuantity <= 0) {
//       handleRemove(id);
//     } else {
//       // Update quantity in the API
//       axios.put(`http://localhost:8080/api/orderdetails/update-quantity?idDetailOrder=${id}&newQuantity=${newQuantity}`)
//         .then(response => {
//           const updatedItems = cartItems.map(item =>
//             item.id === id ? { ...item, quantity: newQuantity } : item
//           );
//           setCartItems(updatedItems);
//           calculateTotalPrice(updatedItems);
//         })
//         .catch(error => console.error('Error updating quantity:', error));
//     }
//   };

//   const handleRemove = (id) => {
//     //Hiện thông báo hỏi người dùng có chắc chắn muốn xóa hay không
//     if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
//       return;
//     }

//     axios.delete(`http://localhost:8080/api/orderdetails/delete/${id}`)
//       .then(response => {
//         const updatedItems = cartItems.filter(item => item.id !== id);
//         setCartItems(updatedItems);
//         calculateTotalPrice(updatedItems);
//       })
//       .catch(error => console.error('Error removing item:', error));
//   };

//   return (
//     <div>
//     <Header />

//     <div className="cart">
//       <h2>Giỏ hàng</h2>
//       {cartItems.length === 0 ? (
//         <p>Trống.</p>
//       ) : (
//         <div>
//         <div className="cart-header">
//               <span>Sản phẩm</span>
//              <span>Đơn giá</span>
//              <span></span>
//               <span></span>
//               <span>Số lượng</span>
//              <span></span>
//              <span>{'Thành tiền  '}</span>
//              {/* <span></span> */}
//        </div>
//         <div className='item-cart-andCb'>
//           {cartItems.map(item => (
//             <CartItem
//               key={item.id}
//               item={item}
//               onQuantityChange={handleQuantityChange}
//               onRemove={handleRemove}
//             />
//           ))}
          
//           </div>
//           <div className="cart-total">
//             {/* <h3>Tổng: {totalPrice.toFixed(2)} đ</h3> */}
//             <h3>Tổng: {totalPrice} đ</h3>
//             <button className="checkout-button">Tạo đơn hàng</button>
//           </div>
//         </div>
//       )}
//       </div>
//       <Footer />

//     </div>

//   );
// };

// export default Cart;

// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import CartItem from '../../../Components/CartItem/CartItem';
import Footer from '../../../Components/Footer/Footer';
import Header from '../../../Components/Header/Header';
import { fetchCartItems, updateCartItemQuantity, removeProductFromCart } from '../../../api'; // Import API functions
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const UserId = localStorage.getItem('userId');

  const formatPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });


  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const items = await fetchCartItems(UserId);
        setCartItems(items);
        calculateTotalPrice(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    loadCartItems();
  }, [UserId]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemove(id);
    } else {
      try {
        await updateCartItemQuantity(id, newQuantity);
        const updatedItems = cartItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        calculateTotalPrice(updatedItems);
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      return;
    }

    try {
      await removeProductFromCart(id);
      const updatedItems = cartItems.filter(item => item.id !== id);
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="cart">
        <h2>Giỏ hàng</h2>
        {cartItems.length === 0 ? (
          <p>Trống.</p>
        ) : (
          <div>
            <div className="cart-header">
              <span>Sản phẩm</span>
              <span>Đơn giá</span>
              <span></span>
              <span></span>
              <span>Số lượng</span>
              <span></span>
              <span>Thành tiền&emsp;&nbsp;</span>
            </div>
            <div className="item-cart-andCb">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>
            <div className="cart-total">
              {/* <h3>Tổng: {totalPrice} đ</h3>
               */}
              <h3>Tổng: {formatPrice.format(totalPrice)}</h3>
              <button className="checkout-button">Tạo đơn hàng</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
