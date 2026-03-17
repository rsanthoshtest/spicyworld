"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { motion } from "framer-motion";
import Image from "next/image";

export default function OurStoryPage() {
    return (
        <main className="min-h-screen bg-beige">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary font-accent text-3xl mb-4"
                    >
                        Since 1985
                    </motion.h4>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-dark mb-8"
                    >
                        A Legacy of <br /> Authentic Flavours
                    </motion.h1>
                </div>
            </section>

            {/* Main Image */}
            <section className="container mx-auto px-4 md:px-6 mb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative h-[60vh] rounded-[3rem] overflow-hidden shadow-2xl"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1516714435131-44321287900b?auto=format&fit=crop&q=80&w=1920"
                        alt="Family cooking"
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </section>

            {/* Story Content */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto prose prose-lg prose-gray">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-serif text-dark mb-8">Where Tradition Meets Passion</h2>
                            <p className="text-xl text-gray-700 leading-relaxed mb-8">
                                For generations, our families have perfected the art of South Indian cooking. What started as a small family kitchen in the heart of Tamil Nadu has now evolved into DosaBar—a celebration of authentic flavors and timeless traditions.
                            </p>
                            <p className="text-xl text-gray-700 leading-relaxed mb-8">
                                Our secret lies in the simplicity of our ingredients and the complexity of our techniques. We source our spices directly from local farmers in Kerala, ensuring that every dish we serve carries the true essence of its origin.
                            </p>
                            <p className="text-xl text-gray-700 leading-relaxed mb-12">
                                At DosaBar, we believe that food is more than just sustenance; it's a bridge between cultures, a storyteller of history, and a medium of love. Join us as we continue to share the aromatic magic of South India with the world.
                            </p>

                            <div className="grid grid-cols-2 gap-8 mt-16 pt-16 border-t border-gray-100">
                                <div>
                                    <h4 className="text-5xl font-serif font-bold text-primary mb-2">38+</h4>
                                    <p className="text-gray-500 font-sans tracking-widest uppercase text-sm font-bold">Years of Heritage</p>
                                </div>
                                <div>
                                    <h4 className="text-5xl font-serif font-bold text-primary mb-2">50+</h4>
                                    <p className="text-gray-500 font-sans tracking-widest uppercase text-sm font-bold">Secret Recipes</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
            <FloatingActions />
        </main>
    );
}
