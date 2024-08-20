import React from 'react';
import { Link } from 'react-router-dom';
import '../CartItem/CartItem.css';
//dinh dang gia tien
const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

// const CartItem = ({ item }) => {
const OrderItem = ({ item }) => {
  return (
    <div className="cart-item">
      <Link to={`/product/${item.productId}`} className="cart-item-link">
        <img src={item.image} alt={item.productName} className="cart-item-image" />
      </Link>
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.productName}</h4>
        <p className="cart-item-price">{formatter.format(item.price)}</p>
      </div>
        <div className="cart-item-quantity">
            <p>&emsp; &emsp;{item.quantity} </p>
        </div>
      
      <p className="cart-item-total">{formatter.format(item.price * item.quantity)}</p>
   
      {/* <div className='cart-item-weight'>
        <p>{item.weight*item.quantity} g</p>

        </div> */}

    </div>
  );
};

// export default CartItem;
export default OrderItem;
