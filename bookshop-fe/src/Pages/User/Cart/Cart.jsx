import React, { useState, useEffect } from 'react';
import CartItem from '../../../Components/CartItem/CartItem';
import Footer from '../../../Components/Footer/Footer';
import Header from '../../../Components/Header/Header';
// import {emptyCartImg} from  ;
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
    //chỉ cho tăng số lượng tới mức tồn kho, khi tới mức tồn kho thông báo, và nếu số lượng = 0 thì xóa sản phẩm khỏi giỏ hàng, trước khi xóa cần xác nhận
    if (newQuantity <= 0) {
      handleRemove(id);
    } else {
      try {
        const item = cartItems.find(item => item.id === id);
        if (newQuantity > item.stock) {
          alert('Số lượng sản phẩm đạt giới hạn hiện có');
          return;
        }
        await updateCartItemQuantity(id, newQuantity);
        const updatedItems = cartItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        calculateTotalPrice(updatedItems);
      }
      catch (error) {
        console.error('Error updating quantity:', error);
      }
       
      // try {
      //   await updateCartItemQuantity(id, newQuantity);
      //   const updatedItems = cartItems.map(item =>
      //     item.id === id ? { ...item, quantity: newQuantity } : item
      //   );
      //   setCartItems(updatedItems);
      //   calculateTotalPrice(updatedItems);
      // } catch (error) {
      //   console.error('Error updating quantity:', error);
      // }
    }


            
  };
  const handleCheckout = async () => {
    //tới link tạo đơn hàng là /createOrder
    window.location.href = '/createOrder';

  }
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
      <div className='main-cart'>
      <div className="cart">
       
        {cartItems.length === 0 ? (
       
          <div className="empty-cart">
            <img src="/empty-cart.png" alt="Empty cart" />
            <p>Giỏ hàng trống</p>
          </div>

        ) : (
          
          <div>
          <h2>Giỏ hàng</h2>
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
              <button className="checkout-button" onClick={handleCheckout}>Tạo đơn hàng</button>
            </div>
          </div>
        )}
      </div>
      </div>
      <Footer />
    
    </div>
  );
};

export default Cart;
