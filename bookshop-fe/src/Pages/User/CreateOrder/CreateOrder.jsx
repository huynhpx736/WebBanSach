// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import CartItem from '../../../Components/CartItem/CartItem';
// // import Footer from '../../../Components/Footer/Footer';
// // import Header from '../../../Components/Header/Header';
// // import './CreateOrder.css';
// // import { fetchProvinces, fetchDistricts, fetchAvailableServices, fetchWards, calculateShippingFee } from './GHN';

// // const CreateOrder = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const UserId = localStorage.getItem('userId');
// //   const [User, setUser] = useState([]);
// //   const [provinces, setProvinces] = useState([]);
// //   const [districts, setDistricts] = useState([]);
// //   const [wards, setWards] = useState([]);
// //   const [selectedProvince, setSelectedProvince] = useState(null);
// //   const [selectedDistrict, setSelectedDistrict] = useState(null);
// //   const [selectedWard, setSelectedWard] = useState(null);
// //   const [shippingFee, setShippingFee] = useState(0);
// //   const [selectedService, setSelectedService] = useState(null);
// //   const [weight, setWeight] = useState(null);
// //   const token = '18aae827-4dcd-11ef-b635-eeb7b370243f';  // Replace with your GHN API token
// //   const shopId = 1;  // Replace with your shop ID
// //   const formatter = new Intl.NumberFormat('vi-VN', {
// //     style: 'currency',
// //     currency: 'VND',
// //   });
 
// //   useEffect(() => {
// //     // Fetch cart items from API
// //     axios.get('http://localhost:8080/api/orderdetails/get-cart-items/' + UserId)
// //       .then(response => {
// //         setCartItems(response.data.data);
// //         calculateTotalPrice(response.data.data);
// //         calculateWeight(response.data.data);

// //       })
// //       .catch(error => console.error('Error fetching cart items:', error));
// //     // Fetch provinces
// //     fetchProvinces(token).then(data => setProvinces(data.data));
// //   }, []);
// //   const calculateWeight = (items) => {
// //     const total = items.reduce((acc, item) => acc + item.weight * item.quantity, 0);
// //     setWeight(total);
// //     };
// //   const calculateTotalPrice = (items) => {
// //     const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
// //     setTotalPrice(total);
// //   };
  
// //   const handleProvinceChange = async (e) => {
// //     const provinceId = e.target.value;
// //     setSelectedProvince(provinceId);
// //     const data = await fetchDistricts(token, provinceId);
// //     setDistricts(data.data);
// //     setWards([]);  // Reset wards
// //     setSelectedDistrict(null);
// //     setSelectedWard(null);
// //   };
  
// //   const handleDistrictChange = async (e) => {
// //     const districtId = e.target.value;
// //     setSelectedDistrict(districtId);
// //     const data = await fetchWards(token, districtId);
// //     setWards(data.data);
// //     setSelectedWard(null);
// //   };
  
// //   const handleWardChange = (e) => {
// //     setSelectedWard(e.target.value);
// //   };
  
 
// //   const calculateShipping = async () => {
// //     const params = {
// //       service_id: 53321,  // Replace with the service ID you choose
// //       insurance_value: totalPrice,
// //       coupon: null,
// //       from_district_id: 1542,
// //       to_district_id: selectedDistrict,
// //       to_ward_code: selectedWard,
// //       height: 15,
// //       length: 15,
// //       weight: 2000,
// //       width: 15
// //     };
    
// //     const data = await calculateShippingFee(token, params);
// //     setShippingFee(data.data.total);
// //   };
  
