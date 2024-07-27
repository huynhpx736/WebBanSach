import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AddEditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [publisherId, setPublisherId] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(response => {
        const product = response.data.data;
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setPublicationYear(product.publicationYear);
        setPublisherId(product.publisher.id);
        setImage(product.image);
      })
      .catch(err => {
        setError('Failed to fetch product.');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      title,
      description,
      price,
      publicationYear,
      publisher: { id: publisherId },
      image,
    };

    axios.put(`http://localhost:8080/api/products/update/${id}`, updatedProduct)
      .then(response => {
        setSuccess('Product updated successfully.');
        setError(null);
      })
      .catch(err => {
        setError('Failed to update product.');
        setSuccess(null);
      });
  };

  return (
    <div className="add-edit-product">
      <h2>Sửa sản phẩm</h2>
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
        <button type="submit">Cập nhật sản phẩm</button>
      </form>
    </div>
  );
};

export default EditProduct;
