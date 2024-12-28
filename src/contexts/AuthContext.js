// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Sử dụng named import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenResponse = localStorage.getItem('tokenResponse');
        if (tokenResponse) {
            try {
                const { tokenValue } = JSON.parse(tokenResponse);
                const decoded = jwtDecode(tokenValue); // Sử dụng hàm jwtDecode
                setUser(decoded);
                setToken(tokenValue);
            } catch (error) {
                console.error('Token không hợp lệ:', error);
                // Xóa token nếu không hợp lệ
                localStorage.removeItem('tokenResponse');
            }
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await fetch('http://localhost:8081/api/v1/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('tokenResponse', JSON.stringify(data));
                const decoded = jwtDecode(data.tokenValue); // Sử dụng hàm jwtDecode
                setUser(decoded);
                setToken(data.tokenValue);
            } else {
                const errorText = await response.text();
                console.error('Đăng nhập thất bại:', errorText);
            }
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('tokenResponse');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
