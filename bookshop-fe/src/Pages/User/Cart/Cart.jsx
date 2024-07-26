import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const Cart = () => {
  const { cart, setCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart', { params: { userId: 1 } }); // Thay userId bằng giá trị thực tế
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart', error);
      }
    };
    fetchCart();
  }, [setCart]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.map(item => (
        <div key={item.id}>
          <h3>{item.product.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