// //   return (
// //     <div>
// //       <Header />
// //       <div className="cart">
// //         <h2>Đơn hàng</h2>
// //         {cartItems.length === 0 ? (
// //           <p>Trống.</p>
// //         ) : (
// //           <div>
// //             <div className="cart-header">
// //               <span>Sản phẩm</span>
// //               <span>Đơn giá</span>
// //               <span>Số lượng</span>
// //               <span>Thành tiền</span>
// //             </div>
// //             <div className="item-cart-andCb">
// //               {cartItems.map(item => (
// //                 <CartItem
// //                   key={item.productId}
// //                   item={item}
// //                 //   onQuantityChange={handleQuantityChange}
// //                 //   onRemove={handleRemove}
// //                 />
// //               ))}
// //             </div>
// //             <div className="weight-div">
// //             Trọng lượng: {weight}g
// //             </div>
// //             <div className="shipping-info">
// //               <h3>Thông tin vận chuyển</h3>
// //               <div>
// //                 <label>Tỉnh/Thành phố:</label>
// //                 <select onChange={handleProvinceChange}>
// //                   <option value="">Chọn tỉnh/thành phố</option>
// //                   {provinces.map(province => (
// //                     <option key={province.ProvinceID} value={province.ProvinceID}>{province.ProvinceName}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <div>
// //                 <label>Quận/Huyện:</label>
// //                 <select onChange={handleDistrictChange} disabled={!selectedProvince}>
// //                   <option value="">Chọn quận/huyện</option>
// //                   {districts.map(district => (
// //                     <option key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <div>
// //                 <label>Phường/Xã:</label>
// //                 <select onChange={handleWardChange} disabled={!selectedDistrict}>
// //                   <option value="">Chọn phường/xã</option>
// //                   {wards.map(ward => (
// //                     <option key={ward.WardCode} value={ward.WardCode}>{ward.WardName}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <button onClick={calculateShipping} disabled={!selectedWard}>Tính phí vận chuyển</button>
// //             </div>
// //             <div className="cart-total">
// //               <h3>Tổng: {formatter.format(totalPrice)}</h3>
// //               <h3>Phí vận chuyển: {formatter.format(shippingFee)}</h3>
// //               <h3>Tổng cộng: {formatter.format(totalPrice + shippingFee)}</h3>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default CreateOrder;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import CartItem from '../../../Components/CartItem/CartItem';
// // import Footer from '../../../Components/Footer/Footer';
// // import Header from '../../../Components/Header/Header';
// // import './CreateOrder.css';
// // import { fetchProvinces, fetchDistricts, fetchWards, fetchAvailableServices, calculateShippingFee } from './GHN';

// // const CreateOrder = () => {
// //   const DistricIDFrom = 1542;
// //   const [cartItems, setCartItems] = useState([]);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const UserId = localStorage.getItem('userId');
// //   const [User, setUser] = useState([]);
// //   const [provinces, setProvinces] = useState([]);
// //   const [districts, setDistricts] = useState([]);
// //   const [wards, setWards] = useState([]);
// //   const [services, setServices] = useState([]);
// //   const [selectedProvince, setSelectedProvince] = useState(null);
// //   const [selectedDistrict, setSelectedDistrict] = useState(null);
// //   const [selectedWard, setSelectedWard] = useState(null);
// //   const [shippingFee, setShippingFee] = useState(0);
// //   const [selectedService, setSelectedService] = useState(null);
// //   const [weight, setWeight] = useState(null);
// //   const token = '18aae827-4dcd-11ef-b635-eeb7b370243f';  // Replace with your GHN API token
// //   const shopId = 5228359;  // Replace with your shop ID
// //   const formatter = new Intl.NumberFormat('vi-VN', {
// //     style: 'currency',
// //     currency: 'VND',
// //   });

// //   useEffect(() => {
// //     // Fetch cart items from API
// //     axios.get('http://localhost:8080/api/orderdetails/get-cart-items/' + UserId)
// //       .then(response => {
// //         setCartItems(response.data.data);
// //         calculateTotalPrice(response.data.data);
// //         calculateWeight(response.data.data);
// //       })
// //       .catch(error => console.error('Error fetching cart items:', error));

// //     // Fetch provinces
// //     fetchProvinces(token).then(data => setProvinces(data.data));
// //   }, []);

// //   const calculateWeight = (items) => {
// //     const total = items.reduce((acc, item) => acc + item.weight * item.quantity, 0);
// //     setWeight(total);
// //   };

// //   const calculateTotalPrice = (items) => {
// //     const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
// //     setTotalPrice(total);
// //   };

// //   const handleProvinceChange = async (e) => {
// //     const provinceId = e.target.value;
// //     setSelectedProvince(provinceId);
// //     const data = await fetchDistricts(token, provinceId);
// //     setDistricts(data.data);
// //     setWards([]);  // Reset wards
// //     setSelectedDistrict(null);
// //     setSelectedWard(null);
// //     setServices([]);  // Reset services when province changes
// //     setSelectedService(null);
// //   };

