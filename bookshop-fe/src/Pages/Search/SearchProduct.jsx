// import React, { useState } from 'react';

// const Search = () => {
//   const [criteria, setCriteria] = useState([]);
//   const [weights, setWeights] = useState([]);

//   const handleSearch = () => {
//     // API call to search books
//   };

//   return (
//     <div>
//       <h1>Search Books</h1>
      
//       {/* Form for entering criteria and weights */}
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// };

// export default Search;



// import React, { useState } from 'react';
// import './SearchProduct.css';
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const mockData = [
//       { title: "Sách 1", author: "Tác giả A", genre: "Khoa học viễn tưởng", publisher: "NXB X", publicationYear: "2023", tag: "science fiction", starRating: "4", price: 150000 },
//       { title: "Sách 2", author: "Tác giả B", genre: "Tiểu thuyết lãng mạn", publisher: "NXB Y", publicationYear: "2021", tag: "romance", starRating: "5", price: 180000 },
//       { title: "Sách 3", author: "Tác giả C", genre: "Kỹ năng sống", publisher: "NXB Z", publicationYear: "2020", tag: "self-help", starRating: "4.5", price: 120000 },
//       // Thêm các cuốn sách khác vào đây
//     ];

//     const results = searchBooks(formData, mockData);
//     setSearchResults(results);
//   };

//   const searchBooks = (criteria, data) => {
//     const results = data.filter(book => {
//       return (
//         (criteria.title === "" || book.title.toLowerCase().includes(criteria.title.toLowerCase())) &&
//         (criteria.author === "" || book.author.toLowerCase().includes(criteria.author.toLowerCase())) &&
//         (criteria.genre === "" || book.genre.toLowerCase().includes(criteria.genre.toLowerCase())) &&
//         (criteria.publisher === "" || book.publisher.toLowerCase().includes(criteria.publisher.toLowerCase())) &&
//         (criteria.publicationYear === "" || book.publicationYear.includes(criteria.publicationYear)) &&
//         (criteria.tag === "" || book.tag.toLowerCase().includes(criteria.tag.toLowerCase())) &&
//         (criteria.starRating === "" || book.starRating.includes(criteria.starRating)) &&
//         (criteria.priceFrom === "" || (book.price >= parseInt(criteria.priceFrom))) &&
//         (criteria.priceTo === "" || (book.price <= parseInt(criteria.priceTo)))
//       );
//     });

//     results.sort((a, b) => {
//       let scoreA = calculateScore(a, criteria);
//       let scoreB = calculateScore(b, criteria);
//       return scoreB - scoreA; // Sắp xếp giảm dần
//     });

//     return results;
//   };

//   const calculateScore = (book, criteria) => {
//     let score = 0;
//     score += (book.title.toLowerCase().includes(criteria.title.toLowerCase())) ? criteria.titleWeight : 0;
//     score += (book.author.toLowerCase().includes(criteria.author.toLowerCase())) ? criteria.authorWeight : 0;
//     score += (book.genre.toLowerCase().includes(criteria.genre.toLowerCase())) ? criteria.genreWeight : 0;
//     score += (book.publisher.toLowerCase().includes(criteria.publisher.toLowerCase())) ? criteria.publisherWeight : 0;
//     score += (book.publicationYear.includes(criteria.publicationYear)) ? criteria.publicationYearWeight : 0;
//     score += (book.tag.toLowerCase().includes(criteria.tag.toLowerCase())) ? criteria.tagWeight : 0;
//     score += (book.starRating.includes(criteria.starRating)) ? criteria.starRatingWeight : 0;
//     score += (book.price >= parseInt(criteria.priceFrom) && book.price <= parseInt(criteria.priceTo)) ? criteria.priceWeight : 0;

//     return score;
//   };

//   return (
//     <div>
//       <h2>Tìm kiếm sách</h2>
//       <form id="searchForm" onSubmit={handleSearch}>
//         <div className="form-group">
//           <label htmlFor="title">Tên sách:</label>
//           <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
//           <input type="number" id="titleWeight" name="titleWeight" min="1" max="10" value={formData.titleWeight} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="author">Tác giả:</label>
//           <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />
//           <input type="number" id="authorWeight" name="authorWeight" min="1" max="10" value={formData.authorWeight} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="genre">Thể loại:</label>
//           <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} />
//           <input type="number" id="genreWeight" name="genreWeight" min="1" max="10" value={formData.genreWeight} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="publisher">Nhà xuất bản:</label>
//           <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} />
//           <input type="number" id="publisherWeight" name="publisherWeight" min="1" max="10" value={formData.publisherWeight} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="publicationYear">Năm xuất bản:</label>
//           <input type="text" id="publicationYear" name="publicationYear" value={formData.publicationYear} onChange={handleChange} />
//           <input type="number" id="publicationYearWeight" name="publicationYearWeight" min="1" max="10" value={formData.publicationYearWeight} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="tag">Tag:</label>
//           <input type="text" id="tag" name="tag" value={formData.tag} onChange={handleChange} />
//           <input type="number" id="tagWeight" name="tagWeight" min="1" max="10" value={formData.tagWeight} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="starRating">Đánh giá sao:</label>
//           <input type="text" id="starRating" name="starRating" value={formData.starRating} onChange={handleChange} />
//           <input type="number" id="starRatingWeight" name="starRatingWeight" min="1" max="10" value={formData.starRatingWeight} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="price">Giá tiền (trong khoảng):</label>
//           <input type="text" id="priceFrom" name="priceFrom" placeholder="Từ" value={formData.priceFrom} onChange={handleChange} />
//           <input type="text" id="priceTo" name="priceTo" placeholder="Đến" value={formData.priceTo} onChange={handleChange} />
//           <input type="number" id="priceWeight" name="priceWeight" min="1" max="10" value={formData.priceWeight} onChange={handleChange} />
//         </div>
//         <button type="submit">Tìm kiếm</button>
//       </form>
//       <hr />
//       <h2>Kết quả tìm kiếm</h2>
//       <ul id="searchResults">
//         {searchResults.map((book, index) => (
//           <li key={index}>
//             {`${book.title} - ${book.author} (${book.genre}), ${book.publisher}, ${book.publicationYear}, ${book.tag}, ${book.starRating} sao, ${book.price} VNĐ`}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Search;

import React, { useState } from 'react';
import './SearchProduct.css'; // Import the CSS file
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const Search = () => {
  const [formData, setFormData] = useState({
    title: '',
    titleWeight: 1,
    author: '',
    authorWeight: 1,
    genre: '',
    genreWeight: 1,
    publisher: '',
    publisherWeight: 1,
    publicationYear: '',
    publicationYearWeight: 1,
    tag: '',
    tagWeight: 1,
    starRating: '',
    starRatingWeight: 1,
    priceFrom: '',
    priceTo: '',
    priceWeight: 1,
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const mockData = [
      { title: "Sách 1", author: "Tác giả A", genre: "Khoa học viễn tưởng", publisher: "NXB X", publicationYear: "2023", tag: "science fiction", starRating: "4", price: 150000 },
      { title: "Sách 2", author: "Tác giả B", genre: "Tiểu thuyết lãng mạn", publisher: "NXB Y", publicationYear: "2021", tag: "romance", starRating: "5", price: 180000 },
      { title: "Sách 3", author: "Tác giả C", genre: "Kỹ năng sống", publisher: "NXB Z", publicationYear: "2020", tag: "self-help", starRating: "4.5", price: 120000 },
      // Thêm các cuốn sách khác vào đây
    ];

    const results = searchBooks(formData, mockData);
    setSearchResults(results);
  };

  const searchBooks = (criteria, data) => {
    const results = data.filter(book => {
      return (
        (criteria.title === "" || book.title.toLowerCase().includes(criteria.title.toLowerCase())) &&
        (criteria.author === "" || book.author.toLowerCase().includes(criteria.author.toLowerCase())) &&
        (criteria.genre === "" || book.genre.toLowerCase().includes(criteria.genre.toLowerCase())) &&
        (criteria.publisher === "" || book.publisher.toLowerCase().includes(criteria.publisher.toLowerCase())) &&
        (criteria.publicationYear === "" || book.publicationYear.includes(criteria.publicationYear)) &&
        (criteria.tag === "" || book.tag.toLowerCase().includes(criteria.tag.toLowerCase())) &&
        (criteria.starRating === "" || book.starRating.includes(criteria.starRating)) &&
        (criteria.priceFrom === "" || (book.price >= parseInt(criteria.priceFrom))) &&
        (criteria.priceTo === "" || (book.price <= parseInt(criteria.priceTo)))
      );
    });

    results.sort((a, b) => {
      let scoreA = calculateScore(a, criteria);
      let scoreB = calculateScore(b, criteria);
      return scoreB - scoreA; // Sắp xếp giảm dần
    });

    return results;
  };

  const calculateScore = (book, criteria) => {
    let score = 0;
    score += (book.title.toLowerCase().includes(criteria.title.toLowerCase())) ? criteria.titleWeight : 0;
    score += (book.author.toLowerCase().includes(criteria.author.toLowerCase())) ? criteria.authorWeight : 0;
    score += (book.genre.toLowerCase().includes(criteria.genre.toLowerCase())) ? criteria.genreWeight : 0;
    score += (book.publisher.toLowerCase().includes(criteria.publisher.toLowerCase())) ? criteria.publisherWeight : 0;
    score += (book.publicationYear.includes(criteria.publicationYear)) ? criteria.publicationYearWeight : 0;
    score += (book.tag.toLowerCase().includes(criteria.tag.toLowerCase())) ? criteria.tagWeight : 0;
    score += (book.starRating.includes(criteria.starRating)) ? criteria.starRatingWeight : 0;
    score += (book.price >= parseInt(criteria.priceFrom) && book.price <= parseInt(criteria.priceTo)) ? criteria.priceWeight : 0;

    return score;
  };

  return (
    <div>
        <Header />
    <div className="search-container">
      <h2>Tìm kiếm sách</h2>
      <form id="searchForm" onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="title">Tên sách:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
          <input type="number" id="titleWeight" name="titleWeight" min="1" max="10" value={formData.titleWeight} onChange={handleChange} />
          <span className="priority-label">Độ ưu tiên</span>
        </div>
        <div className="form-group">
          <label htmlFor="author">Tác giả:</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />
          <input type="number" id="authorWeight" name="authorWeight" min="1" max="10" value={formData.authorWeight} onChange={handleChange} />
          <span className="priority-label">Độ ưu tiên</span>
        </div>
        <div className="form-group">
          <label htmlFor="genre">Thể loại:</label>
          <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} />
          <input type="number" id="genreWeight" name="genreWeight" min="1" max="10" value={formData.genreWeight} onChange={handleChange} />
          <span className="priority-label">Độ ưu tiên</span>
        </div>
        <div className="form-group">
          <label htmlFor="publisher">Nhà xuất bản:</label>
          <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} />
          <input type="number" id="publisherWeight" name="publisherWeight" min="1" max="10" value={formData.publisherWeight} onChange={handleChange} />
          <span className="priority-label">Độ ưu tiên</span>
        </div>
        <div className="form-group">
          <label htmlFor="publicationYear">Năm xuất bản:</label>
          <input type="text" id="publicationYear" name="publicationYear" value={formData.publicationYear} onChange={handleChange} />
          <input type="number" id="publicationYearWeight" name="publicationYearWeight" min="1" max="10" value={formData.publicationYearWeight} onChange={handleChange} />
          <span className="priority-label">Độ ưu tiên</span>
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag:</label>
          <input type="text" id="tag" name="tag" value={formData.tag} onChange={handleChange} />
          <input type="number" id="tagWeight" name="tagWeight" min="1" max="10" value={formData.tagWeight} onChange={handleChange} />
          <span className="priority-label">Độ ưu tiên</span>
        </div>
        <div className="form-group">
          <label htmlFor="starRating">Đánh giá:</label>
          <input type="text" id="starRating" name="starRating" value={formData.starRating} onChange={handleChange} />
          <input type="number" id="starRatingWeight" name="starRatingWeight" min="1" max="10" value={formData.starRatingWeight} onChange={handleChange} />
          <span className="priority-label">Độ ưu tiên</span>
        </div>
        <div className="form-group">
          <label htmlFor="priceFrom">Giá từ:</label>
          <input type="number" id="priceFrom" name="priceFrom" value={formData.priceFrom} onChange={handleChange} />
          <span>-</span>
          <input type="number" id="priceTo" name="priceTo" value={formData.priceTo} onChange={handleChange} />
          <input type="number" id="priceWeight" name="priceWeight" min="1" max="10" value={formData.priceWeight} onChange={handleChange} />
          <span className="priority-label">Độ ưu tiên</span>
        </div>
        <button type="submit">Tìm kiếm</button>
      </form>
      <ul id="searchResults">
        {searchResults.map((book, index) => (
          <li key={index}>
            <strong>{book.title}</strong><br />
            Tác giả: {book.author}<br />
            Thể loại: {book.genre}<br />
            Nhà xuất bản: {book.publisher}<br />
            Năm xuất bản: {book.publicationYear}<br />
            Tag: {book.tag}<br />
            Đánh giá: {book.starRating}<br />
            Giá: {book.price.toLocaleString()} VNĐ
          </li>
        ))}
      </ul>
      </div>

      <Footer   />
    </div>
  );
};

export default Search;
