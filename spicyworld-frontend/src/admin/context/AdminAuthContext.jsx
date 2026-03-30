import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// API_BASE resolution: 
// 1. NEXT_PUBLIC_API_URL (set in Vercel for production)
// 2. VITE_API_URL (set in .env for local development)
// 3. Absolute fallback to production backend
const API_BASE = import.meta.env.VITE_API_URL
    || (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL)
    || "https://spicyworld.onrender.com";

console.log("🔧 Admin Auth API Base:", API_BASE);

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
    const [adminUser, setAdminUser] = useState(null);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const userStr = localStorage.getItem('adminUser');
        if (token && userStr) {
            try {
                const parsed = JSON.parse(userStr);
                if (parsed.role === 'admin') {
                    setAdminUser(parsed);
                } else {
                    // Stale stored user without admin role — clear it
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminUser');
                }
            } catch {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
            }
        }
        setAdminLoading(false);
    }, []);

    const adminLogin = async (email, password) => {
        const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
        const { token, user } = res.data;

        console.log("🔑 Login response user:", user);
        console.log("👤 User role from API:", user?.role);

        if (!user?.role || user.role !== 'admin') {
            throw new Error('Access denied. Admin privileges required.');
        }

        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
        setAdminUser(user);
        return user;
    };

    const adminLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setAdminUser(null);
    };

    return (
        <AdminAuthContext.Provider value={{ adminUser, adminLoading, adminLogin, adminLogout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
