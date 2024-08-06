// // ManageProduct.jsx
// import React, { useState, useEffect } from 'react';
// import { fetchAllProducts, fetchProductById, createProduct, updateProduct, deleteProduct, uploadProductImage, fetchCategories, fetchAuthors, fetchTags, fetchPublishers } from '../../../api';
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
//     prioity: 0,
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
//       setShowModal(false);
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
//       <button onClick={() => setShowModal(true)} className="btn btn-add">
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
//               <td>{product.id}</td>
//               {/* <td><img src={product.image} alt={product.title} className="image-preview" /></td> */}
//                <td> <Link to={`/product/${product.id}`} ><img src={product.image} alt={product.title} className="image-preview" /> </Link></td>
//               <td>{product.title}</td>
//               <td>{product.status === 1 ? 'Đang bán' : 'Không còn bán'}</td>
//               <td>
//                 <button onClick={() => handleEdit(product.id)} className="btn btn-edit">
//                   <i className="fas fa-edit"></i> Sửa
//                 </button>
//                 <button onClick={() => handleDelete(product.id)} className="btn btn-delete">
//                   <i className="fas fa-trash-alt"></i> Xóa
//                 </button>
//                 <button onClick={() => handleStatusChange(product.id, product.status === 1 ? 0 : 1)} className="btn btn-status">
//                   {product.status === 1 ? 'Ngừng bán' : 'Bán lại'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => handlePageChange(index + 1)}
//             className={currentPage === index + 1 ? 'active' : ''}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h2>
//             <form onSubmit={handleSubmit}>
//               <label>Tiêu đề</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={productForm.title}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label>Mô tả</label>
//               <textarea
//                 name="description"
//                 value={productForm.description}
//                 onChange={handleInputChange}
//                 required
//               ></textarea>
//               <label>Giá</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={productForm.price}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label>Khối lượng</label>
//               <input
//                 type="number"
//                 name="weight"
//                 value={productForm.weight}
//                 onChange={handleInputChange}
//               />
//               <label>Số lượng tồn</label>
//               <input
//                 type="number"
//                 name="salesVolume"
//                 value={productForm.salesVolume}
//                 onChange={handleInputChange}
//               />
     
//               <label>Năm xuất bản</label>
//               <input
//                 type="number"
//                 name="publicationYear"
//                 value={productForm.publicationYear}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label>Nhà xuất bản</label>
//               <select
//                 name="publisher"
//                 value={productForm.publisher || ''}
//                 onChange={handleSelectChange}
//                 required
//               >
//                 <option value="">Chọn nhà xuất bản</option>
//                 {publishers.map(publisher => (
//                   <option key={publisher.id} value={publisher.id}>
//                     {publisher.name}
//                   </option>
//                 ))}
//               </select>
//               <label>Thể loại</label>
//               <select
//                 name="categories"
//                 value={productForm.categories}
//                 onChange={handleSelectChange}
//                 multiple
//                 required
//               >
//                 {categories.map(category => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//               <label>Tác giả</label>
//               <select
//                 name="authors"
//                 value={productForm.authors}
//                 onChange={handleSelectChange}
//                 multiple
//                 required
//               >
//                 {authors.map(author => (
//                   <option key={author.id} value={author.id}>
//                     {author.name}
//                   </option>
//                 ))}
//               </select>
//               <label>Tag</label>
//               <select
//                 name="tags"
//                 value={productForm.tags}
//                 onChange={handleSelectChange}
//                 multiple
//                 required
//               >
//                 {tags.map(tag => (
//                   <option key={tag.id} value={tag.id}>
//                     {tag.name}
//                   </option>
//                 ))}
//               </select>
//               <label>Hình ảnh</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//               <button type="submit" className="btn btn-submit">
//                 {editingProduct ? 'Cập nhật' : 'Tạo mới'}
//               </button>
//               <button type="button" onClick={() => setShowModal(false)} className="btn btn-cancel">
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




