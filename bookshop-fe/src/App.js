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
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
};

export default App;