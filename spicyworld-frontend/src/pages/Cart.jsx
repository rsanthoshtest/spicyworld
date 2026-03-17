import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bgCreme">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="text-9xl mb-10 opacity-20">🥘</div>
                    <h2 className="text-4xl font-black mb-4">Your Table is Empty</h2>
                    <p className="text-grayCustom mb-12 max-w-sm mx-auto font-medium">Looks like you haven't added any of our authentic spices to your cart yet.</p>
                    <Link to="/menu" className="btn-premium btn-primary-red mx-auto w-fit px-12">BROWSE OUR MENU</Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-bgCreme min-h-screen pt-32 pb-24 px-6 md:px-10">
            <div className="max-w-6xl mx-auto">
                <header className="mb-16">
                    <span className="section-label">YOUR SELECTION</span>
                    <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tighter">Shopping Bag</h1>
                </header>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Items List */}
                    <div className="flex-1 space-y-6">
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div 
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col md:flex-row items-center gap-8 group"
                                >
                                    <div className="w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0 shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    
                                    <div className="flex-1 text-center md:text-left">
                                        <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-1 block">{item.category}</span>
                                        <h3 className="text-xl font-black text-dark mb-1">{item.name}</h3>
                                        <p className="text-lg font-black text-dark tracking-tighter">₹{item.price}</p>
                                    </div>

                                    <div className="flex items-center gap-6 bg-bgCreme px-6 py-3 rounded-2xl border border-gray-100">
                                        <button 
                                            className="text-xl font-black text-grayCustom hover:text-primary transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white" 
                                            onClick={() => updateQuantity(item._id, -1)}
                                        >-</button>
                                        <span className="font-black text-dark min-w-[30px] text-center text-lg">{item.quantity}</span>
                                        <button 
                                            className="text-xl font-black text-grayCustom hover:text-primary transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white" 
                                            onClick={() => updateQuantity(item._id, 1)}
                                        >+</button>
                                    </div>

                                    <button 
                                        className="text-gray-300 hover:text-accent p-3 transition-all hover:bg-accent/5 rounded-2xl" 
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary Summary Panel */}
                    <div className="lg:w-96 w-full lg:sticky lg:top-32 h-fit">
                        <div className="bg-dark text-white p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(26,26,26,0.2)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            
                            <h2 className="section-label text-white/60 mb-8 border-b border-white/10 pb-4">ORDER SUMMARY</h2>
                            
                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between text-white/70 font-bold text-sm">
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-white/70 font-bold text-sm">
                                    <span>Packaging Fee</span>
                                    <span className="text-primary font-black">FREE</span>
                                </div>
                                <div className="flex justify-between text-white/70 font-bold text-sm">
                                    <span>Delivery</span>
                                    <span className="text-primary font-black">₹30</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                    <span className="font-black text-sm tracking-widest text-white/50">GRAND TOTAL</span>
                                    <span className="text-4xl font-black text-primary tracking-tighter">₹{totalPrice + 30}</span>
                                </div>
                            </div>

                            <Link to="/checkout" className="btn-premium btn-primary-red w-full py-5 text-lg font-black shadow-2xl shadow-primary/20">
                                PROCEED TO CHECKOUT
                            </Link>

                            <p className="mt-8 text-[10px] text-center text-white/40 font-bold tracking-widest leading-relaxed">
                                SECURE PAYMENTS POWERED BY RAZORPAY. <br />AUTHENTIC SPICES GUARANTEED.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
