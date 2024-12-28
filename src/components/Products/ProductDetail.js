// src/components/Products/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { getProductById } from '../../api/api';
import { useParams, Link } from 'react-router-dom';
import Notification from '../Common/Notification';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch product.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  if (!product) {
    return <div className="container"><p>Loading...</p></div>;
  }

  return (
    <div className="container">
      <h2>Product Details</h2>
      <Notification message={notification.message} type={notification.type} />
      <div className="card mb-3">
        <div className="row g-0">
          {product.imageUrl && (
            <div className="col-md-4">
              <img src={product.imageUrl} className="img-fluid rounded-start" alt={product.name} />
            </div>
          )}
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text"><strong>Price:</strong> {product.price}</p>
              <p className="card-text"><strong>Category:</strong> {product.category?.name}</p>
              {/* Add more product details as needed */}
              <Link to={`/products/edit/${product.id}`} className="btn btn-primary">Edit</Link>
            </div>
          </div>
        </div>
      </div>
      <Link to="/products" className="btn btn-secondary">Back to Products</Link>
    </div>
  );
};

export default ProductDetail;
