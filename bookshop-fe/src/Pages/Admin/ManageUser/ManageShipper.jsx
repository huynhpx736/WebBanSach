import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaLock, FaUnlock } from 'react-icons/fa';
import { register as apiRegister, getAllUserByRole, updateActive, fetchUserById } from '../../../api';
import './ManageShipper.css';

const ManageShipper = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullname, setFullname] = useState('');
  const [message, setMessage] = useState('');
  const [shipper, setShipper] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [shipperPerPage] = useState(10);

  useEffect(() => {
    loadShipper();
  }, []);

  const loadShipper = async () => {
    try {
      const response = await getAllUserByRole(3);
      setShipper(response);
    } catch (error) {
      console.error('Failed to fetch shipper:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !passwordConfirm || !email || !phone || !fullname) {
      setMessage('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (!/^[a-zA-Z0-9]*$/.test(username)) {
      setMessage('Tên đăng nhập không được chứa ký tự đặc biệt.');
      return;
    }

    if (password.length < 6) {
      setMessage('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    if (password !== passwordConfirm) {
      setMessage('Mật khẩu không trùng khớp.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setMessage('Email không hợp lệ.');
      return;
    }

    if (fullname.match(/\d+/g)) {
      setMessage('Họ tên không được chứa số.');
      return;
    }

    if (phone.length < 9 || phone.length > 13) {
      setMessage('Số điện thoại không hợp lệ.');
      return;
    }

    try {
      const response = await apiRegister(username, password, email, fullname, phone, 3);
      if (response.desc === 'User registered successfully') {
        setMessage('Đăng ký thành công.');
        setModalOpen(false);
        loadShipper();
        return;
      }
      if (response.desc === 'Username already exists') {
        setMessage('Tên đăng nhập đã tồn tại.');
        return;
      }
      if (response.desc === 'Email already exists') {
        setMessage('Email đã tồn tại.');
        return;
      }
      setMessage('Đăng ký thất bại.');
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  const handleActive = async (id) => {
    try {
      const user = await fetchUserById(id);
      const newActive = user.active === 1 ? 0 : 1;
      const notify = newActive ? 'Đã mở khóa tài khoản' : 'Đã khóa tài khoản';
      await updateActive(id, newActive);
      alert(notify);
      loadShipper();
    } catch (error) {
      console.error('Failed to update active:', error);
    }
  };

  const filteredShippers = shipper.filter((item) =>
    item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastShipper = currentPage * shipperPerPage;
  const indexOfFirstShipper = indexOfLastShipper - shipperPerPage;
  const currentShippers = filteredShippers.slice(indexOfFirstShipper, indexOfLastShipper);

  const totalPages = Math.ceil(filteredShippers.length / shipperPerPage);

  return (
    <div className="manage-shipper">
      <h2>Quản lý Shipper</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm shipper..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button><FaSearch /> Tìm kiếm</button>
        <button onClick={() => setModalOpen(true)}><FaPlus /> Thêm mới</button>
      </div>
      <table className="shipper-table">
        <thead>
          <tr>
            <th>Tên đăng nhập</th>
            <th>Email</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th className='action-manage-shipper-col'>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentShippers.map((item) => (
            <tr key={item.id}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.fullname}</td>
              <td>{item.phone}</td>
              <td className='action-manage-shipper-col'>
                <button onClick={() => handleActive(item.id)}>
                  {item.active ? <FaUnlock /> : <FaLock />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={index + 1 === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Thêm Shipper</h3>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Họ và tên"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button type="submit">Thêm</button>
              <button type="button" onClick={() => setModalOpen(false)}>Hủy</button>
            </form>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageShipper;
