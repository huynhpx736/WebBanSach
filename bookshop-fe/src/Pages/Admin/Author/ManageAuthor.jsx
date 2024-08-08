// ManageAuthor.jsx
import React, { useState, useEffect } from 'react';
import { fetchAllAuthors, createAuthor, updateAuthor, deleteAuthor } from '../../../api';
import { Button, Modal, Form, Table, Input, notification, Popconfirm } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './ManageAuthor.css';

const ManageAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await fetchAllAuthors();
      setAuthors(data);
    } catch (error) {
      notification.error({ message: 'Tải danh sách tác giả thất bại.' });
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (author = null) => {
    setCurrentAuthor(author);
    if (author) {
      form.setFieldsValue(author);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentAuthor) {
        await updateAuthor(currentAuthor.id, values);
      } else {
        await createAuthor(values);
      }
      fetchAuthors();
      setIsModalVisible(false);
      notification.success({ message: 'Thêm mới thành công.' });
    } catch (error) {
      notification.error({ message: 'Thêm mới thất bại.' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      fetchAuthors();
      notification.success({ message: 'Xóa thành công.' });
    } catch (error) {
      notification.error({ message: 'Xóa thất bại, tác giả có liên kết với sách.' });
    }
  };

  return (
    <div className="manage-author">
      <Input
        placeholder="Tìm tác giả"
        value={searchText}
        onChange={handleSearch}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16, width: '300px' }}
      />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
        Thêm
      </Button>
      <Table
        dataSource={filteredAuthors}
        rowKey="id"
        style={{ marginTop: 16 }}
      >
        <Table.Column title="Tên" dataIndex="name" key="name" />
        <Table.Column title="Tiểu sử" dataIndex="biography" key="biography" />
        <Table.Column
          title="Hành động"
          key="actions"
          render={(text, record) => (
            <span>
              <Button
                icon={<EditOutlined />}
                onClick={() => showModal(record)}
                style={{ marginRight: 8 }}
              />
              <Popconfirm
                title="Are you sure to delete this author?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button icon={<DeleteOutlined />} />
              </Popconfirm>
            </span>
          )}
        />
      </Table>
      <Modal
        title={currentAuthor ? "Sửa" : "Thêm mới"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên tác giả!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="biography"
            label="Tiểu sử, mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập tiểu sử!' }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageAuthor;
