import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManageCategory.css';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('http://localhost:8080/api/categories/get-all')
      .then(response => {
        setCategories(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch categories.');
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/categories/delete/${id}`)
      .then(() => {
        fetchCategories();
      })
      .catch(err => {
        setError('Failed to delete category.');
      });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="manage-category">
      <h1>Quản lý thể loại</h1>
      <div className="search-add">
        <input
          type="text"
          placeholder="Tìm kiếm thể loại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => navigate('/admin/categories/add')}>Thêm thể loại</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên thể loại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button className="btn btn-warning" onClick={() => navigate(`/admin/categories/edit/${category.id}`)}>Sửa</button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(category.id)}
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

export default ManageCategory;
