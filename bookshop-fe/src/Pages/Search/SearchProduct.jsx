// import React, { useState } from 'react';
// import axios from 'axios';
// import './SearchProduct.css'; // Import the CSS file
// import Header from '../../Components/Header/Header';
// import Footer from '../../Components/Footer/Footer';

// const Search = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     titleWeight: 1,
//     author: '',
//     authorWeight: 1,
//     genre: '',
//     genreWeight: 1,
//     publisher: '',
//     publisherWeight: 1,
//     publicationYear: '',
//     publicationYearWeight: 1,
//     tag: '',
//     tagWeight: 1,
//     starRating: '',
//     starRatingWeight: 1,
//     priceFrom: '',
//     priceTo: '',
//     priceWeight: 1,
//   });

//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // Gọi API với axios
//       const response = await axios.post('http://localhost:8080/api/products/BooleanSearch', formData);

//       // Nhận dữ liệu kết quả từ API
//       const results = response.data;

//       // Cập nhật kết quả tìm kiếm
//       setSearchResults(results);
//     } catch (err) {
//       // Xử lý lỗi
//       setError('Có lỗi xảy ra trong quá trình tìm kiếm.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="search-container">
//         <h2>Tìm kiếm sách</h2>
//         <form id="searchForm" onSubmit={handleSearch}>
//           <div className="form-group">
//             <label htmlFor="title">Tên sách:</label>
//             <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
//             <input type="number" id="titleWeight" name="titleWeight" min="1" max="10" value={formData.titleWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="author">Tác giả:</label>
//             <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />
//             <input type="number" id="authorWeight" name="authorWeight" min="1" max="10" value={formData.authorWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="genre">Thể loại:</label>
//             <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} />
//             <input type="number" id="genreWeight" name="genreWeight" min="1" max="10" value={formData.genreWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="publisher">Nhà xuất bản:</label>
//             <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} />
//             <input type="number" id="publisherWeight" name="publisherWeight" min="1" max="10" value={formData.publisherWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="publicationYear">Năm xuất bản:</label>
//             <input type="text" id="publicationYear" name="publicationYear" value={formData.publicationYear} onChange={handleChange} />
//             <input type="number" id="publicationYearWeight" name="publicationYearWeight" min="1" max="10" value={formData.publicationYearWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="tag">Tag:</label>
//             <input type="text" id="tag" name="tag" value={formData.tag} onChange={handleChange} />
//             <input type="number" id="tagWeight" name="tagWeight" min="1" max="10" value={formData.tagWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="starRating">Đánh giá:</label>
//             <input type="text" id="starRating" name="starRating" value={formData.starRating} onChange={handleChange} />
//             <input type="number" id="starRatingWeight" name="starRatingWeight" min="1" max="10" value={formData.starRatingWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="priceFrom">Giá từ:</label>
//             <input type="number" id="priceFrom" name="priceFrom" value={formData.priceFrom} onChange={handleChange} />
//             <span>-</span>
//             <input type="number" id="priceTo" name="priceTo" value={formData.priceTo} onChange={handleChange} />
//             <input type="number" id="priceWeight" name="priceWeight" min="1" max="10" value={formData.priceWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
//           </button>
//         </form>
//         {error && <p className="error-message">{error}</p>}
//         <ul id="searchResults">
//           {searchResults.map((book, index) => (
//             <li key={index}>
//               <strong>{book.title}</strong><br />
//               Tác giả: {book.author}<br />
//               Thể loại: {book.genre}<br />
//               Nhà xuất bản: {book.publisher}<br />
//               Năm xuất bản: {book.publicationYear}<br />
//               Tag: {book.tag}<br />
//               Đánh giá: {book.starRating}<br />
//               Giá: {book.price.toLocaleString()} VNĐ
//             </li>
//           ))}
//         </ul>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Search;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './SearchProduct.css'; // Import the CSS file
// import Header from '../../Components/Header/Header';
// import Footer from '../../Components/Footer/Footer';
// import { Link } from 'react-router-dom';