// //   const handleDistrictChange = async (e) => {
// //     const districtId = e.target.value;
// //     setSelectedDistrict(districtId);
// //     const data = await fetchWards(token, districtId);
// //     setWards(data.data);
// //     setSelectedWard(null);
// //     setServices([]);  // Reset services when district changes
// //     setSelectedService(null);
// //   };

// //   const handleWardChange = async (e) => {
// //     const wardCode = e.target.value;
// //     setSelectedWard(wardCode);

// //     // Fetch available services after selecting ward
// //     const servicesData = await fetchAvailableServices(token, shopId, DistricIDFrom, selectedDistrict);
// //     setServices(servicesData.data);
// //   };

// //   useEffect(() => {
// //     if (selectedWard) {
// //         const params = {
// //             service_id: 53321,  // Replace with the service ID you choose
// //             insurance_value: totalPrice,
// //             coupon: null,
// //             from_district_id: DistricIDFrom,
// //             to_district_id: selectedDistrict,
// //             to_ward_code: selectedWard,
// //             height: 15,
// //             length: 15,
// //             weight: weight,
// //             width: 15
// //         };
// //         calculateShippingFee(token, params).then(data => setShippingFee(data.data.total));
// //     }
// //     }, [selectedWard]);




// //   const handleServiceChange = async (e) => {
// //     const idService = e.target.value;
// //     setSelectedService(idService);

// //     // Calculate shipping fee when service is selected
// //     const params = {
// //       service_id: idService,
// //       insurance_value: totalPrice,
// //       coupon: null,
// //       from_district_id: DistricIDFrom,
// //       to_district_id: selectedDistrict,
// //       to_ward_code: selectedWard,
// //       height: 15,
// //       length: 15,
// //       weight: weight,
// //       width: 15
// //     };
// //     const shipFee = await calculateShippingFee(token, params);
// //     setShippingFee(shipFee.data.total);
    
    
// //   };

// //   return (
// //     <div>
// //       <Header />
// //       <div className="cart">
// //         <h2>Đơn hàng</h2>
// //         {cartItems.length === 0 ? (
// //           <p>Trống.</p>
// //         ) : (
// //           <div>
// //             <div className="cart-header">
// //               <span>Sản phẩm</span>
// //               <span>Đơn giá</span>
// //               <span>Số lượng</span>
// //               <span>Thành tiền</span>
// //             </div>
// //             <div className="item-cart-andCb">
// //               {cartItems.map(item => (
// //                 <CartItem
// //                   key={item.productId}
// //                   item={item}
// //                 />
// //               ))}
// //             </div>
// //             <div className="weight-div">
// //               Tổng trọng lượng: {weight}g
// //             </div>
// //             <div className="shipping-info">
// //               <h3>Thông tin vận chuyển</h3>
// //               <div>
// //                 <label>Tỉnh/Thành phố:</label>
// //                 <select onChange={handleProvinceChange}>
// //                   <option value="">Chọn tỉnh/thành phố</option>
// //                   {provinces.map(province => (
// //                     <option key={province.ProvinceID} value={province.ProvinceID}>{province.ProvinceName}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <div>
// //                 <label>Quận/Huyện:</label>
// //                 <select onChange={handleDistrictChange} disabled={!selectedProvince}>
// //                   <option value="">Chọn quận/huyện</option>
// //                   {districts.map(district => (
// //                     <option key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <div>
// //                 <label>Phường/Xã:</label>
// //                 <select onChange={handleWardChange} disabled={!selectedDistrict}>
// //                   <option value="">Chọn phường/xã</option>
// //                   {wards.map(ward => (
// //                     <option key={ward.WardCode} value={ward.WardCode}>{ward.WardName}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //               {/* <div>
// //                 <label>Dịch vụ vận chuyển:</label>
// //                 <select onChange={handleServiceChange} disabled={!selectedWard}>
// //                   <option value="">Chọn dịch vụ</option>
// //                   {services.map(service => (
// //                     <option key={service.service_id} value={service.service_id}>{service.short_name}</option>
// //                   ))}
// //                 </select>
// //               </div> */}
// //               <div>
// //                 {/* <button onClick={calculateShipping} disabled={!selectedWard}>Tính phí vận chuyển</button> */}
// //               </div>
// //             </div>
// //             <div className="cart-total">
// //               <h3>Tổng: {formatter.format(totalPrice)}</h3>
// //               <h3>Phí vận chuyển: {formatter.format(shippingFee)}</h3>
// //               <h3>Tổng cộng: {formatter.format(totalPrice + shippingFee)}</h3>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default CreateOrder;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import CartItem from '../../../Components/CartItem/CartItem';
// import OrderItem from '../../../Components/OrderItem/OrderItem';
// import Footer from '../../../Components/Footer/Footer';
// import Header from '../../../Components/Header/Header';
// import './CreateOrder.css';
// import { fetchProvinces, fetchDistricts, fetchWards, fetchAvailableServices, calculateShippingFee } from './GHN';

