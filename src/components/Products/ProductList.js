// src/components/Products/ProductList.js
import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../../api/api';
import { Link } from 'react-router-dom';
import Notification from '../Common/Notification';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts(page, size);
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setNotification({ message: 'Failed to fetch products.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setNotification({ message: 'Product deleted successfully.', type: 'success' });
        fetchProducts();
      } catch (error) {
        setNotification({ message: 'Failed to delete product.', type: 'error' });
      }
    }
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="container">
      <h2>Products</h2>
      <Notification message={notification.message} type={notification.type} />
      <Link to="/products/create" className="btn btn-success mb-3">Add New Product</Link>
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
                <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={handlePrev} disabled={page === 0}>Previous</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button className="btn btn-secondary" onClick={handleNext} disabled={page === totalPages - 1}>Next</button>
      </div>
    </div>
  );
};

export default ProductList;
