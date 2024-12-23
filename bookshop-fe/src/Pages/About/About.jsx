import React from 'react';
import './About.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const About = () => {
    return (
      <div>
      <Header />
        <div className="about-container">
            <section className="about-banner">
                {/* <img src="public/banner.jpg" alt="Banner hiệu sách" className="banner-image" /> */}
                <div className="banner-text">
                    <h1>Chào mừng đến với Hiệu Sách Uy Tín</h1>
                    <p>Nơi cung cấp mọi nhu cầu đọc sách của bạn.</p>
                </div>
            </section>

            <section className="about-content">
                <h2>Giới thiệu về chúng tôi</h2>
                <p>Hiệu sách của chúng tôi nổi tiếng với sự đa dạng về các thể loại sách. Chúng tôi tự hào cung cấp sách chất lượng cao và dịch vụ khách hàng tuyệt vời. Với nhiều năm kinh nghiệm trong ngành, chúng tôi đã xây dựng được uy tín là một nguồn sách đáng tin cậy cho những người yêu sách.</p>
                <p>Chúng tôi cam kết mang đến trải nghiệm mua sắm dễ dàng, với trang web thân thiện và nhiều dịch vụ đáp ứng nhu cầu của bạn.</p>

                <h3>Ưu đãi khi mua hàng:</h3>
                <ul>
                    <li><strong>Thân thiết</strong>: Giảm 10% phí vận chuyển và 2% tổng giá trị đơn hàng nếu đơn hàng có tổng giá trị trên 2 triệu đồng.</li>
                    <li><strong>VIP</strong>: Giảm 30% phí vận chuyển và 3% tổng giá trị đơn hàng nếu đơn hàng có tổng giá trị trên 2 triệu đồng.</li>
                </ul>

                <h3>Cấp độ thành viên:</h3>
                <p>- Trở thành thành viên <strong>Thân thiết</strong> nếu trong tháng có từ 4 đơn hàng thành công và tổng giá trị mua hàng đạt 2 triệu đồng.</p>
                <p>- Trở thành thành viên <strong>VIP</strong> nếu trong tháng có từ 8 đơn hàng thành công và tổng giá trị mua hàng đạt 5 triệu đồng.</p>
                <p>- Các ưu đãi sẽ được cập nhật lại từ đầu vào đầu tháng tiếp theo.</p>
                {/* <h3>Phương thức thanh toán:</h3>
                <p>Thanh toán khi nhận hàng.</p> */}
                    
            <h3>Chính sách giao hàng:</h3>
            <p>Đơn hàng có thể sẽ không được duyệt nếu không đảm bảo các điều kiện sau:</p>
            <p>- Chúng tôi chỉ giao hàng trong phạm vi các tỉnh thành thuộc Việt Nam.</p>
            <p>- Chi phí vận chuyển quá cao hoặc không thể xác định được.</p>
            <p>- Không giao hàng ở các khu vực hẻo lánh hoặc không an toàn, khu vực đang có thiên tai, dịch bệnh hoặc các khu vực khác mà công ty vận chuyển không thể đảm bảo an toàn cho hàng hóa, khu vực đang có chiến tranh, xung đột, bạo loạn, khủng bố hoặc các yếu tố khác ảnh hưởng đến việc vận chuyển hàng hóa.</p>
            <p>Hệ thống của chúng tôi tự động tính toán tổng chi phí, bao gồm phí vận chuyển và các ưu đãi. Phí vận chuyển được tính dựa trên trọng lượng sản phẩm và khoảng cách giao hàng. Ví dụ, một đơn hàng nặng 2kg trong nội thành Hà Nội có phí vận chuyển là 28,500 VNĐ.</p>
            <p>Đơn hàng sẽ được giao trong vòng 3-5 ngày làm việc kể từ ngày đặt hàng.</p>
            <p>Chúng tôi hỗ trợ thanh toán khi nhận hàng để đảm bảo sự tiện lợi và yên tâm cho khách hàng.</p>            
            <h3>Phí giao hàng và chi phí:</h3>
            <img src="shipfee.png" alt="Phương thức thanh toán" className="payment-image" />
            <h3>Liên hệ:</h3>
            <p>Địa chỉ: Đường số 102, Tăng Nhơn Phú A, quận 9, Hồ Chí Minh</p>
            <p>Số điện thoại: 0702363862</p>
            <p>Email: xuanhuynh254@gmail.com</p>
            </section>
        </div>
        <Footer />
        </div>
    );
}

export default About;
