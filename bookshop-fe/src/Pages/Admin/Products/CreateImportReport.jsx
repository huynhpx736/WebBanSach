// import React, { useState, useEffect } from 'react';
// import './CreateImportReport.css';
// import { Button, TextField } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import {
//   fetchAllProducts,
//   fetchProductById,
//   createImportReports,
//   addItemToImportReport
// } from '../../../api';

// const CreateImportReport = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const [searchTerm, setSearchTerm] = useState('');
//   const [productList, setProductList] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [importProducts, setImportProducts] = useState([]);
//   const [importReportId, setImportReportId] = useState(null);
//   const [importReportDTO, setImportReportDTO] = useState({
//     user: user
//   });


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await fetchAllProducts();
//         setProductList(data);
//         setFilteredProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleSearch = () => {
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     const filtered = productList.filter(
//       (product) =>
//         product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
//         product.id.toString().includes(searchTerm)
//     );
//     setFilteredProducts(filtered);
//   };

//   const handleAddProduct = async (productId) => {
//     try {
//       const product = await fetchProductById(productId);
//       if (!importProducts.some((p) => p.id === product.id)) {
//         setImportProducts([...importProducts, { ...product, importQuantity: 1, price : product.price }]);
//       }
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//     }
//   };

//   const handleQuantityChange = (id, quantity) => {
//     setImportProducts((prev) =>
//       prev.map((product) =>
//         product.id === id ? { ...product, importQuantity: quantity } : product
//       )
//     );
//     console.log(importProducts);
//   };

//   const handleSaveReport = async () => {
//     try {
//       const report = await createImportReports(importReportDTO);

//       setImportReportId(report.id);
//       console.log(importReportId);
//       importProducts.map(async (product) => {
//       console.log(report.id, product.id, product.importQuantity, product.price);

//         await addItemToImportReport(report.id, product.id, product.importQuantity, product.price);
//       });
//     } catch (error) {
//       console.error('Error creating import report:', error);
//     }

//   };

//   return (
//     <div className="create-import-report">
//       <h1 className="head-import-report">Tạo phiếu nhập</h1>

//       <div className="search-bar-import">
//         <TextField
//           label="Tìm kiếm sản phẩm"
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ width: '70%' }}
//         />
//         <Button
//           variant="contained"
//           startIcon={<SearchIcon />}
//           onClick={handleSearch}
//           style={{ marginLeft: '10px', backgroundColor: '#1976d2', color: '#fff' }}
//         >
//           Tìm kiếm
//         </Button>
//       </div>

//       <div className="product-list-import">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="product-item">
//             <img src={product.image} alt={product.title} />
//             <span>{product.title}</span>
//             <Button
//               variant="outlined"
//               onClick={() => handleAddProduct(product.id)}
//             >
//               Thêm
//             </Button>
//           </div>
//         ))}
//       </div>

//       <h2>Sản phẩm trong phiếu nhập</h2>
//       <div className="import-list">
//         {importProducts.map((product) => (
//           <div key={product.id} className="import-item">
//             <img src={product.image} alt={product.name} />
//             <span>{product.name}</span>
//             <span>Hiện có: {product.salesVolume}</span>
//             <TextField
//               type="number"
//               value={product.importQuantity}
//               onChange={(e) =>
//                 handleQuantityChange(product.id, parseInt(e.target.value, 10))
//               }
//               style={{ width: '80px', marginLeft: '10px' }}
//             />
//             <span>Sau nhập: {product.salesVolume + product.importQuantity}</span>
//             <break/>
//           </div>
//         ))}
//       </div>

//       <Button
//         variant="contained"
//         onClick={handleSaveReport}
//         style={{ marginTop: '20px', backgroundColor: '#4caf50', color: '#fff' }}
//       >
//         Lưu phiếu nhập
//       </Button>
//     </div>
//   );
// };

// export default CreateImportReport;










// //đã chạy

// import React, { useState, useEffect } from 'react';
// import './CreateImportReport.css';
// import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {
//   fetchAllProducts,
//   fetchProductById,
//   createImportReports,
//   addItemToImportReport
// } from '../../../api';

