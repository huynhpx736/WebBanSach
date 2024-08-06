// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './ManageProducts.css';

// // const ManageProduct = () => {
// //   const [products, setProducts] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   const fetchProducts = () => {
// //     axios.get('http://localhost:8080/api/products/get-all')
// //       .then(response => {
// //         setProducts(response.data.data);
// //         setLoading(false);
// //       })
// //       .catch(err => {
// //         setError('Failed to fetch products.');
// //         setLoading(false);
// //       });
// //   };

// //   const handleDelete = (id) => {
// //     axios.delete(`http://localhost:8080/api/products/delete/${id}`)
// //       .then(() => {
// //         fetchProducts();
// //       })
// //       .catch(err => {
// //         setError('Failed to delete product.');
// //       });
// //   };

// //   const filteredProducts = products.filter(product =>
// //     product.title.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>{error}</p>;

// //   return (
// //     <div className="manage-product">
// //       <h1>Quản lý sản phẩm</h1>
// //       <div className="search-add">
// //         <input
// //           type="text"
// //           placeholder="Tìm kiếm sản phẩm..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //         <button className="btn btn-primary">Thêm sản phẩm</button>
// //       </div>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Tiêu đề</th>
// //             <th>Giá</th>
// //             <th>Hành động</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredProducts.map(product => (
// //             <tr key={product.id}>
// //               <td>{product.id}</td>
// //               <td>{product.title}</td>
// //               <td>{product.price}</td>
// //               <td>
// //                 <button className="btn btn-warning">Sửa</button>
// //                 <button
// //                   className="btn btn-danger"
// //                   onClick={() => handleDelete(product.id)}
// //                 >
// //                   Xóa
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default ManageProduct;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './ManageProducts.css';

// const ManageProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

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
//         <button className="btn btn-primary" onClick={() => navigate('/admin/products/add')}>Thêm sản phẩm</button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Mã</th>
//             <th>Ảnh</th>
//             <th>Tiêu đề</th>
//             <th>Giá</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map(product => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>
//                 <img src={product.image} alt={product.title} />
//               </td>
//               <td>{product.title}</td>
//               <td>{product.price}</td>
//               <td>
//                 <button className="btn btn-warning" onClick={() => navigate(`/admin/products/edit/${product.id}`)}>Sửa</button>
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





















// import React, { useState, useEffect } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import {
//   fetchAllProducts,
//   fetchProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   uploadProductImage,
//   fetchCategories,
//   fetchAuthors,
//   fetchTags,
//   fetchPublishers
// } from '../../../api';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './ManaProduct.css';
// import { Link } from 'react-router-dom';

// const ManageProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [publishers, setPublishers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(10);
//   const [showModal, setShowModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [productForm, setProductForm] = useState({
//     title: '',
//     description: '',
//     price: '',
//     salesVolume: '',
//     weight: '',
//     publicationYear: '',
//     publisher: '',
//     categories: [],
//     authors: [],
//     tags: [],
//     status: 1,
//     priority: 0,
//     image: ''
//   });
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     loadProducts();
//     loadCategories();
//     loadAuthors();
//     loadTags();
//     loadPublishers();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const products = await fetchAllProducts();
//       setProducts(products);
//     } catch (error) {
//       console.log(error);
//       toast.error('Không thể tải sản phẩm.');
//     }
//   };

//   const loadCategories = async () => {
//     try {
//       const categories = await fetchCategories();
//       setCategories(categories);
//     } catch (error) {
//       toast.error('Không thể tải thể loại.');
//     }
//   };

//   const loadAuthors = async () => {
//     try {
//       const authors = await fetchAuthors();
//       setAuthors(authors);
//     } catch (error) {
//       toast.error('Không thể tải tác giả.');
//     }
//   };

//   const loadTags = async () => {
//     try {
//       const tags = await fetchTags();
//       setTags(tags);
//     } catch (error) {
//       toast.error('Không thể tải tag.');
//     }
//   };

