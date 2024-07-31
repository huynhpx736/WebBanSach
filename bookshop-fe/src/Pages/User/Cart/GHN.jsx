// src/services/ghnService.js
import axios from 'axios';

const GHN_API_URL = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee';

const getShippingCost = async (fromDistrict, toDistrict, weight, serviceId, insuranceValue) => {
  const response = await axios.post(GHN_API_URL, {
    from_district_id: fromDistrict,
    to_district_id: toDistrict,
    service_id: serviceId,
    weight,
    insurance_value: insuranceValue,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Token': '18aae827-4dcd-11ef-b635-eeb7b370243f' // Replace with your GHN API key
    }
  });

  return response.data.data.total;
};

export default getShippingCost;
