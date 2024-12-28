// src/components/Categories/CategoryForm.js
import React, { useState, useEffect } from 'react';
import { createCategory, getCategoryById, updateCategory } from '../../api/api'; // Sửa đường dẫn import
import { useNavigate, useParams } from 'react-router-dom'; // Thay thế useHistory bằng useNavigate
import InputField from '../Common/InputField';
import Notification from '../Common/Notification';

const CategoryForm = () => {
  const { id } = useParams(); // Nếu id tồn tại, đây là chế độ chỉnh sửa
  const isEdit = Boolean(id);
  const navigate = useNavigate(); // Sử dụng useNavigate

  const [name, setName] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchCategory = async () => {
    try {
      const response = await getCategoryById(id);
      setName(response.data.name);
    } catch (error) {
      setNotification({ message: 'Không thể lấy thông tin danh mục.', type: 'error' });
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchCategory();
    }
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateCategory(id, { name });
        setNotification({ message: 'Cập nhật danh mục thành công!', type: 'success' });
      } else {
        await createCategory({ name });
        setNotification({ message: 'Tạo danh mục thành công!', type: 'success' });
      }
      navigate('/categories'); // Chuyển hướng đến danh sách danh mục
    } catch (error) {
      setNotification({ message: 'Thao tác thất bại.', type: 'error' });
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit}>
        <InputField label="Tên Danh Mục" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit" className="btn btn-primary">{isEdit ? 'Cập Nhật' : 'Tạo'}</button>
      </form>
    </div>
  );
};

export default CategoryForm;
