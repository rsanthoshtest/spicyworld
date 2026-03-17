import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Optionally fetch user profile to verify token
            const storedUser = localStorage.getItem('user');
            if (storedUser) setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
    };

    const signup = async (userData) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, userData);
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    const updateProfile = async (userData) => {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/update-profile`, userData);
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, signup, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
