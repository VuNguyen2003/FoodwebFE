// src/components/Orders/Orders.js
import React, { useState, useEffect } from 'react';
import { getAllOrders, deleteOrder } from '../../api/api';
import { Link } from 'react-router-dom';
import Notification from '../Common/Notification';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch orders.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id);
        setNotification({ message: 'Order deleted successfully.', type: 'success' });
        fetchOrders();
      } catch (error) {
        setNotification({ message: 'Failed to delete order.', type: 'error' });
      }
    }
  };

  return (
    <div className="container">
      <h2>My Orders</h2>
      <Notification message={notification.message} type={notification.type} />
      <Link to="/orders/create" className="btn btn-success mb-3">Place New Order</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td><Link to={`/orders/${order.id}`}>{order.id}</Link></td>
              <td>{order.status?.name}</td>
              <td>{order.totalAmount}</td>
              <td>
                <Link to={`/orders/edit/${order.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(order.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
