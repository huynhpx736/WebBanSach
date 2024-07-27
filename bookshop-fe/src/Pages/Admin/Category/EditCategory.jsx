import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AddEditCategory.css';

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/categories/${id}`)
      .then(response => {
        const category = response.data.data;
        setName(category.name);
      })
      .catch(err => {
        setError('Failed to fetch category.');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCategory = { name };

    axios.put(`http://localhost:8080/api/categories/update/${id}`, updatedCategory)
      .then(response => {
        setSuccess('Category updated successfully.');
        setError(null);
      })
      .catch(err => {
        setError('Failed to update category.');
        setSuccess(null);
      });
  };

  return (
    <div className="add-edit-category">
      <h2>Sửa thể loại</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên thể loại:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cập nhật thể loại</button>
      </form>
    </div>
  );
};

export default EditCategory;
