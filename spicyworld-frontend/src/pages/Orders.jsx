import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/user`);
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
        <div className="bg-bgCreme min-h-screen pt-32 pb-24 px-6 md:px-10">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16">
                    <span className="section-label">ORDER HISTORY</span>
                    <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tighter">Your Flavor Journey</h1>
                </header>

                {loading ? (
                    <div className="py-40 flex flex-col items-center justify-center">
                        <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="text-6xl mb-8"
                        >
                            🛵
                        </motion.div>
                        <p className="text-xl font-black animate-pulse text-dark tracking-tight">RETRIEVING YOUR MEMORIES...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-40 border-2 border-dashed border-gray-200 rounded-[3rem]">
                        <div className="text-7xl mb-6 opacity-20">📜</div>
                        <h3 className="text-2xl font-black mb-4">No Chapters Yet</h3>
                        <p className="text-grayCustom mb-10 max-w-xs mx-auto">You haven't placed any orders yet. Ready to start your spicy journey?</p>
                        <Link to="/menu" className="btn-premium btn-primary-red mx-auto">BROWSE THE MENU</Link>
                    </div>
                ) : (
                    <div className="space-y-10">
                        <AnimatePresence>
                            {orders.map((order, index) => (
                                <motion.div 
                                    key={order._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-50 overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-500"
                                >
                                    {/* Order Header */}
                                    <div className="bg-dark p-8 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-white/40 tracking-[0.2em] mb-1 uppercase">ORDER IDENTIFIER</span>
                                            <span className="text-xs font-black text-white/90 tracking-widest">{order._id.slice(-12).toUpperCase()}</span>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <span className="text-[9px] font-black text-white/40 tracking-[0.2em] mb-1 block uppercase">DATE</span>
                                                <span className="text-xs font-black text-white/90">{new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            </div>
                                            <div className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border ${
                                                order.orderStatus === 'Delivered' 
                                                ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                                                : 'bg-primary/10 border-primary/20 text-primary animate-pulse'
                                            }`}>
                                                {order.orderStatus}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Body */}
                                    <div className="p-8 md:p-10">
                                        <div className="space-y-6 mb-10">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center group/item">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-bgCreme rounded-xl flex items-center justify-center font-black text-primary text-xs border border-gray-50">
                                                            {item.quantity}x
                                                        </div>
                                                        <span className="font-bold text-dark tracking-tight">{item.name}</span>
                                                    </div>
                                                    <span className="font-black text-dark tracking-tighter">₹{item.price * item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-50 gap-6">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-black text-gray-400 tracking-widest uppercase">PAID VIA:</span>
                                                <span className="bg-bgCreme px-3 py-1 rounded-lg text-[10px] font-black text-dark border border-gray-100 uppercase tracking-widest">{order.paymentMethod}</span>
                                            </div>
                                            <div className="flex items-baseline gap-4">
                                                <span className="text-xs font-black text-gray-400 tracking-widest uppercase">TOTAL AMOUNT</span>
                                                <span className="text-4xl font-black text-dark tracking-tighter">₹{order.totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Order Actions */}
                                    <div className="px-8 pb-8 md:px-10 flex justify-end">
                                         <Link to="#" className="text-[10px] font-black text-primary hover:underline tracking-widest uppercase">NEED ASSISTANCE WITH THIS ORDER?</Link>
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
