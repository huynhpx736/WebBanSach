import React, { useState, useEffect } from 'react';
import { fetchAllPublishers, createPublisher, updatePublisher, deletePublisher } from '../../../api';
import { Button, Modal, Form, Input, Table, notification, Popconfirm } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './ManagePublisher.css'; // Import the CSS file for styling

const ManagePublisher = () => {
  const [publishers, setPublishers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPublisher, setCurrentPublisher] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    try {
      const data = await fetchAllPublishers();
      setPublishers(data);
    } catch (error) {
      notification.error({ message: 'Không thể tải danh sách nhà xuất bản.' });
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredPublishers = publishers.filter(publisher =>
    publisher.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (publisher = null) => {
    setCurrentPublisher(publisher);
    if (publisher) {
      form.setFieldsValue(publisher);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentPublisher) {
        await updatePublisher(currentPublisher.id, values);
      } else {
        await createPublisher(values);
      }
      fetchPublishers();
      setIsModalVisible(false);
      notification.success({ message: 'Nhà xuất bản đã được lưu thành công.' });
    } catch (error) {
      notification.error({ message: 'Lưu nhà xuất bản không thành công.' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePublisher(id);
      fetchPublishers();
      notification.success({ message: 'Nhà xuất bản đã được xóa thành công.' });
    } catch (error) {
      notification.error({ message: 'Không thể xóa nhà xuất bản. Có thể nhà xuất bản đang được liên kết với dữ liệu khác.' });
    }
  };

  return (
    <div className="manage-publisher">
      <Input
        placeholder="Tìm kiếm nhà xuất bản"
        value={searchText}
        onChange={handleSearch}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16, width: '300px' }}
      />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
        Thêm Nhà Xuất Bản
      </Button>
      <Table
        dataSource={filteredPublishers}
        rowKey="id"
        style={{ marginTop: 16 }}
      >
        <Table.Column title="Tên" dataIndex="name" key="name" />
        <Table.Column title="Địa Chỉ" dataIndex="address" key="address" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column
          title="Hành Động"
          key="actions"
          render={(text, record) => (
            <span>
              <Button
                icon={<EditOutlined />}
                onClick={() => showModal(record)}
                style={{ marginRight: 8 }}
              />
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa nhà xuất bản này không?"
                onConfirm={() => handleDelete(record.id)}
                okText="Có"
                cancelText="Không"
              >
                <Button icon={<DeleteOutlined />} />
              </Popconfirm>
            </span>
          )}
        />
      </Table>
      <Modal
        title={currentPublisher ? "Sửa Nhà Xuất Bản" : "Thêm Nhà Xuất Bản"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhà xuất bản!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa Chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhà xuất bản!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email nhà xuất bản!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagePublisher;
