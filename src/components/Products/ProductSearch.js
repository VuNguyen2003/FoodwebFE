// src/components/Products/ProductSearch.js
import React, { useState, useEffect } from 'react';
import { searchProducts } from '../../api/api';
import { Link } from 'react-router-dom';
import Notification from '../Common/Notification';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await searchProducts(searchTerm);
      setProducts(response.data);
      if (response.data.length === 0) {
        setNotification({ message: 'No products found.', type: 'info' });
      } else {
        setNotification({ message: `${response.data.length} products found.`, type: 'success' });
      }
    } catch (error) {
      setNotification({ message: 'Search failed.', type: 'error' });
    }
  };

  return (
    <div className="container">
      <h2>Search Products</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSearch} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </form>
      {products.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
                <td>{product.price}</td>
                <td>{product.category?.name}</td>
                <td>
                  <Link to={`/products/edit/${product.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                  {/* Add delete functionality if needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductSearch;
