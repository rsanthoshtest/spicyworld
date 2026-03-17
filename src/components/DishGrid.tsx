"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

const dishes = [
    {
        name: "Andhra Lamb Masala",
        image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=800",
        isPopular: true,
        isVeg: false,
    },
    {
        name: "Chettinad Chicken",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
        isPopular: true,
        isVeg: false,
    },
    {
        name: "Curry Leaf Grilled Salmon",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
        isPopular: true,
        isVeg: false,
    },
    {
        name: "Egg Kal Dosa",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
        isPopular: true,
        isVeg: false,
    },
];

export default function DishGrid() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-primary font-bold tracking-widest text-sm mb-2 uppercase"
                    >
                        Customer Favorites
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif text-dark font-bold"
                    >
                        Most Popular Dishes
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dishes.map((dish, index) => (
                        <motion.div
                            key={dish.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                        >
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={dish.image}
                                    alt={dish.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {dish.isPopular && (
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                                        Popular
                                    </div>
                                )}
                                <div className="absolute bottom-4 right-4">
                                    <div className={`w-5 h-5 border-2 ${dish.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center bg-white rounded-sm`}>
                                        <div className={`w-2 h-2 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg font-serif font-bold text-dark mb-4 leading-tight">
                                    {dish.name}
                                </h3>
                                <div className="mt-auto">
                                    <button className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors">
                                        <ShoppingCart size={18} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
