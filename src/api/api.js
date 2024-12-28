// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/v1'; // Điều chỉnh URL cơ sở theo nhu cầu

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Thêm interceptor để bao gồm token trong headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Giả sử sử dụng token Bearer
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor response để xử lý lỗi toàn cục (tuỳ chọn)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Xử lý truy cập không hợp lệ, có thể chuyển hướng đến trang đăng nhập
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Các Endpoint cho Auth
export const register = (accountData) => api.post('/account/register', accountData);
export const login = (accountData) => api.post('/account/login', accountData);
export const updateAccount = (username, updateData) => api.put(`/account/${username}`, updateData);

// Các Endpoint cho Cart
export const getAllCarts = () => api.get('/carts');
export const getCartById = (id) => api.get(`/carts/${id}`);
export const createCart = (cartData) => api.post('/carts', cartData);
export const updateCart = (id, cartData) => api.put(`/carts/${id}`, cartData);
export const deleteCart = (id) => api.delete(`/carts/${id}`);

// Các Endpoint cho Orders
export const getAllOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const createOrder = (orderData) => api.post('/orders', orderData);
export const updateOrder = (id, orderData) => api.put(`/orders/${id}`, orderData);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// Các Endpoint cho Products
export const getAllProducts = (page, size) => api.get(`/products`, { params: { page, size } });
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData, imageFile) => {
  const formData = new FormData();
  formData.append('product', JSON.stringify(productData));
  formData.append('image', imageFile);
  return api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const searchProducts = (name) => api.get(`/products/search`, { params: { name } });
export const getProductsByPriceRange = (minPrice, maxPrice) => api.get(`/products/price-range`, { params: { minPrice, maxPrice } });
export const getAllProductsSortedByPriceAsc = () => api.get(`/products/sorted/asc`);
export const getAllProductsSortedByPriceDesc = () => api.get(`/products/sorted/desc`);

// Các Endpoint cho Categories
export const getAllCategories = () => api.get('/categories');
export const getCategoryById = (id) => api.get(`/categories/${id}`);
export const createCategory = (categoryData) => api.post('/categories', categoryData);
export const updateCategory = (id, categoryData) => api.put(`/categories/${id}`, categoryData);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Các Endpoint cho Delivery
export const getAllDeliveries = () => api.get('/delivery');
export const getDeliveryById = (id) => api.get(`/delivery/${id}`);
export const createOrUpdateDelivery = (deliveryData) => api.post('/delivery', deliveryData);
export const deleteDelivery = (id) => api.delete(`/delivery/${id}`); // Đảm bảo dòng này được export

// Các Endpoint cho Option
export const getAllOptions = () => api.get('/options');
export const getOptionById = (id) => api.get(`/options/${id}`);
export const createOption = (optionData) => api.post('/options', optionData);
export const updateOption = (id, optionData) => api.put(`/options/${id}`, optionData);
export const deleteOption = (id) => api.delete(`/options/${id}`);

// Các Endpoint cho OptionCategory
export const getAllOptionCategories = () => api.get('/option-categories');
export const getOptionCategoryById = (id) => api.get(`/option-categories/${id}`);
export const createOptionCategory = (optionCategoryData) => api.post('/option-categories', optionCategoryData);
export const updateOptionCategory = (id, optionCategoryData) => api.put(`/option-categories/${id}`, optionCategoryData);
export const deleteOptionCategory = (id) => api.delete(`/option-categories/${id}`);

// Các Endpoint cho Payment Methods
export const getAllPaymentMethods = () => api.get('/payment-methods');
export const getPaymentMethodById = (id) => api.get(`/payment-methods/${id}`);
export const createPaymentMethod = (paymentMethodData) => api.post('/payment-methods', paymentMethodData);
export const updatePaymentMethod = (id, paymentMethodData) => api.put(`/payment-methods/${id}`, paymentMethodData);
export const deletePaymentMethod = (id) => api.delete(`/payment-methods/${id}`);

// Các Endpoint cho Roles
export const getAllRoles = () => api.get('/roles');
export const getRoleById = (id) => api.get(`/roles/${id}`);
export const createRole = (roleData) => api.post('/roles', roleData);
export const updateRole = (id, roleData) => api.put(`/roles/${id}`, roleData);
export const deleteRole = (id) => api.delete(`/roles/${id}`);

// Các Endpoint cho Statuses
export const getAllStatuses = () => api.get('/statuses');
export const getStatusById = (id) => api.get(`/statuses/${id}`);
export const createStatus = (statusData) => api.post('/statuses', statusData);
export const updateStatus = (id, statusData) => api.put(`/statuses/${id}`, statusData);
export const deleteStatus = (id) => api.delete(`/statuses/${id}`);

// Các Endpoint cho Auth (Quản Lý Token)
export const generateToken = (accountId) => api.post('/auth/token', null, { params: { accountId } });
export const validateToken = (tokenValue) => api.get('/auth/validate', { params: { tokenValue } });

export default api;
