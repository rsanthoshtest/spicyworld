"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Food Blogger",
        content: "The best dosa outside India. The Masala Dosa was perfectly crispy and the sambar had just the right amount of spice. Truly an authentic experience!",
        rating: 5,
    },
    {
        name: "Michael Chen",
        role: "Regular Customer",
        content: "DosaBar has become my go-to spot for weekend brunch. The filter coffee is a game changer. Friendly staff and cozy atmosphere.",
        rating: 5,
    },
    {
        name: "Elena Rodriguez",
        role: "Gourmet Traveler",
        content: "I've tasted South Indian food all over the world, and DosaBar stands out for its freshness and traditional taste. A hidden gem!",
        rating: 5,
    },
];

export default function TestimonialCarousel() {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const prev = () => {
        setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-beige relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 text-primary/10 -translate-x-1/2 -translate-y-1/2 select-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-serif text-dark font-bold mb-4">
                            What Our Diners Say
                        </h2>
                        <div className="flex justify-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-accent"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            ))}
                        </div>
                    </div>

                    <div className="relative min-h-[300px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <p className="text-2xl md:text-3xl italic text-gray-700 mb-8 font-serif leading-relaxed">
                                    "{testimonials[current].content}"
                                </p>
                                <div>
                                    <h4 className="text-xl font-bold text-dark">{testimonials[current].name}</h4>
                                    <p className="text-primary font-medium">{testimonials[current].role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2">
                            <button
                                onClick={prev}
                                className="p-3 rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                        </div>
                        <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2">
                            <button
                                onClick={next}
                                className="p-3 rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center space-x-3 mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-3 h-3 rounded-full transition-all ${current === index ? "bg-primary w-10" : "bg-primary/30"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
