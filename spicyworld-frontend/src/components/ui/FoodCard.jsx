import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const AddToCartButton = ({ food, large = false }) => {
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const cartItem = cartItems.find(item => item._id === food._id);

    const handleAction = (e, action, ...args) => {
        e.stopPropagation();
        if (!user) {
            navigate('/login');
            return;
        }
        action(...args);
    };

    if (cartItem) {
        return (
            <div
                className={`inline-flex items-center bg-white border border-orange-200 text-primary font-black rounded-2xl shadow-[0_4px_14px_rgba(245,124,0,0.15)] ${large ? 'h-12' : 'h-10'}`}
                style={{ minWidth: large ? '9rem' : '7.5rem', maxWidth: large ? '9rem' : '7.5rem' }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="w-9 h-full flex items-center justify-center rounded-l-2xl hover:bg-orange-50 active:scale-90 transition-all cursor-pointer text-base"
                    onClick={(e) => handleAction(e, cartItem.quantity === 1 ? removeFromCart : updateQuantity, food._id, -1)}
                >
                    {cartItem.quantity === 1 ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    ) : '−'}
                </button>
                <motion.span
                    key={cartItem.quantity}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="flex-1 text-center text-dark font-black text-sm select-none"
                >
                    {cartItem.quantity}
                </motion.span>
                <button
                    className="w-9 h-full flex items-center justify-center rounded-r-2xl hover:bg-orange-50 active:scale-90 transition-all cursor-pointer text-base"
                    onClick={(e) => handleAction(e, updateQuantity, food._id, 1)}
                >
                    +
                </button>
            </div>
        );
    }

    return (
        <button 
            onClick={(e) => handleAction(e, addToCart, food)}
            className={`
                flex items-center justify-center gap-1 rounded-xl font-black tracking-widest uppercase transition-all duration-300 btn-ripple
                ${large ? 'px-8 py-3 text-sm' : 'px-4 py-2.5 text-[10px] md:text-xs'}
                bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-lg shadow-primary/20 transform active:scale-95
            `}
        >
            <span>+</span> <span>ADD</span>
        </button>
    );
};

export const FoodCard = ({ food, onClick }) => {
    const { cartItems } = useCart();
    
    if (!food || !food.name || !food.price) return null;

    const cartItem = cartItems.find(item => item._id === food._id);
    const isAdded = !!cartItem;

    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600";

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`bg-white rounded-3xl border ${isAdded ? 'border-primary/60 shadow-[0_10px_30px_rgba(245,124,0,0.15)] ring-4 ring-primary/10' : 'border-gray-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)]'} hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col group h-full card-hover relative`}
            onClick={onClick}
        >
            <div className="h-44 md:h-52 relative overflow-hidden bg-gray-50 flex-shrink-0 rounded-t-3xl">
                <img
                    src={food.image || FALLBACK_IMAGE}
                    alt={food.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { if (e.target.src !== FALLBACK_IMAGE) e.target.src = FALLBACK_IMAGE; }}
                />
                {/* Bottom-left: VEG / NON-VEG badge — always here */}
                <div className="absolute bottom-3 left-3 z-20">
                    <div className={`px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm shadow flex items-center gap-1.5 ${
                        food.isVeg ? 'text-green-600 border border-green-200' : 'text-red-500 border border-red-200'
                    }`}>
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            food.isVeg ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="text-[9px] font-black tracking-wider uppercase leading-none">
                            {food.isVeg ? 'VEG' : 'NON-VEG'}
                        </span>
                    </div>
                </div>

                {/* Top-right: ADDED / BESTSELLER / SPECIAL — only one shown at a time */}
                <div className="absolute top-3 right-3 z-20">
                    {isAdded ? (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-primary text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1"
                        >
                            <span className="text-[10px] font-black tracking-widest uppercase">ADDED ✓</span>
                        </motion.div>
                    ) : food.isBestseller ? (
                        <div className="bg-white/95 backdrop-blur-sm border-2 border-primary text-primary px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                            <span className="text-xs">🔥</span>
                            <span className="text-[9px] font-black tracking-wider uppercase">BEST</span>
                        </div>
                    ) : food.isChefSpecial ? (
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2.5 py-1 rounded-md shadow flex items-center gap-1">
                            <span className="text-xs">👨‍🍳</span>
                            <span className="text-[9px] font-black tracking-wider uppercase">SPECIAL</span>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className={`p-5 flex flex-col flex-grow transition-colors ${isAdded ? 'bg-orange-50/20' : ''}`}>
                {/* Rating + Spice row */}
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                        <span className="text-yellow-500 text-[10px]">★</span>
                        <span className="text-green-700 text-xs font-black">{food.rating || 4.5}</span>
                    </div>
                    {food.spicyLevel > 0 && (
                        <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                            🌶️ {food.spicyLevel <= 2 ? 'Mild' : food.spicyLevel <= 3 ? 'Medium' : 'Spicy'}
                        </span>
                    )}
                </div>

                {/* Name */}
                <h3 className="text-base font-black text-dark tracking-tight leading-snug group-hover:text-primary transition-colors mb-1.5 line-clamp-1">
                    {food.name}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed flex-grow font-medium mb-4">
                    {food.description || "A delicious preparation from SpicyWorld's kitchen."}
                </p>

                {/* Price + Cart control */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <span className="text-lg font-black text-dark tracking-tighter">₹{food.price}</span>
                    <AddToCartButton food={food} />
                </div>
            </div>
        </motion.div>
    );
};
