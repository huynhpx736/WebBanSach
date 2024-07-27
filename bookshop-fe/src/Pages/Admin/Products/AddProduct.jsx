import React, { useState } from 'react';
import axios from 'axios';
import './AddEditProduct.css';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [publisherId, setPublisherId] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      description,
      price,
      publicationYear,
      publisher: { id: publisherId },
      image,
    };

    axios.post('http://localhost:8080/api/products/create', newProduct)
      .then(response => {
        setSuccess('Product created successfully.');
        setError(null);
        setTitle('');
        setDescription('');
        setPrice('');
        setPublicationYear('');
        setPublisherId('');
        setImage('');
      })
      .catch(err => {
        setError('Failed to create product.');
        setSuccess(null);
      });
  };

  return (
    <div className="add-edit-product">
      <h2>Thêm sản phẩm</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mô tả:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Giá:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Năm xuất bản:</label>
          <input
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nhà xuất bản ID:</label>
          <input
            type="number"
            value={publisherId}
            onChange={(e) => setPublisherId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hình ảnh:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
};

export default AddProduct;
