import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import adminApi from '../services/adminApi';

const STATUSES = ['Pending', 'Processing', 'Out for Delivery', 'Delivered'];

const statusStyle = {
    Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    Processing: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Out for Delivery': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    Delivered: 'bg-green-500/10 text-green-400 border-green-500/30',
};

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [updating, setUpdating] = useState(null);

    const fetchOrders = () => {
        setLoading(true);
        adminApi.get('/api/admin/orders')
            .then(res => setOrders(res.data))
            .catch(() => setError('Failed to load orders.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchOrders(); }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdating(orderId);
        try {
            const res = await adminApi.put(`/api/admin/orders/${orderId}/status`, { orderStatus: newStatus });
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: res.data.orderStatus } : o));
        } catch {
            setError('Failed to update order status.');
        } finally {
            setUpdating(null);
        }
    };

    const filtered = orders.filter(o => {
        const matchStatus = filter === 'All' || o.orderStatus === filter;
        const matchSearch = !search ||
            o._id.toLowerCase().includes(search.toLowerCase()) ||
            (o.userId?.name || '').toLowerCase().includes(search.toLowerCase()) ||
            (o.userId?.email || '').toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
        <AdminLayout title="Order Management" subtitle={`${orders.length} total orders`}>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by order ID, customer name or email..."
                    className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500/50 placeholder:text-slate-600"
                />
                <div className="flex gap-2 flex-wrap">
                    {['All', ...STATUSES].map(s => (
                        <button key={s} onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${filter === s ? 'bg-orange-500 text-white' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'}`}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {error && <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">{error}</div>}

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-800">
                            {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Date', 'Status', 'Update'].map(h => (
                                <th key={h} className="text-left px-5 py-4 text-[10px] font-black text-slate-500 tracking-widest uppercase">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [...Array(6)].map((_, i) => (
                                <tr key={i} className="border-b border-slate-800/50">
                                    {Array(8).fill(0).map((_, j) => (
                                        <td key={j} className="px-5 py-4"><div className="h-4 bg-slate-800 rounded animate-pulse w-20" /></td>
                                    ))}
                                </tr>
                            ))
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={8} className="text-center py-16 text-slate-500">No orders found.</td></tr>
                        ) : (
                            filtered.map(order => (
                                <tr key={order._id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                    <td className="px-5 py-4">
                                        <p className="text-slate-300 font-mono text-xs">#{order._id.slice(-8).toUpperCase()}</p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="text-white font-bold text-sm">{order.userId?.name || 'Guest'}</p>
                                        <p className="text-slate-500 text-xs">{order.userId?.email || '—'}</p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="text-slate-400 text-xs max-w-[160px]">
                                            {order.items.slice(0, 2).map((item, i) => (
                                                <p key={i}>{item.name} × {item.quantity}</p>
                                            ))}
                                            {order.items.length > 2 && <p className="text-slate-600">+{order.items.length - 2} more</p>}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-orange-400 font-black">₹{order.totalPrice}</td>
                                    <td className="px-5 py-4 text-slate-400 text-xs">{order.paymentMethod}</td>
                                    <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">{formatDate(order.createdAt)}</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${statusStyle[order.orderStatus]}`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <select
                                            value={order.orderStatus}
                                            disabled={updating === order._id}
                                            onChange={e => handleStatusChange(order._id, e.target.value)}
                                            className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2 py-1.5 outline-none focus:border-orange-500/50 disabled:opacity-50 cursor-pointer"
                                        >
                                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default AdminOrders;