// const Search = () => {
//   const [formData, setFormData] = useState({
//     title: 'Mắc',
//     titleWeight: 1,
//     author: '',
//     authorWeight: 1,
//     category: '',
//     categoryWeight: 1,
//     publisher: '',
//     publisherWeight: 1,
//     publicationYear: '',
//     yearWeight: 1,
//     tag: '',
//     tagWeight: 1,
//     minRating: '',
//     maxRating: '',
//     ratingWeight: 1,
//     minPrice: '',
//     maxPrice: '',
//     priceWeight: 1,
//   });

//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // Gọi API với axios
//       const response = await axios.post('http://localhost:8080/api/products/BooleanSearch', formData);

//       // Nhận dữ liệu kết quả từ API
//       const results = response.data.data; // Assuming response.data.data contains the products

//       // Cập nhật kết quả tìm kiếm
//       setSearchResults(results);
//     } catch (err) {
//       // Xử lý lỗi
//       setError('Có lỗi xảy ra trong quá trình tìm kiếm.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="search-container">
//         <h2>Tìm kiếm sách</h2>
//         <form id="searchForm" onSubmit={handleSearch}>
//           <div className="form-group">
//             <label htmlFor="title">Tên sách:</label>
//             <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
//             <input type="number" id="titleWeight" name="titleWeight" min="1" max="10" value={formData.titleWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="author">Tác giả:</label>
//             <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />
//             <input type="number" id="authorWeight" name="authorWeight" min="1" max="10" value={formData.authorWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="category">Thể loại:</label>
//             <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
//             <input type="number" id="categoryWeight" name="categoryWeight" min="1" max="10" value={formData.categoryWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="publisher">Nhà xuất bản:</label>
//             <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} />
//             <input type="number" id="publisherWeight" name="publisherWeight" min="1" max="10" value={formData.publisherWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="publicationYear">Năm xuất bản:</label>
//             <input type="number" id="publicationYear" name="publicationYear" value={formData.publicationYear} onChange={handleChange} />
//             <input type="number" id="yearWeight" name="yearWeight" min="1" max="10" value={formData.yearWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="tag">Tag:</label>
//             <input type="text" id="tag" name="tag" value={formData.tag} onChange={handleChange} />
//             <input type="number" id="tagWeight" name="tagWeight" min="1" max="10" value={formData.tagWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="minRating">Đánh giá từ:</label>
//             <input type="number" id="minRating" name="minRating" step="0.1" value={formData.minRating} onChange={handleChange} />
//             <span>-</span>
//             <input type="number" id="maxRating" name="maxRating" step="0.1" value={formData.maxRating} onChange={handleChange} />
//             <input type="number" id="ratingWeight" name="ratingWeight" min="1" max="10" value={formData.ratingWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="minPrice">Giá từ:</label>
//             <input type="number" id="minPrice" name="minPrice" value={formData.minPrice} onChange={handleChange} />
//             <span>-</span>
//             <input type="number" id="maxPrice" name="maxPrice" value={formData.maxPrice} onChange={handleChange} />
//             <input type="number" id="priceWeight" name="priceWeight" min="1" max="10" value={formData.priceWeight} onChange={handleChange} />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
//           </button>
//         </form>
//         {error && <p className="error-message">{error}</p>}
//         <ul id="searchResults">
//           {searchResults.map((book, index) => (

//             <li key={index}>
            
//             <Link to={`/product/${book.id}`}>

//               <strong>{book.title}</strong><br />
//               </Link>
//               Tác giả: {book.authors.map(author => author.name).join(', ')}<br />
//               Thể loại: {book.categories.map(category => category.name).join(', ')}<br />
//               Nhà xuất bản: {book.publisher.name}<br />
//               Năm xuất bản: {book.publicationYear}<br />
//               Tag: {book.tags.map(tag => tag.name).join(', ')}<br />
//               Đánh giá: {book.starRating}<br />
//               Giá: {book.price.toLocaleString()} VNĐ
//             </li>
//           ))}
//         </ul>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Search;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './SearchProduct.css'; // Import the CSS file
// import Header from '../../Components/Header/Header';
// import Footer from '../../Components/Footer/Footer';
// import { Link } from 'react-router-dom';

