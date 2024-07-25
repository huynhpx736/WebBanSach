import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section" style={{marginLeft:'50px'}}>
          <img  src="/logoPtit.png" style={{width:'100px'}} alt="" />
          <h4>Sách chất lượng cao</h4>
        </div>
        <div className="footer-section" >
          <p>Thông tin</p>
          <p>PTITHCM</p>
          <p>TTTN-N20DCCN023</p>
        </div>
        <div className="footer-section">
          <h5>Liên kết nhanh</h5>
          <ul className="footer-links">
            <li><a href="/">Trang chủ</a></li>
            <li><a href="#">Sách mới</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h5>Liên hệ</h5>
          <h5>Email: xuanhuynhmc@gmail.com</h5>
          <h5>Điện thoại: 0865070736</h5>
        </div>
      </div>
      <button className="back-to-top" onClick={scrollToTop}>^</button>
    </footer>
  );
};

export default Footer;
