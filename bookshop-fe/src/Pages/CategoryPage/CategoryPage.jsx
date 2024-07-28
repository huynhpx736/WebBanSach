import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './CategoryPage.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import BookCard from '../../Components/BookCard/BookCard';
import HomePanel from '../../Components/HomePanel/HomePanel';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const booksPerPage = 12;

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/category/${categoryId}`)
      .then(response => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch books.');
        setLoading(false);
      });
  }, [categoryId]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const displayBooks = books.slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header />
      <div className="main">
        <HomePanel />
      <div className="category-container">
      
        <h2 className='title-cate'>Danh sách sản phẩm theo thể loại</h2>
        <div className="books-grid">
          {displayBooks.length > 0 ? displayBooks.map(book => (
            <BookCard key={book.id} book={book} />
          )) : <p>Hiện không có sản phẩm</p>}
        </div>
        <ReactPaginate
          previousLabel={'Trước'}
          nextLabel={'Sau'}
          breakLabel={'...'}
          pageCount={Math.ceil(books.length / booksPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakLinkClassName={'page-link'}
          disabledClassName={'disabled'}
          breakClassName={'break'}
        />
      </div>
        </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
