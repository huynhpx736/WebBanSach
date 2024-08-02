// ManageProduct.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchAllProducts, fetchProductById, createProduct, updateProduct, deleteProduct, fetchCategories, fetchPublishers, fetchAuthors, fetchTags } from '../../../api'; // Import API functions
import { FaEdit, FaTrash, FaPlus, FaSearch, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import icons
import './ManaProduct.css';
// Component for managing products
const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [productForm, setProductForm] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    publicationYear: '',
    publisherId: '',
    salesVolume: '',
    starRating: '',
    image: null,
    weight: '',
    categories: [],
    authors: [],
    tags: [],
    status: 1
  });
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [tags, setTags] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    // Fetch all products and categories
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse, publishersResponse, authorsResponse, tagsResponse] = await Promise.all([
          fetchAllProducts(),
          fetchCategories(),
          fetchPublishers(),
          fetchAuthors(),
          fetchTags()
        ]);
        setProducts(productsResponse);
        setCategories(categoriesResponse);
        setPublishers(publishersResponse);
        setAuthors(authorsResponse);
        setTags(tagsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductForm({ ...productForm, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
    setProductForm({ ...productForm, categories: selectedCategories });
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, option => option.value);
    setProductForm({ ...productForm, tags: selectedTags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProduct(productForm.id, productForm);
        toast.success('Cập nhật sản phẩm thành công');
      } else {
        await createProduct(productForm);
        toast.success('Thêm sản phẩm thành công');
      }
      setShowForm(false);
      setProductForm({
        id: '',
        title: '',
        description: '',
        price: '',
        publicationYear: '',
        publisherId: '',
        salesVolume: '',
        starRating: '',
        image: null,
        weight: '',
        categories: [],
        authors: [],
        tags: [],
        status: 1
      });
      setImagePreview('');
      setIsEditing(false);
      const updatedProducts = await fetchAllProducts();
      setProducts(updatedProducts);
    } catch (error) {
      toast.error('Lỗi khi lưu sản phẩm');
    }
  };

  const handleEdit = async (id) => {
    try {
      const { data } = await fetchProductById(id);
      setProductForm(data);
      setImagePreview(data.image ? `http://localhost:8080${data.image}` : '');
      setIsEditing(true);
      setShowForm(true);
    } catch (error) {
      toast.error('Lỗi khi lấy thông tin sản phẩm');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteProduct(id);
        toast.success('Xóa sản phẩm thành công');
        const updatedProducts = await fetchAllProducts();
        setProducts(updatedProducts);
      } catch (error) {
        toast.error('Lỗi khi xóa sản phẩm');
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateProduct(id, { ...productForm, status });
      toast.success('Cập nhật trạng thái sản phẩm thành công');
      const updatedProducts = await fetchAllProducts();
      setProducts(updatedProducts);
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái sản phẩm');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/products/search?query=${searchTerm}`);
      setProducts(response.data.data);
    } catch (error) {
      toast.error('Lỗi khi tìm kiếm sản phẩm');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-search"><FaSearch /></button>
        <button onClick={() => setShowForm(true)} className="btn btn-add"><FaPlus /> Thêm sản phẩm</button>
      </div>
      {showForm && (
        <div className="form-container">
          <h3>{isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</h3>
          <form onSubmit={handleSubmit}>
            <label>Tiêu đề</label>
            <input type="text" name="title" value={productForm.title} onChange={handleChange} required />
            <label>Mô tả</label>
            <textarea name="description" value={productForm.description} onChange={handleChange} required />
            <label>Giá</label>
            <input type="number" name="price" value={productForm.price} onChange={handleChange} required />
            <label>Năm xuất bản</label>
            <input type="number" name="publicationYear" value={productForm.publicationYear} onChange={handleChange} required />
            <label>Nhà xuất bản</label>
            <select name="publisherId" value={productForm.publisherId} onChange={handleChange} required>
              {publishers.map(publisher => (
                <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
              ))}
            </select>
            <label>Khối lượng</label>
            <input type="number" name="weight" value={productForm.weight} onChange={handleChange} />
            <label>Danh mục</label>
            <select multiple name="categories" onChange={handleCategoryChange} value={productForm.categories}>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <label>Tags</label>
            <select multiple name="tags" onChange={handleTagChange} value={productForm.tags}>
              {tags.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
            <label>Tác giả</label>
            <select multiple name="authors" value={productForm.authors} onChange={(e) => {
              const selectedAuthors = Array.from(e.target.selectedOptions, option => option.value);
              setProductForm({ ...productForm, authors: selectedAuthors });
            }}>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
            <label>Hình ảnh</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
            <button type="submit" className="btn btn-save">Lưu</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-cancel">Hủy</button>
          </form>
        </div>
      )}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tiêu đề</th>
            {/* <th>Trạng thái</th> */}
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              {/* <td><img src={`http://localhost:8080${product.image}`} alt={product.title} style={{ maxWidth: '100px' }} /></td> */}
              <td><img src={product.image} alt={product.title} style={{ maxWidth: '100px' }} /></td>
              <td>{product.title}</td>
              {/* <td>{product.status === 1 ? 'Kích hoạt' : 'Vô hiệu hóa'}</td> */}
              <td>
                <button onClick={() => handleEdit(product.id)} className="btn btn-edit"><FaEdit /> Sửa</button>
                <button onClick={() => handleDelete(product.id)} className="btn btn-delete"><FaTrash /> Xóa</button>
                {/* <button onClick={() => handleStatusChange(product.id, product.status === 1 ? 0 : 1)} className="btn btn-status">
                  {product.status === 1 ? <FaTimesCircle /> : <FaCheckCircle />} {product.status === 1 ? 'Vô hiệu hóa' : 'Kích hoạt'}
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
