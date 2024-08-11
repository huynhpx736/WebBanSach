import React, { useEffect, useState } from 'react';
import { fetchNewestProducts, fetchAllProducts } from '../../api';
import ReactPaginate from 'react-paginate';
import './Home.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import HomePanel from '../../Components/HomePanel/HomePanel';
import BookCard from '../../Components/BookCard/BookCard';
import SliderBanner from '../../Components/SliderBanner/SliderBanner';

const Home = () => {
  // const [User, setUser] = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
  // const user = JSON.parse(localStorage.getItem('user'));
  const [allBooks, setAllBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [bestSellerBooks, setBestSellerBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const booksPerPage = 8;

  useEffect(() => {
    // Fetch new products
    fetchNewestProducts()
      .then(data => {
        // setNewBooks(data);
        setNewBooks(data.slice(0, 4)); // Initialize new books for the first page
        setBestSellerBooks(data.slice(4, 8)); // Initialize best seller books for the first page
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });

    // Fetch all books
    fetchAllProducts()
      .then(data => {
        setAllBooks(data);
        setBooks(data.slice(0, booksPerPage)); // Initialize books for the first page
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allBooks.length > 0) {
      // Calculate the range of books to display for the current page
      const startIndex = currentPage * booksPerPage;
      const endIndex = startIndex + booksPerPage;
      setBooks(allBooks.slice(startIndex, endIndex));
    }
  }, [currentPage, allBooks]);

  const handlePageClick = (data) => {
    let selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header />
      <SliderBanner />
      <div className="home-container">
        {/* <HomePanel /> */}
        <div className="main-content">
          <div className="new-product">
            <h2>Sản phẩm mới</h2>
            <div className="books-grid">
              {books.length > 0 ? newBooks.map(book => (
                <BookCard key={book.id} book={book} />
              )) : <p>Hiện không có sản phẩm nào</p>}
            </div>
          </div>

          <div className='best-seller'>
            <h2>Sản phẩm bán chạy</h2>
            <div className="books-grid">
              {books.length > 0 ? bestSellerBooks.map(book => (
                <BookCard key={book.id} book={book} />
              )) : <p>Hiện không có sản phẩm nào</p>}
            </div>
          </div>

          <h2>Tất cả sản phẩm</h2>
          <div className="books-grid">
            {books.length > 0 ? books.map(book => (
              <BookCard key={book.id} book={book} />
            )) : <p>Hiện không có sản phẩm nào</p>}
          </div>
          {allBooks.length > 0 && (
            <ReactPaginate
              previousLabel={'Trước'}
              nextLabel={'Sau'}
              breakLabel={'...'}
              pageCount={Math.ceil(allBooks.length / booksPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
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
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
