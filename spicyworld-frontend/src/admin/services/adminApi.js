import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL
    || (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL)
    || "https://spicyworld.onrender.com";

const adminApi = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' }
});

// Attach admin token to every request
adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => Promise.reject(error));

// Global error handler
adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('❌ Admin API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

export default adminApi;
