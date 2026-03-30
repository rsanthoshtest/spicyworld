import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminProtectedRoute = ({ children }) => {
    const { adminUser, adminLoading } = useAdminAuth();
    if (adminLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-admin-bg">
            <div className="text-center">
                <div className="w-10 h-10 border-4 border-admin-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-slate-400 text-sm font-medium">Verifying admin access...</p>
            </div>
        </div>
    );
    return adminUser ? children : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
