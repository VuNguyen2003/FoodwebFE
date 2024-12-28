// src/components/Options/OptionForm.js
import React, { useState, useEffect } from 'react';
import { createOption, getOptionById, updateOption, getAllOptionCategories } from '../../api/api';
import { useHistory, useParams } from 'react-router-dom';
import InputField from '../Common/InputField';
import SelectField from '../Common/SelectField';
import Notification from '../Common/Notification';

const OptionForm = () => {
  const { id } = useParams(); // If id exists, it's edit mode
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    // Add other option fields as needed
  });
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchOption = async () => {
    try {
      const response = await getOptionById(id);
      setFormData({ name: response.data.name, categoryId: response.data.categoryId });
    } catch (error) {
      setNotification({ message: 'Failed to fetch option details.', type: 'error' });
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllOptionCategories();
      setCategories(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch categories.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchOption();
    }
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateOption(id, formData);
        setNotification({ message: 'Option updated successfully!', type: 'success' });
      } else {
        await createOption(formData);
        setNotification({ message: 'Option created successfully!', type: 'success' });
      }
      navigate('/options');
    } catch (error) {
      setNotification({ message: 'Operation failed.', type: 'error' });
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? 'Edit Option' : 'Add New Option'}</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit}>
        <InputField label="Option Name" name="name" type="text" value={formData.name} onChange={handleChange} required />
        <SelectField
          label="Category"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          options={categories}
          required
        />
        {/* Add more input fields as needed */}
        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default OptionForm;
