import React, { useState, useEffect } from 'react';
import { fetchAllProducts, fetchProductById, createProduct, updateProduct, deleteProduct, uploadProductImage, fetchCategories, fetchAuthors, fetchTags, fetchPublishers } from '../../../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ManaProduct.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

// import { Navigate } from 'react-router-dom';
// import { CKEditor } from '@ckeditor/ckeditor5-react';

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
    starRating: '',
    weight: '',
    topic: '',
    content: '',
    publicationYear: '',
    publisher: '',
    categories: [],
    authors: [],
    tags: [],
    status: 1,
    prioity: 0,
    quantity_sold:0 ,
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
      //sắp xếp theo id giảm dần
      products.sort((a, b) => b.id - a.id);
      setProducts(products);
      console.log(products);
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
        starRating: product.starRating,
        weight: product.weight,
        topic: product.topic,
        content: product.content,
        publicationYear: product.publicationYear,
        publisher: product.publisher ? product.publisher.id : '',
        categories: product.categories.map(category => category.id),
        authors: product.authors.map(author => author.id),
        tags: product.tags.map(tag => tag.id),
        status: product.status,
        quantity_sold: product.quantity_sold,
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
        toast.error('Không thể xóa sản phẩm, sản phẩm thuộc đơn hàng.');
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
    console.log(productForm);
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
      starRating: '',
      weight: '',
      topic: '',
      content: '',
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

  const navigate = useNavigate();
  const handleCreateImport = () => {
    navigate('/admin/create-import-report');
  };

  return (
    <div className="manage-product">
      <h1>Quản lý sản phẩm</h1>
      {/* <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateImport}
                    style={{ backgroundColor: '#1976d2', color: '#fff' }}
                >
                    Tạo phiếu nhập
                </Button> */}
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
        <div className="manaProduct-modal">
          <div className="manaProduct-modal-content">
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
                  value={productForm.price} min={0}
                  onChange={handleInputChange}
                  required
                />
              </div>
             <div className="form-group">
                <label htmlFor="salesVolume">Còn lại</label>
                <input
                  type="number"
                  id="salesVolume"
                  name="salesVolume"
              // Số lượng khi tạo sản phẩm là 0 và không thể thay đổi, nếu khi sửa sản phẩm cũng không thể thay đổi số lượng
                  value={editingProduct ? productForm.salesVolume : 0}
                  onChange={handleInputChange}
                  disabled
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
                <label htmlFor="topic">Chủ đề:</label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={productForm.topic}
                  onChange={handleInputChange}
                  // required
                />
              </div>
              {/* //Mục lục có thể định dạng bằng html ckeditor
              <div className="form-group">
                <label htmlFor="content">Mục lục:</label>
                <CKEditor
                  editor={ ClassicEditor }
                  data={productForm.content}
                  onChange={ ( event, editor ) => {
                      const data = editor.getData();
                      setProductForm(prevForm => ({
                        ...prevForm,
                        content: data,
                      }));
                  } }
              />
              </div> */}
              <div className="form-group">
                <label htmlFor="content">Mục lục:</label>
                <textarea
                  id="content"
                  name="content"
                  value={productForm.content}
                  onChange={handleInputChange}
                  // required
                ></textarea>
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


