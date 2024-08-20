import axios from 'axios';

// Hàm để lấy thông tin các tỉnh/thành phố
export const fetchProvinces = async (token) => {
  try {
    const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
      headers: { token }
    });
    return response.data;
  } catch (error) {
    console.error('Không thể lấy danh sách tỉnh/thành phố:', error);
    return [];
  }
};

// Hàm để lấy thông tin các quận/huyện
export const fetchDistricts = async (token, provinceId) => {
  try {
    const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
      headers: { token },
      params: { province_id: provinceId }
    });
    return response.data;
  } catch (error) {
    console.error('Không thể lấy danh sách quận/huyện:', error);
    return [];
  }
};

// Hàm để lấy thông tin các phường/xã
export const fetchWards = async (token, districtId) => {
  try {
    const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
      headers: { token },
      params: { district_id: districtId }
    });
    return response.data;
  } catch (error) {
    console.error('Không thể lấy danh sách phường/xã:', error);
    return [];
  }
};

// Hàm để lấy các gói dịch vụ vận chuyển khả dụng
export const fetchAvailableServices = async (token, shopId, fromDistrict, toDistrict) => {
  try {
    const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services', {
      headers: { token },
      params: {
        shop_id: shopId,
        from_district_id: fromDistrict,
        to_district_id: toDistrict
      }
    });
    return response.data;
  } catch (error) {
    console.error('Không thể lấy danh sách gói dịch vụ:', error);
    return [];
  }
};

// Hàm để tính giá cước vận chuyển
export const calculateShippingFee = async (token, infor) => {
  try {
    const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',  {
          headers: { token},
          params: infor
        });
        console.log(infor);
        console.log(response.data);
        return response.data;
  } catch (error) {
   
    console.error('Không thể tính giá cước vận chuyển:', error);
    return null;
  }
};
