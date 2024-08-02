import React, { useState, useEffect } from 'react';
import { fetchAllCategories, createCategory, updateCategory, deleteCategory } from '../../../api';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ManageCategory.css';

Modal.setAppElement('#root');

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ name: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await fetchAllCategories();
      setCategories(categories);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch categories.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thể loại này không?')) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (err) {
        toast.error('Thể loại đã có liên kết không thể xóa');
      }
    }
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentCategory({ name: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setCurrentCategory({ ...currentCategory, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await updateCategory(currentCategory.id, currentCategory);
      } catch (err) {
        setError('Failed to update category.');
      }
    } else {
      try {
        await createCategory(currentCategory);
      } catch (err) {
        setError('Failed to create category.');
      }
    }
    setIsModalOpen(false);
    fetchCategories();
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
        <button className="btn btn-primary" onClick={handleAdd}>
          <FaPlus /> Thêm thể loại
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Tên thể loại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map(category => (
            <tr key={category.id}>
              {/* <td>{category.id}</td> */}
              <td>{category.name}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(category)}>
                  <FaEdit /> Sửa
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>
                  <FaTrash /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Category Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{isEditing ? 'Sửa thể loại' : 'Thêm thể loại'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tên thể loại</label>
            <input
              type="text"
              id="name"
              name="name"
              value={currentCategory.name}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Cập nhật' : 'Thêm mới'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
            Hủy
          </button>
        </form>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ManageCategory;



// // ManageCategory.jsx
// import React, { useEffect, useState } from 'react';
// import { fetchAllCategories, createCategory, updateCategory, deleteCategory } from '../../../api';
// import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
// import './ManageCategory.css';

// const ManageCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [categoryForm, setCategoryForm] = useState({ name: '' });
//   const [editingCategory, setEditingCategory] = useState(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const data = await fetchAllCategories();
//         setCategories(data);
//       } catch (error) {
//         console.error('Failed to load categories', error);
//       }
//     };
//     loadCategories();
//   }, []);

//   const handleAddCategory = async () => {
//     try {
//       await createCategory(categoryForm);
//       setShowForm(false);
//       setCategoryForm({ name: '' });
//       const data = await fetchAllCategories();
//       setCategories(data);
//     } catch (error) {
//       console.error('Failed to add category', error);
//     }
//   };

//   const handleUpdateCategory = async () => {
//     try {
//       await updateCategory(editingCategory.id, categoryForm);
//       setShowForm(false);
//       setEditingCategory(null);
//       setCategoryForm({ name: '' });
//       const data = await fetchAllCategories();
//       setCategories(data);
//     } catch (error) {
//       console.error('Failed to update category', error);
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     try {
//       await deleteCategory(id);
//       const data = await fetchAllCategories();
//       setCategories(data);
//     } catch (error) {
//       console.error('Failed to delete category', error);
//     }
//   };

//   const handleEditCategory = (category) => {
//     setEditingCategory(category);
//     setCategoryForm({ name: category.name });
//     setShowForm(true);
//   };

//   return (
//     <div className="manage-category">
//       <button onClick={() => { setShowForm(true); setEditingCategory(null); }} className="btn btn-primary">
//         <FaPlus /> Add Category
//       </button>
//       {showForm && (
//         <div className="form-container">
//           <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
//           <input
//             type="text"
//             value={categoryForm.name}
//             onChange={(e) => setCategoryForm({ name: e.target.value })}
//             placeholder="Category Name"
//           />
//           <button onClick={editingCategory ? handleUpdateCategory : handleAddCategory} className="btn btn-save">
//             Save
//           </button>
//           <button onClick={() => setShowForm(false)} className="btn btn-cancel">
//             Cancel
//           </button>
//         </div>
//       )}
//       <table className="category-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category) => (
//             <tr key={category.id}>
//               <td>{category.name}</td>
//               <td>
//                 <button onClick={() => handleEditCategory(category)} className="btn btn-edit">
//                   <FaEdit /> Edit
//                 </button>
//                 <button onClick={() => handleDeleteCategory(category.id)} className="btn btn-delete">
//                   <FaTrashAlt /> Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageCategory;

