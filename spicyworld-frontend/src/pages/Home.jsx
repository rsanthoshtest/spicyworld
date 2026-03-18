import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';

const heroSlides = [
    {
        image: "https://images.unsplash.com/photo-1668236543004-7e7c1f153a84?auto=format&fit=crop&w=2000&q=80",
        title: "Experience the Bold Flavours of Authentic Indian Spices",
        subtitle: "From crispy dosas to spicy biryanis — taste the real essence of Indian tradition.",
        primaryCTA: "Explore Menu",
        secondaryCTA: "Book a Table"
    },
    {
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2000&q=80",
        title: "The Art of Traditional South Indian Cuisine",
        subtitle: "Delicate textures and balanced spices in every single bite.",
        primaryCTA: "Place Your Order",
        secondaryCTA: "Our Story"
    },
    {
        image: "https://images.unsplash.com/photo-1589302168068-1c4592e83f04?auto=format&fit=crop&w=2000&q=80",
        title: "Rich Gravies & Tantalizing Tandoors",
        subtitle: "Straight from our clay oven to your heart.",
        primaryCTA: "Order Now",
        secondaryCTA: "View Menu"
    }
];

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [popularFoods, setPopularFoods] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const res = await api.get(`/api/foods`);
                setPopularFoods(res.data.slice(0, 4));
            } catch (err) {
                console.error("Error fetching popular foods", err);
            }
        };
        fetchPopular();
    }, []);

    return (
        <div className="w-full">
            {/* Hero Slider */}
            <section className="relative h-[100dvh] min-h-[500px] w-full overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img 
                            src={heroSlides[currentSlide].image} 
                            alt="Hero" 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=2000&q=80"; }}
                        />
                        {/* Lighter uniform overlay for better image visibility */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </motion.div>
                </AnimatePresence>

                {/* Hero Content */}
                <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide + "text"}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl"
                        >
                            <span className="section-label text-white/90 mb-4 inline-block tracking-[0.4em] font-black drop-shadow-md">ESTD 2024</span>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-7xl text-white font-black leading-[1.1] mb-4 font-playfair drop-shadow-2xl">
                                {heroSlides[currentSlide].title}
                            </h1>
                            
                            <p className="text-base md:text-lg lg:text-xl text-white/95 font-medium mb-8 max-w-2xl mx-auto leading-relaxed font-outfit drop-shadow-lg">
                                {heroSlides[currentSlide].subtitle}
                            </p>
                            
                            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                                <Link to="/menu" className="btn-premium btn-primary-red px-10 py-4 text-base font-black tracking-widest uppercase shadow-black/50 shadow-2xl hover:-translate-y-1 transition-all">
                                    {heroSlides[currentSlide].primaryCTA}
                                </Link>
                                <Link to="#" className="btn-premium bg-white/10 text-white backdrop-blur-md border border-white/20 px-10 py-4 text-base font-black tracking-widest uppercase hover:bg-white hover:text-dark hover:-translate-y-1 transition-all font-outfit">
                                    {heroSlides[currentSlide].secondaryCTA}
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Slider Indicators (Dots) - Stable position pinned to bottom of content area */}
                    <div className="flex justify-center gap-3 mt-2">
                        {heroSlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-2 rounded-full transition-all duration-500 cursor-pointer border border-white/20 ${currentSlide === i ? 'w-10 bg-primary shadow-[0_0_15px_rgba(255,107,0,0.8)]' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Manual Navigation Arrows */}
                <div className="absolute inset-y-0 left-0 flex items-center z-20 px-2 md:px-6 pointer-events-none">
                    <button 
                        onClick={prevSlide}
                        className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/30 text-white border border-white/20 hover:bg-primary transition-all backdrop-blur-md group cursor-pointer pointer-events-auto"
                        aria-label="Previous Slide"
                    >
                        <span className="text-xl md:text-2xl">←</span>
                    </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center z-20 px-2 md:px-6 pointer-events-none">
                    <button 
                        onClick={nextSlide}
                        className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/30 text-white border border-white/20 hover:bg-primary transition-all backdrop-blur-md group cursor-pointer pointer-events-auto"
                        aria-label="Next Slide"
                    >
                        <span className="text-xl md:text-2xl">→</span>
                    </button>
                </div>
            </section>

            {/* Popular Dishes Section */}
            <section className="py-32 px-6 md:px-10 bg-bgCreme">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="section-label">CUSTOMER FAVORITES</span>
                        <h2 className="text-4xl md:text-6xl font-black text-dark mb-4">Most Popular Dishes</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {popularFoods.map((food, index) => (
                            <motion.div
                                key={food._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="card-premium group hover:shadow-2xl transition-shadow duration-500"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <img 
                                        src={food.image} 
                                        alt={food.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop"; }}
                                    />
                                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black text-white shadow-lg z-10 ${food.isVeg ? 'bg-green-600' : 'bg-accent'}`}>
                                        {food.isVeg ? 'VEG' : 'NON-VEG'}
                                    </div>
                                    {index === 0 && (
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-600 text-dark px-3 py-1 rounded-full text-[10px] font-black shadow-[0_5px_15px_rgba(251,191,36,0.5)] flex items-center gap-1 z-10 hover:scale-105 transition-transform">
                                            <span>★</span> CHEF SPECIAL
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                        <Link to="/menu" className="text-white text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors">
                                            QUICK VIEW &rarr;
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-8 relative bg-white z-20">
                                    <h3 className="text-xl font-bold mb-3 font-playfair group-hover:text-primary transition-colors line-clamp-2 min-h-[56px]">{food.name}</h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-2xl font-black text-primary">₹{food.price}</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(food.spicyLevel)].map((_, i) => (
                                                <span key={i} className="text-orange-500 text-sm">🌶</span>
                                            ))}
                                            {[...Array(5 - food.spicyLevel)].map((_, i) => (
                                                <span key={i + food.spicyLevel} className="text-gray-300 text-sm">★</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-grayCustom mt-4 hidden group-hover:block animate-fade-in-up">
                                        Authentic spices blended perfectly to deliver an unforgettable taste experience.
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Link to="/menu" className="inline-block bg-primary text-white font-black px-14 py-5 rounded-full text-lg uppercase tracking-widest shadow-[0_10px_30px_rgba(255,107,0,0.4)] hover:shadow-[0_15px_40px_rgba(255,107,0,0.6)] hover:-translate-y-2 hover:scale-105 transition-all duration-300 font-outfit">
                            VIEW FULL MENU
                        </Link>
                    </div>
                </div>
            </section>

            {/* Our Story / Experience Section */}
            <section className="py-32 px-6 md:px-10 bg-white border-y border-gray-100 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <span className="section-label text-left">ESTD 2024</span>
                        <h2 className="text-4xl md:text-6xl font-black text-dark mb-8 leading-tight">Authentic Flavours, <br /><span className="text-accent italic">Crafted with Heart</span></h2>
                        <p className="text-lg text-grayCustom mb-10 leading-relaxed font-outfit">
                            Our journey began with a simple passion: to bring the true essence of Indian spices to your table. Every dish at SpicyWorld is a tribute to the rich culinary heritage of India, made with ingredients sourced directly from local farmers and prepared using time-honored techniques.
                        </p>
                        <ul className="space-y-4 mb-12">
                            {['Freshly Ground Spices', 'Traditional Slow-Cooking', 'Locally Sourced Ingredients'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-bold text-dark">
                                    <span className="text-primary text-xl">✓</span> {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="#" className="btn-premium btn-outline-gold w-fit">OUR FULL STORY</Link>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-1000">
                             <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000" alt="Restaurant Interior" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/5 rounded-full -z-10"></div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
