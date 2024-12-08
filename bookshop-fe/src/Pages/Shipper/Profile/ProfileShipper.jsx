import React, { useEffect, useState, useContext } from 'react';
import { fetchUserById, updateUser, changePassword } from '../../../api';
import './ProfileShipper.css';
import AuthContext from '../../Auth/AuthContext';

const ProfileShip = () => {
  // const { userId } = useContext(AuthContext);
  const userId = localStorage.getItem('userId')||30;
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserById(userId);
        setUser(userData);
        setAvatar(userData.avatar);
        setFullname(userData.fullname);
        setEmail(userData.email);
        setPhone(userData.phone);
        // setOldPassword(userData.password);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    if (userId) {
      getUserData();
    }
  }, [userId]);

  const handleUpdateInfo = async () => {
    try {
      const updatedUser = await updateUser(userId, {
        avatar: avatar,
        fullname: fullname,
        username: user.username,
        email: email,
        role: user.role,
        password: oldPassword,
        phone: phone,
        classification: user.classification,
        active: user.active
      });
      setUser(updatedUser);
      setMessage('Thông tin cá nhân đã được cập nhật.');
      setIsEditing(false);
    } catch (error) {
      setMessage('Cập nhật thông tin thất bại.');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Mật khẩu xác nhận không khớp.');
      return;
    }
    try {
      await changePassword(userId, oldPassword, newPassword);
      setMessage('Mật khẩu đã được thay đổi.');
      setIsChangingPassword(false);
    } catch (error) {
      setMessage('Đổi mật khẩu thất bại.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      <div className="profile-ship-container">
        <h1>Thông tin cá nhân</h1>
        <div className="profile-ship-details">
          <img src={avatar} alt={user.username} className="profile-ship-avatar" />
          {isEditing ? (
            <>
              <div className="profile-ship-field">
                <label>Avatar:</label>
                <input
                  type="file"
                  onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
                  accept="image/*"
                />
              </div>
              <div className="profile-ship-field">
                <label>Tên:</label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="profile-ship-field">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="profile-ship-field">
                <label>Số điện thoại:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="profile-ship-buttons">
                <button onClick={handleUpdateInfo} className="update-btn">Lưu thông tin</button>
                <button onClick={() => setIsEditing(false)} className="cancel-btn">Hủy</button>
              </div>
            </>
          ) : (
            <>
              <div className="profile-ship-field">
                <label>Username:</label>
                <p>{user.username}</p>
              </div>
              <div className="profile-ship-field">
                <label>Email:</label>
                <p>{user.email}</p>
              </div>
              <div className="profile-ship-field">
                <label>Tên:</label>
                <p>{user.fullname}</p>
              </div>
              <div className="profile-ship-field">
                <label>Số điện thoại:</label>
                <p>{user.phone}</p>
              </div>
              <button onClick={() => setIsEditing(true)} className="update-btn">Cập nhật thông tin</button>
            </>
          )}
        </div>

        {isChangingPassword ? (
          <div className="password-change">
            <h2>Đổi mật khẩu</h2>
            <div className="profile-ship-field">
              <label>Mật khẩu cũ:</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="profile-ship-field">
              <label>Mật khẩu mới:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="profile-ship-field">
              <label>Xác nhận mật khẩu mới:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="profile-ship-buttons">
              <button onClick={handleChangePassword} className="update-btn">Lưu mật khẩu</button>
              <button onClick={() => setIsChangingPassword(false)} className="cancel-btn">Hủy</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setIsChangingPassword(true)} className="forgot-password-btn">Đổi mật khẩu</button>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ProfileShip;

