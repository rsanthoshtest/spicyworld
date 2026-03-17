"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&q=80&w=1920",
        title: "Where Every Meal Tells a",
        titleAccent: "Timeless Story",
        subtitle: "Experience the rich aromatic flavours of South India from crispy dosas to steaming idlis.",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1630383249896-424e482df721?auto=format&fit=crop&q=80&w=1920",
        title: "Authentic Flavours of",
        titleAccent: "Tamil Nadu",
        subtitle: "Traditional recipes passed down through generations, crafted with love and passion.",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1920",
        title: "Crispy Dosas &",
        titleAccent: "Steaming Idlis",
        subtitle: "The perfect start to your day or a delightful dinner experience with our signature chutneys.",
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="relative h-[85vh] w-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {/* Background Image with Zoom effect */}
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 5 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={slides[current].image}
                            alt="DosaBar Food"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 bg-gradient-to-r from-black/70 to-transparent" />

                    {/* Content */}
                    <div className="relative h-full flex items-center">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="max-w-3xl">
                                <motion.h1
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-4"
                                >
                                    {slides[current].title}{" "}<br />
                                    <span className="font-accent text-accent mt-2 block">{slides[current].titleAccent}</span>
                                </motion.h1>

                                <motion.p
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7, duration: 0.8 }}
                                    className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl"
                                >
                                    {slides[current].subtitle}
                                </motion.p>

                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.9, duration: 0.8 }}
                                >
                                    <Button href="/menu" className="px-8 py-4 text-lg">
                                        Explore Menu
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-10">
                <button
                    onClick={prevSlide}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <div className="flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full transition-all ${current === index ? "bg-primary w-8" : "bg-white/40 hover:bg-white/60"
                                }`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextSlide}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>
        </section>
    );
}