// const CreateOrder = () => {
//   const DistricIDFrom = 1542;
//   const [orderItems, setOrderItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const UserId = localStorage.getItem('userId');
//   const [User, setUser] = useState([]);
//   const [provinces, setProvinces] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [wards, setWards] = useState([]);
//   const [services, setServices] = useState([]);
//   const [selectedProvince, setSelectedProvince] = useState(null);
//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   const [selectedWard, setSelectedWard] = useState(null);
//   const [shippingFee, setShippingFee] = useState(0);
//   const [selectedService, setSelectedService] = useState(null);
//   const [weight, setWeight] = useState(null);
//   const token = '18aae827-4dcd-11ef-b635-eeb7b370243f';  // Replace with your GHN API token
//   const shopId = 5228359;  // Replace with your shop ID
//   const formatter = new Intl.NumberFormat('vi-VN', {
//     style: 'currency',
//     currency: 'VND',
//   });
  
//   useEffect(() => {
//     // Fetch cart items from API
//     axios.get('http://localhost:8080/api/orderdetails/get-cart-items/' + UserId)
//       .then(response => {
//         setOrderItems(response.data.data);
//         calculateTotalPrice(response.data.data);
//         calculateWeight(response.data.data);
//       })
//       .catch(error => console.error('Error fetching cart items:', error));

//     // Fetch provinces
//     fetchProvinces(token).then(data => setProvinces(data.data));
//   }, []);

//   const calculateWeight = (items) => {
//     //tinh tong trong luong bang cach tinh tong trong luong cua tung san pham nhan voi so luong
//     const total = items.reduce((acc, item) => acc + item.weight * item.quantity, 0);
//     setWeight(total);
//   };

//   const calculateTotalPrice = (items) => {
//     const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   };

//   const handleProvinceChange = async (e) => {
//     const provinceId = e.target.value;
//     setSelectedProvince(provinceId);
//     const data = await fetchDistricts(token, provinceId);
//     setDistricts(data.data);
//     setWards([]);  // Reset wards
//     setSelectedDistrict(null);
//     setSelectedWard(null);
//     setServices([]);  // Reset services when province changes
//     setSelectedService(null);
//   };

//   const handleDistrictChange = async (e) => {
//     const districtId = e.target.value;
//     setSelectedDistrict(districtId);
//     const data = await fetchWards(token, districtId);
//     setWards(data.data);
//     setSelectedWard(null);
//     setServices([]);  // Reset services when district changes
//     setSelectedService(null);
//   };

//   const handleWardChange = async (e) => {
//     const wardCode = e.target.value;
//     setSelectedWard(wardCode);

//     // Fetch available services after selecting ward
//     const servicesData = await fetchAvailableServices(token, shopId, DistricIDFrom, selectedDistrict);
//     setServices(servicesData.data);
//   };

//   useEffect(() => {
//     if (selectedWard) {
//         const params = {
//             service_id: 53321,  // Replace with the service ID you choose
//             insurance_value: totalPrice,
//             coupon: null,
//             from_district_id: DistricIDFrom,
//             to_district_id: selectedDistrict,
//             to_ward_code: selectedWard,
//             height: 15,
//             length: 15,
//             weight: weight,
//             width: 15
//         };
//         calculateShippingFee(token, params).then(data => setShippingFee(data.data.total));
//     }
//     }, [selectedWard]);




//   const handleServiceChange = async (e) => {
//     const idService = e.target.value;
//     setSelectedService(idService);