//   const loadPublishers = async () => {
//     try {
//       const publishers = await fetchPublishers();
//       setPublishers(publishers);
//     } catch (error) {
//       toast.error('Không thể tải nhà xuất bản.');
//     }
//   };

//   const handleEdit = async (id) => {
//     try {
//       const product = await fetchProductById(id);
//       setEditingProduct(product);
//       setProductForm({
//         title: product.title,
//         description: product.description,
//         price: product.price,
//         salesVolume: product.salesVolume,
//         weight: product.weight,
//         publicationYear: product.publicationYear,
//         publisher: product.publisher ? product.publisher.id : '',
//         categories: product.categories.map(category => category.id),
//         authors: product.authors.map(author => author.id),
//         tags: product.tags.map(tag => tag.id),
//         status: product.status,
//         priority: product.priority
//       });
//       setShowModal(true);
//     } catch (error) {
//       console.log(error);
//       toast.error('Không thể tải sản phẩm.');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
//       try {
//         await deleteProduct(id);
//         loadProducts();
//         toast.success('Xóa sản phẩm thành công.');
//       } catch (error) {
//         toast.error('Không thể xóa sản phẩm.');
//       }
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const product = await fetchProductById(id);
//       product.status = newStatus;
//       await updateProduct(id, product);
//       loadProducts();
//       toast.success('Cập nhật trạng thái sản phẩm thành công.');
//     } catch (error) {
//       toast.error('Không thể cập nhật trạng thái sản phẩm.');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const productData = {
//         ...productForm,
//         publisher: productForm.publisher ? { id: productForm.publisher } : null,
//         categories: productForm.categories.map(id => ({ id })),
//         authors: productForm.authors.map(id => ({ id })),
//         tags: productForm.tags.map(id => ({ id })),
//       };

//       if (editingProduct) {
//         await updateProduct(editingProduct.id, productData);
//         if (selectedImage) {
//           await uploadProductImage(editingProduct.id, selectedImage);
//         }
//         toast.success('Cập nhật sản phẩm thành công.');
//       } else {
//         const newProduct = await createProduct(productData);
//         if (selectedImage) {
//           await uploadProductImage(newProduct.id, selectedImage);
//         }
//         toast.success('Tạo sản phẩm thành công.');
//       }
//       resetForm();
//       loadProducts();
//     } catch (error) {
//       toast.error('Không thể lưu sản phẩm.');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductForm(prevForm => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const handleDescriptionChange = (event, editor) => {
//     const data = editor.getData();
//     setProductForm(prevForm => ({
//       ...prevForm,
//       description: data,
//     }));
//   };

//   const handleSelectChange = (e) => {
//     const { name, value, options } = e.target;

//     if (name === 'categories' || name === 'authors' || name === 'tags') {
//       const values = Array.from(options)
//         .filter(option => option.selected)
//         .map(option => option.value);
//       setProductForm(prevForm => ({
//         ...prevForm,
//         [name]: values,
//       }));
//     } else if (name === 'publisher') {
//       setProductForm(prevForm => ({
//         ...prevForm,
//         [name]: value,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     setSelectedImage(e.target.files[0]);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//   const resetForm = () => {
//     setProductForm({
//       title: '',
//       description: '',
//       price: '',
//       salesVolume: '',
//       weight: '',
//       publicationYear: '',
//       publisher: '',
//       categories: [],
//       authors: [],
//       tags: [],
//       status: 1,
//       priority: 0,
//       image: ''
//     });
//     setSelectedImage(null);
//     setEditingProduct(null);
//     setShowModal(false);
//   };

