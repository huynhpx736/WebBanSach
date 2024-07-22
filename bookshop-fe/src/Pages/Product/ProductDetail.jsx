// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Cover from '../../images/biasach.jpg';
// import './ProductDetail.css';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/products/${id}`).then(response => {
//       setProduct(response.data.data);
//     });
//   }, [id]);

//   return (
//     <div className="container">
//       {product ? (
//         <>
//           {/* <img src={product.image} alt={product.title} className="product-image" /> */}
//           <img src={Cover} alt={product.title} className="product-image" />

//           <div className="product-details">
//             <h1 className="product-title">{product.title}</h1>
//             <p className="product-description">{product.description}</p>
//             <p className="product-price">Price: ${product.price}</p>
            
//             <div className="product-meta">
//               <div className="product-meta-item">
//                 <strong>Năm xuất bản:</strong> {product.publicationYear}
//               </div>
//               <div className="product-meta-item">
//                 <strong>Còn lại:</strong> {product.salesVolume}
//               </div>
//               <div className="product-meta-item">
//                 <strong>Đánh giá:</strong> {product.starRating}
//               </div>
//               <div className="product-meta-item">
//                 <strong>NXB:</strong> {product.publisher.name}
//               </div>
//             </div>

//             <div>
//               <h3>Tác giả:</h3>
//               <div className="authors">
//                 {product.authors.map(author => (
//                   <span key={author.id} className="author">
//                     {author.name}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3>Thể loại:</h3>
//               <div className="categories">
//                 {product.categories.map(category => (
//                   <span key={category.id} className="category">
//                     {category.name}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3>Tags:</h3>
//               <div className="tags">
//                 {product.tags.map(tag => (
//                   <span key={tag.id} className="tag">
//                     {tag.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <p className="loading">Loading...</p>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cover from '../../images/biasach.jpg';
import './ProductDetail.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`).then(response => {
      setProduct(response.data.data);
      // Fetch comments (assuming there's an endpoint for this)
    //   axios.get(`http://localhost:8080/api/products/${id}/comments`).then(res => {
    //     setComments(res.data.data);
    //   });
    });
  }, [id]);

  const handleAddToCart = () => {
    // Add to cart logic here
    alert(`${product.title} đã được thêm vào giỏ hàng!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="star">
          {i < rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
        <Header />
    <div className="container">
      {product ? (
        <>
          <img src={Cover} alt={product.title} className="product-image" />

          <div className="product-details">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Giá: {product.price} đồng</p>
            
            <div className="product-meta">
              <div className="product-meta-item">
                <strong>Năm xuất bản:</strong> {product.publicationYear}
              </div>
              <div className="product-meta-item">
                <strong>Còn lại:</strong> {product.salesVolume}
              </div>
              <div className="product-meta-item">
                <strong>Đánh giá:</strong> 
                <div className="stars">{renderStars(product.starRating)}</div>
              </div>
              <div className="product-meta-item">
                <strong>NXB:</strong> {product.publisher.name}
              </div>
            </div>

            <div>
              <h3>Tác giả:</h3>
              <div className="authors">
                {product.authors.map(author => (
                  <span key={author.id} className="author">
                    {author.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3>Thể loại:</h3>
              <div className="categories">
                {product.categories.map(category => (
                  <span key={category.id} className="category">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3>Tags:</h3>
              <div className="tags">
                {product.tags.map(tag => (
                  <span key={tag.id} className="tag">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            <button className="add-to-cart" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>

            <div className="comments">
              <h3>Bình luận</h3>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <p><strong>{comment.user}</strong>: {comment.text}</p>
                  </div>
                ))
              ) : (
                <p>Chưa có bình luận nào.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default ProductDetail;
