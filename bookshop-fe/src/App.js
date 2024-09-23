// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Search from './pages/Search';
// import ProductDetail from './pages/ProductDetail';
// import AdminDashboard from './pages/admin/Dashboard';
// import AdminProducts from './pages/admin/Products';
// import AdminOrders from './pages/admin/Orders';
// import AdminAuthors from './pages/admin/Authors';
// import AdminPublishers from './pages/admin/Publishers';
// import AdminTags from './pages/admin/Tags';
// import AdminUsers from './pages/admin/Users';
// import Cart from './pages/Cart';
// import OrderStatus from './pages/OrderStatus';
// import Login from './pages/Login';
// import Register from './pages/Register';

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/search" element={<Search />} />
//       <Route path="/product/:id" element={<ProductDetail />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/order-status" element={<OrderStatus />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/admin" element={<AdminDashboard />} />
//       <Route path="/admin/products" element={<AdminProducts />} />
//       <Route path="/admin/orders" element={<AdminOrders />} />
//       <Route path="/admin/authors" element={<AdminAuthors />} />
//       <Route path="/admin/publishers" element={<AdminPublishers />} />
//       <Route path="/admin/tags" element={<AdminTags />} />
//       <Route path="/admin/users" element={<AdminUsers />} />
//     </Routes>
//   );
// };

// export default App;
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ProductDetail from './Pages/Product/ProductDetail';
import Search from './Pages/Search/SearchProduct';
import Register from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import CategoryPage from './Pages/CategoryPage/CategoryPage';

import AdminLayout from './Pages/Admin/AdminLayout/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard/Dashboard';
// import ManageProduct from './Pages/Admin/ManageProducts/ManageProducts';
// import AddProduct from './Pages/Admin/Products/AddProduct';
// import EditProduct from './Pages/Admin/Products/EditProduct';
// import ManageProduct from './Pages/Admin/Products/ManageProducts';
import ManageProduct from './Pages/Admin/Products/ManaProduct';
import ManageCategory from './Pages/Admin/Category/ManageCategory';
// import AddCategory from './Pages/Admin/Category/AddCateory';
// import EditCategory from './Pages/Admin/Category/EditCategory';
import Shop from './Pages/Shop/Shop';
import { AuthProvider } from './Pages/Auth/AuthContext';
import Profile from './Pages/User/Profile/Profile';
import Cart from './Pages/User/Cart/Cart';
import Order from './Pages/User/Order/Order';
import ManagePublisher from './Pages/Admin/Publisher/ManagePublisher';
import ManageAuthor from './Pages/Admin/Author/ManageAuthor';
import ManageTag from './Pages/Admin/Tag/ManageTag';
import CreateOrder from './Pages/User/CreateOrder/CreateOrder';
import NotFound from './Pages/404';
import OrderDetail from './Pages/User/Order/OrderDetail';
import PlacedOrders from './Pages/Admin/Orders/PlacedOrders';
import OrderDetailAdmin from './Pages/Admin/Orders/OrderDetailAdmin';
import ShippingOrders from './Pages/Admin/Orders/ShippingOrders';
import CancelledOrders from './Pages/Admin/Orders/CancelledOrders';
import CompletedOrders from './Pages/Admin/Orders/CompletedOrders';
import About from './Pages/About/About';
import ReviewPage from './Pages/User/Order/ReviewPage';
import FindResults from './Pages/FindProduct/FindProduct';
const App = () => {
  return (
    <AuthProvider>
    <Routes>
     
       <Route path="*" element={NotFound} /> 
       
      {/* <Route path="*" element={<div> <h2>Not found</h2></div>} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/search" element={<Search />} />
      <Route path='/findProduct' element={<FindResults />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path='/profile' element ={<Profile/>} />
      <Route path='/cart' element ={<Cart />} />
      <Route path='/orders' element={<Order />} />
      <Route path='/orderDetail/:orderId' element={<OrderDetail />} />
      <Route path='createOrder' element={<CreateOrder />} />
      <Route path='/review/:orderId' element={<ReviewPage />} />
      <Route path="/category/:categoryId" element={<CategoryPage/>} />
      <Route path='/about' element={<About/>} />
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route path="orders" element={<Orders />} /> */}
        <Route path="products" element={<ManageProduct />} />
        {/* <Route path="products/add" element={<AddProduct />} /> */}
        {/* <Route path="products/edit/:id" element={<EditProduct />} /> */}
        <Route path="categories" element={<ManageCategory />} />
        {/* <Route path="categories/add" element={<AddCategory />} /> */}
        {/* <Route path="categories/edit/:id" element={<EditCategory />} /> */}
        <Route path="authors" element={ <ManageAuthor/>} />
        <Route path="publishers" element={<ManagePublisher/>} />
        <Route path="tags" element={<ManageTag />} />
        <Route path="orders/ordered" element = {<PlacedOrders/>} />
        <Route path='orders/shipping' element={<ShippingOrders />} />
        <Route path='orders/cancelled' element={<CancelledOrders />} />
        <Route path='orders/completed' element={<CompletedOrders />} />
        <Route path='orders/:orderId' element={<OrderDetailAdmin />} />
      </Route>      
    </Routes>
    </AuthProvider>
  );
};

export default App;