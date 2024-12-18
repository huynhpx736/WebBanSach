



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItem from '../../../Components/OrderItem/OrderItem';
import Footer from '../../../Components/Footer/Footer';
import Header from '../../../Components/Header/Header';
import './CreateOrder.css';
import { fetchProvinces, fetchDistricts, fetchWards, fetchAvailableServices, calculateShippingFee } from './GHN';
import { fetchCartItems, fetchUserById, placeOrder } from '../../../api';

const CreateOrder = () => {
  // const DistricIDFrom = 1542;
  // const DistricIDFrom = 1451;
  // const WardCodeFrom = '20911';
  // const shopId = 5228359;
  // const token = '18aae827-4dcd-11ef-b635-eeb7b370243f';

  const DistricIDFrom = process.env.REACT_APP_DISTRICT_ID_FROM;
  const WardCodeFrom = process.env.REACT_APP_WARD_CODE_FROM;
   const token = process.env.REACT_APP_TOKEN_GHN;
   const shopId = process.env.REACT_APP_SHOP_ID;
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const UserId = localStorage.getItem('userId');
  const [User, setUser] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [detailAddress, setDetailAddress] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [weight, setWeight] = useState(null);
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [error, setError] = useState(null);
 
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  useEffect(() => {
    fetchUserById(UserId)
      .then(response => {
        setUser(response);
        setReceiverName(response.fullname);
        setReceiverPhone(response.phone);
      })
      .catch(error => console.error('Error fetching user data:', error));

    fetchCartItems(UserId)
      .then(data => {
        setOrderItems(data);
        calculateTotalPrice(data);
        calculateWeight(data);
      })
      .catch(error => console.error('Error fetching cart items:', error));

    // Fetch provinces
    fetchProvinces(token).then(data => setProvinces(data.data));
  }, []);

  const calculateWeight = (items) => {
    const total = items.reduce((acc, item) => acc + item.weight * item.quantity, 0);
    setWeight(total);
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    const data = await fetchDistricts(token, provinceId);
    setDistricts(data.data);
    setWards([]);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setShippingFee(0);
  };

  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    const data = await fetchWards(token, districtId);
    setWards(data.data);
    setSelectedWard(null);
    setShippingFee(0);
  };

  const handleWardChange = (e) => {
    const wardCode = e.target.value;
    setSelectedWard(wardCode);
    console.log('selectedWard:', selectedWard);
    console.log('ward', wards);
    console.log('selectedDistrict:', selectedDistrict);
    console.log('district', districts);
    console.log('selectedProvince:', selectedProvince);
    console.log('province', provinces);
  };

  const getAddressComponent = (list, id, idKey = 'id', nameKey = 'name') => {
    const item = list.find(el => el[idKey] === id);
    return item ? item[nameKey] : 'không xác định';
  };

  useEffect(() => {
    setError(null);
    setShippingFee(0);
    if (selectedProvince && selectedDistrict && selectedWard) {
      // const provinceName = provinces.find(p => p.ProvinceID === selectedProvince)?.ProvinceName || 'không xác định';
      // const districtName = districts.find(d => d.DistrictID === selectedDistrict)?.DistrictName || 'không xác định';
      // const wardName = wards.find(w => w.WardCode === selectedWard)?.WardName || '';
      const provinceName = getAddressComponent(provinces, selectedProvince, 'ProvinceID', 'ProvinceName');
      const districtName = getAddressComponent(districts, selectedDistrict, 'DistrictID', 'DistrictName');
      const wardName = getAddressComponent(wards, selectedWard, 'WardCode', 'WardName');

      // setReceiverAddress(`${detailAddress}, ${wardName}, ${districtName}, ${provinceName}`);
      setReceiverAddress(`${detailAddress}, ${wardName}`);


      const params1 = {
        service_id: 53321,
        insurance_value: totalPrice,
        coupon: null,
        from_district_id: DistricIDFrom,
        from_ward_code: WardCodeFrom,
        to_district_id: selectedDistrict,
        to_ward_code: selectedWard,
        weight: weight,
      };
      const params2 = {
        service_id: 53322,
        insurance_value: totalPrice,
        coupon: null,
        from_district_id: DistricIDFrom,
        from_ward_code: WardCodeFrom,
        to_district_id: selectedDistrict,
        to_ward_code: selectedWard,
        weight: weight,
      };
      //gọi calculateShippingFee với params1, nếu có lỗi thì gọi calculateShippingFee với params2 và setShippingFee bằng data.data.total, nếu lần 2 vẫn có lỗi thì setError('Địa chỉ không nằm trong khu vực giao hàng.')); và hiển thị thông báo
      calculateShippingFee(token, params1)
        .then(data => setShippingFee(data.data.total))
        .catch(() => {
          calculateShippingFee(token, params2)
            .then(data => setShippingFee(data.data.total))
            .catch(() => setError('Địa chỉ không nằm trong khu vực giao hàng.'));
        });
    }
  }, [selectedProvince, selectedDistrict, selectedWard, detailAddress, totalPrice, weight, provinces, districts, wards]);

  const calculateDiscount = () => {
    let discount = 0;
    if (User.classification === 'LOYAL') {
      discount += shippingFee * 0.1;
      if (totalPrice > 2000000) discount += totalPrice * 0.02;
    } else if (User.classification === 'VIP') {
      discount += shippingFee * 0.3;
      if (totalPrice > 2000000) discount += totalPrice * 0.03;
    }
    return discount;
  };

  const handlePlaceOrder = async () => {
    if (!selectedWard || !selectedDistrict || !selectedProvince || !receiverName || !receiverPhone || (detailAddress.trim() === '')) {
      alert('Vui lòng chọn đủ thông tin vận chuyển.');
      return;
    }
    if (error) {
      alert('Địa chỉ không nằm trong khu vực giao hàng.');
      return;
    }
    if (orderItems.length === 0) {
      alert('Không có sản phẩm trong giỏ hàng.');
      return;
    }

    if (!window.confirm('Xác nhận đặt hàng?')) return;

    const discount = calculateDiscount();
    const total = totalPrice + shippingFee - discount;

    try {
      await placeOrder(UserId, receiverPhone, receiverAddress, receiverName, shippingFee, discount, total);
      alert('Đơn hàng đã được đặt thành công!');
      //tới trang chủ sau khi đặt hàng
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Đặt hàng không thành công. Vui lòng thử lại.');
    }
  };

  return (
    <div>
      <Header />
      <div className="cart">
        <div className="discount-explain">
          <h3>Ưu đãi khi mua hàng:</h3>
          <p>Khách hàng loại <strong>thân thiết</strong> sẽ được giảm giá 10% phí vận chuyển và giảm giá 2% tổng giá trị đơn hàng nếu đơn hàng có tổng giá trị trên 2 triệu đồng.</p>
          <p>Khách hàng loại <strong>VIP</strong> sẽ được giảm giá 30% phí vận chuyển và giảm giá 3% tổng giá trị đơn hàng nếu đơn hàng có tổng giá trị trên 2 triệu đồng.</p>
        </div>
        <div className="shipping-policy">
          <p><strong>Chính sách giao hàng</strong> xem tại <a href="/about" target="_blank">đây</a>.</p>
        </div>
        
        {/* <div className="shipping-policy">
          <h3>Chính sách giao hàng:</h3>
          <p>Chúng tôi chỉ giao hàng trong phạm vi nội thành thành trực thuộc Việt Nam.</p>
          <p>Phí vận chuyển sẽ được tính dựa trên trọng lượng đơn hàng và địa chỉ nhận hàng của bạn.</p>
          <p>Đơn hàng sẽ được giao trong vòng 2-3 ngày làm việc kể từ ngày đặt hàng.</p>
          <p>Không giao hàng ở các khu vực hẻo lánh hoặc không an toàn, khu vực đang có thiên tai, dịch bệnh hoặc các khu vực khác mà công ty vận chuyển không thể đảm bảo an toàn cho hàng hóa, khu vực đang có chiến tranh, xung đột, bạo loạn, khủng bố hoặc các yếu tố khác ảnh hưởng đến việc vận chuyển hàng hóa.</p>
        </div> */}
        <h2>Đơn hàng</h2>
        {orderItems.length === 0 ? (
          <p>Trống.</p>
        ) : (
          <div>
            <div className="cart-header">
              <span>Sản phẩm</span>
              <span>Đơn giá</span>
              <span>Số lượng</span>
              <span>Thành tiền</span>
            </div>
            <div className="item-cart-andCb">
              {orderItems.map(item => (
                <OrderItem
                  key={item.productId}
                  item={item}
                />
              ))}
            </div>
            <div className="weight-div">
              Tổng trọng lượng: {weight}g
            </div>
            <div className="shipping-info">
              <h3>Thông tin vận chuyển</h3>
              <div>
                <label>Tỉnh/Thành phố:</label>
                <select onChange={handleProvinceChange}>
                  <option value="">Chọn tỉnh/thành phố</option>
                  {provinces.map(province => (
                    <option key={province.ProvinceID} value={province.ProvinceID}>{province.ProvinceName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Quận/Huyện:</label>
                <select onChange={handleDistrictChange} disabled={!selectedProvince}>
                  <option value="">Chọn quận/huyện</option>
                  {districts.map(district => (
                    <option key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Phường/Xã:</label>
                <select onChange={handleWardChange} disabled={!selectedDistrict}>
                  <option value="">Chọn phường/xã</option>
                  {wards.map(ward => (
                    <option key={ward.WardCode} value={ward.WardCode}>{ward.WardName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Thôn/xóm/đường</label>
                <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
              </div>


              <div>
                <label>Tên người nhận:</label>
                <input
                  type="text"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Số điện thoại:</label>
                <input
                  type="text"
                  value={receiverPhone}
                  onChange={(e) => setReceiverPhone(e.target.value)}
                  required
                />
              </div>
              {/* <div>
                <label>Địa chỉ cụ thể:</label>
                <input className="address-order"
                  type="text"
                  // value={`${detailAddress}, ${wards.find(w => w.WardCode === selectedWard)?.WardName || ''}, ${districts.find(d => d.DistrictID === selectedDistrict)?.DistrictName || ''}, ${provinces.find(p => p.ProvinceID === selectedProvince)?.ProvinceName || ''}`}
                  value={receiverAddress}
                  // readOnly
                />
              </div> */}
              <div>
                {error && <p className="error">{error}</p>}
              </div>
            </div>
            <div className="order-summary">
              <p>Tổng tiền sản phẩm: {formatter.format(totalPrice)}</p>
              <p>Phí vận chuyển: {formatter.format(shippingFee)}</p>
              {/* //Nếu là khách hàng thường thì ghi "Uư đãi thân thiết, nếu là khách hàng VIP thì ghi "Ưi đãi VIP", còn lại ghi ưu đãi */}
              <p>{User.classification === 'LOYAL' ? 'Giảm giá ưu đãi KH thân thiết: ' : User.classification === 'VIP' ? 'Giảm giá ưu đãi VIP: ' : 'Giảm giá KH thường: '} -{formatter.format(calculateDiscount())}</p>

              <h3>Tổng thanh toán: {formatter.format(totalPrice + shippingFee - calculateDiscount())}</h3>
              <button onClick={handlePlaceOrder}>Đặt hàng</button>

            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CreateOrder;
