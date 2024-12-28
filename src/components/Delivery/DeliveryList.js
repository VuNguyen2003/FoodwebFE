// src/components/Delivery/DeliveryList.js
import React, { useState, useEffect } from 'react';
import { getAllDeliveries, createOrUpdateDelivery, deleteDelivery } from '../../api/api';
import { Link } from 'react-router-dom';
import Notification from '../Common/Notification';

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [formData, setFormData] = useState({
    // Define delivery fields
    address: '',
    // Add more fields as needed
  });
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchDeliveries = async () => {
    try {
      const response = await getAllDeliveries();
      setDeliveries(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch deliveries.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      await createOrUpdateDelivery(formData);
      setNotification({ message: 'Delivery information saved successfully.', type: 'success' });
      setFormData({ address: '' }); // Reset form
      fetchDeliveries();
    } catch (error) {
      setNotification({ message: 'Failed to save delivery information.', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      try {
        await deleteDelivery(id);
        setNotification({ message: 'Delivery deleted successfully.', type: 'success' });
        fetchDeliveries();
      } catch (error) {
        setNotification({ message: 'Failed to delete delivery.', type: 'error' });
      }
    }
  };

  return (
    <div className="container">
      <h2>Delivery Management</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleCreateOrUpdate} className="mb-4">
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add more input fields as needed */}
        <button type="submit" className="btn btn-primary">Save Delivery</button>
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery.id}>
              <td>{delivery.id}</td>
              <td>{delivery.address}</td>
              <td>
                {/* Implement edit functionality if needed */}
                <button onClick={() => handleDelete(delivery.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList;
