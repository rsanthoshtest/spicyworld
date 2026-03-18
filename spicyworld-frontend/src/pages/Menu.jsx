import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDish, setSelectedDish] = useState(null); // Modal State
    
    // Filters
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [vegOnly, setVegOnly] = useState(false);
    const [chefSpecialOnly, setChefSpecialOnly] = useState(false);
    const [sortBy, setSortBy] = useState('none');
    const [priceRange, setPriceRange] = useState(1000);

    const categories = ['All', 'Biryani', 'Dosa', 'Idli', 'Rice', 'Curries', 'Street Food', 'Snacks', 'Drinks', 'Desserts'];

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/api/foods`);
                setFoods(res.data);
                setFilteredFoods(res.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching menu", err);
                setError(err.response?.data?.message || "Failed to load menu items. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };
        fetchFoods();
    }, []);

    useEffect(() => {
        let result = foods;

        if (search) {
            result = result.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (category !== 'All') {
            result = result.filter(f => f.category === category);
        }

        if (vegOnly) {
            result = result.filter(f => f.isVeg);
        }

        if (chefSpecialOnly) {
            result = result.filter(f => f.isChefSpecial);
        }

        result = result.filter(f => f.price <= priceRange);

        if (sortBy === 'priceLow') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceHigh') {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sortBy === 'alpha') {
            result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredFoods(result);
    }, [search, category, vegOnly, chefSpecialOnly, sortBy, priceRange, foods]);

    // Close Modal on Esc key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedDish(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div className="bg-white min-h-screen pt-28 pb-20 font-outfit relative">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row gap-10">
                
                {/* --- SIDEBAR FILTERS (Sticky & Independently Scrollable) --- */}
                <aside className="lg:w-80 w-full flex-shrink-0">
                    <div className="sticky top-28 bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] h-[calc(100vh-140px)] flex flex-col">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50 flex-shrink-0">
                            <h2 className="text-xl font-black text-dark tracking-tight">Filters</h2>
                            {(category !== 'All' || vegOnly || chefSpecialOnly || priceRange < 1000 || search) && (
                                <button 
                                    onClick={() => { setCategory('All'); setVegOnly(false); setChefSpecialOnly(false); setPriceRange(1000); setSearch(''); }}
                                    className="text-xs font-bold text-primary hover:underline"
                                >
                                    CLEAR ALL
                                </button>
                            )}
                        </div>

                        {/* Scrollable Area */}
                        <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow">
                            {/* Search */}
                            <div className="mb-10">
                                <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-3 block">SEARCH DISHES</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Dosa, Biryani..."
                                        className="w-full bg-bgCreme/50 border border-gray-100 rounded-2xl px-5 py-3 focus:border-primary/50 outline-none transition-all font-medium text-sm"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-10">
                                <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-3 block">CURATED MENU</label>
                                <div className="flex flex-col gap-2">
                                    {categories.map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setCategory(c)}
                                            className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                                category === c ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:bg-bgCreme hover:text-dark'
                                            }`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase block">PRICE RANGE</label>
                                    <span className="text-xs font-bold text-primary">Up to ₹{priceRange}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="40" 
                                    max="1000" 
                                    step="10"
                                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold">
                                    <span>₹40</span>
                                    <span>₹1000</span>
                                </div>
                            </div>

                            {/* Dietary / Special */}
                            <div className="pt-6 border-t border-gray-50 flex flex-col gap-4 pb-6">
                                <button 
                                    onClick={() => setVegOnly(!vegOnly)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                        vegOnly ? 'bg-green-50 border-green-200' : 'border-gray-100 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${vegOnly ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-200'}`}></div>
                                        <span className="text-sm font-bold text-dark">Vegetarian Only</span>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setChefSpecialOnly(!chefSpecialOnly)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                        chefSpecialOnly ? 'bg-orange-50 border-orange-200' : 'border-gray-100 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`text-lg ${chefSpecialOnly ? 'text-primary' : 'text-gray-400 grayscale'}`}>👨‍🍳</div>
                                        <span className={`text-sm font-bold ${chefSpecialOnly ? 'text-primary' : 'text-dark'}`}>Chef's Special</span>
                                    </div>
                                    <div className={`w-10 h-5 rounded-full relative transition-colors ${chefSpecialOnly ? 'bg-primary' : 'bg-gray-200'}`}>
                                        <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${chefSpecialOnly ? 'translate-x-5' : ''}`}></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* --- MAIN CONTENT (Grid) --- */}
                <main className="flex-1 min-w-0"> {/* min-w-0 ensures grid doesn't overflow */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black text-dark mb-2">Our <span className="text-primary italic">Selection</span></h1>
                            <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">
                                {filteredFoods.length} REFINED PREPARATIONS FOUND
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-grayCustom tracking-widest uppercase whitespace-nowrap">SORT BY:</span>
                            <select 
                                className="bg-bgCreme border border-gray-100 rounded-xl px-4 py-2.5 outline-none font-bold text-sm cursor-pointer focus:border-primary/50 w-full md:w-auto"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="none">Featured</option>
                                <option value="priceLow">Price: Low to High</option>
                                <option value="priceHigh">Price: High to Low</option>
                                <option value="alpha">Alphabetical (A-Z)</option>
                            </select>
                        </div>
                    </div>

                    {/* Loading/Error/Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                                    <div className="h-56 bg-gray-200"></div>
                                    <div className="p-6">
                                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                                            <div className="h-10 bg-gray-200 rounded-xl w-1/3"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="min-h-[400px] flex items-center justify-center bg-accent/5 rounded-[3rem] p-10">
                            <div className="text-center max-w-md">
                                <div className="text-6xl mb-6 opacity-30">🔌</div>
                                <h3 className="text-2xl font-black mb-4">Connection Hiccup</h3>
                                <p className="text-grayCustom mb-8">{error}</p>
                                <button onClick={() => window.location.reload()} className="btn-premium btn-primary-red mx-auto">RETRY CONNECTION</button>
                            </div>
                        </div>
                    ) : filteredFoods.length === 0 ? (
                        <div className="text-center py-40">
                             <div className="text-7xl mb-6 grayscale opacity-20">🥣</div>
                             <h3 className="text-3xl font-black mb-4">No matching dishes</h3>
                             <p className="text-gray-400">Try adjusting your filters to find something delicious.</p>
                        </div>
                    ) : (
                        <>
                            {search === '' && category === 'All' && !vegOnly && !chefSpecialOnly && priceRange === 1000 && (
                                <div className="mb-14">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-2xl">🔥</span>
                                        <h2 className="text-2xl font-black text-dark tracking-tight">Popular Today</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {foods.filter(f => f.isBestseller).slice(0, 4).map((food) => (
                                            <FoodCard key={'pop-'+food._id} food={food} onClick={() => setSelectedDish(food)} />
                                        ))}
                                    </div>
                                    <div className="h-px bg-gray-100 my-12 w-full"></div>
                                </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                                <AnimatePresence>
                                    {filteredFoods.map((food) => (
                                        <FoodCard key={food._id} food={food} onClick={() => setSelectedDish(food)} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </main>
            </div>

            {/* --- DISH DETAIL MODAL --- */}
            <AnimatePresence>
                {selectedDish && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm"
                        onClick={() => setSelectedDish(null)}
                    >
                        <motion.div 
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button 
                                onClick={() => setSelectedDish(null)}
                                className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white backdrop-blur-md rounded-full p-2 text-dark shadow-sm transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Modal Image */}
                            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                                <img 
                                    src={selectedDish.image} 
                                    alt={selectedDish.name} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"; }}
                                />
                                {selectedDish.isChefSpecial && (
                                    <div className="absolute top-6 left-6 bg-gradient-to-r from-primary to-accent text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest flex items-center gap-2 shadow-lg">
                                        <span>👨‍🍳</span> CHEF'S SPECIAL
                                    </div>
                                )}
                            </div>

                            {/* Modal Content */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                                <div className="flex items-center gap-3 mb-4 text-xs font-black tracking-widest">
                                    <span className={`px-2 py-1 rounded border ${selectedDish.isVeg ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-500 border-red-200 bg-red-50'}`}>
                                        {selectedDish.isVeg ? 'VEG' : 'NON-VEG'}
                                    </span>
                                    <span className="text-gray-400 uppercase">{selectedDish.category}</span>
                                </div>
                                
                                <h2 className="text-3xl md:text-4xl font-black text-dark font-playfair leading-tight mb-4">
                                    {selectedDish.name}
                                </h2>

                                {/* Ratings & Spices */}
                                <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex text-amber-400 text-lg">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i}>{i < Math.floor(selectedDish.rating || 4.5) ? '★' : '☆'}</span>
                                            ))}
                                        </div>
                                        <span className="text-sm font-bold text-dark ml-1">{selectedDish.rating || 4.5}</span>
                                    </div>
                                    <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
                                    <div className="flex items-center gap-1 text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                                        <span className="mr-1">🌶️</span>
                                        {selectedDish.spicyLevel <= 2 ? 'Mild' : selectedDish.spicyLevel <= 3 ? 'Medium' : 'Spicy'}
                                    </div>
                                </div>

                                <p className="text-grayCustom leading-relaxed mb-6">
                                    {selectedDish.description}
                                </p>

                                {selectedDish.ingredients && selectedDish.ingredients.length > 0 && (
                                    <div className="mb-8 flex-grow">
                                        <h4 className="text-xs font-black tracking-widest text-dark uppercase mb-3 border-l-2 border-primary pl-2">Key Ingredients</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedDish.ingredients.map((ing, i) => (
                                                <span key={i} className="text-[11px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                                    {ing}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                                    <div>
                                        <div className="text-[10px] font-black tracking-widest text-gray-400 mb-1">TOTAL PRICE</div>
                                        <div className="text-4xl font-black text-dark tracking-tighter">₹{selectedDish.price}</div>
                                    </div>
                                    
                                    <AddToCartButton food={selectedDish} onClick={() => setSelectedDish(null)} large />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

// Refactored Food Card Component
const FoodCard = ({ food, onClick }) => {
    // TASK 6 - Validate before render. If core fields are missing, return null to avoid crashing UI
    if (!food || !food.name || !food.price) return null;

    // Strict Fallback URL
    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600";

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col group h-full"
            onClick={onClick}
        >
            {/* Image Container with fixed Aspect Ratio and Cover */}
            <div className="h-56 relative overflow-hidden bg-gray-50 flex-shrink-0">
                <img 
                    src={food.image || FALLBACK_IMAGE} 
                    alt={food.name} 
                    loading="lazy" // TASK 5 - Image Loading Improvement
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" // TASK 5 - Slight hover zoom (scale-105)
                    onError={(e) => { 
                        if (e.target.src !== FALLBACK_IMAGE) e.target.src = FALLBACK_IMAGE; 
                    }}
                />
                
                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <div className={`px-2 py-1 rounded bg-white/90 backdrop-blur-sm border flex items-center gap-1.5 shadow-sm ${food.isVeg ? 'border-green-200 text-green-700' : 'border-red-200 text-red-600'}`}>
                         <div className={`w-2 h-2 rounded-full ${food.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                         <span className="text-[10px] font-black tracking-widest">{food.isVeg ? 'VEG' : 'NON-VEG'}</span>
                    </div>
                </div>

                {/* Bestseller/Trending Badge */}
                {food.isBestseller && (
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border-2 border-primary text-primary px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 z-10">
                        <span>🔥</span>
                        <span className="text-[10px] font-black tracking-widest uppercase">Bestseller</span>
                    </div>
                )}

                {/* Chef's Special Badge */}
                {food.isChefSpecial && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded shadow-sm flex items-center gap-1.5 z-10">
                        <span className="text-sm">👨‍🍳</span>
                        <span className="text-[10px] font-black tracking-widest">SPECIAL</span>
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Star Ratings replacing Chili top right */}
                <div className="flex justify-between items-center mb-2">
                    <div className="flex text-amber-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < Math.floor(food.rating || 4.5) ? '★' : '☆'}</span>
                        ))}
                        <span className="text-gray-400 text-xs ml-1 mt-0.5 font-bold">{food.rating || 4.5}</span>
                    </div>
                    {/* Minimal Spice Indication text instead of large chilis above */}
                    {food.spicyLevel > 0 && (
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100 flex items-center">
                            🌶️ {food.spicyLevel <= 2 ? 'Mild' : food.spicyLevel <= 3 ? 'Medium' : 'Spicy'}
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-black text-dark tracking-tight leading-tight group-hover:text-primary transition-colors mb-2 line-clamp-1">
                    {food.name}
                </h3>
                
                <p className="text-sm text-grayCustom mb-6 line-clamp-2 h-10 font-medium leading-relaxed flex-grow">
                    {food.description || "A delicious preparation from SpicyWorld's kitchen."}
                </p>

                {/* Footer with Price & Clean Add to Cart */}
                <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Price</span>
                        <span className="text-2xl font-black text-dark tracking-tighter">₹{food.price}</span>
                    </div>
                    
                    <AddToCartButton food={food} />
                </div>
            </div>
        </motion.div>
    );
};

// Reusable AddToCart Button component to keep cards/modals clean
const AddToCartButton = ({ food, onClick, large = false }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = (e) => {
        e.stopPropagation(); // Prevention modal open when clicking button on card
        if (!user) {
            navigate('/login');
            return;
        }
        addToCart(food);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
        if (onClick) onClick(); // optional callback (e.g., closing modal)
    };

    return (
        <button 
            onClick={handleAdd}
            className={`
                flex items-center justify-center gap-2 rounded-xl font-black tracking-widest uppercase transition-all duration-300
                ${large ? 'px-8 py-4 text-sm' : 'px-5 py-2.5 text-xs'}
                ${isAdded 
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                    : 'bg-dark text-white hover:bg-primary hover:shadow-[0_8px_20px_rgba(245,124,0,0.3)]'
                }
            `}
        >
            {isAdded ? (
                <>
                    <span>✓</span> <span>Added</span>
                </>
            ) : (
                <>
                    <span>+</span> <span>Add to Cart</span>
                </>
            )}
        </button>
    );
};

export default Menu;
