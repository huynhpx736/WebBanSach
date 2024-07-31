// SignUp.jsx
import React, { useState } from 'react';
import { register as apiRegister } from '../../api';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
     //bat loi khi mat khau khong trung nhau
     
    

    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage("Mật khẩu không trùng khớp.");
      return;
    }
    //bat cac loi co the xay ra
    if (username === '' || password === '' || email === '') {
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    apiRegister(username, password, email).then(
      (response) => {
        setMessage("Đăng kí thành công.");
      },
      (error) => {
        // setMessage( (error.response ? error.response.data.desc : error.message));
        setMessage("Đăng kí thất bại.");
      }
    );

    //bat loi khi mat khau khong trung nhau
    if (password !== passwordConfirm) {
      setMessage("Mật khẩu không trùng khớp.");
      return;
    }
  };

  return (
    <div className='wrapper'>
      <div className="auth-container">
        <div className="auth-header">
          <h2>Đăng kí</h2>
        </div>
        <form className="auth-form" onSubmit={handleRegister}>
          <div className='line-input'>
            <label>Tài khoản</label>            
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='line-input'>
            <label>Mật khẩu&nbsp;</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='line-input'>
            <label>Nhập lại&nbsp;</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
          <div className='line-input'>
            <label>Email&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Đăng kí</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
