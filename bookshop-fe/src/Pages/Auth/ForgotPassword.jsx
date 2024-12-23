import React, { useState } from 'react';
import { sendMailForgotPasswordAndGetOTP, changePasswordByEmail } from '../../api';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpUseVerify, setOtpUseVerify] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {

    if (email === '') {
        setMessage('Vui lòng nhập email.');
        return;
    }

    
    try {
      const response = await sendMailForgotPasswordAndGetOTP(email);
      if (response.data) {
        setOtpSent(true);
        setOtpUseVerify(response.data);
        // setIsOtpVerified(true);
        setMessage('Mã OTP đã được gửi đến email của bạn.');
      }
    } catch (error) {
      setMessage('Không thể gửi OTP. Vui lòng kiểm tra email.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '') {
      setMessage('Vui lòng nhập mã OTP.');
      return;
    }
    // Logic OTP validation
    if (otp === otpUseVerify) { // Dùng mã OTP giả định
      setIsOtpVerified(true);
      setMessage('Mã OTP xác thực thành công.');
    } else {
      setMessage('Mã OTP không chính xác.');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setMessage('Mật khẩu mới không trùng khớp.');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    try {
      const response = await changePasswordByEmail(email,newPassword);
      setMessage(response || 'Đổi mật khẩu thành công.');
    } catch (error) {
      setMessage('Không thể đổi mật khẩu. Vui lòng thử lại.');
    }
  };

  return (
    <div className="auth">
      <a href="/" className="back-home">Trở về trang chủ</a>
      <div className="wrapper">
        <div className="auth-container">
          <div className="auth-header">
            <h2>Quên mật khẩu</h2>
          </div>
          {!otpSent ? (
            <form className="auth-form">
              <div className="line-input">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="OTP-button"
                onClick={handleSendOtp}
              >
                Gửi mã OTP
              </button>
            </form>
          ) : !isOtpVerified ? (
            <form className="auth-form">
              <div className="line-input">
                <label>Nhập mã OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="OTP-button"
                onClick={handleVerifyOtp}
              >
                Xác thực OTP
              </button>
            </form>
          ) : (
            <form className="auth-form">
              
              <div className="line-input">
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="line-input">
                <label>Nhập lại mật khẩu mới</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="OTP-button"
                onClick={handleChangePassword}
              >
                Đổi mật khẩu
              </button>
            </form>
          )}
          {message && <p className="auth-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
