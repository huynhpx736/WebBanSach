// api.js
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

// Auth APIs
export const register = async (username, password, email, fullname, phone) => {
  try {
    const response = await axios.post('/api/auth/register', {
      username: username,
      password: password,
      email: email,
      fullname: fullname,
      phone: phone
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

// Product APIs
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

// User APIs
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

// Cart APIs
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

export const placeOrder = async (userId, receiverPhone, receiverAddress, receiverName) => {
  try {
    const response = await axios.post('/api/orderdetails/place-order', null, {
      params: {
        userId,
        receiverPhone,
        receiverAddress,
        receiverName
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

export const cancelOrder = async (orderId, status) => {
  try {
    const response = await axios.get(`/api/orders/cancel/${orderId}`, {
      params: { status }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to cancel order.');
  }
};

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







// api.js

// ... Other imports

// Product APIs
// export const fetchAllProducts = async () => {
//   const response = await axios.get('/api/products/get-all');
//   return response.data.data;
// };

// export const fetchProductById = async (id) => {
//   const response = await axios.get(`/api/products/${id}`);
//   return response.data;
// };

export const createProduct = async (product) => {
  const formData = new FormData();
  Object.keys(product).forEach(key => {
    formData.append(key, product[key]);
  });
  const response = await axios.post('/api/products/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data.data;
};

export const updateProduct = async (id, product) => {
  const formData = new FormData();
  Object.keys(product).forEach(key => {
    formData.append(key, product[key]);
  });
  const response = await axios.put(`/api/products/update/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`/api/products/delete/${id}`);
  return response.data;
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
