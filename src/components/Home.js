// src/components/Home.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const { token } = useContext(AuthContext); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/products', {
          params: {
            page: 0,
            size: 20
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setProducts(response.data.content); // Lấy danh sách sản phẩm từ page content
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Đã xảy ra lỗi khi tải sản phẩm.');
        setLoading(false);
      }
    };

    if (token) { // Chỉ fetch nếu có token
      fetchProducts();
    } else {
      setLoading(false);
      setError('Bạn chưa đăng nhập.');
    }
  }, [token]);

  if (loading) {
    return <div className="text-center"><p>Đang tải sản phẩm...</p></div>;
  }

  if (error) {
    return <div className="text-center"><p>{error}</p></div>;
  }

  return (
    <div className="container">
      <h1 className="text-center my-4">Các Sản Phẩm Nổi Bật</h1>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <div className="col-md-4 mb-4" key={product.productId}> {/* Sử dụng đúng key */}
              <div className="card h-100">
                <img 
                  src={product.imageUrl} // Đảm bảo rằng bạn có trường imageUrl trong Product
                  className="card-img-top" 
                  alt={product.name} 
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text"><strong>Giá: </strong>{product.price} VND</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary w-100">Mua Ngay</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>Không có sản phẩm nào được hiển thị.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
