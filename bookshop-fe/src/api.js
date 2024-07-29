// api.js
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const register = async (username, password, email) => {
  try {
    const response = await axios.post('/api/auth/register', {
      username,
      password,
      email
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

export const fetchAllCategories = async () => {
  try {
    const response = await axios.get('/api/categories/get-all');
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch categories.');
  }
};

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

// Fetch user by ID
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch user by ID.');
  }
};

// Update user information
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`/api/users/update/${userId}`, userData);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update user information.');
  }
};

// Change user password
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


// Fetch cart items by user ID
export const fetchCartItems = async (userId) => {
  try {
    const response = await axios.get(`/api/orderdetails/order/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch cart items.');
  }
};

// Add product to cart
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

// Remove product from cart
export const removeProductFromCart = async (orderDetailId) => {
  try {
    await axios.delete(`/api/orderdetails/delete/${orderDetailId}`);
  } catch (error) {
    throw new Error('Failed to remove product from cart.');
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (orderDetailId, quantity) => {
  try {
    const response = await axios.put(`/api/orderdetails/update/${orderDetailId}`, {
      quantity
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update cart item quantity.');
  }
};

// Place order
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