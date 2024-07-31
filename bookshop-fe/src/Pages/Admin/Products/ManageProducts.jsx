// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ManageProducts.css';

// const ManageProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     axios.get('http://localhost:8080/api/products/get-all')
//       .then(response => {
//         setProducts(response.data.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to fetch products.');
//         setLoading(false);
//       });
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:8080/api/products/delete/${id}`)
//       .then(() => {
//         fetchProducts();
//       })
//       .catch(err => {
//         setError('Failed to delete product.');
//       });
//   };

//   const filteredProducts = products.filter(product =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="manage-product">
//       <h1>Quản lý sản phẩm</h1>
//       <div className="search-add">
//         <input
//           type="text"
//           placeholder="Tìm kiếm sản phẩm..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button className="btn btn-primary">Thêm sản phẩm</button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Tiêu đề</th>
//             <th>Giá</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map(product => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.title}</td>
//               <td>{product.price}</td>
//               <td>
//                 <button className="btn btn-warning">Sửa</button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(product.id)}
//                 >
//                   Xóa
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageProduct;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManageProducts.css';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/products/get-all')
      .then(response => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch products.');
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/products/delete/${id}`)
      .then(() => {
        fetchProducts();
      })
      .catch(err => {
        setError('Failed to delete product.');
      });
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="manage-product">
      <h1>Quản lý sản phẩm</h1>
      <div className="search-add">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => navigate('/admin/products/add')}>Thêm sản phẩm</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Ảnh</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <button className="btn btn-warning" onClick={() => navigate(`/admin/products/edit/${product.id}`)}>Sửa</button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProduct;