// const Search = () => {
//   const [formData, setFormData] = useState({
//     title: null,
//     titleWeight: 1,
//     author: null,
//     authorWeight: 1,
//     category: null,
//     categoryWeight: 1,
//     publisher: null,
//     publisherWeight: 1,
//     publicationYear: null,
//     yearWeight: 1,
//     tag: null,
//     tagWeight: 1,
//     minRating: null,
//     maxRating: null,
//     ratingWeight: 1,
//     minPrice: null,
//     maxPrice: null,
//     priceWeight: 1,
//   });

//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     const newValue = type === 'number' ? Number(value) : value;
//     setFormData({ ...formData, [name]: newValue });
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     console.log('FormData on search:', formData); // Kiểm tra dữ liệu trước khi gửi

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:8080/api/products/BooleanSearch', formData);
//       console.log('Response data:', response.data); // Kiểm tra dữ liệu trả về từ server

//       // Giả sử response.data.data chứa danh sách sản phẩm đã được sắp xếp theo thứ tự mong muốn
//       const results = response.data.data;
//       setSearchResults(results);
//     } catch (err) {
//       setError('Có lỗi xảy ra trong quá trình tìm kiếm.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="search-container">
//         <h2>Tìm kiếm sách</h2>
//         <form id="searchForm" onSubmit={handleSearch}>
//           <div className="form-group">
//             <label htmlFor="title">Tên sách:</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               id="titleWeight"
//               name="titleWeight"
//               min="1"
//               max="10"
//               value={formData.titleWeight}
//               onChange={handleChange}
//             />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="author">Tác giả:</label>
//             <input
//               type="text"
//               id="author"
//               name="author"
//               value={formData.author}
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               id="authorWeight"
//               name="authorWeight"
//               min="1"
//               max="10"
//               value={formData.authorWeight}
//               onChange={handleChange}
//             />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="category">Thể loại:</label>
//             <input
//               type="text"
//               id="category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               id="categoryWeight"
//               name="categoryWeight"
//               min="1"
//               max="10"
//               value={formData.categoryWeight}
//               onChange={handleChange}
//             />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="publisher">Nhà xuất bản:</label>
//             <input
//               type="text"
//               id="publisher"
//               name="publisher"
//               value={formData.publisher}
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               id="publisherWeight"
//               name="publisherWeight"
//               min="1"
//               max="10"
//               value={formData.publisherWeight}
//               onChange={handleChange}
//             />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="publicationYear">Năm xuất bản:</label>
//             <input
//               type="number"
//               id="publicationYear"
//               name="publicationYear"
//               value={formData.publicationYear}
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               id="yearWeight"
//               name="yearWeight"
//               min="1"
//               max="10"
//               value={formData.yearWeight}
//               onChange={handleChange}
//             />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="tag">Tag:</label>
//             <input
//               type="text"
//               id="tag"
//               name="tag"
//               value={formData.tag}
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               id="tagWeight"
//               name="tagWeight"
//               min="1"
//               max="10"
//               value={formData.tagWeight}
//               onChange={handleChange}
//             />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="minRating">Đánh giá từ:</label>
//             <input
//               type="number"
//               id="minRating"
//               name="minRating"
//               step="0.1"
//               value={formData.minRating}
//               onChange={handleChange}
//             />
//             <span>-</span>
//             <input
//               type="number"
//               id="maxRating"
//               name="maxRating"
//               step="0.1"
//               value={formData.maxRating}
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               id="ratingWeight"
//               name="ratingWeight"
//               min="1"
//               max="10"
//               value={formData.ratingWeight}
//               onChange={handleChange}
//             />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <div className="form-group">
//             <label htmlFor="minPrice">Giá từ:</label>
//             <input
//               type="number"
//               id="minPrice"
//               name="minPrice"
//               value={formData.minPrice}
//               onChange={handleChange}
//             />
//             <span>-</span>
//             <input
//               type="number"
//               id="maxPrice"
//               name="maxPrice"
//               value={formData.maxPrice}
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               id="priceWeight"
//               name="priceWeight"
//               min="1"
//               max="10"
//               value={formData.priceWeight}
//               onChange={handleChange}
//             />
//             <span className="priority-label">Độ ưu tiên</span>
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
//           </button>
//         </form>
//         {error && <p className="error-message">{error}</p>}
//         <ul id="searchResults">
//           {/* {searchResults.map((book, index) => (
//             <li key={index}>
//               <Link to={`/product/${book.id}`}>
//                 <strong>{book.title}</strong><br />
//               </Link>
//               Tác giả: {book.authors.map(author => author.name).join(', ')}<br />
//               Thể loại: {book.categories.map(category => category.name).join(', ')}<br />
//               Nhà xuất bản: {book.publisher.name}<br />
//               Năm xuất bản: {book.publicationYear}<br />
//               Tag: {book.tags.map(tag => tag.name).join(', ')}<br />
//               Đánh giá: {book.starRating}<br />
//               Giá: {book.price.toLocaleString()} VNĐ
//             </li>
//           ))} */}

