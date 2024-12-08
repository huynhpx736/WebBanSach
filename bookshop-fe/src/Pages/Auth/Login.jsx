// Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../../api';
import './Auth.css';
import AuthContext from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [desc, setDesc] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiLogin(username, password);
     console.log(response.desc);
     if (response.desc === 'User is inactive') {
      setMessage("Tài khoản đã bị khóa");
      return;
    } else if (response.desc === 'Login successful') {
      setMessage("Đăng nhập thành công");
    } else {
      setMessage("Đăng nhập thất bại");
      return;
    }
      login(response.data.id); // Pass the user ID to the login function
      // localStorage.setUser(response.data.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      if (response.data.role === 2) {
        navigate('/admin/dashboard');
      } else if (response.data.role === 1) {
        navigate('/');
      } else {
        navigate('/shipper/dashboard');
      }
      
    } catch (error) {
      console.error('Failed to login:', error);
      // setMessage("Đăng nhập thất bại");
    }
  };

  return (
    <div className = "auth">
        <a href="/" className="back-home">Trở về trang chủ</a>   
    <div className='wrapper'>
      <div className="auth-container">
        <div className="auth-header">
          <h2>Đăng nhập</h2>
        </div>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className='line-input'>
            <label>Tên đăng nhập(email)</label>
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
          <button className ="auth-button" type="submit">Đăng nhập</button>
        </form>
        {/* <div > */}
          <a className ="auth-link" href="/register">Chưa có tài khoản? Đăng kí</a>
        {/* </div> */}
        {message && <p className="auth-message">{message}</p>}

      </div>
    </div>
    </div>
  );
};

export default Login;
