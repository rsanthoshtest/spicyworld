import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useCart } from '../context/CartContext';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCartMany } = useCart();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/api/orders/${id}`);
                setOrder(res.data);
            } catch (err) {
                console.error("Fetch order failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-bgCreme">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 font-bold text-gray-500 uppercase tracking-widest text-xs">Loading Details...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-bgCreme px-6 text-center">
                <h2 className="text-2xl font-black text-dark mb-4 tracking-tight">Order Not Found</h2>
                <p className="text-grayCustom mb-8">We couldn't retrieve the details for this order.</p>
                <button onClick={() => navigate('/orders')} className="btn-premium bg-dark text-white px-8 py-3.5 text-sm font-bold">BACK TO HISTORY</button>
            </div>
        );
    }

    // Logic for status colors (matching Orders.jsx)
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-50 text-green-600 border-green-200';
            case 'Cancelled': return 'bg-red-50 text-red-600 border-red-200';
            default: return 'bg-orange-50 text-orange-600 border-orange-200';
        }
    };

    return (
        <div className="bg-bgCreme min-h-screen pt-28 pb-20 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Custom Header Nav */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate('/orders')}
                        className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-dark hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-dark tracking-tight">Order Details</h1>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">#{order._id.toUpperCase()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Detail Column */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Status Summary Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center"
                        >
                            <div className="flex flex-col gap-1">
                                <span className={`w-fit px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${getStatusColor(order.orderStatus)}`}>
                                    {order.orderStatus}
                                </span>
                                <span className="text-sm font-medium text-gray-400 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <button 
                                onClick={() => addToCartMany(order.items)}
                                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-primary shadow-sm hover:shadow hover:bg-orange-600 transition-all active:scale-[0.98] cursor-pointer"
                            >
                                Reorder Items
                            </button>
                        </motion.div>

                        {/* Items Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }} 
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <h3 className="px-6 py-4 font-bold text-dark border-b border-gray-50 flex items-center justify-between">
                                Items Ordered
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{order.items.length} Items</span>
                            </h3>
                            <div className="p-6 space-y-5">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-14 h-14 flex-shrink-0">
                                                <div className="w-full h-full bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
                                                    {item.image ? (
                                                        <img src={item.image} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <span className="text-xl">🍲</span>
                                                    )}
                                                </div>
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                                    {item.quantity}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-dark text-sm leading-tight">{item.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">₹{item.price} per item</p>
                                            </div>
                                        </div>
                                        <p className="font-black text-dark text-sm">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}

                                <div className="pt-5 border-t border-gray-50 space-y-3">
                                    <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="text-dark">₹{order.totalPrice - Math.round(order.totalPrice * 0.05)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        <span>GST (5%)</span>
                                        <span className="text-dark">₹{Math.round(order.totalPrice * 0.05)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-sm font-black text-dark uppercase tracking-tight">Grand Total</span>
                                        <span className="text-2xl font-black text-primary">₹{order.totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Info Column */}
                    <div className="space-y-6">
                        {/* Delivery Info */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }} 
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-4 pb-2 border-b border-gray-50">Delivery Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase block mb-1">Mobile Number</span>
                                    <p className="text-sm font-bold text-dark">{order.mobile || 'Not available'}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase block mb-1">Address</span>
                                    <p className="text-sm font-medium text-gray-600 leading-relaxed">{order.address}</p>
                                </div>
                                <div className="pt-2">
                                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase block mb-1">Payment Method</span>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-bgCreme px-3 py-1 rounded-lg text-[10px] font-bold text-dark border border-gray-100 uppercase tracking-widest">
                                            {order.paymentMethod === 'UPI' ? '📱 UPI' : '💵 Cash'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Help Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }} 
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-dark p-6 rounded-2xl shadow-lg border border-gray-800 text-white"
                        >
                            <h3 className="text-xs font-black text-white/50 tracking-widest uppercase mb-2">Need Support?</h3>
                            <p className="text-xs text-white/80 font-medium leading-relaxed mb-4">If you have any issues with your order, our 24/7 support is here to help.</p>
                            <button className="w-full py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase bg-white/10 hover:bg-white/20 border border-white/10 transition-colors">Contact Support</button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
