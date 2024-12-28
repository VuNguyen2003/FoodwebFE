// src/components/Options/OptionList.js
import React, { useState, useEffect } from 'react';
import { getAllOptions, deleteOption } from '../../api/api';
import { Link } from 'react-router-dom';
import Notification from '../Common/Notification';

const OptionList = () => {
  const [options, setOptions] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchOptions = async () => {
    try {
      const response = await getAllOptions();
      setOptions(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch options.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this option?')) {
      try {
        await deleteOption(id);
        setNotification({ message: 'Option deleted successfully.', type: 'success' });
        fetchOptions();
      } catch (error) {
        setNotification({ message: 'Failed to delete option.', type: 'error' });
      }
    }
  };

  return (
    <div className="container">
      <h2>Options</h2>
      <Notification message={notification.message} type={notification.type} />
      <Link to="/options/create" className="btn btn-success mb-3">Add New Option</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {options.map(option => (
            <tr key={option.id}>
              <td>{option.id}</td>
              <td>{option.name}</td>
              <td>{option.category?.name}</td>
              <td>
                <Link to={`/options/edit/${option.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(option.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OptionList;
