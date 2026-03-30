import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
        address: user?.address || '',
        paymentMethod: 'Cash on Delivery'
    });
    const [isPlacing, setIsPlacing] = useState(false);
    const [orderDone, setOrderDone] = useState(null);

    const subtotal = totalPrice;
    const gst = Math.round(subtotal * 0.05);
    const deliveryFee = 0;
    const discount = 0;
    const finalTotal = subtotal + gst + deliveryFee - discount;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPlacing(true);
        try {
            const res = await api.post(`/api/orders/create`, {
                items: cartItems.map(item => ({
                    foodId: item._id,
                    name: item.name,
                    image: item.image,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice: finalTotal, // Use calculated final total
                paymentMethod: formData.paymentMethod,
                address: formData.address,
                mobile: formData.mobile,
                email: formData.email
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
            <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center px-4 bg-bgCreme relative overflow-hidden text-center z-10">
                
                {/* Main Success Card container */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 max-w-[420px] w-full flex flex-col items-center relative z-10"
                >
                    {/* Step 1: Animated Checkmark with 360 degree rotate */}
                    <motion.div 
                        initial={{ scale: 0, rotate: -360 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 260, 
                            damping: 20,
                            delay: 0.1
                        }}
                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(34,197,94,0.3)] mb-6"
                    >
                        <motion.svg 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                            className="w-12 h-12 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </motion.svg>
                    </motion.div>

                    {/* Step 2 & 3: Success Text Sequence */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                        className="space-y-3 mb-8"
                    >
                        <h2 className="text-2xl md:text-3xl font-black text-dark tracking-tight">Order Placed Successfully!</h2>
                        <p className="text-sm text-grayCustom font-medium leading-relaxed max-w-[280px] mx-auto">
                            Your delicious food is being prepared and will arrive soon.
                        </p>
                    </motion.div>

                    {/* Step 4: High-Speed Delivery Details Container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                        className="w-full bg-orange-50/50 rounded-2xl pt-6 pb-2 px-4 mb-8 border border-orange-100/50 relative overflow-hidden flex flex-col items-center shadow-inner"
                    >
                        <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-4 block z-20 relative bg-orange-50/90 px-3 py-1 rounded-full shadow-sm">
                            Order #{orderDone._id.slice(-6).toUpperCase()} • Out for Delivery
                        </span>
                        
                        {/* Scooter animation track (High Speed Illusion) */}
                        <div className="w-full h-28 relative flex justify-center items-center overflow-hidden rounded-lg mt-2">
                            
                            {/* Fast-moving dust/wind lines passing from right to left */}
                            <div className="absolute inset-0 pointer-events-none opacity-60">
                                <motion.div animate={{ x: [300, -300] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear", delay: 0.1 }} className="absolute top-[20%] w-10 h-0.5 bg-orange-300 rounded-full" />
                                <motion.div animate={{ x: [300, -300] }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear", delay: 0.3 }} className="absolute top-[35%] w-16 h-[3px] bg-gray-300 rounded-full" />
                                <motion.div animate={{ x: [300, -300] }} transition={{ repeat: Infinity, duration: 0.6, ease: "linear", delay: 0.5 }} className="absolute top-[55%] w-24 h-0.5 bg-orange-200 rounded-full" />
                                <motion.div animate={{ x: [300, -300] }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear", delay: 0.2 }} className="absolute top-[75%] w-8 h-1 bg-gray-200 rounded-full" />
                                <motion.div animate={{ x: [300, -300] }} transition={{ repeat: Infinity, duration: 0.7, ease: "linear", delay: 0.7 }} className="absolute top-[85%] w-14 h-0.5 bg-orange-400/50 rounded-full" />
                            </div>

                            {/* Scooter rides in once, then stays center bobbing slightly */}
                            <motion.div
                                initial={{ x: -250, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 1.2 }}
                                className="relative z-10"
                            >
                                <motion.div
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.25, ease: "easeInOut" }}
                                >
                                    {/* Custom Delivery Boy SVG */}
                                    <svg width="100" height="75" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                                        {/* Back Wheel */}
                                        <circle cx="18" cy="46" r="8" fill="#1F2937"/>
                                        <circle cx="18" cy="46" r="3" fill="#E5E7EB"/>
                                        {/* Front Wheel */}
                                        <circle cx="62" cy="46" r="8" fill="#1F2937"/>
                                        <circle cx="62" cy="46" r="3" fill="#E5E7EB"/>
                                        {/* Frame */}
                                        <path d="M 18 46 L 35 46 L 45 46" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round"/>
                                        <path d="M 40 46 L 50 25 L 62 46" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M 50 25 L 55 15" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round"/>
                                        <path d="M 50 15 L 60 12 L 63 16" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        {/* Orange Delivery Box */}
                                        <rect x="2" y="15" width="28" height="28" rx="3" fill="#EA580C"/>
                                        <rect x="2" y="15" width="28" height="14" fill="#F97316"/> {/* Box highlight */}
                                        <rect x="2" y="28" width="28" height="3" fill="#C2410C"/>
                                        <path d="M 10 15 L 10 18 M 22 15 L 22 18" stroke="#C2410C" strokeWidth="2"/>
                                        <circle cx="16" cy="22" r="3" fill="#FFFFFF" opacity="0.8"/> {/* Brand dot on box */}
                                        {/* Rider Body */}
                                        <path d="M 45 15 C 45 15 35 15 35 30 L 40 38 L 48 38 Z" fill="#374151"/>
                                        {/* Rider Arm */}
                                        <path d="M 45 18 L 56 20 L 60 12" stroke="#374151" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/> 
                                        {/* Rider Legs */}
                                        <path d="M 42 35 L 45 45 L 50 45" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                        {/* Orange Helmet */}
                                        <circle cx="45" cy="10" r="7" fill="#EA580C"/> 
                                        <path d="M 45 3 Q 52 3 52 10 L 45 10 Z" fill="#FCD34D"/> 
                                        {/* Headlight Ray */}
                                        <path d="M 62 30 L 80 40 L 80 20 Z" fill="#FEF08A" opacity="0.4"/>
                                        <circle cx="58" cy="28" r="3" fill="#FDE047" />
                                    </svg>
                                </motion.div>
                            </motion.div>

                            {/* Seamless Infinite Scrolling Ground */}
                            <div className="absolute bottom-[10px] left-0 right-0 h-1 overflow-hidden pointer-events-none">
                                <motion.div 
                                    animate={{ x: [0, -40] }} 
                                    transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
                                    className="h-full w-[200%]"
                                    style={{ backgroundImage: 'repeating-linear-gradient(to right, #9CA3AF 0, #9CA3AF 20px, transparent 20px, transparent 40px)' }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Step 5: CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.4 }}
                        className="w-full flex items-center justify-between gap-3"
                    >
                        <button 
                            onClick={() => navigate('/menu')} 
                            className="flex-1 py-3.5 px-2 rounded-xl text-sm font-bold text-gray-500 bg-gray-50 border border-gray-100 hover:bg-gray-100/80 hover:text-dark transition-colors cursor-pointer"
                        >
                            Back to Menu
                        </button>
                        
                        <button 
                            onClick={() => navigate('/orders')} 
                            className="flex-1 flex justify-center py-3.5 px-2 rounded-xl text-sm font-bold text-white bg-primary shadow-sm hover:shadow-md hover:bg-orange-600 transition-all active:scale-[0.98] border border-orange-500/80 cursor-pointer"
                        >
                            Track Order ➔
                        </button>
                    </motion.div>

                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-bgCreme min-h-screen pt-28 pb-20 px-4 md:px-8">
            <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                
                {/* Main Form Area */}
                <div className="space-y-6">
                    <header className="mb-6">
                        <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1 block">ALMOST THERE</span>
                        <h1 className="text-3xl font-black text-dark tracking-tight">Confirm Your Order</h1>
                    </header>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Delivery Details Container */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-dark tracking-tight mb-5 border-b border-gray-50 pb-3">1. Delivery Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1.5 block">FULL NAME</label>
                                    <input type="text" required className="w-full bg-bgCreme/30 border border-gray-100 rounded-lg px-4 py-2.5 focus:border-primary/50 focus:bg-white outline-none transition-colors text-sm" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1.5 block">MOBILE NUMBER</label>
                                        <input type="text" required className="w-full bg-bgCreme/30 border border-gray-100 rounded-lg px-4 py-2.5 focus:border-primary/50 focus:bg-white outline-none transition-colors text-sm" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1.5 block w-full whitespace-nowrap overflow-hidden text-ellipsis">EMAIL ADDRESS</label>
                                        <input 
                                            type="email" 
                                            required 
                                            className="w-full bg-bgCreme/30 border border-gray-100 rounded-lg px-4 py-2.5 focus:border-primary/50 focus:bg-white outline-none transition-colors text-sm" 
                                            value={formData.email} 
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            placeholder="your@email.com"
                                        />
                                        <p className="text-[9px] text-gray-400 mt-1 italic">Order details will be sent here.</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1.5 block">DELIVERY ADDRESS</label>
                                    <textarea required className="w-full bg-bgCreme/30 border border-gray-100 rounded-lg px-4 py-3 focus:border-primary/50 focus:bg-white outline-none transition-colors text-sm resize-none h-20" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Container */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-dark tracking-tight mb-4 border-b border-gray-50 pb-3">2. Payment Method</h3>
                            <div className="flex flex-col sm:flex-row gap-3">
                                {['Cash on Delivery', 'UPI'].map(method => (
                                    <div 
                                        key={method}
                                        className={`flex-1 relative overflow-hidden py-3 px-4 rounded-xl border cursor-pointer transition-all flex items-center justify-center gap-2 group hover:bg-orange-50/50 ${formData.paymentMethod === method ? 'border-primary bg-orange-50/50 ring-1 ring-primary/20' : 'border-gray-100 bg-white'}`}
                                        onClick={() => setFormData({...formData, paymentMethod: method})}
                                    >
                                        <span className={`text-base ${formData.paymentMethod === method ? 'opacity-100' : 'grayscale opacity-50'}`}>
                                            {method === 'UPI' ? '📱' : '💵'}
                                        </span>
                                        <span className={`font-bold text-sm ${formData.paymentMethod === method ? 'text-primary' : 'text-grayCustom'}`}>
                                            {method}
                                        </span>
                                        
                                        {formData.paymentMethod === method && (
                                            <div className="absolute top-1.5 right-1.5 bg-primary rounded-full p-0.5 text-white">
                                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isPlacing || cartItems.length === 0} 
                            className="w-full relative overflow-hidden bg-primary text-white rounded-xl py-3.5 text-base font-bold shadow hover:shadow-md disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed group transition-all duration-200 active:scale-[0.98] border border-orange-500/80 cursor-pointer"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isPlacing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Processing Order...
                                    </>
                                ) : (
                                    <>
                                        Place Order • <span className="font-semibold px-1">₹{finalTotal}</span>
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </form>
                </div>

                {/* Order Summary Right Panel */}
                <div className="lg:sticky lg:top-28 h-fit space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-gray-500 pl-1">
                            <span className="text-xl">🧾</span>
                            <h3 className="text-lg font-black text-dark tracking-tight">Order Summary</h3>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase bg-white px-2.5 py-1 rounded-md border border-gray-100 shadow-sm">{cartItems.length} Items</span>
                    </div>
                    
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative">
                        {/* Safe & secure badge */}
                        <div className="absolute top-0 right-0 bg-green-50 text-green-700 text-[8px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-bl-xl rounded-tr-2xl flex items-center gap-1 border-b border-l border-green-100/50">
                            <span>🔒</span> Safe & Secure
                        </div>
                        
                        {/* Removed restricted max-h and scrollbars. Items will display naturally */}
                        <div className="mt-4 mb-5 pt-2 space-y-4">
                            {cartItems.map(item => (
                                <div key={item._id} className="flex justify-between items-start group relative">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100/50 flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={item.name} />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="font-bold text-dark text-sm leading-tight pr-4">{item.name}</p>
                                            <div className="flex items-center gap-2 mt-1 border-b border-transparent">
                                                <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">x{item.quantity}</span>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">₹{item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="font-bold text-dark text-sm pt-0.5 bg-white pl-2">₹{item.price * item.quantity}</p>
                                </div>
                            ))}
                            {cartItems.length === 0 && (
                                <div className="text-center py-8 opacity-50">
                                    <span className="text-2xl mb-1 block">🛒</span>
                                    <p className="text-xs font-bold text-grayCustom">Your cart is empty.</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Detailed Bill Breakdown */}
                        <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 space-y-3">
                            {/* Delivery Est Badge inside the bill block */}
                            <div className="flex items-center gap-1.5 pb-2 border-b border-gray-200">
                                <span className="text-primary text-sm">🚚</span> 
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Est. Delivery: 25-30 mins</span>
                            </div>
                            
                            <div className="space-y-2.5 pt-1">
                                <div className="flex justify-between text-xs font-semibold text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="text-dark">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-xs font-semibold text-gray-500">
                                    <span className="border-b border-dashed border-gray-300 cursor-help" title="Goods and Services Tax (5%)">GST (5%)</span>
                                    <span className="text-dark">₹{gst}</span>
                                </div>
                                <div className="flex justify-between text-xs font-semibold text-gray-500 items-center">
                                    <span>Delivery Fee</span>
                                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-[10px] uppercase font-bold border border-green-100">Free</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-xs font-semibold text-green-500">
                                        <span>Discount Applied</span>
                                        <span>-₹{discount}</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-xs font-black tracking-widest uppercase text-dark">Grand Total</span>
                                <span className="text-xl font-black text-dark tracking-tighter">₹{finalTotal}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