// const CreateImportReport = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const [searchTermId, setSearchTermId] = useState('');
//   const [searchTermName, setSearchTermName] = useState('');
//   const [productList, setProductList] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [importProducts, setImportProducts] = useState([]);
//   const [importReportId, setImportReportId] = useState(null);
//   const [importReportDTO, setImportReportDTO] = useState({ user });
//   const [allProduct, setAllProduct] = useState([]);


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await fetchAllProducts();
//         setAllProduct(data);
//         // setProductList(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);
//   // allProduct();
//   const handleSearch = () => {
//     //in ra serachTermId và searchTermName
//     console.log(searchTermId, searchTermName);
//     const filteredById = allProduct.filter((product) =>
//       product.id===parseInt(searchTermId)
//     );
//     //nếu serachTermName không có giá trị thì return về mảng rỗng
//     if(searchTermName === ''){
//       setFilteredProducts(filteredById);
//       return;
//     }
//     const filteredByName = allProduct.filter((product) =>
//       product.title.toLowerCase().includes(searchTermName.toLowerCase())
//     );
//     const combinedFiltered = [...new Set([...filteredById, ...filteredByName])];
//     setFilteredProducts(combinedFiltered);
//   };

//   const handleAddProduct = async (productId) => {
//     try {
//       const product = await fetchProductById(productId);
//       if (!importProducts.some((p) => p.id === product.id)) {
//         setImportProducts([...importProducts, { ...product, importQuantity: 1, price: product.price }]);
//       }
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//     }
//   };

//   const handleQuantityChange = (id, quantity) => {
//     setImportProducts((prev) =>
//       prev.map((product) =>
//         product.id === id ? { ...product, importQuantity: quantity } : product
//       )
//     );
//   };

//   const handleRemoveProduct = (id) => {
//     setImportProducts((prev) => prev.filter((product) => product.id !== id));
//   };

//   // const handleSaveReport = async () => {
//   //   try {
//   //     const report = await createImportReports(importReportDTO);
//   //     setImportReportId(report.id);

//   //     for (const product of importProducts) {
//   //       await addItemToImportReport(report.id, product.id, product.importQuantity, product.price);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error creating import report:', error);
//   //   }
//   // };
//   const handleSaveReport = async () => {
//     //nếu không có sản phẩm trong phiếu nhập thì thông báo và return
//     if (importProducts.length === 0) {
//       alert('Vui lòng thêm sản phẩm vào phiếu nhập!');
//       return;
//     }
//     try {
//       const report = await createImportReports(importReportDTO);
//       setImportReportId(report.id);

//       for (const product of importProducts) {
//         await addItemToImportReport(
//           report.id,
//           product.id,
//           product.importQuantity,
//           product.price 
//         );
//       }
//       alert('Phiếu nhập đã được lưu thành công!');
//     } catch (error) {
//       console.error('Error creating import report:', error);
//       alert('Lỗi khi lưu phiếu nhập!');
//     }
//   };


//   return (
//     <div className="create-import-report">
//       <h1 className="head-import-report">TẠO PHIẾU NHẬP</h1>

//       <div className="search-bar-import">
//         <TextField
//           label="Mã sản phẩm"
//           variant="outlined"
//           value={searchTermId}
//           onChange={(e) => setSearchTermId(e.target.value)}
//           style={{ marginRight: '10px', width: '40%' }}
//         />
//         <TextField
//           label="Tên sản phẩm"
//           variant="outlined"
//           value={searchTermName}
//           onChange={(e) => setSearchTermName(e.target.value)}
//           style={{ marginRight: '10px', width: '40%' }}
//         />
//         <Button
//           variant="contained"
//           startIcon={<SearchIcon />}
//           onClick={handleSearch}
//           style={{ backgroundColor: '#1976d2', color: '#fff' }}
//         >
//           Tìm kiếm
//         </Button>
//       </div>

//       {filteredProducts.length > 0 && (
//         <div className="product-list-import">
//           <h2>Kết quả tìm kiếm</h2>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Mã</TableCell>
//                   <TableCell>Hình ảnh</TableCell>
//                   <TableCell>Tên sản phẩm</TableCell>
//                   <TableCell>Thao tác</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredProducts.map((product) => (
//                   <TableRow key={product.id}>
//                     <TableCell>{product.id}</TableCell>
//                     <TableCell><img src={product.image} alt={product.title} style={{ width: '50px' }} /></TableCell>
//                     <TableCell>{product.title}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         onClick={() => handleAddProduct(product.id)}
//                       >
//                         Thêm
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       )}

//       {importProducts.length > 0 && (
//         <div className="import-list">
//           <h2>Sản phẩm trong phiếu nhập</h2>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>

