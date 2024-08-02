// // src/components/CartItem.js
// import { Checkbox } from '@mui/material';
// import React from 'react';
// import { Link } from 'react-router-dom';

// //dinh dang gia tien

// const formatter = new Intl.NumberFormat('vi-VN', {
//   style: 'currency',
//   currency: 'VND',
// });
// const CartItem = ({ item, onQuantityChange, onRemove }) => {
//   return (
//     <div className="cart-item">
//     <Link to={`/product/${item.productId}`} className="cart-item-link">
//       <img src={item.image} alt={item.productName} className="cart-item-image" />
//       </Link>
//       <div className="cart-item-details">
//         <h4 className="cart-item-name">{item.productName}</h4>
//         <p className="cart-item-price">{formatter.format(item.price)}</p>
//         {/* <p className="cart-item-price">{item.price}d</p> */}
        
//       </div>
//       <div className="cart-item-quantity">
//           <button onClick={() => onQuantityChange(item.productId, item.quantity - 1)}>-</button>
//           <span>{item.quantity}</span>
//           <button onClick={() => onQuantityChange(item.productId, item.quantity + 1)}>+</button>
//         </div>
//       <p className="cart-item-total">{formatter.format(item.price * item.quantity)}</p>
//         <button className="cart-item-remove" onClick={() => onRemove(item.productId)}>Xóa</button>
//     <Checkbox />
//     </div>
//   );
// };

// export default CartItem;


import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './CartItem.css';
//dinh dang gia tien
const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="cart-item">
      <Link to={`/product/${item.orderId}`} className="cart-item-link">
        <img src={item.image} alt={item.productName} className="cart-item-image" />
      </Link>
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.productName}</h4>
        <p className="cart-item-price">{formatter.format(item.price)}</p>
      </div>
      <div className="cart-item-quantity">
        <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
      </div>
      <p className="cart-item-total">{formatter.format(item.price * item.quantity)}</p>
      <button className="cart-item-remove" onClick={() => onRemove(item.id)}>
       <span></span> <DeleteIcon />
      </button>
      {/* <Checkbox /> */}
    </div>
  );
};

export default CartItem;
