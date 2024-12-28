// src/components/Auth/Register.js
import React, { useState } from 'react';
import { register } from '../../api/api'; // Sửa đường dẫn import
import { useNavigate } from 'react-router-dom'; // Thay thế useHistory bằng useNavigate
import InputField from '../Common/InputField';
import Notification from '../Common/Notification';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    address: '',
  });
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate(); // Sử dụng useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setNotification({ message: 'Đăng ký thành công!', type: 'success' });
      navigate('/login'); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
      setNotification({ message: error.response?.data?.message || 'Đăng ký thất bại.', type: 'error' });
    }
  };

  return (
    <div className="container">
      <h2>Đăng Ký</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit}>
        <InputField label="Tên Người Dùng" name="username" type="text" value={formData.username} onChange={handleChange} required />
        <InputField label="Mật Khẩu" name="password" type="password" value={formData.password} onChange={handleChange} required />
        <InputField label="Họ Và Tên" name="fullName" type="text" value={formData.fullName} onChange={handleChange} required />
        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <InputField label="Địa Chỉ" name="address" type="text" value={formData.address} onChange={handleChange} required />
        <button type="submit" className="btn btn-primary">Đăng Ký</button>
      </form>
    </div>
  );
};

export default Register;