//                   <TableCell>STT</TableCell>
//                   <TableCell>Mã</TableCell>
//                   <TableCell>Hình ảnh</TableCell>
//                   <TableCell>Tên sản phẩm</TableCell>
//                   <TableCell>Hiện có</TableCell>
//                   <TableCell>Nhập thêm</TableCell>
//                   <TableCell>Sau nhập</TableCell>
//                   <TableCell>Giá nhập</TableCell>
//                   <TableCell>Thao tác</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {importProducts.map((product, index) => (
//                   <TableRow key={product.id}>           
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{product.id}</TableCell>
//                     <TableCell><img src={product.image} alt={product.title} style={{ width: '50px' }} /></TableCell>
//                     <TableCell>{product.title}</TableCell>
//                     <TableCell>{product.salesVolume}</TableCell>
//                     <TableCell>
//                       <TextField
//                         type="number"
//                         value={product.importQuantity}
//                         onChange={(e) =>
//                           handleQuantityChange(product.id, parseInt(e.target.value, 10))
//                         }
//                         style={{ width: '80px' }}
//                       />
//                     </TableCell>
//                     <TableCell>{product.salesVolume + product.importQuantity}</TableCell>
//                     {/* <TableCell>{product.price}</TableCell> */}
//                     <TableCell>
//              <TextField
//     type="number"
//     value={product.price}
//     onChange={(e) =>
//       setImportProducts((prev) =>
//         prev.map((p) =>
//           p.id === product.id ? { ...p, price: parseFloat(e.target.value) || 0 } : p
//         )
//       )
//     }
//     style={{ width: '100px' }}
//   />
// </TableCell>

//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         startIcon={<DeleteIcon />}
//                         onClick={() => handleRemoveProduct(product.id)}
//                         style={{ color: 'red', borderColor: 'red' }}
//                       >
//                         Xóa
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       )}

//       <Button
//         variant="contained"
//         onClick={handleSaveReport}
//         style={{ marginTop: '20px', backgroundColor: '#4caf50', color: '#fff' }}
//       >
//         Lưu phiếu nhập
//       </Button>
//     </div>
//   );
// };

// export default CreateImportReport;



// import React, { useState, useEffect } from 'react';
// import './CreateImportReport.css';
// import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { read, utils } from 'xlsx';
// import {
//   fetchProductById,
//   fetchAllProducts,
//   createImportReports,
//   addItemToImportReport
// } from '../../../api';

// const CreateImportReport = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const [searchTermId, setSearchTermId] = useState('');
//   const [searchTermName, setSearchTermName] = useState('');
//   const [productList, setProductList] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [importProducts, setImportProducts] = useState([]);
//   const [importReportId, setImportReportId] = useState(null);
//   const [importReportDTO, setImportReportDTO] = useState({ user });
//   const [allProduct, setAllProduct] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await fetchAllProducts();
//         setAllProduct(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleSearch = () => {
//     const filteredById = allProduct.filter((product) =>
//       product.id === parseInt(searchTermId)
//     );
//     if (searchTermName === '') {
//       setFilteredProducts(filteredById);
//       return;
//     }
//     const filteredByName = allProduct.filter((product) =>
//       product.title.toLowerCase().includes(searchTermName.toLowerCase())
//     );
//     const combinedFiltered = [...new Set([...filteredById, ...filteredByName])];
//     setFilteredProducts(combinedFiltered);
//   };

//   const handleAddProduct = async (productId) => {
//     try {
//       const product = await fetchProductById(productId);
//       if (!importProducts.some((p) => p.id === product.id)) {
//         setImportProducts([...importProducts, { ...product, importQuantity: 1, price: product.price }]);
//       }
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//     }
//   };

//   const handleQuantityChange = (id, quantity) => {
//     setImportProducts((prev) =>
//       prev.map((product) =>
//         product.id === id ? { ...product, importQuantity: quantity } : product
//       )
//     );
//   };

//   const handleRemoveProduct = (id) => {
//     setImportProducts((prev) => prev.filter((product) => product.id !== id));
//   };

