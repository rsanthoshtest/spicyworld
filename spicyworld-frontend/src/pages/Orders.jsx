import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Orders = () => {
    const navigate = useNavigate();
    const { addToCartMany } = useCart();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reorderingId, setReorderingId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get(`/api/orders/user`);
                setOrders(res.data);
            } catch (err) {
                console.error("Fetch orders failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="bg-bgCreme min-h-screen pt-28 pb-20 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                <header className="mb-8 pl-1">
                    <h1 className="text-2xl md:text-3xl font-black text-dark tracking-tight">Order History</h1>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Review your past flavors and track current orders.</p>
                </header>

                {loading ? (
                    <div className="py-32 flex flex-col items-center justify-center">
                        <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="text-4xl mb-4 opacity-50 filter drop-shadow-sm"
                        >
                            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </motion.div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Fetching Orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-24 border-2 border-dashed border-gray-200 rounded-3xl bg-white shadow-sm mt-8">
                        <div className="text-6xl mb-4 filter drop-shadow-sm">🍽️</div>
                        <h3 className="text-xl font-black text-dark tracking-tight mb-2">Your order history is empty</h3>
                        <p className="text-sm font-medium text-gray-500 mb-8 max-w-xs mx-auto">Looks like you haven't placed any orders yet.</p>
                        <Link to="/menu" className="inline-block px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-primary shadow-sm hover:shadow hover:bg-orange-600 transition-all active:scale-[0.98]">
                            Explore Menu
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <AnimatePresence>
                            {orders.map((order, index) => (
                                <motion.div 
                                    key={order._id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                                >
                                    {/* Card Header (Order ID, Date, Status, Total) */}
                                    <div className="p-4 sm:p-5 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1.5">
                                                <span className="font-bold text-dark text-sm">Order #{order._id.slice(-8).toUpperCase()}</span>
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                                                    order.orderStatus === 'Delivered' ? 'bg-green-50 text-green-600 border-green-200' :
                                                    order.orderStatus === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-200' :
                                                    'bg-orange-50 text-orange-600 border-orange-200'
                                                }`}>
                                                    {order.orderStatus}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500 font-medium">
                                                {new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        
                                        <div className="sm:text-right mt-1 sm:mt-0">
                                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mb-0.5">Total Amount</span>
                                            <span className="font-black text-dark text-lg">₹{order.totalPrice}</span>
                                        </div>
                                    </div>

                                    {/* Order Items Summary Fragment */}
                                    <div className="px-4 sm:px-5 py-4 bg-gray-50/50">
                                        <div className="flex flex-wrap items-center gap-2.5">
                                            {order.items.slice(0, 2).map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-2 bg-white border border-gray-100 pr-3 pl-1.5 py-1 rounded-lg shadow-sm">
                                                    <div className="w-6 h-6 rounded-md overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                                                        {item.image ? (
                                                            <img src={item.image} className="w-full h-full object-cover" alt="" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-[10px]">🍲</div>
                                                        )}
                                                    </div>
                                                    <span className="text-xs font-semibold text-dark truncate max-w-[140px]">{item.name}</span>
                                                    <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">x{item.quantity}</span>
                                                </div>
                                            ))}
                                            {order.items.length > 2 && (
                                                <div className="text-xs font-semibold text-gray-500 px-2 py-1 rounded-full bg-gray-100 border border-gray-200/50">
                                                    +{order.items.length - 2} more items
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="px-4 sm:px-5 py-4 border-t border-gray-50 flex justify-end gap-3 bg-white">
                                        <button 
                                            onClick={() => navigate(`/orders/${order._id}`)}
                                            className="px-5 py-2 rounded-xl text-xs font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-dark transition-colors cursor-pointer text-center"
                                        >
                                            View Details
                                        </button>
                                        <button 
                                            onClick={async () => {
                                                setReorderingId(order._id);
                                                await new Promise(r => setTimeout(r, 600)); // Smooth transition
                                                addToCartMany(order.items);
                                                setReorderingId(null);
                                            }}
                                            disabled={reorderingId === order._id}
                                            className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-primary shadow-sm hover:bg-orange-600 hover:shadow transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed min-w-[100px]"
                                        >
                                            {reorderingId === order._id ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Adding...
                                                </div>
                                            ) : "Reorder"}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
