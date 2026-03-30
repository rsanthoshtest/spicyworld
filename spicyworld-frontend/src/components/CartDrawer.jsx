import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import emptyCartAnimation from '../assets/placeholder-lottie.json';

/* ─── Collapsible Price Summary ──────────────────────────────────────────── */
const PriceSummary = ({ totalPrice, onCheckout }) => {
    const [expanded, setExpanded] = useState(false);
    const gst = Math.round(totalPrice * 0.05);
    const grandTotal = totalPrice + gst;

    return (
        <div className="bg-dark text-white px-6 pt-5 pb-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] shrink-0 relative overflow-hidden">
            {/* decorative glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />

            {/* ── Grand Total row with toggle ── */}
            <button
                onClick={() => setExpanded(v => !v)}
                className="w-full flex items-center justify-between mb-4 relative z-10 group"
                aria-expanded={expanded}
            >
                <div className="flex items-center gap-2">
                    <span className="text-xs font-black tracking-widest text-white/50 uppercase">Grand Total</span>
                    {/* chevron */}
                    <motion.svg
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                </div>
                <span className="text-2xl font-black text-primary tracking-tighter">₹{grandTotal}</span>
            </button>

            {/* ── Collapsible breakdown ── */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="breakdown"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-2.5 mb-4 border-t border-white/10 pt-4 relative z-10">
                            <div className="flex justify-between text-white/60 font-semibold text-xs">
                                <span>Subtotal</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className="flex justify-between text-white/60 font-semibold text-xs">
                                <span>GST (5%)</span>
                                <span>₹{gst}</span>
                            </div>
                            <div className="flex justify-between text-white/60 font-semibold text-xs">
                                <span>Delivery</span>
                                <span className="text-green-400 font-black">Free</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Checkout button — always visible ── */}
            <button
                onClick={onCheckout}
                className="btn-premium btn-primary-red w-full py-4 text-sm font-black shadow-lg shadow-primary/20 relative z-10"
            >
                PROCEED TO CHECKOUT
            </button>
        </div>
    );
};

/* ─── Cart Drawer ─────────────────────────────────────────────────────────── */
const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-bgCreme shadow-2xl z-[101] flex flex-col overflow-hidden border-l border-white/20"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 flex justify-between items-center border-b border-gray-100 bg-white/80 backdrop-blur-md shrink-0">
                            <div>
                                <h2 className="text-2xl font-black text-dark tracking-tighter">Your Order</h2>
                                <p className="text-xs font-black tracking-widest text-primary uppercase mt-0.5">
                                    {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-gray-200 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Cart Items — scrollable, takes all remaining space */}
                        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-hide">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-80">
                                    <div className="w-40 h-40 mb-2">
                                        <Lottie animationData={emptyCartAnimation} loop={true} />
                                    </div>
                                    <h3 className="text-xl font-black text-dark mb-2">Cart is empty</h3>
                                    <p className="text-sm font-medium text-grayCustom">Add some delicious items to your order.</p>
                                    <button
                                        onClick={() => { setIsCartOpen(false); navigate('/menu'); }}
                                        className="mt-6 px-8 py-3 bg-white text-primary border border-primary/20 hover:border-primary font-black rounded-full transition-all text-xs tracking-widest uppercase btn-ripple hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        Browse Menu
                                    </button>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {cartItems.map((item) => (
                                        <motion.div
                                            key={item._id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.92 }}
                                            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex gap-3 group"
                                        >
                                            {/* Item Image */}
                                            <div className="w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                                                <div className="flex justify-between items-start gap-2">
                                                    <div className="min-w-0">
                                                        <h3 className="text-sm font-black text-dark leading-tight truncate">{item.name}</h3>
                                                        <span className="text-[10px] font-black text-primary tracking-widest uppercase">{item.category}</span>
                                                    </div>
                                                    <span className="text-sm font-black text-dark shrink-0">₹{item.price * item.quantity}</span>
                                                </div>

                                                <div className="flex items-center justify-between mt-2">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-2 bg-bgCreme px-2 py-1 rounded-lg border border-gray-100">
                                                        <button
                                                            className="text-base font-black text-grayCustom hover:text-primary w-6 h-6 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                                                            onClick={() => updateQuantity(item._id, -1)}
                                                        >−</button>
                                                        <span className="font-black text-dark text-xs w-5 text-center">{item.quantity}</span>
                                                        <button
                                                            className="text-base font-black text-grayCustom hover:text-primary w-6 h-6 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                                                            onClick={() => updateQuantity(item._id, 1)}
                                                        >+</button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeFromCart(item._id)}
                                                        className="text-gray-300 hover:text-red-400 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer — always at the bottom, never scrolls away */}
                        {cartItems.length > 0 && (
                            <PriceSummary totalPrice={totalPrice} onCheckout={handleCheckout} />
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