import React, { useState, useEffect } from 'react';
import { fetchAllProducts, fetchProductById, createProduct, updateProduct, deleteProduct, uploadProductImage, fetchCategories, fetchAuthors, fetchTags, fetchPublishers } from '../../../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ManaProduct.css';
import { Link } from 'react-router-dom';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [tags, setTags] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    salesVolume: '',
    weight: '',
    publicationYear: '',
    publisher: '',
    categories: [],
    authors: [],
    tags: [],
    status: 1,
    prioity: 0,
    image: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadAuthors();
    loadTags();
    loadPublishers();
  }, []);

  const loadProducts = async () => {
    try {
      const products = await fetchAllProducts();
      setProducts(products);
    } catch (error) {
      console.log(error);
      toast.error('Không thể tải sản phẩm.');
    }
  };

  const loadCategories = async () => {
    try {
      const categories = await fetchCategories();
      setCategories(categories);
    } catch (error) {
      toast.error('Không thể tải thể loại.');
    }
  };

  const loadAuthors = async () => {
    try {
      const authors = await fetchAuthors();
      setAuthors(authors);
    } catch (error) {
      toast.error('Không thể tải tác giả.');
    }
  };

  const loadTags = async () => {
    try {
      const tags = await fetchTags();
      setTags(tags);
    } catch (error) {
      toast.error('Không thể tải tag.');
    }
  };

  const loadPublishers = async () => {
    try {
      const publishers = await fetchPublishers();
      setPublishers(publishers);
    } catch (error) {
      toast.error('Không thể tải nhà xuất bản.');
    }
  };

  const handleEdit = async (id) => {
    try {
      const product = await fetchProductById(id);
      setEditingProduct(product);
      setProductForm({
        title: product.title,
        description: product.description,
        price: product.price,
        salesVolume: product.salesVolume,
        weight: product.weight,
        publicationYear: product.publicationYear,
        publisher: product.publisher ? product.publisher.id : '',
        categories: product.categories.map(category => category.id),
        authors: product.authors.map(author => author.id),
        tags: product.tags.map(tag => tag.id),
        status: product.status,
        image: product.image
      });
      setShowModal(true);
    } catch (error) {
      console.log(error);
      toast.error('Không thể tải sản phẩm.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteProduct(id);
        loadProducts();
        toast.success('Xóa sản phẩm thành công.');
      } catch (error) {
        toast.error('Không thể xóa sản phẩm.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const product = await fetchProductById(id);
      product.status = newStatus;
      await updateProduct(id, product);
      loadProducts();
      toast.success('Cập nhật trạng thái sản phẩm thành công.');
    } catch (error) {
      toast.error('Không thể cập nhật trạng thái sản phẩm.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...productForm,
        publisher: productForm.publisher ? { id: productForm.publisher } : null,
        categories: productForm.categories.map(id => ({ id })),
        authors: productForm.authors.map(id => ({ id })),
        tags: productForm.tags.map(id => ({ id })),
      };
      
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        if (selectedImage) {
          await uploadProductImage(editingProduct.id, selectedImage);
        }
        toast.success('Cập nhật sản phẩm thành công.');
      } else {
        const newProduct = await createProduct(productData);
        if (selectedImage) {
          await uploadProductImage(newProduct.id, selectedImage);
        }
        toast.success('Tạo sản phẩm thành công.');
      }
      resetForm();
      loadProducts();
    } catch (error) {
      toast.error('Không thể lưu sản phẩm.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  
  const handleSelectChange = (e) => {
    const { name, value, options } = e.target;

    if (name === 'categories' || name === 'authors' || name === 'tags') {
      const values = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setProductForm(prevForm => ({
        ...prevForm,
        [name]: values,
      }));
    } else if (name === 'publisher') {
      setProductForm(prevForm => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const resetForm = () => {
    setProductForm({
      title: '',
      description: '',
      price: '',
      salesVolume: '',
      weight: '',
      publicationYear: '',
      publisher: '',
      categories: [],
      authors: [],
      tags: [],
      status: 1,
      prioity: 0,
      image: ''
    });
    setSelectedImage(null);
    setEditingProduct(null);
    setShowModal(false);
  };

  return (
    <div className="manage-product">
      <h1>Quản lý sản phẩm</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <button onClick={() => {resetForm(); setShowModal(true);}} className="btn btn-add">
        <i className="fas fa-plus"></i> Thêm sản phẩm
      </button>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tiêu đề</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              {/* <td><img src={product.image} alt={product.title} className="image-preview" /></td> */}
               <td> <Link to={`/product/${product.id}`} ><img src={product.image} alt={product.title} className="image-preview" /> </Link></td>
              <td>{product.title}</td>
              <td>{product.status === 1 ? 'Đang bán' : 'Không còn bán'}</td>
              <td>
                <button onClick={() => handleEdit(product.id)} className="btn btn-edit">
                  <i className="fas fa-edit"></i> Sửa
                </button>
                <button onClick={() => handleDelete(product.id)} className="btn btn-delete">
                  <i className="fas fa-trash-alt"></i> Xóa
                </button>
                <button onClick={() => handleStatusChange(product.id, product.status === 1 ? 0 : 1)} className="btn btn-status">
                  {product.status === 1 ? 'Ngừng bán' : 'Bán lại'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={resetForm}>
              &times;
            </span>
            <h2>{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Tiêu đề:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={productForm.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Mô tả:</label>
                <textarea
                  id="description"
                  name="description"
                  value={productForm.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productForm.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="salesVolume">Số lượng bán:</label>
                <input
                  type="number"
                  id="salesVolume"
                  name="salesVolume"
                  value={productForm.salesVolume}
                  onChange={handleInputChange}
                  required
                />
              </div>
             
              <div className="form-group">
                <label htmlFor="publicationYear">Năm xuất bản:</label>
                <input
                  type="number"
                  id="publicationYear"
                  name="publicationYear"
                  value={productForm.publicationYear}
                  onChange={handleInputChange}
                  // required
                />
              </div>
              <div className="form-group">
                <label htmlFor="publisher">Nhà xuất bản:</label>
                <select
                  id="publisher"
                  name="publisher"
                  value={productForm.publisher}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Chọn nhà xuất bản</option>
                  {publishers.map(publisher => (
                    <option key={publisher.id} value={publisher.id}>
                      {publisher.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="categories">Thể loại:</label>
                <select
                  id="categories"
                  name="categories"
                  value={productForm.categories}
                  onChange={handleSelectChange}
                  multiple
                  required
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="authors">Tác giả:</label>
                <select
                  id="authors"
                  name="authors"
                  value={productForm.authors}
                  onChange={handleSelectChange}
                  multiple
                  required
                >
                  {authors.map(author => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tags:</label>
                <select
                  id="tags"
                  name="tags"
                  value={productForm.tags}
                  onChange={handleSelectChange}
                  multiple
                  // required
                >
                  {tags.map(tag => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="weight">Cân nặng:</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={productForm.weight}
                  onChange={handleInputChange}
                  // required
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="status">Trạng thái:</label>
                <select
                  id="status"
                  name="status"
                  value={productForm.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value={1}>Đang bán</option>
                  <option value={0}>Không còn bán</option>
                </select>
              </div> */}
             
              <div className="form-group">
                <label htmlFor="image">Hình ảnh:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
              <button type="submit" className="btn btn-save">
                {editingProduct ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ManageProduct;