//   return (
//     <div className="manage-product">
//       <h1>Quản lý sản phẩm</h1>
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Tìm kiếm sản phẩm..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>
//       <button onClick={() => { resetForm(); setShowModal(true); }} className="btn btn-add">
//         <i className="fas fa-plus"></i> Thêm sản phẩm
//       </button>
//       <table className="product-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Hình ảnh</th>
//             <th>Tiêu đề</th>
//             <th>Trạng thái</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentProducts.map(product => (
//             <tr key={product.id}>
//             <td>{product.id}</td>
//               <td> <Link to={`/product/${product.id}`} ><img src={product.image} alt={product.title} className="image-preview" /> </Link></td>
//               <td>{product.title}</td>
//               <td>{product.status === 1 ? 'Đang bán' : 'Không còn bán'}</td>
//               <td>
//                 <button onClick={() => handleEdit(product.id)} className="btn btn-edit">
//                   <i className="fas fa-edit"></i> Sửa
//                 </button>
//                 <button onClick={() => handleDelete(product.id)} className="btn btn-delete">
//                   <i className="fas fa-trash"></i> Xóa
//                 </button>
//                 <button
//                   onClick={() => handleStatusChange(product.id, product.status === 1 ? 0 : 1)}
//                   className="btn btn-toggle-status"
//                 >
//                   {product.status === 1 ? (
//                     <i className="fas fa-toggle-on"></i>
//                   ) : (
//                     <i className="fas fa-toggle-off"></i>
//                   )}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(pageNumber => (
//           <button
//             key={pageNumber}
//             onClick={() => handlePageChange(pageNumber + 1)}
//             className={currentPage === pageNumber + 1 ? 'active' : ''}
//           >
//             {pageNumber + 1}
//           </button>
//         ))}
//       </div>
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>Tiêu đề</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={productForm.title}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Mô tả</label>
//                 <CKEditor
//                   editor={ClassicEditor}
//                   data={productForm.description}
//                   onChange={handleDescriptionChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Giá</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={productForm.price}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Khối lượng bán</label>
//                 <input
//                   type="number"
//                   name="salesVolume"
//                   value={productForm.salesVolume}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Khối lượng</label>
//                 <input
//                   type="number"
//                   name="weight"
//                   value={productForm.weight}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Năm xuất bản</label>
//                 <input
//                   type="number"
//                   name="publicationYear"
//                   value={productForm.publicationYear}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Nhà xuất bản</label>
//                 <select
//                   name="publisher"
//                   value={productForm.publisher}
//                   onChange={handleSelectChange}
//                   required
//                 >
//                   <option value="">Chọn nhà xuất bản</option>
//                   {publishers.map(publisher => (
//                     <option key={publisher.id} value={publisher.id}>
//                       {publisher.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Thể loại</label>
//                 <select
//                   name="categories"
//                   multiple
//                   value={productForm.categories}
//                   onChange={handleSelectChange}
//                   required
//                 >
//                   {categories.map(category => (
//                     <option key={category.id} value={category.id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Tác giả</label>
//                 <select
//                   name="authors"
//                   multiple
//                   value={productForm.authors}
//                   onChange={handleSelectChange}
//                   required
//                 >
//                   {authors.map(author => (
//                     <option key={author.id} value={author.id}>
//                       {author.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Tags</label>
//                 <select
//                   name="tags"
//                   multiple
//                   value={productForm.tags}
//                   onChange={handleSelectChange}
//                   required
//                 >
//                   {tags.map(tag => (
//                     <option key={tag.id} value={tag.id}>
//                       {tag.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Trạng thái</label>
//                 <select
//                   name="status"
//                   value={productForm.status}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value={1}>Đang bán</option>
//                   <option value={0}>Không còn bán</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Độ ưu tiên</label>
//                 <input
//                   type="number"
//                   name="priority"
//                   value={productForm.priority}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Hình ảnh</label>
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                 />
//               </div>
//               <button type="submit" className="btn btn-save">
//                 {editingProduct ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
//               </button>
//               <button type="button" onClick={resetForm} className="btn btn-cancel">
//                 Hủy
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default ManageProduct;