//   const handleSaveReport = async () => {
//     if (importProducts.length === 0) {
//       alert('Vui lòng thêm sản phẩm vào phiếu nhập!');
//       return;
//     }
//     try {
//       const report = await createImportReports(importReportDTO);
//       setImportReportId(report.id);
//       for (const product of importProducts) {
//         await addItemToImportReport(
//           report.id,
//           product.id,
//           product.importQuantity,
//           product.price
//         );
//       }
//       alert('Phiếu nhập đã được lưu thành công!');
//     } catch (error) {
//       console.error('Error creating import report:', error);
//       alert('Lỗi khi lưu phiếu nhập!');
//     }
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const rows = utils.sheet_to_json(worksheet);

//       const newProducts = rows.map((row) => {
//         const existingProduct = allProduct.find((p) => p.id === row.id);
//         if (existingProduct) {
//           return {
//             ...existingProduct,
//             importQuantity: row.importQuantity,
//             price: row.price,
//           };
//         }
//         return null;
//       }).filter(Boolean);

//       setImportProducts((prev) => [...prev, ...newProducts]);
//       console.log('importProducts', importProducts);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div className="create-import-report">
//       <h1 className="head-import-report">TẠO PHIẾU NHẬP</h1>

//       <div className="search-bar-import">
//         <TextField
//           label="Mã sản phẩm"
//           variant="outlined"
//           value={searchTermId}
//           onChange={(e) => setSearchTermId(e.target.value)}
//           style={{ marginRight: '10px', width: '40%' }}
//         />
//         <TextField
//           label="Tên sản phẩm"
//           variant="outlined"
//           value={searchTermName}
//           onChange={(e) => setSearchTermName(e.target.value)}
//           style={{ marginRight: '10px', width: '40%' }}
//         />
//         <Button
//           variant="contained"
//           startIcon={<SearchIcon />}
//           onClick={handleSearch}
//           style={{ backgroundColor: '#1976d2', color: '#fff' }}
//         >
//           Tìm kiếm
//         </Button>
//       </div>

//       <div className="file-upload">
//         <label htmlFor="file-input">
//           <Button
//             variant="contained"
//             component="span"
//             style={{ marginTop: '10px', backgroundColor: '#3f51b5', color: '#fff' }}
//           >
//             Nhập từ file
//           </Button>
//         </label>
//         <input
//           id="file-input"
//           type="file"
//           accept=".xlsx, .xls"
//           style={{ display: 'none' }}
//           onChange={handleFileUpload}
//         />
//       </div>

//       {filteredProducts.length > 0 && (
//         <div className="product-list-import">
//           <h2>Kết quả tìm kiếm</h2>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Mã</TableCell>
//                   <TableCell>Hình ảnh</TableCell>
//                   <TableCell>Tên sản phẩm</TableCell>
//                   <TableCell>Thao tác</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredProducts.map((product) => (
//                   <TableRow key={product.id}>
//                     <TableCell>{product.id}</TableCell>
//                     <TableCell><img src={product.image} alt={product.title} style={{ width: '50px' }} /></TableCell>
//                     <TableCell>{product.title}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         onClick={() => handleAddProduct(product.id)}
//                       >
//                         Thêm
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       )}

//       {importProducts.length > 0 && (
//         <div className="import-list">
//           <h2>Sản phẩm trong phiếu nhập</h2>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>

//                   <TableCell>STT</TableCell>
//                   <TableCell>Mã</TableCell>
//                   <TableCell>Hình ảnh</TableCell>
//                   <TableCell>Tên sản phẩm</TableCell>
//                   <TableCell>Hiện có</TableCell>
//                   <TableCell>Nhập thêm</TableCell>
//                   <TableCell>Sau nhập</TableCell>
//                   <TableCell>Giá nhập</TableCell>
//                   <TableCell>Thao tác</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {importProducts.map((product, index) => (
//                   <TableRow key={product.id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{product.id}</TableCell>
//                     <TableCell><img src={product.image} alt={product.title} style={{ width: '50px' }} /></TableCell>
//                     <TableCell>{product.title}</TableCell>
//                     <TableCell>{product.salesVolume}</TableCell>
//                     <TableCell>
//                       <TextField
//                         type="number"
//                         value={product.importQuantity}
//                         onChange={(e) =>
//                           handleQuantityChange(product.id, parseInt(e.target.value, 10))
//                         }
//                         style={{ width: '80px' }}
//                       />
//                     </TableCell>
//                     <TableCell>{product.salesVolume + product.importQuantity}</TableCell>
//                     {/* <TableCell>{product.price}</TableCell> */}
//                     <TableCell>
//                       <TextField
//                         type="number"
//                         // value={product.price}
//                         //làm cho value = 0 khi chưa nhập giá
//                         value={product.price || 0}

