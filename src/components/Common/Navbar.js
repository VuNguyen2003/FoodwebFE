// src/components/Common/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { authToken, setAuthToken, user } = useContext(AuthContext);
  const navigate = useNavigate(); // Sử dụng useNavigate

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    navigate('/login'); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FoodWeb</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/products">Sản Phẩm</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Danh Mục</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Giỏ Hàng</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">Đơn Hàng</Link>
            </li>
            {/* Thêm các liên kết điều hướng khác nếu cần */}
          </ul>
          <ul className="navbar-nav">
            {!authToken ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Đăng Ký</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Đăng Nhập</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link">Xin chào, {user?.username}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Đăng Xuất</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
