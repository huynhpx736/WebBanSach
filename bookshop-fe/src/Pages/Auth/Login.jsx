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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiLogin(username, password);
      setMessage("Login successful");
      login(response.data.id); // Pass the user ID to the login function
      if (response.data.role === 1) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      // setMessage(error.message);
      setMessage("Đăng nhập thất bại");
    }
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
            <label>Mật khẩu&nbsp;</label>
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
