// src/components/Cart/Cart.js
import React, { useState, useEffect } from 'react';
import { getAllCarts, deleteCart } from '../../api/api';
import { Link } from 'react-router-dom';
import Notification from '../Common/Notification';

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchCarts = async () => {
    try {
      const response = await getAllCarts();
      setCarts(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch carts.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this cart?')) {
      try {
        await deleteCart(id);
        setNotification({ message: 'Cart deleted successfully.', type: 'success' });
        fetchCarts();
      } catch (error) {
        setNotification({ message: 'Failed to delete cart.', type: 'error' });
      }
    }
  };

  return (
    <div className="container">
      <h2>My Cart</h2>
      <Notification message={notification.message} type={notification.type} />
      <Link to="/carts/create" className="btn btn-success mb-3">Add New Cart</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carts.map(cart => (
            <tr key={cart.id}>
              <td>{cart.id}</td>
              <td>{cart.items.length}</td>
              <td>{cart.totalPrice}</td>
              <td>
                <Link to={`/carts/edit/${cart.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(cart.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