//           {searchResults.map((book) => (
//   <li key={book.id}>
//     <Link to={`/product/${book.id}`}>
//       <img src={book.image} alt={book.title} />
//     </Link>
//     <br/>
//     <strong>{book.title}</strong><br />
//     Tác giả: {book.authors.map(author => author.name).join(', ')}<br />
//     Thể loại: {book.categories.map(category => category.name).join(', ')}<br />
//     Nhà xuất bản: {book.publisher.name}<br />
//     Năm xuất bản: {book.publicationYear}<br />
//     Tag: {book.tags.map(tag => tag.name).join(', ')}<br />
//     Đánh giá: {book.starRating}<br />
//     Giá: {book.price.toLocaleString()} VNĐ
//   </li>
// ))}

//         </ul>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Search;




// import React, { useState } from 'react';
// import axios from 'axios';
// import './SearchProduct.css';
// import Header from '../../Components/Header/Header';
// import Footer from '../../Components/Footer/Footer';
// import { Link } from 'react-router-dom';

// const criteriaList = [
//   { id: 'title', label: 'Tên sách' },
//   { id: 'author', label: 'Tác giả' },
//   { id: 'category', label: 'Thể loại' },
//   { id: 'publisher', label: 'Nhà xuất bản' },
//   { id: 'publicationYear', label: 'Năm xuất bản' },
//   { id: 'tag', label: 'Tag' },
//   { id: 'rating', label: 'Đánh giá' },
//   { id: 'price', label: 'Giá' },
// ];

