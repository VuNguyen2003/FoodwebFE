// src/components/Auth/Login.js
import React, { useState, useContext } from 'react';
import { login } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import InputField from '../Common/InputField';
import Notification from '../Common/Notification';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      const token = response.data.token; // Điều chỉnh dựa trên cấu trúc phản hồi từ backend
      localStorage.setItem('token', token);
      setAuthToken(token);
      setNotification({ message: 'Đăng nhập thành công!', type: 'success' });
      navigate('/');
    } catch (error) {
      setNotification({ message: error.response?.data?.message || 'Đăng nhập thất bại.', type: 'error' });
    }
  };

  return (
    <div className="container">
      <h2>Đăng Nhập</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit}>
        <InputField label="Tên Người Dùng" name="username" type="text" value={credentials.username} onChange={handleChange} required />
        <InputField label="Mật Khẩu" name="password" type="password" value={credentials.password} onChange={handleChange} required />
        <button type="submit" className="btn btn-primary">Đăng Nhập</button>
      </form>
    </div>
  );
};

export default Login;
