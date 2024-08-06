// src/Pages/User/CreateOrder/GHN.js
import axios from 'axios';




// Hàm để lấy thông tin các tỉnh/thành phố
export const fetchProvinces = async (token) => {
  const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
    headers: { token }
  });
  return response.data;
};

// Hàm để lấy thông tin các quận/huyện
export const fetchDistricts = async (token, provinceId) => {
  const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
    headers: { token },
    params: { province_id: provinceId }
  });
  return response.data;
};

// Hàm để lấy thông tin các phường/xã
export const fetchWards = async (token, districtId) => {
  const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
    headers: { token },
    params: { district_id: districtId }
  });
  return response.data;
};

// Hàm để lấy các gói dịch vụ vận chuyển khả dụng
export const fetchAvailableServices = async (token, shopId, fromDistrict, toDistrict) => {
  const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services', {
    headers: { token },
    params: { shop_id: shopId, from_district: fromDistrict, to_district: toDistrict }
  });
  return response.data;
};

// Hàm để tính giá cước vận chuyển
export const calculateShippingFee = async (token, infor) => {
  const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',  {
    headers: { token},
    params: infor
  });
  return response.data;
};
