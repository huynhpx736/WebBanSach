// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import ReactPaginate from 'react-paginate';
// import './Home.css';
// import Header from '../../Components/Header/Header';
// import Footer from '../../Components/Footer/Footer';
// import Cover from '../../images/biasach.jpg';

// const Home = () => {
//   const [categories, setCategories] = useState([]);
//   const [allBooks, setAllBooks] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const booksPerPage = 12;

//   useEffect(() => {
//     // Fetch categories
//     axios.get('http://localhost:8080/api/categories/get-all')
//       .then(response => {
//         setCategories(response.data.data);
//       })
//       .catch(err => {
//         setError('Failed to fetch categories.');
//       });

//     // Fetch all books
//     axios.get('http://localhost:8080/api/products/get-all')
//       .then(response => {
//         setAllBooks(response.data.data);
//         setBooks(response.data.data.slice(0, booksPerPage)); // Initialize books for the first page
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to fetch books.');
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (allBooks.length > 0) {
//       // Calculate the range of books to display for the current page
//       const startIndex = currentPage * booksPerPage;
//       const endIndex = startIndex + booksPerPage;
//       setBooks(allBooks.slice(startIndex, endIndex));
//     }
//   }, [currentPage, allBooks]);

//   const handlePageClick = (data) => {
//     let selectedPage = data.selected;
//     setCurrentPage(selectedPage);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//     <Header />
//     <div className="home-container">
//       <div className="side-panel">
//         <h2>Thể loại</h2>
//         <ul>
//           {categories.length > 0 ? categories.map(category => (
//             <li key={category.id}>
//               <Link to={`/category/${category.id}`}>{category.name}</Link>
//             </li>
//           )) : <p>No categories available</p>}
//         </ul>
//       </div>

//       <div className="main-content">
//         <div className="books-grid">
//           {books.length > 0 ? books.map(book => (
//             <div key={book.id} className="book-card">
//               {/* <img src={book.image || 'default-image.jpg'} alt={book.title} /> */}
//               <img src={Cover} alt={book.title} />
//               <h3>{book.title}</h3>
//               <p>{book.price} đồng</p>
//               <Link to={`/product/${book.id}`}>Xem chi tiết</Link>
//             </div>
//           )) : <p>Hiện không có sản phẩm nào</p>}
//         </div>

//         {allBooks.length > 0 && (
//           <ReactPaginate
//             previousLabel={'Previous'}
//             nextLabel={'Next'}
//             breakLabel={'...'}
//             pageCount={Math.ceil(allBooks.length / booksPerPage)}
//             marginPagesDisplayed={2}
//             pageRangeDisplayed={5}
//             onPageChange={handlePageClick}
//             containerClassName={'pagination'}
//             activeClassName={'active'}
//           />
//         )}
//       </div>
//     </div>
//     <Footer />
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import ReactPaginate from 'react-paginate';
// import './Home.css';
// import Header from '../../Components/Header/Header';
// import Footer from '../../Components/Footer/Footer';
// import HomePanel from '../../Components/HomePanel/HomePanel';
// import Cover from '../../images/biasach.jpg';

// const Home = () => {
//   const [allBooks, setAllBooks] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const booksPerPage = 12;

//   useEffect(() => {
//     // Fetch all books
//     axios.get('http://localhost:8080/api/products/get-all')
//       .then(response => {
//         setAllBooks(response.data.data);
//         setBooks(response.data.data.slice(0, booksPerPage)); // Initialize books for the first page
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to fetch books.');
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (allBooks.length > 0) {
//       // Calculate the range of books to display for the current page
//       const startIndex = currentPage * booksPerPage;
//       const endIndex = startIndex + booksPerPage;
//       setBooks(allBooks.slice(startIndex, endIndex));
//     }
//   }, [currentPage, allBooks]);

//   const handlePageClick = (data) => {
//     let selectedPage = data.selected;
//     setCurrentPage(selectedPage);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <Header />
//       <div className="home-container">
//         <HomePanel />

//         <div className="main-content">
//           <div className="books-grid">
//             {books.length > 0 ? books.map(book => (
//               <div key={book.id} className="book-card">
//                 {/* <img src={book.image || 'default-image.jpg'} alt={book.title} /> */}
//                 <img src={Cover} alt={book.title} />
//                 <h3>{book.title}</h3>
//                 <p>{book.price} đồng</p>
//                 <Link to={`/product/${book.id}`}>Xem chi tiết</Link>
//               </div>
//             )) : <p>Hiện không có sản phẩm nào</p>}
//           </div>

//           {allBooks.length > 0 && (
//             <ReactPaginate
//               previousLabel={'Previous'}
//               nextLabel={'Next'}
//               breakLabel={'...'}
//               pageCount={Math.ceil(allBooks.length / booksPerPage)}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={handlePageClick}
//               containerClassName={'pagination'}
//               activeClassName={'active'}
//             />
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Home;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ReactPaginate from 'react-paginate';
// import './Home.css';
// import Header from '../../Components/Header/Header';
// import Footer from '../../Components/Footer/Footer';
// import HomePanel from '../../Components/HomePanel/HomePanel';
// import BookCard from '../../Components/BookCard/BookCard';

// const Home = () => {
//   const [allBooks, setAllBooks] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const booksPerPage = 12;

//   useEffect(() => {
//     // Fetch all books
//     axios.get('http://localhost:8080/api/products/get-all')
//       .then(response => {
//         setAllBooks(response.data.data);
//         setBooks(response.data.data.slice(0, booksPerPage)); // Initialize books for the first page
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to fetch books.');
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (allBooks.length > 0) {
//       // Calculate the range of books to display for the current page
//       const startIndex = currentPage * booksPerPage;
//       const endIndex = startIndex + booksPerPage;
//       setBooks(allBooks.slice(startIndex, endIndex));
//     }
//   }, [currentPage, allBooks]);

//   const handlePageClick = (data) => {
//     let selectedPage = data.selected;
//     setCurrentPage(selectedPage);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <Header />
//       <div className="home-container">
//         <HomePanel />

//         <div className="main-content">
//           <div className="books-grid">
//             {books.length > 0 ? books.map(book => (
//               <BookCard key={book.id} book={book} />
//             )) : <p>Hiện không có sản phẩm nào</p>}
//           </div>

//           {allBooks.length > 0 && (
//             <ReactPaginate
//               previousLabel={'Previous'}
//               nextLabel={'Next'}
//               breakLabel={'...'}
//               pageCount={Math.ceil(allBooks.length / booksPerPage)}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={handlePageClick}
//               containerClassName={'pagination'}
//               activeClassName={'active'}
//             />
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Home.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import HomePanel from '../../Components/HomePanel/HomePanel';
import BookCard from '../../Components/BookCard/BookCard';
import SliderBanner from '../../Components/SliderBanner/SliderBanner';

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const booksPerPage = 12;

  useEffect(() => {
    // Fetch all books
    axios.get('http://localhost:8080/api/products/get-all')
      .then(response => {
        setAllBooks(response.data.data);
        setBooks(response.data.data.slice(0, booksPerPage)); // Initialize books for the first page
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch books.');
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
        <HomePanel />

        <div className="main-content">
          <div className="books-grid">
            {books.length > 0 ? books.map(book => (
              <BookCard key={book.id} book={book} />
            )) : <p>Hiện không có sản phẩm nào</p>}
          </div>

          {allBooks.length > 0 && (
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              pageCount={Math.ceil(allBooks.length / booksPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
