import React, { useState, useEffect } from 'react';
import { fetchAllTags, createTag, updateTag, deleteTag } from '../../../api';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ManageTag.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ManageTag = () => {
  const [tags, setTags] = useState([]);
  const [editingTag, setEditingTag] = useState(null);
  const [newTagName, setNewTagName] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      const data = await fetchAllTags();
      data.sort((a, b) => b.id - a.id);
      setTags(data);
    } catch (error) {
      console.error('Không thể tải danh sách tag:', error);
    }
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      toast.error('Tên tag không được để trống!');
      return;
    }

    try {
      const newTag = { name: newTagName };
      await createTag(newTag);
      toast.success('tag đã được tạo thành công!');
      closeModal();
      loadTags();
    } catch (error) {
      console.error('Không thể tạo tag:', error);
      toast.error('Tạo tag thất bại.');
    }
  };

  const handleUpdateTag = async () => {
    if (!newTagName.trim()) {
      toast.error('Tên tag không được để trống!');
      return;
    }

    if (editingTag) {
      try {
        const updatedTag = { name: newTagName };
        await updateTag(editingTag.id, updatedTag);
        toast.success('tag đã được cập nhật thành công!');
        closeModal();
        loadTags();
      } catch (error) {
        console.error('Không thể cập nhật tag:', error);
        toast.error('Cập nhật tag thất bại.');
      }
    }
  };

  const handleDeleteTag = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tag này?')) {
      try {
        await deleteTag(id);
        toast.success('tag đã được xóa thành công!');
        loadTags();
      } catch (error) {
        console.error('Không thể xóa tag:', error);
        toast.error('Xóa tag thất bại. Tag đã được gắn vào sản phẩm.');
      }
    }
  };

  const openModal = (mode, tag) => {
    setModalMode(mode);
    setEditingTag(tag);
    setNewTagName(tag ? tag.name : '');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingTag(null);
    setNewTagName('');
  };

  return (
    <div className="manage-tag">
      {/* <h1>Quản lý tag</h1> */}
      <button className="add-button" onClick={() => openModal('create')}>
        <FaPlus /> Thêm tag
      </button>
      <table className="tag-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td>{tag.name}</td>
              <td>
                <button onClick={() => openModal('edit', tag)}>
                  <FaEdit /> Sửa
                </button>
                <button onClick={() => handleDeleteTag(tag.id)}>
                  <FaTrash /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Tag Modal"
        className="modal-category"
        overlayClassName="overlay"
      >
        <h2>{modalMode === 'create' ? 'Thêm tag Mới' : 'Sửa tag'}</h2>
        <input
          type="text"
          placeholder="Tên tag"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
        />
        <button className="btn-add-tag" onClick={modalMode === 'create' ? handleCreateTag : handleUpdateTag}>
          {modalMode === 'create' ? 'Tạo' : 'Cập Nhật'}
        </button>
        <button className="btn-cancel-tag" onClick={closeModal}>Hủy</button>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ManageTag;
