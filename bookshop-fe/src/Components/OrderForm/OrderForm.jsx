// src/components/OrderForm.jsx
import React, { useState, useEffect } from 'react';
import   {fetchProvinces,
fetchDistricts,
fetchWards,
calculateShippingFee,
placeOrder
} from  '../../api';

const OrderForm = ({ userId, totalPrice }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [shippingFee, setShippingFee] = useState(0);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const data = await fetchProvinces();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    loadProvinces();
  }, []);

  useEffect(() => {
    const loadDistricts = async () => {
      if (selectedProvince) {
        try {
          const data = await fetchDistricts(selectedProvince);
          setDistricts(data);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      }
    };

    loadDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    const loadWards = async () => {
      if (selectedDistrict) {
        try {
          const data = await fetchWards(selectedDistrict);
          setWards(data);
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      }
    };

    loadWards();
  }, [selectedDistrict]);

  useEffect(() => {
    const loadShippingFee = async () => {
      if (selectedProvince && selectedDistrict && selectedWard) {
        try {
          const fee = await calculateShippingFee(selectedProvince, selectedDistrict, selectedWard);
          setShippingFee(fee);
        } catch (error) {
          console.error('Error calculating shipping fee:', error);
        }
      }
    };

    loadShippingFee();
  }, [selectedProvince, selectedDistrict, selectedWard]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const receiverAddress = `${wards.find(ward => ward.id === selectedWard).name}, ${districts.find(district => district.id === selectedDistrict).name}, ${provinces.find(province => province.id === selectedProvince).name}`;
      await placeOrder(userId, receiverName, receiverPhone, receiverAddress, shippingFee);
      alert('Đặt hàng thành công');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Đặt hàng thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tạo đơn hàng</h2>
      <div>
        <label>Tỉnh/Thành phố</label>
        <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
          <option value="">Chọn Tỉnh/Thành phố</option>
          {provinces.map(province => (
            <option key={province.id} value={province.id}>{province.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Quận/Huyện</label>
        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedProvince}>
          <option value="">Chọn Quận/Huyện</option>
          {districts.map(district => (
            <option key={district.id} value={district.id}>{district.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Xã/Phường</label>
        <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} disabled={!selectedDistrict}>
          <option value="">Chọn Xã/Phường</option>
          {wards.map(ward => (
            <option key={ward.id} value={ward.id}>{ward.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Tên người nhận</label>
        <input type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} required />
      </div>
      <div>
        <label>Số điện thoại</label>
        <input type="text" value={receiverPhone} onChange={(e) => setReceiverPhone(e.target.value)} required />
      </div>
      <div>
        <label>Phí vận chuyển</label>
        <input type="text" value={shippingFee} readOnly />
      </div>
      <div>
        <label>Tổng tiền</label>
        <input type="text" value={totalPrice + shippingFee} readOnly />
      </div>
      <button type="submit">Đặt hàng</button>
    </form>
  );
};

export default OrderForm;