//     // Calculate shipping fee when service is selected
//     const params = {
//       service_id: idService,
//       insurance_value: totalPrice,
//       coupon: null,
//       from_district_id: DistricIDFrom,
//       to_district_id: selectedDistrict,
//       to_ward_code: selectedWard,
//       height: 15,
//       length: 15,
//       weight: weight,
//       width: 15
//     };
//     const shipFee = await calculateShippingFee(token, params);
//     setShippingFee(shipFee.data.total);
    
    
//   };

//   return (
//     <div>
//       <Header />
//       <div className="cart">
//         <h2>Đơn hàng</h2>
//         {orderItems.length === 0 ? (
//           <p>Trống.</p>
//         ) : (
//           <div>
//             <div className="cart-header">
//               <span>Sản phẩm</span>
//               <span>Đơn giá</span>
//               <span>Số lượng</span>
//               <span>Thành tiền</span>
//               {/* <span>Khối lượng</span> */}
//             </div>
//             <div className="item-cart-andCb">
//               {orderItems.map(item => (
//                 <OrderItem
//                   key={item.productId}
//                   item={item}
//                 />
//               ))}
//             </div>
//             <div className="weight-div">
//               Tổng trọng lượng: {weight}g
//             </div>
//             <div className="shipping-info">
//               <h3>Thông tin vận chuyển</h3>
//               <div>
//                 <label>Tỉnh/Thành phố:</label>
//                 <select onChange={handleProvinceChange}>
//                   <option value="">Chọn tỉnh/thành phố</option>
//                   {provinces.map(province => (
//                     <option key={province.ProvinceID} value={province.ProvinceID}>{province.ProvinceName}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label>Quận/Huyện:</label>
//                 <select onChange={handleDistrictChange} disabled={!selectedProvince}>
//                   <option value="">Chọn quận/huyện</option>
//                   {districts.map(district => (
//                     <option key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label>Phường/Xã:</label>
//                 <select onChange={handleWardChange} disabled={!selectedDistrict}>
//                   <option value="">Chọn phường/xã</option>
//                   {wards.map(ward => (
//                     <option key={ward.WardCode} value={ward.WardCode}>{ward.WardName}</option>
//                   ))}
//                 </select>
//               </div>
//               {/* <div>
//                 <label>Dịch vụ vận chuyển:</label>
//                 <select onChange={handleServiceChange} disabled={!selectedWard}>
//                   <option value="">Chọn dịch vụ</option>
//                   {services.map(service => (
//                     <option key={service.service_id} value={service.service_id}>{service.short_name}</option>
//                   ))}
//                 </select>
//               </div> */}
//               <div>
//                 {/* <button onClick={calculateShipping} disabled={!selectedWard}>Tính phí vận chuyển</button> */}
//               </div>
//             </div>
//             <div className="cart-total">
//               <h3>Tổng: {formatter.format(totalPrice)}</h3>
//               <h3>Phí vận chuyển: {formatter.format(shippingFee)}</h3>
//               <h3>Tổng cộng: {formatter.format(totalPrice + shippingFee)}</h3>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CreateOrder;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItem from '../../../Components/OrderItem/OrderItem';
import Footer from '../../../Components/Footer/Footer';
import Header from '../../../Components/Header/Header';
import './CreateOrder.css';
import { fetchProvinces, fetchDistricts, fetchWards, fetchAvailableServices, calculateShippingFee } from './GHN';
import { fetchCartItems, fetchUserById, placeOrder } from '../../../api';