//                         onChange={(e) =>
//                           setImportProducts((prev) =>
//                             prev.map((p) =>
//                               p.id === product.id ? { ...p, price: parseFloat(e.target.value) || 0 } : p
//                             )
//                           )
//                         }
//                         style={{ width: '100px' }}
//                       />
//                     </TableCell>

//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         startIcon={<DeleteIcon />}
//                         onClick={() => handleRemoveProduct(product.id)}
//                         style={{ color: 'red', borderColor: 'red' }}
//                       >
//                         Xóa
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       )}

//       <Button
//         variant="contained"
//         onClick={handleSaveReport}
//         style={{ marginTop: '20px', backgroundColor: '#4caf50', color: '#fff' }}
//       >
//         Lưu phiếu nhập
//       </Button>
//     </div>
//   );
// };

// export default CreateImportReport;


import React, { useState, useEffect } from 'react';
import './CreateImportReport.css';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { read, utils } from 'xlsx';
import {
  fetchProductById,
  fetchAllProducts,
  createImportReports,
  addItemToImportReport,
} from '../../../api';

const CreateImportReport = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchTermId, setSearchTermId] = useState('');
  const [searchTermName, setSearchTermName] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [importProducts, setImportProducts] = useState([]);
  const [importReportDTO] = useState({ user });
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setAllProduct(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = () => {
    const filteredById = searchTermId
      ? allProduct.filter((product) => product.id === parseInt(searchTermId))
      : [];
    const filteredByName = searchTermName
      ? allProduct.filter((product) =>
          product.title.toLowerCase().includes(searchTermName.toLowerCase())
        )
      : [];
    const combinedFiltered = [...new Set([...filteredById, ...filteredByName])];
    setFilteredProducts(combinedFiltered);
  };

  const handleAddProduct = async (productId) => {
    try {
      const product = await fetchProductById(productId);
      if (!importProducts.some((p) => p.id === product.id)) {
        setImportProducts([...importProducts, { ...product, importQuantity: 1, price: product.price }]);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setImportProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, importQuantity: quantity } : product
      )
    );
  };

  const handleRemoveProduct = (id) => {
    setImportProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleSaveReport = async () => {
    if (importProducts.length === 0) {
      alert('Vui lòng thêm sản phẩm vào phiếu nhập!');
      return;
    }
    try {
      const report = await createImportReports(importReportDTO);
      for (const product of importProducts) {
        await addItemToImportReport(report.id, product.id, product.importQuantity, product.price);
      }
      alert('Phiếu nhập đã được lưu thành công!');
      setImportProducts([]);
    } catch (error) {
      console.error('Error creating import report:', error);
      alert('Lỗi khi lưu phiếu nhập!');
    }
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) {
  //     alert('Vui lòng chọn file!');
  //     return;
  //   }
  //   if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
  //     alert('Chỉ hỗ trợ file định dạng .xlsx hoặc .xls!');
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     try {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = read(data, { type: 'array' });
  //       const sheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[sheetName];
  //       console.log('worksheet', worksheet);
  //       const rows = utils.sheet_to_json(worksheet);
  //       console.log('rows', rows);
  //       const newProducts = rows
  //         .map((row) => {
  //           const existingProduct = allProduct.find((p) => p.id === row.id);
  //           if (existingProduct) {
  //             return {
  //               ...existingProduct,
  //               importQuantity: row.importQuantity || 1,
  //               price: row.price || existingProduct.price,
  //             };
  //           }
  //           return null;
  //         })
  //         .filter(Boolean);

  //       setImportProducts((prev) => [...prev, ...newProducts]);
  //     } catch (error) {
  //       console.error('Error reading file:', error);
  //       alert('Đã xảy ra lỗi khi xử lý file!');
  //     }
  //   };
  //   reader.readAsArrayBuffer(file);
  // };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('Vui lòng chọn file!');
      return;
    }
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      alert('Chỉ hỗ trợ file định dạng .xlsx hoặc .xls!');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = utils.sheet_to_json(worksheet);
  
        console.log(rows); // Kiểm tra dữ liệu đọc được
        if (rows.length === 0) {
          alert('File rỗng hoặc không hợp lệ!');
          return;
        }
  
        // const newProducts = rows.map((row) => ({
        //   id: row['Mã sản phẩm'],
        //   title: row['Tên sản phẩm'],
        //   importQuantity: row['Số lượng nhập'],
        //   price: row['Giá nhập'],
        // }));

        rows.forEach((row) => {
          const existingProduct = allProduct.find((p) => p.id === row['Mã sản phẩm']);
          if (!existingProduct) {
            console.warn(`Sản phẩm với ID ${row['Mã sản phẩm']} không tồn tại trong danh sách sản phẩm.`);
          }
        });
        
        const newProducts = rows
          .map((row) => {
            const existingProduct = allProduct.find((p) => p.id === row['Mã sản phẩm']);
            if (existingProduct) {
              return {
                ...existingProduct,
                importQuantity: row['Số lượng nhập'] || 1,
                price: row['Giá nhập'] ,
              };
            }
            return null;
          })
          .filter((product) => product !== null);
        
        
  
        console.log(newProducts); // Kiểm tra dữ liệu chuyển đổi
        // setImportProducts((prev) => [...prev, ...newProducts]);
        //nếu không có sản phẩm nào thì thông báo
        if (newProducts.length === 0) {
          alert('Không có sản phẩm nào để nhập!');
          return;
        }
        //nếu newProducts đã tồn tại trong importProducts thì thông báo
        if (newProducts.some((product) => importProducts.some((p) => p.id === product.id))) {
          alert('Sản phẩm đã tồn tại trong danh sách nhập!');
          return;
        }
        setImportProducts((prev) => [...prev, ...newProducts]);
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Đã xảy ra lỗi khi xử lý file!');
      }
    };
    reader.readAsArrayBuffer(file);
  };
  

  return (
    <div className="create-import-report">
      <h1 className="head-import-report">TẠO PHIẾU NHẬP</h1>

      <div className="search-bar-import">
        <TextField
          label="Mã sản phẩm"
          variant="outlined"
          value={searchTermId}
          onChange={(e) => setSearchTermId(e.target.value)}
          style={{ marginRight: '10px', width: '40%' }}
        />
        <TextField
          label="Tên sản phẩm"
          variant="outlined"
          value={searchTermName}
          onChange={(e) => setSearchTermName(e.target.value)}
          style={{ marginRight: '10px', width: '40%' }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          style={{ backgroundColor: '#1976d2', color: '#fff' }}
        >
          Tìm kiếm
        </Button>
      </div>

      <div className="file-upload">
        <label htmlFor="file-input">
          <Button
            variant="contained"
            component="span"
            style={{ marginTop: '10px', backgroundColor: '#3f51b5', color: '#fff' }}
          >
            Nhập từ file
          </Button>
        </label>
        <input
          id="file-input"
          type="file"
          accept=".xlsx, .xls"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>

      {/* Kết quả tìm kiếm */}
      {filteredProducts.length > 0 && (
        <div className="product-list-import">
          <h2>Kết quả tìm kiếm</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã</TableCell>
                  <TableCell>Hình ảnh</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <img src={product.image} alt={product.title} style={{ width: '50px' }} />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleAddProduct(product.id)}>
                        Thêm
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Danh sách sản phẩm nhập */}
      {importProducts.length > 0 && (
        <div className="import-list">
          <h2>Sản phẩm trong phiếu nhập</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Mã</TableCell>
                  <TableCell>Hình ảnh</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Hiện có</TableCell>
                  <TableCell>Nhập thêm</TableCell>
                  <TableCell>Sau nhập</TableCell>
                  <TableCell>Giá nhập</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {importProducts.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <img src={product.image} alt={product.title} style={{ width: '50px' }} />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.salesVolume}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={product.importQuantity}
                        onChange={(e) =>
                          handleQuantityChange(product.id, parseInt(e.target.value, 10))
                        }
                        style={{ width: '80px' }}
                      />
                    </TableCell>
                    <TableCell>{product.salesVolume + product.importQuantity}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={product.price || 0}
                        onChange={(e) =>
                          setImportProducts((prev) =>
                            prev.map((p) =>
                              p.id === product.id
                                ? { ...p, price: parseFloat(e.target.value) || 0 }
                                : p
                            )
                          )
                        }
                        style={{ width: '100px' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <div className="save-button">
        <Button
          variant="contained"
          color="success"
          onClick={handleSaveReport}
          disabled={importProducts.length === 0}
          style={{ marginTop: '20px' }}
        >
          Lưu phiếu nhập
        </Button>
      </div>
    </div>
  );
};

export default CreateImportReport;
