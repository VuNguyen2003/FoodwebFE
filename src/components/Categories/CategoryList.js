// src/components/Categories/CategoryList.js
import React, { useState, useEffect } from 'react';
import { getAllCategories, deleteCategory } from '../../api/api';
import { Link } from 'react-router-dom';
import Notification from '../Common/Notification';

const CategoryList = () => {
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        setNotification({ message: 'Category deleted successfully.', type: 'success' });
        fetchCategories();
      } catch (error) {
        setNotification({ message: 'Failed to delete category.', type: 'error' });
      }
    }
  };

  return (
    <div className="container">
      <h2>Categories</h2>
      <Notification message={notification.message} type={notification.type} />
      <Link to="/categories/create" className="btn btn-success mb-3">Add New Category</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Link to={`/categories/edit/${category.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(category.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
