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
      notification.error({ message: 'Failed to fetch authors.' });
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
      notification.success({ message: 'Author saved successfully.' });
    } catch (error) {
      notification.error({ message: 'Failed to save author.' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      fetchAuthors();
      notification.success({ message: 'Author deleted successfully.' });
    } catch (error) {
      notification.error({ message: 'Failed to delete author. Author might be linked with other data.' });
    }
  };

  return (
    <div className="manage-author">
      <Input
        placeholder="Search authors"
        value={searchText}
        onChange={handleSearch}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16, width: '300px' }}
      />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
        Add Author
      </Button>
      <Table
        dataSource={filteredAuthors}
        rowKey="id"
        style={{ marginTop: 16 }}
      >
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Biography" dataIndex="biography" key="biography" />
        <Table.Column
          title="Actions"
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
        title={currentAuthor ? "Edit Author" : "Add Author"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input author name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="biography"
            label="Biography"
            rules={[{ required: true, message: 'Please input author biography!' }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageAuthor;
