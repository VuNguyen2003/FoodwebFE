// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import ProtectedRoute from './components/Common/ProtectedRoute';
import NotFound from './components/Common/NotFound';
import Home from './components/Home';

// Các Thành Phần Auth
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UpdateAccount from './components/Account/UpdateAccount';

// Các Thành Phần Cart
import Cart from './components/Cart/Cart';

// Các Thành Phần Orders
import Orders from './components/Orders/Orders';
import OrderDetails from './components/Orders/OrderDetails';

// Các Thành Phần Products
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetail';
import ProductForm from './components/Products/ProductForm';
import ProductSearch from './components/Products/ProductSearch';

// Các Thành Phần Categories
import CategoryList from './components/Categories/CategoryList';
import CategoryForm from './components/Categories/CategoryForm';

// Các Thành Phần Delivery
import DeliveryList from './components/Delivery/DeliveryList';
import DeliveryForm from './components/Delivery/DeliveryForm';

// Các Thành Phần Options
import OptionList from './components/Options/OptionList';
import OptionForm from './components/Options/OptionForm';

// Các Thành Phần Payment Methods
import PaymentMethodList from './components/PaymentMethods/PaymentMethodList';
import PaymentMethodForm from './components/PaymentMethods/PaymentMethodForm';

// Các Thành Phần Roles
import RoleList from './components/Roles/RoleList';
import RoleForm from './components/Roles/RoleForm';

// Các Thành Phần Statuses
import StatusList from './components/Statuses/StatusList';
import StatusForm from './components/Statuses/StatusForm';

import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Các Route Công Khai */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            {/* Các Route Bảo Vệ */}
            <Route element={<ProtectedRoute />}>
              <Route path="/update-account" element={<UpdateAccount />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/search" element={<ProductSearch />} />
              <Route path="/products/create" element={<ProductForm />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/products/edit/:id" element={<ProductForm />} />
              {/* Thêm các route bảo vệ khác ở đây */}
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/create" element={<CategoryForm />} />
              <Route path="/categories/edit/:id" element={<CategoryForm />} />
              <Route path="/deliveries" element={<DeliveryList />} />
              <Route path="/deliveries/create" element={<DeliveryForm />} />
              {/* Tiếp tục thêm các route bảo vệ nếu cần */}
              <Route path="/options" element={<OptionList />} />
              <Route path="/options/create" element={<OptionForm />} />
              <Route path="/options/edit/:id" element={<OptionForm />} />
              <Route path="/payment-methods" element={<PaymentMethodList />} />
              <Route path="/payment-methods/create" element={<PaymentMethodForm />} />
              <Route path="/payment-methods/edit/:id" element={<PaymentMethodForm />} />
              <Route path="/roles" element={<RoleList />} />
              <Route path="/roles/create" element={<RoleForm />} />
              <Route path="/roles/edit/:id" element={<RoleForm />} />
              <Route path="/statuses" element={<StatusList />} />
              <Route path="/statuses/create" element={<StatusForm />} />
              <Route path="/statuses/edit/:id" element={<StatusForm />} />
              {/* ... */}
            </Route>
            
            {/* Route Bắt Lỗi */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
