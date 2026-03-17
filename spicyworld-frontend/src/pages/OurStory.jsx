import React from 'react';
import { motion } from 'framer-motion';

const OurStory = () => {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20 font-outfit">
            
            {/* Hero Section */}
            <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=2000" 
                    alt="SpicyWorld Heritage" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center px-6">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="section-label text-white/90 mb-4 inline-block font-black tracking-[0.3em]"
                    >
                        EST. 2024
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-white font-playfair drop-shadow-2xl"
                    >
                        Our Culinary Journey
                    </motion.h1>
                </div>
            </section>

            {/* The Beginning */}
            <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-dark font-playfair mb-6">A Passion for <span className="text-primary italic">Authenticity</span></h2>
                        <div className="w-16 h-1 bg-primary rounded-full mb-8"></div>
                        <p className="text-lg text-grayCustom leading-relaxed mb-6">
                            SpicyWorld was born out of a simple, profound love for the diverse and vibrant flavors of India. Our founders traveled across the subcontinent, from the bustling street food alleys of Delhi to the aromatic spice farms of Kerala, gathering inspiration and family recipes passed down through generations.
                        </p>
                        <p className="text-lg text-grayCustom leading-relaxed">
                            We believed that true Indian cuisine is an experience—a symphony of carefully balanced spices that tells a story of heritage, culture, and love. Our mission is to bring that undivided, authentic experience directly to your table.
                        </p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <img src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=1000" alt="Spices" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </motion.div>
                </div>
            </section>

            {/* Meet the Chef */}
            <section className="py-24 px-6 md:px-10 bg-bgCreme">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1 relative h-[600px] rounded-t-full overflow-hidden shadow-2xl border-8 border-white"
                        >
                            <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1000" alt="Head Chef" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-1 md:order-2"
                        >
                            <span className="section-label mb-4 inline-block">THE MASTERMIND</span>
                            <h2 className="text-4xl md:text-5xl font-black text-dark font-playfair mb-6">Chef Vikram Singh</h2>
                            <p className="text-lg text-grayCustom leading-relaxed mb-8">
                                With over two decades of culinary mastery acquired in the kitchens of renowned luxury hotels and humble heritage eateries, Chef Vikram brings unmatched excellence to SpicyWorld. His philosophy is simple: respect the ingredients, honor the tradition, and cook with soul.
                            </p>
                            <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-xl text-dark font-playfair bg-white shadow-sm p-4 rounded-r-lg">
                                "Every dish we serve is a memory revived on a plate. It’s not just food; it’s an emotion."
                            </blockquote>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default OurStory;
