// src/components/PaymentMethods/PaymentMethodList.js
import React, { useState, useEffect } from 'react';
import { getAllPaymentMethods, deletePaymentMethod } from '../../api/api';
import { Link } from 'react-router-dom';
import Notification from '../Common/Notification';

const PaymentMethodList = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchPaymentMethods = async () => {
    try {
      const response = await getAllPaymentMethods();
      setPaymentMethods(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch payment methods.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      try {
        await deletePaymentMethod(id);
        setNotification({ message: 'Payment method deleted successfully.', type: 'success' });
        fetchPaymentMethods();
      } catch (error) {
        setNotification({ message: 'Failed to delete payment method.', type: 'error' });
      }
    }
  };

  return (
    <div className="container">
      <h2>Payment Methods</h2>
      <Notification message={notification.message} type={notification.type} />
      <Link to="/payment-methods/create" className="btn btn-success mb-3">Add New Payment Method</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map(method => (
            <tr key={method.id}>
              <td>{method.id}</td>
              <td>{method.name}</td>
              <td>
                <Link to={`/payment-methods/edit/${method.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(method.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentMethodList;
