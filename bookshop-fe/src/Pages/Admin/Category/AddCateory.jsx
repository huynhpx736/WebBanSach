import React, { useState } from 'react';
import axios from 'axios';
import './AddEditCategory.css';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = { name };

    axios.post('http://localhost:8080/api/categories/create', newCategory)
      .then(response => {
        setSuccess('Category created successfully.');
        setError(null);
        setName('');
      })
      .catch(err => {
        setError('Failed to create category.');
        setSuccess(null);
      });
  };

  return (
    <div className="add-edit-category">
      <h2>Thêm thể loại</h2>
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
        <button type="submit">Thêm thể loại</button>
      </form>
    </div>
  );
};

export default AddCategory;
