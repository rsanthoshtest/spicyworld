"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { motion } from "framer-motion";
import Image from "next/image";

const menuCategories = [
    {
        name: "Crispy Dosas",
        items: [
            { name: "Plain Dosa", price: "£6.95", desc: "Traditional plain crispy rice & lentil crepe." },
            { name: "Masala Dosa", price: "£8.95", desc: "Dosa filled with tempered potato & onion masala." },
            { name: "Mysore Masala Dosa", price: "£9.95", desc: "Spiced with red garlic chutney & potato filling." },
            { name: "Cheese Dosa", price: "£9.50", desc: "Filled with melted cheddar cheese." },
        ]
    },
    {
        name: "Steaming Idlis",
        items: [
            { name: "Idli Sambar (3pcs)", price: "£5.95", desc: "Steamed rice cakes served with lentil stew." },
            { name: "Kanchi Idli", price: "£7.50", desc: "Spiced idlis with ginger, pepper and cumin." },
        ]
    },
    {
        name: "Main Courses",
        items: [
            { name: "Chicken Biriyani", price: "£13.95", desc: "Aromatic basmati rice cooked with succulent chicken." },
            { name: "Lamb Curry", price: "£14.50", desc: "Tender lamb cooked in a rich coconut-based gravy." },
            { name: "Paneer Butter Masala", price: "£11.95", desc: "Soft cottage cheese in a creamy tomato sauce." },
        ]
    },
];

export default function MenuPage() {
    return (
        <main className="min-h-screen bg-beige">
            <Navbar />

            {/* Page Header */}
            <section className="relative h-[40vh] flex items-center justify-center pt-20">
                <Image
                    src="https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&q=80&w=1920"
                    alt="Menu Header"
                    fill
                    className="object-cover brightness-50"
                />
                <div className="relative text-center text-white z-10 px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-4"
                    >
                        Our Menu
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-accent text-accent"
                    >
                        A Taste of South India
                    </motion.p>
                </div>
            </section>

            {/* Menu Content */}
            <section className="py-20 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                    {menuCategories.map((category, catIdx) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary border-b-2 border-primary/20 pb-4 mb-8">
                                {category.name}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                {category.items.map((item) => (
                                    <div key={item.name} className="flex justify-between items-start group">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">{item.name}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                        <span className="text-lg font-bold text-primary shrink-0 ml-4">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
            <FloatingActions />
        </main>
    );
}
