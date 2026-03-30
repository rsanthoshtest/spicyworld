import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import adminApi from '../services/adminApi';
import { Link } from 'react-router-dom';

const StatCard = ({ label, value, icon, color, sub }) => (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-start gap-4`}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">{label}</p>
            <p className="text-white text-3xl font-black tracking-tighter">{value}</p>
            {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
        </div>
    </div>
);

const statusColor = {
    Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    Processing: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Out for Delivery': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    Delivered: 'bg-green-500/10 text-green-400 border-green-500/30',
};

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        adminApi.get('/api/admin/stats')
            .then(res => setStats(res.data))
            .catch(() => setError('Failed to load dashboard stats.'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AdminLayout title="Dashboard" subtitle="Welcome back! Here's what's happening today.">
            {loading && (
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            {error && <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</div>}
            {stats && (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        <StatCard label="Total Foods" value={stats.totalFoods} icon="🍱" color="bg-orange-500/10" />
                        <StatCard label="Total Orders" value={stats.totalOrders} icon="📋" color="bg-blue-500/10" />
                        <StatCard label="Total Users" value={stats.totalUsers} icon="👤" color="bg-purple-500/10" />
                        <StatCard label="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`} icon="💰" color="bg-green-500/10" />
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                        {[
                            { to: '/admin/foods', label: 'Manage Foods', icon: '🍽️', desc: 'Add, edit, or remove menu items' },
                            { to: '/admin/categories', label: 'Manage Categories', icon: '🏷️', desc: 'Organize your menu categories' },
                            { to: '/admin/orders', label: 'View Orders', icon: '📦', desc: 'Update and track all orders' },
                        ].map(link => (
                            <Link key={link.to} to={link.to}
                                className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-start gap-4 transition-all group">
                                <span className="text-2xl">{link.icon}</span>
                                <div>
                                    <p className="text-white font-bold text-sm group-hover:text-orange-400 transition-colors">{link.label}</p>
                                    <p className="text-slate-500 text-xs mt-0.5">{link.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="text-white font-black text-sm tracking-tight">Recent Orders</h3>
                            <Link to="/admin/orders" className="text-orange-400 text-xs font-bold hover:text-orange-300 transition-colors">View All →</Link>
                        </div>
                        {stats.recentOrders.length === 0 ? (
                            <div className="text-center py-10 text-slate-500 text-sm">No orders yet.</div>
                        ) : (
                            <div className="divide-y divide-slate-800">
                                {stats.recentOrders.map(order => (
                                    <div key={order._id} className="px-6 py-4 flex items-center justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-white text-sm font-bold truncate">{order.userId?.name || 'Guest'}</p>
                                            <p className="text-slate-500 text-xs">{order.userId?.email || '—'} · {order.items.length} item(s)</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-orange-400 font-black text-sm">₹{order.totalPrice}</p>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor[order.orderStatus] || 'bg-slate-700 text-slate-400'}`}>
                                                {order.orderStatus}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </AdminLayout>
    );
};

export default AdminDashboard;
