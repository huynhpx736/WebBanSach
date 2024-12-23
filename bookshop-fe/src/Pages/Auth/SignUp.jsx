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
  const [OTPVerify, setOTPVerify] = useState('');

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






// import React, { useState } from 'react';
// import { register as apiRegister, sendMailVerifyAndGetOTP, verifyOTP } from '../../api';
// import './Auth.css';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordConfirm, setPasswordConfirm] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [fullname, setFullname] = useState('');
//   const [message, setMessage] = useState('');
//   const [role, setRole] = useState(1);
//   const [OTPVerify, setOTPVerify] = useState('');
//   const [isOTPRequested, setIsOTPRequested] = useState(false);
//   const [otpInput, setOtpInput] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // Kiểm tra các điều kiện ban đầu
//     if (username === '' || password === '' || email === '' || phone === '' || fullname === '') {
//       setMessage("Vui lòng điền đầy đủ thông tin.");
//       return;
//     }
//     if (!/^[a-zA-Z0-9]*$/.test(username)) {
//       setMessage("Tên đăng nhập không được chứa ký tự đặc biệt.");
//       return;
//     }
//     if (password.length < 6) {
//       setMessage("Mật khẩu phải có ít nhất 6 ký tự.");
//       return;
//     }
//     if (password !== passwordConfirm) {
//       setMessage("Mật khẩu không trùng khớp.");
//       return;
//     }
//     if (!email.includes('@') || !email.includes('.')) {
//       setMessage("Email không hợp lệ.");
//       return;
//     }
//     if (fullname.match(/\d+/g)) {
//       setMessage("Họ tên không được chứa số.");
//       return;
//     }
//     if (phone.length < 9 || phone.length >= 13) {
//       setMessage("Số điện thoại không hợp lệ.");
//       return;
//     }

//     try {
//       // Gửi OTP qua API
//       const otpResponse = await sendMailVerifyAndGetOTP(email);
//       if (otpResponse.success) {
//         setMessage("OTP đã được gửi. Vui lòng kiểm tra email.");
//         setIsOTPRequested(true);
//         setOTPVerify(otpResponse.data);
//       } else {
//         setMessage("Không thể gửi OTP. Vui lòng thử lại.");
//       }
//     } catch (error) {
//       setMessage("Lỗi khi gửi OTP: " + error.message);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     if (!otpInput) {
//       setMessage("Vui lòng nhập OTP.");
//       return;
//     }

//     try {
//       // Xác thực OTP từ Input so với OTP đã gửi, nếu bằng nhau thì tiếp tục đăng ký
//       if (otpInput === OTPVerify) {
//         const response = await apiRegister(username, password, email, fullname, phone, role);
//         if (response.desc === "User registered successfully") {
//           setMessage("Đăng kí thành công.");
//           return;
//         }
//         if (response.desc === "Username already exists") {
//           setMessage("Tên đăng nhập đã tồn tại.");
//           return;
//         }
//         if (response.desc === "Email already exists") {
//           setMessage("Email đã tồn tại.");
//           return;
//         }
//         setMessage("Đăng kí thất bại.");
//       } else {
//         setMessage("OTP không chính xác.");
//       }

       

//     } catch (error) {
//       setMessage("Lỗi khi xác thực OTP: " + error.message);
//     }
//   };

//   return (
//     <div className="auth">
//       <a href="/" className="back-home">Trở về trang chủ</a>    
//       <div className="wrapper">
//         <div className="auth-container">
//           <div className="auth-header">
//             <h2>Đăng kí</h2>
//           </div>
//           {!isOTPRequested ? (
//             <form className="auth-form" onSubmit={handleRegister}>
//               <div className="line-input">
//                 <label>Tên đăng nhập</label>    
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="line-input">
//                 <label>Mật khẩu</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="line-input">
//                 <label>Nhập lại mật khẩu</label>
//                 <input
//                   type="password"
//                   value={passwordConfirm}
//                   onChange={(e) => setPasswordConfirm(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="line-input">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>         
//               <div className="line-input">
//                 <label>Họ tên</label>
//                 <input
//                   type="text"
//                   value={fullname}
//                   onChange={(e) => setFullname(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="line-input">
//                 <label>Số điện thoại</label>
//                 <input
//                   type="text"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   required
//                   pattern="[0-9]*"
//                 />
//               </div>
//               <button className="auth-button" type="submit">Gửi OTP</button>
//             </form>
//           ) : (
//             <div className="otp-form">
//               <label>Nhập OTP</label>
//               <input
//                 type="text"
//                 value={otpInput}
//                 onChange={(e) => setOtpInput(e.target.value)}
//                 required
//               />
//               <button className="auth-button" onClick={handleVerifyOTP}>Xác thực OTP</button>
//             </div>
//           )}
//           <a className="auth-link" href="/login">Đã có tài khoản? Đăng nhập</a>
//           {message && <p className="auth-message">{message}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
