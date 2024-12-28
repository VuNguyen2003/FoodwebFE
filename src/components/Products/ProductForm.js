// src/components/Products/ProductForm.js
import React, { useState, useEffect } from 'react';
import { createProduct, getProductById, updateProduct, getAllCategories } from '../../api/api';
import { useHistory, useParams } from 'react-router-dom';
import InputField from '../Common/InputField';
import SelectField from '../Common/SelectField';
import Notification from '../Common/Notification';

const ProductForm = () => {
  const { id } = useParams(); // If id exists, it's edit mode
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    // Add other product fields as needed
  });
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch categories.', type: 'error' });
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      const { name, description, price, categoryId } = response.data;
      setFormData({ name, description, price, categoryId });
      // Handle image if needed
    } catch (error) {
      setNotification({ message: 'Failed to fetch product details.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchProduct();
    }
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProduct(id, formData);
        setNotification({ message: 'Product updated successfully!', type: 'success' });
      } else {
        await createProduct(formData, imageFile);
        setNotification({ message: 'Product created successfully!', type: 'success' });
      }
      navigate('/products');
    } catch (error) {
      setNotification({ message: 'Operation failed.', type: 'error' });
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <InputField label="Name" name="name" type="text" value={formData.name} onChange={handleChange} required />
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
          ></textarea>
        </div>
        <InputField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
        <SelectField
          label="Category"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          options={categories}
          required
        />
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Product Image</label>
          <input
            className="form-control"
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required={!isEdit}
          />
        </div>
        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
