// src/components/Orders/OrderDetails.js
import React, { useState, useEffect } from 'react';
import { getOrderById } from '../../api/api';
import { useParams, Link } from 'react-router-dom';
import Notification from '../Common/Notification';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchOrder = async () => {
    try {
      const response = await getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch order details.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line
  }, [id]);

  if (!order) {
    return <div className="container"><p>Loading...</p></div>;
  }

  return (
    <div className="container">
      <h2>Order Details</h2>
      <Notification message={notification.message} type={notification.type} />
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Order ID: {order.id}</h5>
          <p className="card-text"><strong>Status:</strong> {order.status?.name}</p>
          <p className="card-text"><strong>Total Amount:</strong> {order.totalAmount}</p>
          <p className="card-text"><strong>Delivery:</strong> {order.delivery?.address}</p>
          {/* Add more order details as needed */}
          <Link to={`/orders/edit/${order.id}`} className="btn btn-primary">Edit Order</Link>
        </div>
      </div>
      <Link to="/orders" className="btn btn-secondary">Back to Orders</Link>
    </div>
  );
};

export default OrderDetails;
