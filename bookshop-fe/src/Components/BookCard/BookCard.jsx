import React from 'react';
import { Link } from 'react-router-dom';
import Cover from '../../images/biasach.jpg';
import './BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img src={Cover} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.price} đồng</p>
      <Link to={`/product/${book.id}`}>Xem chi tiết</Link>
    </div>
  );
};

export default BookCard;