// const Search = () => {
//   const [selectedCriteria, setSelectedCriteria] = useState([]);
//   const [showSearchForm, setShowSearchForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: null,
//     titleWeight: 1,
//     author: null,
//     authorWeight: 1,
//     category: null,
//     categoryWeight: 1,
//     publisher: null,
//     publisherWeight: 1,
//     publicationYear: null,
//     yearWeight: 1,
//     tag: null,
//     tagWeight: 1,
//     minRating: null,
//     maxRating: null,
//     ratingWeight: 1,
//     minPrice: null,
//     maxPrice: null,
//     priceWeight: 1,
//   });
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChangeCriteria = (e) => {
//     const { id, checked } = e.target;
//     setSelectedCriteria(prev => {
//       if (checked) return [...prev, id];
//       return prev.filter(criteria => criteria !== id);
//     });
//   };

//   const handleSubmitCriteria = (e) => {
//     e.preventDefault();
//     setShowSearchForm(true);
//   };

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     const newValue = type === 'number' ? Number(value) : value;
//     setFormData({ ...formData, [name]: newValue });
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:8080/api/products/BooleanSearch', formData);
//       const results = response.data.data;
//       setSearchResults(results);
//     } catch (err) {
//       setError('Có lỗi xảy ra trong quá trình tìm kiếm.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="search-container">
//         <h2>Tìm kiếm sách</h2>

//         {/* Phần chọn tiêu chí */}
//         {!showSearchForm && (
//           <div>
//             <h3>Chọn tiêu chí tìm kiếm</h3>
//             <form onSubmit={handleSubmitCriteria}>
//               {criteriaList.map(criteria => (
//                 <div key={criteria.id}>
//                   <input
//                     type="checkbox"
//                     id={criteria.id}
//                     onChange={handleChangeCriteria}
//                   />
//                   <label htmlFor={criteria.id}>{criteria.label}</label>
//                 </div>
//               ))}
//               <button type="submit">OK</button>
//             </form>
//           </div>
//         )}

//         {/* Phần form tìm kiếm */}
//         {showSearchForm && (
//           <form id="searchForm" onSubmit={handleSearch}>
//             {selectedCriteria.includes('title') && (
//               <div className="form-group">
//                 <label htmlFor="title">Tên sách:</label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="number"
//                   id="titleWeight"
//                   name="titleWeight"
//                   min="1"
//                   max="10"
//                   value={formData.titleWeight}
//                   onChange={handleChange}
//                 />
//                 <span className="priority-label">Độ ưu tiên</span>
//               </div>
//             )}
//             {selectedCriteria.includes('author') && (
//               <div className="form-group">
//                 <label htmlFor="author">Tác giả:</label>
//                 <input
//                   type="text"
//                   id="author"
//                   name="author"
//                   value={formData.author}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="number"
//                   id="authorWeight"
//                   name="authorWeight"
//                   min="1"
//                   max="10"
//                   value={formData.authorWeight}
//                   onChange={handleChange}
//                 />
//                 <span className="priority-label">Độ ưu tiên</span>
//               </div>
//             )}
//             {selectedCriteria.includes('category') && (
//               <div className="form-group">
//                 <label htmlFor="category">Thể loại:</label>
//                 <input
//                   type="text"
//                   id="category"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="number"
//                   id="categoryWeight"
//                   name="categoryWeight"
//                   min="1"
//                   max="10"
//                   value={formData.categoryWeight}
//                   onChange={handleChange}
//                 />
//                 <span className="priority-label">Độ ưu tiên</span>
//               </div>
//             )}
//             {selectedCriteria.includes('publisher') && (
//               <div className="form-group">
//                 <label htmlFor="publisher">Nhà xuất bản:</label>
//                 <input
//                   type="text"
//                   id="publisher"
//                   name="publisher"
//                   value={formData.publisher}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="number"
//                   id="publisherWeight"
//                   name="publisherWeight"
//                   min="1"
//                   max="10"
//                   value={formData.publisherWeight}
//                   onChange={handleChange}
//                 />
//                 <span className="priority-label">Độ ưu tiên</span>
//               </div>
//             )}
//             {selectedCriteria.includes('publicationYear') && (
//               <div className="form-group">
//                 <label htmlFor="publicationYear">Năm xuất bản:</label>
//                 <input
//                   type="number"
//                   id="publicationYear"
//                   name="publicationYear"
//                   value={formData.publicationYear}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="number"
//                   id="yearWeight"
//                   name="yearWeight"
//                   min="1"
//                   max="10"
//                   value={formData.yearWeight}
//                   onChange={handleChange}
//                 />
//                 <span className="priority-label">Độ ưu tiên</span>
//               </div>
//             )}
//             {selectedCriteria.includes('tag') && (
//               <div className="form-group">
//                 <label htmlFor="tag">Tag:</label>
//                 <input
//                   type="text"
//                   id="tag"
//                   name="tag"
//                   value={formData.tag}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="number"
//                   id="tagWeight"
//                   name="tagWeight"
//                   min="1"
//                   max="10"
//                   value={formData.tagWeight}
//                   onChange={handleChange}
//                 />
//                 <span className="priority-label">Độ ưu tiên</span>
//               </div>
//             )}
//             {selectedCriteria.includes('rating') && (
//               <div className="form-group">
//                 <label htmlFor="minRating">Đánh giá từ:</label>
//                 <input
//                   type="number"
//                   id="minRating"
//                   name="minRating"
//                   step="0.1"
//                   value={formData.minRating}
//                   onChange={handleChange}
//                 />
//                 <span>-</span>
//                 <input
//                   type="number"
//                   id="maxRating"
//                   name="maxRating"
//                   step="0.1"
//                   value={formData.maxRating}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="number"
//                   id="ratingWeight"
//                   name="ratingWeight"
//                   min="1"
//                   max="10"
//                   value={formData.ratingWeight}
//                   onChange={handleChange}
//                 />
//                 <span className="priority-label">Độ ưu tiên</span>
//               </div>
//             )}
//             {selectedCriteria.includes('price') && (
//               <div className="form-group">
//                 <label htmlFor="minPrice">Giá từ:</label>
//                 <input
//                   type="number"
//                   id="minPrice"
//                   name="minPrice"
//                   value={formData.minPrice}
//                   onChange={handleChange}
//                 />
//                 <span>-</span>
//                 <input
//                   type="number"
//                   id="maxPrice"
//                   name="maxPrice"
//                   value={formData.maxPrice}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="number"
//                   id="priceWeight"
//                   name="priceWeight"
//                   min="1"
//                   max="10"
//                   value={formData.priceWeight}
//                   onChange={handleChange}
//                 />
//                 <span className="priority-label">Độ ưu tiên</span>
//               </div>
//             )}
//             <button type="submit" disabled={loading}>
//               {loading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
//             </button>
//           </form>
//         )}

//         {error && <p className="error-message">{error}</p>}
//         <ul id="searchResults">
//           {searchResults.map((book) => (
//             <li key={book.id}>
//               <Link to={`/product/${book.id}`}>
//                 <img src={book.image} alt={book.title} />
//               </Link>
//               <br/>
//               <strong>{book.title}</strong><br />
//               Tác giả: {book.authors.map(author => author.name).join(', ')}<br />
//               Thể loại: {book.categories.map(category => category.name).join(', ')}<br />
//               Nhà xuất bản: {book.publisher.name}<br />
//               Năm xuất bản: {book.publicationYear}<br />
//               Tag: {book.tags.map(tag => tag.name).join(', ')}<br />
//               Đánh giá: {book.starRating}<br />
//               Giá: {book.price.toLocaleString()} VNĐ
//             </li>
//           ))}
//         </ul>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Search;


import React, { useState } from 'react';
import axios from 'axios';
import './SearchProduct.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import Cover from '../../images/biasach.jpg';

const criteriaList = [
  { id: 'title', label: 'Tên sách' },
  { id: 'author', label: 'Tác giả' },
  { id: 'category', label: 'Thể loại' },
  { id: 'publisher', label: 'Nhà xuất bản' },
  { id: 'publicationYear', label: 'Năm xuất bản' },
  { id: 'tag', label: 'Tag' },
  { id: 'rating', label: 'Đánh giá' },
  { id: 'price', label: 'Giá' },
];

const Search = () => {
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [formData, setFormData] = useState({
    title: null,
    titleWeight: 1,
    author: null,
    authorWeight: 1,
    category: null,
    categoryWeight: 1,
    publisher: null,
    publisherWeight: 1,
    publicationYear: null,
    yearWeight: 1,
    tag: null,
    tagWeight: 1,
    minRating: null,
    maxRating: null,
    ratingWeight: 1,
    minPrice: null,
    maxPrice: null,
    priceWeight: 1,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeCriteria = (e) => {
    const { id, checked } = e.target;
    setSelectedCriteria(prev => {
      if (checked) return [...prev, id];
      return prev.filter(criteria => criteria !== id);
    });
  };

  const handleSubmitCriteria = (e) => {
    e.preventDefault();
    if (selectedCriteria.length > 0) {
      setShowSearchForm(true);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/products/BooleanSearch', formData);
      const results = response.data.data;
      setSearchResults(results);
    } catch (err) {
      setError('Có lỗi xảy ra trong quá trình tìm kiếm.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="search-container">
        <h2>Tìm kiếm sách</h2>

        {/* Phần chọn tiêu chí */}
        {!showSearchForm && (
          <div>
            <h3>Chọn tiêu chí tìm kiếm</h3>
            <form onSubmit={handleSubmitCriteria}>
              {criteriaList.map(criteria => (
                <div key={criteria.id}>
                  <input
                    type="checkbox"
                    id={criteria.id}
                    onChange={handleChangeCriteria}
                  />
                  <label htmlFor={criteria.id}>{criteria.label}</label>
                </div>
              ))}
              <button type="submit" disabled={selectedCriteria.length === 0}>OK</button>
            </form>
          </div>
        )}

        {/* Phần form tìm kiếm */}
        {showSearchForm && (
          <form id="searchForm" onSubmit={handleSearch}>
            <div className="form-group">
              {selectedCriteria.includes('title') && (
                <div>
                  <label htmlFor="title">Tên sách:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  <label htmlFor="titleWeight">Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="titleWeight"
                    name="titleWeight"
                    min="1"
                    max="100"
                    value={formData.titleWeight}
                    onChange={handleChange}
                  />
                </div>
              )}
              {selectedCriteria.includes('author') && (
                <div>
                  <label htmlFor="author">Tác giả:</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                  />
                  <label htmlFor="authorWeight">Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="authorWeight"
                    name="authorWeight"
                    min="1"
                    max="100"
                    value={formData.authorWeight}
                    onChange={handleChange}
                  />
                </div>
              )}
              {selectedCriteria.includes('category') && (
                <div>
                  <label htmlFor="category">Thể loại:</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                  <label htmlFor="categoryWeight">Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="categoryWeight"
                    name="categoryWeight"
                    min="1"
                    max="100"
                    value={formData.categoryWeight}
                    onChange={handleChange}
                  />
                </div>
              )}
              {selectedCriteria.includes('publisher') && (
                <div>
                  <label htmlFor="publisher">Nhà xuất bản:</label>
                  <input
                    type="text"
                    id="publisher"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                  />
                  <label htmlFor="publisherWeight">Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="publisherWeight"
                    name="publisherWeight"
                    min="1"
                    max="100"
                    value={formData.publisherWeight}
                    onChange={handleChange}
                  />
                </div>
              )}
              {selectedCriteria.includes('publicationYear') && (
                <div>
                  <label htmlFor="publicationYear">Năm xuất bản:</label>
                  <input
                    type="number"
                    id="publicationYear"
                    name="publicationYear"
                    value={formData.publicationYear}
                    onChange={handleChange}
                  />
                  <label htmlFor="yearWeight">Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="yearWeight"
                    name="yearWeight"
                    min="1"
                    max="100"
                    value={formData.yearWeight}
                    onChange={handleChange}
                  />
                </div>
              )}
              {selectedCriteria.includes('tag') && (
                <div>
                  <label htmlFor="tag">Tag:</label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                  />
                  <label htmlFor="tagWeight">Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="tagWeight"
                    name="tagWeight"
                    min="1"
                    max="100"
                    value={formData.tagWeight}
                    onChange={handleChange}
                  />
                </div>
              )}
              {selectedCriteria.includes('rating') && (
                <div>
                  <label htmlFor="minRating">Đánh giá (sao)từ:</label>
                  <input
                    type="number"
                    id="minRating"
                    name="minRating"
                    step="0.1"
                    value={formData.minRating}
                    onChange={handleChange}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    id="maxRating"
                    name="maxRating"
                    step="0.1"
                    value={formData.maxRating}
                    onChange={handleChange}
                  />
                  <label htmlFor="ratingWeight">Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="ratingWeight"
                    name="ratingWeight"
                    min="1"
                    max="100"
                    value={formData.ratingWeight}
                    onChange={handleChange}
                  />
                </div>
              )}
              {selectedCriteria.includes('price') && (
                <div>
                  <label htmlFor="minPrice">Giá từ:</label>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    value={formData.minPrice}
                    onChange={handleChange}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={formData.maxPrice}
                    onChange={handleChange}
                  />
                  <label htmlFor="priceWeight">Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="priceWeight"
                    name="priceWeight"
                    min="1"
                    max="100"
                    value={formData.priceWeight}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
            </button>
          </form>
        )}

        {error && <p className="error-message">{error}</p>}
        <ul id="searchResults">
          {searchResults.map((book) => (

            <li key={book.id}>
            <Link to={`/product/${book.id}`} target='blank'>

                {/* <img src={'Cover'} alt={book.title} /> */}
                <img src='biasach.jpg' alt={book.title} />


                {/* <img src={'../../images/biasach.jpg'} alt={book.title} /> */}
                {/* <img src={book.image}  /> */}
                </Link>

              <div>
                <strong>{book.title}</strong><br />
                Tác giả: {book.authors.map(author => author.name).join(', ')}<br />
                Thể loại: {book.categories.map(category => category.name).join(', ')}<br />
                Nhà xuất bản: {book.publisher.name}<br />
                Năm xuất bản: {book.publicationYear}<br />
                Tag: {book.tags.map(tag => tag.name).join(', ')}<br />
                Đánh giá: {book.starRating}<br />
                Giá: {book.price.toLocaleString()} VNĐ
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
