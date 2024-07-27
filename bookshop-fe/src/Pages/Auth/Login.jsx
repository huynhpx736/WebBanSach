import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    api.login(username, password).then(
      (response) => {
        setMessage("Login successful");
        // Chuyển hướng đến trang chủ hoặc trang dashboard sau khi đăng nhập thành công
        //Nếu role là admin thì chuyển hướng đến trang dashboard
        //Nếu role là user thì chuyển hướng đến trang chủ
        if (response.data.data.role === 1) {
          navigate('/admin');
        } else {
          navigate('/');
        }

         //Nếu không tìm thấy tài khoản thì thông báo lỗi
        setMessage("Tài khoản không tồn tại");



        // navigate('/');
      },
      (error) => {
        setMessage("Error: " + (error.response ? error.response.data.message : error.message));
      }
    );
  };

  return (
    <div className='wrapper'>

    <div className="auth-container">
      <div className="auth-header">
        <h2>Đăng nhập</h2>
      </div>
      <form className="auth-form" onSubmit={handleLogin}>
        <div>
          <label>Tài khoản</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
    </div>
  );
};

export default Login;
