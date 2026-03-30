import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children, title, subtitle }) => {
    return (
        <div className="flex min-h-screen bg-slate-950 font-outfit">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-slate-900 border-b border-slate-800 px-8 py-5 flex-shrink-0">
                    <h1 className="text-white text-xl font-black tracking-tight">{title}</h1>
                    {subtitle && <p className="text-slate-400 text-sm mt-0.5">{subtitle}</p>}
                </header>
                {/* Page Content */}
                <main className="flex-1 overflow-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
