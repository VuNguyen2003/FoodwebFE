// src/components/Account/UpdateAccount.js
import React, { useState, useContext } from 'react';
import { updateAccount } from '../../api/api';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate
import { AuthContext } from '../../contexts/AuthContext';
import InputField from '../Common/InputField';
import Notification from '../Common/Notification';

const UpdateAccount = () => {
  const { user, setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate(); // Sử dụng useNavigate

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    // Các trường khác nếu cần
  });
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAccount(formData.username, formData);
      setNotification({ message: 'Cập nhật tài khoản thành công!', type: 'success' });
      navigate('/'); // Chuyển hướng đến trang chủ
    } catch (error) {
      setNotification({ message: 'Cập nhật thất bại.', type: 'error' });
    }
  };

  return (
    <div className="container">
      <h2>Cập Nhật Tài Khoản</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit}>
        <InputField label="Tên Người Dùng" name="username" type="text" value={formData.username} onChange={handleChange} required />
        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        {/* Thêm các trường khác nếu cần */}
        <button type="submit" className="btn btn-primary">Cập Nhật</button>
      </form>
    </div>
  );
};

export default UpdateAccount;
