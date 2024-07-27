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
import AddProduct from './Pages/Admin/Products/AddProduct';
import EditProduct from './Pages/Admin/Products/EditProduct';
import ManageProduct from './Pages/Admin/Products/ManageProducts';
import ManageCategory from './Pages/Admin/Category/ManageCategory';
import AddCategory from './Pages/Admin/Category/AddCateory';
import EditCategory from './Pages/Admin/Category/EditCategory';
import Shop from './Pages/Shop/Shop';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/search" element={<Search />} />

      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/category/:categoryId" element={<CategoryPage/>} />

      
      <Route path="/admin" element={<AdminLayout />}>
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        {/* <Route path="orders" element={<Orders />} /> */}
        <Route path="products" element={<ManageProduct />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="categories" element={<ManageCategory />} />
        <Route path="categories/add" element={<AddCategory />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />
        {/* <Route path="authors" element={<Authors />} /> */}
        {/* <Route path="publishers" element={<Publishers />} /> */}
        {/* <Route path="tags" element={<Tags />} /> */}
      </Route>      
    </Routes>
  );
};

export default App;