const CreateOrder = () => {
  const DistricIDFrom = 1542;
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const UserId = localStorage.getItem('userId');
  const [User, setUser] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [weight, setWeight] = useState(null);
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [error, setError] = useState(null);
  const token = '18aae827-4dcd-11ef-b635-eeb7b370243f';
  const shopId = 5228359;
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  useEffect(() => {
    // Fetch user info and cart items from API
    // axios.get(`http://localhost:8080/api/users/${UserId}`)
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
    setServices([]);
    setSelectedService(null);
  };

  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    const data = await fetchWards(token, districtId);
    setWards(data.data);
    setSelectedWard(null);
    setServices([]);
    setSelectedService(null);
  };

  const handleWardChange = async (e) => {
    const wardCode = e.target.value;
    setSelectedWard(wardCode);

    const servicesData = await fetchAvailableServices(token, shopId, DistricIDFrom, selectedDistrict);
    setServices(servicesData.data);
  };

  useEffect(() => {
    if (selectedWard) {
      const params = {
        service_id: 53321,
        insurance_value: totalPrice,
        coupon: null,
        from_district_id: DistricIDFrom,
        to_district_id: selectedDistrict,
        to_ward_code: selectedWard,
        height: 15,
        length: 15,
        weight: weight,
        width: 15
      };
      calculateShippingFee(token, params)
        .then(data => setShippingFee(data.data.total))
        //nếu lỗi thì set error và hiển thị thông báo


        .catch(() => setError('Địa chỉ không nằm trong khu vực giao hàng'));
    }
  }, [selectedWard, totalPrice, weight]);

  const handleServiceChange = async (e) => {
    const idService = e.target.value;
    setSelectedService(idService);

    const params = {
      service_id: idService,
      insurance_value: totalPrice,
      coupon: null,
      from_district_id: DistricIDFrom,
      to_district_id: selectedDistrict,
      to_ward_code: selectedWard,
      height: 15,
      length: 15,
      weight: weight,
      width: 15
    };
    calculateShippingFee(token, params)
      .then(data => setShippingFee(data.data.total))
      .catch(() => console.error('Địa chỉ không nằm trong khu vực giao hàng'));
  };

  const calculateDiscount = () => {
    let discount = 0;
    if (User.classification === 'LOYAL') {
      discount += shippingFee * 0.1;
      if (totalPrice > 2000000) discount += totalPrice * 0.02;
    } else if (User.classification === 'VIP') {
      discount += shippingFee*0.3;
      if (totalPrice > 2000000) discount += totalPrice * 0.03;
    }
    return discount;
  };

  const handlePlaceOrder = async () => {
    //hỏi xác nhận đặt hàng
    if (!window.confirm('Xác nhận đặt hàng?')) return;
    
    const discount = calculateDiscount();
    const total = totalPrice + shippingFee - discount;
    const receiverAddress = `${wards.find(w => w.WardCode === selectedWard)?.WardName}, ${districts.find(d => d.DistrictID === selectedDistrict)?.DistrictName}, ${provinces.find(p => p.ProvinceID === selectedProvince)?.ProvinceName}`;

    try {
      await placeOrder(UserId, receiverPhone, receiverAddress, receiverName, shippingFee, discount, total);
      alert('Đơn hàng đã được đặt thành công!');
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Đặt hàng không thành công. Vui lòng thử lại.');
    }
  };

  return (
    <div>
      <Header />
      <div className="cart">
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
              <div>
                <label>Địa chỉ:</label>
                <input className="address-order"
                  type="text"
                //   value={`${wards.find(w => w.WardCode === selectedWard)?.WardName || ''}, ${districts.find(d => d.DistrictID === selectedDistrict)?.DistrictName || ''}, ${provinces.find(p => p.ProvinceID === selectedProvince)?.ProvinceName || ''}`}
                  value={`${wards.find(w => w.WardCode === selectedWard)?.WardName || ''}, `}
                  readOnly
                />
              </div>
              <div>
                {error && <p className="error">{error}</p>}
                </div>

              {/* <div>
                <label>Dịch vụ vận chuyển:</label>
                <select onChange={handleServiceChange}>
                  <option value="">Chọn dịch vụ vận chuyển</option>
                  {services.map(service => (
                    <option key={service.service_id} value={service.service_id}>{service.short_name}</option>
                  ))}
                </select>
              </div> */}
            </div>
            <div className="order-summary">
              <p>Tổng tiền sản phẩm: {formatter.format(totalPrice)}</p>
              <p>Phí vận chuyển: {formatter.format(shippingFee)}</p>
              <p>Giảm giá: {formatter.format(calculateDiscount())}</p>
              <h3>Tổng thanh toán: {formatter.format(totalPrice + shippingFee - calculateDiscount())}</h3>
              {/* <button onClick={handlePlaceOrder}>Đặt hàng</button>
               */}
               
                <button onClick={handlePlaceOrder} disabled={error || !selectedWard || !selectedDistrict || !selectedProvince || !receiverName || !receiverPhone}>Đặt hàng</button>
          
                {/* <button onClick={handlePlaceOrder} disabled={error || !selectedWard || !selectedDistrict || !selectedProvince || !receiverName || !receiverPhone}>Đặt hàng</button> */}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CreateOrder;
