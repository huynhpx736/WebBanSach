import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
  // Định dạng giá tiền
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} />
      <div className="book-details">
        <h3>{book.title}</h3>
        <p>{formatPrice(book.price)}</p>
        <Link to={`/product/${book.id}`}>Xem chi tiết</Link>
      </div>
    </div>
  );
};

export default BookCard;
