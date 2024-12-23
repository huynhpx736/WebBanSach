// api.js
import axios from 'axios';
// import dotenv from  'dotenv'
// axios.defaults.baseURL = 'http://localhost:8080';
//lấy từ env file
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// Auth APIs
export const register = async (username, password, email, fullname, phone, role) => {
  try {
    const response = await axios.post('/api/auth/register', {
      username: username,
      password: password,
      email: email,
      fullname: fullname,
      phone: phone,
      role: role
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to register.');
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post('/api/auth/login', {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login.');
  }
};

//hàm gửi mail xác nhận đăng ký trả về mã OTP
export const sendMailVerifyAndGetOTP = async (email) => {
  try {
    const response = await axios.post('/api/auth/verify-otp-register', null, {
      params: {
        email
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send mail verify.');
  }
};

//hàm gửi mail xác nhận quên mật khẩu trả về mã OTP
export const sendMailForgotPasswordAndGetOTP = async (email) => {
  try {
    const response = await axios.post('/api/auth/verify-otp-forgot-password', null, {
      params: {
        email
      }
    });
    return response.data;
  }
  catch (error) {
    throw new Error('Failed to send mail forgot password.');
  }
};


// User APIs
export const updateActive = async (id, activeStatus) => {
  try {
    const response = await axios.put('/api/users/update-active', null, {
      params: {
        id,
        activeStatus
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update active status.');
  }
};

export const getAllUserByRole = async (role) => {
  try {
    const response = await axios.get('/api/users/get-all-by-role', {
      params: {
        role
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch users by role.');
  }
};
export const updateClassifications = async (id, classifications) => {
  try {
    const response = await axios.put('/api/users/update-classifications', null, {
      params: {
        id,
        classifications
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update classifications.');
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get('/api/users/get-all');
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch users.');
  }
};

export const createUser = async (userDTO) => {
  try {
    const response = await axios.post('/api/users/create', userDTO);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to create user.');
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`/api/users/delete/${id}`);
  } catch (error) {
    throw new Error('Failed to delete user.');
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch user by ID.');
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`/api/users/update/${userId}`, userData);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update user information.');
  }
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const response = await axios.put(`/api/users/change-password/${userId}`, null, {
      params: {
        oldPassword,
        newPassword
      }
    });
    return response.data.message;
  } catch (error) {
    throw new Error('Failed to change password.');
  }
};

export const changePasswordByEmail = async (email, newPassword) => {
  try {
    const response = await axios.put(`/api/users/change-password-by-email`, null, {
      params: {
        email,
        newPassword
      }
    });
    return response.data.message;
  } catch (error) {
    throw new Error('Failed to change password.');
  }
};
// Cart APIs
export const fetchCartItemById = async (orderDetailId) => {
  try {
    const response = await axios.get(`/api/orderdetails/${orderDetailId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch cart item by ID.');
  }
};

export const addProductToCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post('/api/orderdetails/add-to-cart', null, {
      params: {
        userId,
        productId,
        quantity
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add product to cart.');
  }
};

export const placeOrder = async (userId, receiverPhone, receiverAddress, receiverName, shippingFee, discount, total) => {
  try {
    const response = await axios.post('/api/orders/place-order', null, {
      params: {
        userId,
        receiverPhone,
        receiverAddress,
        receiverName,
        shippingFee,
        discount,
        total
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to place order.');
  }
};

export const fetchCartItems = async (userId) => {
  try {
    const response = await axios.get(`/api/orderdetails/get-cart-items/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch cart items.');
  }
};


export const getOrderItemsByOrderId = async (orderId) => {
  try {
    const response = await axios.get(`/api/orderdetails/order/${orderId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch order items by order ID.');
  }
};


export const updateCartItemQuantity = async (orderDetailId, newQuantity) => {
  try {
    const response = await axios.put(`/api/orderdetails/update-quantity`, null, {
      params: {
        idDetailOrder: orderDetailId,
        newQuantity
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update cart item quantity.');
  }
};

export const removeProductFromCart = async (orderDetailId) => {
  try {
    await axios.delete(`/api/orderdetails/delete/${orderDetailId}`);
  } catch (error) {
    throw new Error('Failed to remove product from cart.');
  }
};

// Order APIs
export const placeUserOrder = async (userId, orderDetails, orderDTO) => {
  try {
    const response = await axios.post(`/api/orders/place`, { userId, orderDetails, orderDTO });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to place order.');
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`/api/orders/update-status/${orderId}`, null, {
      params: { status }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update order status.');
  }
};

export const cancelOrderByAdmin = async (orderId, cancelReason, note) => {
  try {
    const response = await axios.post(`/api/orders/cancel-by-admin/${orderId}`,null, {
      params: { cancelReason, note }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to cancel order.');
  }
};
//hàm get all order by status
export const getOrderByStatus = async (status) => {
  try {
    const response = await axios.get(`/api/orders/get-all-by-status`, {
      params: { status }
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch orders by status:', error);
    throw new Error('Failed to fetch orders by status.');
  }
}

export const getOrderByUserAndStatus = async (userId, status) => {
  try {
    const response = await axios.get(`/api/orders/get-by-user-and-status`, {
      params: { userId, status }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch orders by user and status.');
  }
};

export const getAllOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`/api/orders/get-all-by-userid`, {
      params: { userId }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch all orders by user ID.');
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`/api/orders/get-all`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch all orders.');
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`/api/orders/${orderId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch order by ID.');
  }
};

export const createOrder = async (orderDTO) => {
  try {
    const response = await axios.post(`/api/orders/create`, orderDTO);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to create order.');
  }
};

export const updateOrder = async (orderId, orderDTO) => {
  try {
    const response = await axios.put(`/api/orders/update/${orderId}`, orderDTO);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update order.');
  }
};

export const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`/api/orders/delete/${orderId}`);
  } catch (error) {
    throw new Error('Failed to delete order.');
  }
};


// Category APIs
export const fetchAllCategories = async () => {
  try {
    const response = await axios.get('/api/categories/get-all');
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch categories.');
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await axios.get(`/api/categories/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch category by ID.');
  }
};

export const createCategory = async (categoryDTO) => {
  try {
    const response = await axios.post('/api/categories/create', categoryDTO);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to create category.');
  }
};

export const updateCategory = async (id, categoryDTO) => {
  try {
    const response = await axios.put(`/api/categories/update/${id}`, categoryDTO);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update category.');
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`/api/categories/delete/${id}`);
  } catch (error) {
    throw new Error('Failed to delete category.');
  }
};



// Author APIs
export const fetchAllAuthors = async () => {
  try {
    const response = await axios.get('/api/authors/get-all');
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch authors.');
  }
};

export const fetchAuthorById = async (id) => {
  try {
    const response = await axios.get(`/api/authors/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch author by ID.');
  }
};

export const createAuthor = async (authorDTO) => {
  try {
    const response = await axios.post('/api/authors/create', authorDTO);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to create author.');
  }
};

export const updateAuthor = async (id, authorDTO) => {
  try {
    const response = await axios.put(`/api/authors/update/${id}`, authorDTO);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update author.');
  }
};

export const deleteAuthor = async (id) => {
  try {
    await axios.delete(`/api/authors/delete/${id}`);
  } catch (error) {
    throw new Error('Failed to delete author.');
  }
};

// Publisher APIs
export const fetchAllPublishers = async () => {
  try {
    const response = await axios.get('/api/publishers/get-all');
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch publishers.');
  }
};

export const fetchPublisherById = async (id) => {
  try {
    const response = await axios.get(`/api/publishers/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch publisher by ID.');
  }
};

export const createPublisher = async (publisherDTO) => {
  try {
    const response = await axios.post('/api/publishers/create', publisherDTO);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to create publisher.');
  }
};

export const updatePublisher = async (id, publisherDTO) => {
  try {
    const response = await axios.put(`/api/publishers/update/${id}`, publisherDTO);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update publisher.');
  }
};

export const deletePublisher = async (id) => {
  try {
    await axios.delete(`/api/publishers/delete/${id}`);
  } catch (error) {
    throw new Error('Failed to delete publisher.');
  }
};


// Tag APIs
export const fetchAllTags = async () => {
  try {
    const response = await axios.get('/api/tags/get-all');
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch tags.');
  }
};

export const fetchTagById = async (id) => {
  try {
    const response = await axios.get(`/api/tags/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch tag by ID.');
  }
};

export const createTag = async (tagDTO) => {
  try {
    const response = await axios.post('/api/tags/create', tagDTO);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to create tag.');
  }
};

export const updateTag = async (id, tagDTO) => {
  try {
    const response = await axios.put(`/api/tags/update/${id}`, tagDTO);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update tag.');
  }
};

export const deleteTag = async (id) => {
  try {
    await axios.delete(`/api/tags/delete/${id}`);
  } catch (error) {
    throw new Error('Failed to delete tag.');
  }
};




// ProductCategory APIs
export const fetchAllProductCategories = async () => {
  try {
    const response = await axios.get('/api/products-categories/get-all');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch product categories:', error);
    throw error;
  }
};

export const fetchProductCategoryById = async (id) => {
  try {
    const response = await axios.get(`/api/products-categories/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch product category by ID:', error);
    throw error;
  }
};

export const createProductCategory = async (productCategory) => {
  try {
    const response = await axios.post('/api/products-categories/create', productCategory);
    return response.data.data;
  } catch (error) {
    console.error('Failed to create product category:', error);
    throw error;
  }
};

export const updateProductCategory = async (id, productCategory) => {
  try {
    const response = await axios.put(`/api/products-categories/update/${id}`, productCategory);
    return response.data.data;
  } catch (error) {
    console.error('Failed to update product category:', error);
    throw error;
  }
};

export const deleteProductCategory = async (id) => {
  try {
    await axios.delete(`/api/products-categories/delete/${id}`);
  } catch (error) {
    console.error('Failed to delete product category:', error);
    throw error;
  }
};



// AuthorProduct APIs
export const fetchAllAuthorProducts = async () => {
  try {
    const response = await axios.get('/api/authors-products/get-all');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch author products:', error);
    throw error;
  }
};

export const fetchAuthorProductById = async (id) => {
  try {
    const response = await axios.get(`/api/authors-products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch author product by ID:', error);
    throw error;
  }
};

export const createAuthorProduct = async (authorProduct) => {
  try {
    const response = await axios.post('/api/authors-products/create', authorProduct);
    return response.data.data;
  } catch (error) {
    console.error('Failed to create author product:', error);
    throw error;
  }
};

export const updateAuthorProduct = async (id, authorProduct) => {
  try {
    const response = await axios.put(`/api/authors-products/update/${id}`, authorProduct);
    return response.data.data;
  } catch (error) {
    console.error('Failed to update author product:', error);
    throw error;
  }
};

export const deleteAuthorProduct = async (id) => {
  try {
    await axios.delete(`/api/authors-products/delete/${id}`);
  } catch (error) {
    console.error('Failed to delete author product:', error);
    throw error;
  }
};

// ProductTag APIs
export const fetchAllProductTags = async () => {
  try {
    const response = await axios.get('/api/products-tags/get-all');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch product tags:', error);
    throw error;
  }
};

export const fetchProductTagById = async (id) => {
  try {
    const response = await axios.get(`/api/products-tags/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch product tag by ID:', error);
    throw error;
  }
};

export const createProductTag = async (productTag) => {
  try {
    const response = await axios.post('/api/products-tags/create', productTag);
    return response.data.data;
  } catch (error) {
    console.error('Failed to create product tag:', error);
    throw error;
  }
};

export const updateProductTag = async (id, productTag) => {
  try {
    const response = await axios.put(`/api/products-tags/update/${id}`, productTag);
    return response.data.data;
  } catch (error) {
    console.error('Failed to update product tag:', error);
    throw error;
  }
};

export const deleteProductTag = async (id) => {
  try {
    await axios.delete(`/api/products-tags/delete/${id}`);
  } catch (error) {
    console.error('Failed to delete product tag:', error);
    throw error;
  }
};



// Product APIs
export const searchProductsByKeyword = async (keyword) => {
  try {
    const response = await axios.get(`/api/products/search-by-keyword?keyword=${keyword}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to search products by keyword:', error);
    throw new Error('Failed to search products by keyword.');
  }
}

export const fetchNewestProducts = async () => {
  try {
    const response = await axios.get('/api/products/newest');
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch new books.');
  }
};

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get('/api/products/get-all');
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch books.');
  }
};

// export const fetchAllCategories = async () => {
//   try {
//     const response = await axios.get('/api/categories/get-all');
//     return response.data.data;
//   } catch (error) {
//     throw new Error('Failed to fetch categories.');
//   }
// };

export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`/api/products/category/${categoryId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch products by category.');
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch product by ID.');
  }
};

export const createProduct = async (formData) => {
  try {
    const response = await axios.post('/api/products/create', formData);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to create product.');
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`/api/products/update/${id}`, product);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update product.');
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/api/products/delete/${id}`);
    return response.data;
  }
  catch (error) {
    console.error('Failed to delete product:', error);
    throw new Error('Failed to delete product.');
  }
  
};

export const uploadProductImage = (productId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`api/products/update-image/${productId}`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });
};

// Fetch categories, publishers, authors, and tags
export const fetchCategories = async () => {
  const response = await axios.get('/api/categories/get-all');
  return response.data.data;
};

export const fetchPublishers = async () => {
  const response = await axios.get('/api/publishers/get-all');
  return response.data.data;
};

export const fetchAuthors = async () => {
  const response = await axios.get('/api/authors/get-all');
  return response.data.data;
};

export const fetchTags = async () => {
  const response = await axios.get('/api/tags/get-all');
  return response.data.data;
};


//Review APIs
export const getAllReviews = async () => {
  try {
    const response = await axios.get(`api/reviews/get-all`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
//Hàm lấy đánh giá theo sản phẩm
export const getReviewByProduct = async (productId) => {
  try {
    const response = await axios.get(`api/reviews/get-all-by-book-id/${productId}`);
    return response.data.data;
  }
  catch (error) {
    console.error('Failed to get review by product:', error);
    throw error;
  }
}

// Hàm lấy đánh giá theo ID
export const getReviewById = async (id) => {
  try {
    const response = await axios.get(`api/reviews/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Hàm tạo đánh giá mới
export const createReview = async (reviewDTO) => {
  try {
    const response = await axios.post(`api/reviews/create`, reviewDTO);
    return response.data.data;
  } catch (error) {
    console.error('Failed to create review:', error);
    throw error;
  }
};

// Hàm cập nhật đánh giá theo ID
export const updateReview = async (id, reviewDTO) => {
  try {
    const response = await axios.put(`api/reviews/update/${id}`, reviewDTO);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Hàm xóa đánh giá theo ID
export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`api/reviews/delete/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

//hàm đánh dấu sản phẩm đã được đánh giá
export const markItemAsReviewed = async (itemId) => {
  try {
    const response = await axios.put(`api/orderdetails/mark-item-has-review/${itemId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}


// Shipper APIs
export const fetchAvailableOrders = async () => {
  try {
    const response = await axios.get('/api/shipper/orders/available');
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch available orders.');
  }
};

export const acceptOrder = async (orderId, shipperId) => {
  try {
    const response = await axios.put('/api/shipper/orders/accept', null, {
      params: {
        orderId,
        shipperId
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to accept the order.');
  }
};

export const fetchAllOrdersByShipper = async (shipperId) => {
  try {
    const response = await axios.get('/api/shipper/all-orders-by-shipperid ', {
      params: {
        shipperId
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch orders for the shipper.');
  }
};

//hàm lấy đơn hàng theo id shipper và status
export const fetchOrdersByShipperAndStatus = async (shipperId, status) => {
  try {
    const response = await axios.get('/api/shipper/orders-by-shipperid-and-status', {
      params: {
        shipperId,
        status
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch orders for the shipper.');
  }
};

export const reportFailedDelivery = async (orderId, reason, note) => {
  try {
    const response = await axios.post(`/api/shipper/orders/report-failed/${orderId}`, null, {
      params: {
        reason,
        note
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to report failed delivery.');
  }
};

//APIs Admin
//send-mail-spring-boot
export const sendMailSpring = async (orderId, subject) => {
  try {
    const response = await axios.post('/api/admin/send-email-to-customer', null, {
      params: {
        orderId,
        subject
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to send mail:', error);
    throw new Error('Failed to send mail.');
  }
};

//sửa ghi chú shipper của đơn hàng
export const updateNoteShipper = async (orderId, shipperNote) => {
  try {
    const response = await axios.put(`/api/shipper/orders/update-shipperNote`, null, {
      params: {
        orderId,
        shipperNote
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update note for the shipper.');
  }
};


//sửa ghi chú admin của đơn hàng
export const updateAdminNoteOrder = async (orderId, adminNote) => {
  try {
    const response = await axios.put(`/api/admin/orders/update-adminNote`,  null,{
      params: { 
      orderId,
      adminNote
       }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update note for the shipper.');
  }
};


// Import Report APIs
export const fetchAllImportReports = async () => {
  try {
    const response = await axios.get('/api/import-reports/get-all');
    return response.data.data; // Assuming 'data' holds the list of import reports
  } catch (error) {
    throw new Error('Failed to fetch all import reports.');
  }
};

export const fetchImportReportById = async (id) => {
  try {
    const response = await axios.get(`/api/import-reports/${id}`);
    return response.data.data; // Assuming 'data' holds the specific import report
  } catch (error) {
    throw new Error(`Failed to fetch import report with ID ${id}.`);
  }
};

export const createImportReports = async (importReportDTO) => {
  try {
    const response = await axios.post('/api/import-reports/create', importReportDTO);
    return response.data.data; // Assuming 'data' holds the newly created import report
  } catch (error) {
    throw new Error('Failed to create a new import report.');
  }
};

export const updateImportReport = async (id, importReportDTO) => {
  try {
    const response = await axios.put(`/api/import-reports/update/${id}`, importReportDTO);
    return response.data.data; // Assuming 'data' holds the updated import report
  } catch (error) {
    throw new Error(`Failed to update import report with ID ${id}.`);
  }
};

export const deleteImportReport = async (id) => {
  try {
    await axios.delete(`/api/import-reports/delete/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete import report with ID ${id}.`);
  }
};

//lay danh sach chi tiet phieu nhap
export const getImportReportDetailByImportReportId = async (importReportId) => {
  try {
    const response = await axios.get(`/api/import-reports/get-detail/${importReportId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch list details of import report by ID.');
  }
};

// Import Report Detail APIs
//lay danh sach chi tiet phieu nhap theo id san pham
export const getImportReportDetailByProductId = async (productId) => {
  try {
    const response = await axios.get(`/api/import-report-details/get-by-product-id/${productId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch list details of import report by product ID.');
  }
}

export const fetchAllImportReportDetails = async () => {
  try {
    const response = await axios.get('/api/import-report-details/get-all');
    return response.data.data; // Assuming 'data' holds the list of import report details
  } catch (error) {
    throw new Error('Failed to fetch all import report details.');
  }
};

export const fetchImportReportDetailById = async (id) => {
  try {
    const response = await axios.get(`/api/import-report-details/${id}`);
    return response.data.data; // Assuming 'data' holds the specific import report detail
  } catch (error) {
    throw new Error(`Failed to fetch import report detail with ID ${id}.`);
  }
};

export const createImportReportDetail = async (importReportDetailDTO) => {
  try {
    const response = await axios.post('/api/import-report-details/create', importReportDetailDTO);
    return response.data.data; // Assuming 'data' holds the newly created import report detail
  } catch (error) {
    throw new Error('Failed to create a new import report detail.');
  }
};

export const updateImportReportDetail = async (id, importReportDetailDTO) => {
  try {
    const response = await axios.put(`/api/import-report-details/update/${id}`, importReportDetailDTO);
    return response.data.data; // Assuming 'data' holds the updated import report detail
  } catch (error) {
    throw new Error(`Failed to update import report detail with ID ${id}.`);
  }
};

export const deleteImportReportDetail = async (id) => {
  try {
    await axios.delete(`/api/import-report-details/delete/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete import report detail with ID ${id}.`);
  }
};

export const addItemToImportReport = async (importReportId, productId, quantity, price) => {
  try {
    const response = await axios.post('/api/import-reports/add-item', null, {
      params: {
        importReportId,
        productId,
        quantity,
        price
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to add item to import report.');
  }
};


