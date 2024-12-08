// SignUp.jsx
import React, { useState } from 'react';
import { register as apiRegister } from '../../api';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullname, setFullname] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState(1);

  const handleRegister = (e) => {
    e.preventDefault();

     
      //bat cac loi co the xay ra
      if (username === '' || password === '' || email === '' || phone === '' || fullname === '') {
        setMessage("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      //bat loi khi nhap ten khong hop le (khong chua ky tu dac biet)
    if (!/^[a-zA-Z0-9]*$/.test(username)) {
      setMessage("Tên đăng nhập không được chứa ký tự đặc biệt.");
      return;
    }
   
 
   
    //bat loi khi nhap mat khau khong dung
    if (password.length < 6) {
      setMessage("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
       //bat loi khi mat khau khong trung nhau
       if (password !== passwordConfirm) {
        setMessage("Mật khẩu không trùng khớp.");
        return;
      }
 
       //bat loi khi nhap email khong dung
    if (!email.includes('@') || !email.includes('.')) {
      setMessage("Email không hợp lệ.");
      return;
    }

     //Ho ten không chứa số
      if (fullname.match(/\d+/g)) {
        setMessage("Họ tên không được chứa số.");
        return;
      }
 
    //bat loi khi nhap so dien thoai khong dung
    if (phone.length < 9 || phone.length >= 13) {
      setMessage("Số điện thoại không hợp lệ.");
      return;
    }


    apiRegister(username, password, email, fullname, phone,role).then(
      (response) => {
        if (response.desc === "User registered successfully") {
          setMessage("Đăng kí thành công.");
          return;
        }

        if (response.desc === "Username already exists") {
          setMessage("Tên đăng nhập đã tồn tại.");
          return;
        }

        if (response.desc === "Email already exists") {
          setMessage("Email đã tồn tại.");
          return;
        }

        setMessage("Đăng kí thất bại.");
      },
      (error) => {
        // setMessage( (error.response ? error.response.desc : error.message));
        // setMessage("Tên đăng nhập hoặc email đã tồn tại.");
        // setMessage("Đăng kí thất bại.");
      }
    );

   
  };

  return (
    <div className = "auth">
      <a href="/" className="back-home">Trở về trang chủ</a>    
    <div className='wrapper'>

      <div className="auth-container">
        <div className="auth-header">
          <h2>Đăng kí</h2>
        </div>
        <form className="auth-form" onSubmit={handleRegister}>
          <div className='line-input'>
            <label>Tên đăng nhập</label>    
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
            <label>Nhập lại mật khẩu&nbsp;</label>
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
          <div className='line-input'>
            <label>Họ tên&nbsp;</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          {/* <div className='line-input'>
            <label>Số điện thoại&nbsp;</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div> */}
          <div className='line-input'>
            <label>Số điện thoại&nbsp;</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[0-9]*"
            />
          </div>
          <button className='auth-button' type="submit">Đăng kí</button>
        </form>
        {/* <div className="auth-link"> */}
          <a className="auth-link"  href="/login">Đã có tài khoản? Đăng nhập</a>
        {/* </div> */}
        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default Register;
