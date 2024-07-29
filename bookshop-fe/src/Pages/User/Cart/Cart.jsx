// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import CartItem from '../../../Components/CartItem/CartItem';
import axios from 'axios';
import Footer from '../../../Components/Footer/Footer';
import Header from '../../../Components/Header/Header';
import './Cart.css';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
// const { userId } = useContext(AuthContext);
  const UserId = localStorage.getItem('userId');
  const [User, setUser] = useState([]);
  useEffect(() => {
    // Fetch cart items from API
    axios.get('http://localhost:8080/api/orderdetails/get-cart-items/' + UserId)
      .then(response => {
        setCartItems(response.data.data);
        calculateTotalPrice(response.data);
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

//   const handleQuantityChange = (productId, newQuantity) => {
//     if (newQuantity <= 0) {
//       handleRemove(productId);
//     } else {
//       // Update quantity in the API
//       axios.patch(`http://localhost:8080/api/orderdetails/cart/${productId}`, { quantity: newQuantity })
//         .then(response => {
//           const updatedItems = cartItems.map(item =>
//             item.productId === productId ? { ...item, quantity: newQuantity } : item
//           );
//           setCartItems(updatedItems);
//           calculateTotalPrice(updatedItems);
//         })
//         .catch(error => console.error('Error updating quantity:', error));
//     }
//   };

  const handleRemove = (productId) => {
    axios.delete(`http://localhost:8080/api/orderdetails/cart/${productId}`)
      .then(response => {
        const updatedItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedItems);
        calculateTotalPrice(updatedItems);
      })
      .catch(error => console.error('Error removing item:', error));
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
          {cartItems.map(item => (
            <CartItem
              key={item.productId}
              item={item}
            //   onQuantityChange={handleQuantityChange}
            //   onRemove={handleRemove}
            />
          ))}
          <div className="cart-total">
            <h3>Tổng: {totalPrice.toFixed(2)} đ</h3>
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
