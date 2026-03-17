"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        q: "Is your food spicy?",
        a: "We offer various spice levels! While South Indian cuisine is known for its spice, many of our dishes like Plain Dosa or Idli are very mild. Just let our staff know your preference!"
    },
    {
        q: "Do you have vegan options?",
        a: "Yes! Most of our dosas and idlis are naturally vegan as they are made from rice and lentil batter. We also use coconut oil and authentic vegan spice blends."
    },
    {
        q: "Can I book for large groups?",
        a: "Absolutely! For groups of 10 or more, please give us a call at 01273 933 933 so we can arrange the best seating for you."
    },
    {
        q: "Are you gluten-free friendly?",
        a: "Dosas and idlis are naturally gluten-free as they are made from rice and fermented lentils. However, please inform our staff about any severe allergies."
    },
    {
        q: "Do you offer delivery?",
        a: "Yes, we are available on major delivery platforms and also offer direct takeaway orders through our website."
    },
    {
        q: "Where do you source your spices?",
        a: "We source our spices directly from selected farms in Kerala and Tamil Nadu, India, ensuring the highest quality and authenticity."
    }
];

export default function FAQPage() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <main className="min-h-screen bg-beige">
            <Navbar />

            <section className="pt-32 pb-20 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-primary mb-4"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-dark mb-6">Common Questions</h1>
                        <p className="text-xl text-gray-600">Everything you need to know about our food, service, and heritage.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-primary/5">
                                <button
                                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors hover:bg-neutral"
                                >
                                    <span className="text-xl font-bold text-dark">{faq.q}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-primary transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </button>
                                <AnimatePresence>
                                    {openIdx === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-8 pb-8 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <FloatingActions />
        </main>
    );
}
