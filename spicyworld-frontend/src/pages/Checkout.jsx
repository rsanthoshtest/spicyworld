import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        mobile: user?.mobile || '',
        address: user?.address || '',
        paymentMethod: 'Cash on Delivery'
    });
    const [isPlacing, setIsPlacing] = useState(false);
    const [orderDone, setOrderDone] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPlacing(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/orders/create`, {
                items: cartItems.map(item => ({
                    foodId: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice,
                paymentMethod: formData.paymentMethod,
                address: formData.address,
                mobile: formData.mobile
            });
            setOrderDone(res.data);
            clearCart();
        } catch (err) {
            console.error("Order failed", err);
            alert("Order failed. Please try again.");
        } finally {
            setIsPlacing(false);
        }
    };

    if (orderDone) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-6 bg-white relative overflow-hidden text-center z-10">
                {/* Subtle animated background gradient */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-50/50 via-white to-white z-0"
                ></motion.div>
                
                {/* Success Animation Container */}
                <div className="relative z-10 flex flex-col items-center justify-center mb-8 h-40">
                    
                    {/* Glowing Checkmark Circle */}
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                        className="w-28 h-28 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.4)] relative"
                    >
                        {/* SVG Drawing Checkmark */}
                        <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <motion.path 
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={3} 
                                d="M5 13l4 4L19 7" 
                            />
                        </svg>
                    </motion.div>

                    {/* Delivery Scooter sliding across (Triggered after checkmark) */}
                    <motion.div 
                        initial={{ x: "-100vw", opacity: 0 }}
                        animate={{ x: "100vw", opacity: [0, 1, 1, 0] }}
                        transition={{ 
                            duration: 3.5, 
                            ease: "easeInOut", 
                            delay: 1.5 // Start after checkmark appears
                        }}
                        className="absolute bottom-[-20px] left-0 right-0 flex justify-center text-4xl mt-4"
                    >
                        <span className="drop-shadow-lg filter">🛵💨</span>
                    </motion.div>
                </div>
                
                {/* Content Elements */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }} // Reveal smoothly after check animations
                    className="relative z-10 flex flex-col items-center w-full"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4 font-playfair text-dark leading-tight">Order Placed Successfully!</h2>
                    <p className="text-grayCustom mb-10 max-w-md text-lg leading-relaxed">
                        Your order <span className="font-bold text-dark">#{orderDone._id.slice(-6).toUpperCase()}</span> is currently being prepared. Track its journey straight to your door!
                    </p>
                    
                    <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-black/5 border border-gray-100 mb-10 w-full max-w-md relative overflow-hidden group hover:border-primary/20 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>
                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-50">
                            <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Order ID</span>
                            <span className="font-bold text-sm text-dark">{orderDone._id}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Total Paid</span>
                            <span className="font-black text-2xl text-primary font-outfit">₹{orderDone.totalPrice}</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <button 
                            onClick={() => navigate('/orders')} 
                            className="text-primary font-bold text-sm tracking-widest uppercase hover:underline hover:text-dark transition-colors"
                        >
                            View My Orders ➔
                        </button>
                        
                        <button 
                            onClick={() => navigate('/menu')} 
                            className="btn-premium bg-dark text-white hover:bg-primary px-8 py-4 text-sm font-black"
                        >
                            CONTINUE ORDERING
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                <h1 className="text-4xl font-black mb-8">Confirm Your Order</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white p-8 rounded-[40px] shadow-xl border border-orange-50 space-y-4">
                        <h3 className="text-xl font-bold mb-4">Delivery Details</h3>
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:border-primary outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Mobile</label>
                            <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:border-primary outline-none" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <textarea required className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:border-primary outline-none resize-none" rows="3" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] shadow-xl border border-orange-50">
                        <h3 className="text-xl font-bold mb-4">Payment Method</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {['Cash on Delivery', 'UPI'].map(method => (
                                <div 
                                    key={method}
                                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-center font-bold ${formData.paymentMethod === method ? 'border-primary bg-orange-50 text-primary' : 'border-gray-100 grayscale opacity-60'}`}
                                    onClick={() => setFormData({...formData, paymentMethod: method})}
                                >
                                    {method}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" disabled={isPlacing || cartItems.length === 0} className="w-full btn-primary py-5 text-xl shadow-2xl disabled:opacity-50">
                        {isPlacing ? 'Processing Order...' : `Place Order (₹${totalPrice})`}
                    </button>
                </form>
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
                <h3 className="text-2xl font-black mb-6">Order Summary</h3>
                <div className="bg-white p-8 rounded-[40px] shadow-xl border border-orange-50 max-h-[60vh] overflow-y-auto">
                    {cartItems.map(item => (
                        <div key={item._id} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-4">
                                <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                                <div>
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-black text-primary">₹{item.price * item.quantity}</p>
                        </div>
                    ))}
                    <div className="mt-8 pt-8 border-t-2 border-dashed border-gray-100">
                        <div className="flex justify-between text-2xl font-black">
                            <span>Grand Total</span>
                            <span className="text-primary">₹{totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
