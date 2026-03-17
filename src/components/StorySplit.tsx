"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function StorySplit() {
    return (
        <section className="py-0 overflow-hidden bg-white">
            <div className="flex flex-col lg:flex-row min-h-[650px]">
                {/* Left Side: Image */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 relative min-h-[450px] lg:min-h-0"
                >
                    <div className="absolute inset-0 m-4 lg:m-8 lg:mr-0 overflow-hidden rounded-[2rem]">
                        <Image
                            src="https://images.unsplash.com/photo-1550966842-2849a225986d?auto=format&fit=crop&q=80&w=1200"
                            alt="Authentic South Indian Cooking"
                            fill
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                {/* Right Side: Text Content */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 bg-[#F57C00] flex items-center p-8 md:p-16 lg:p-24"
                >
                    <div className="max-w-xl text-white">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-white/80 font-bold tracking-widest text-sm mb-4 uppercase"
                        >
                            Our Story
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight"
                        >
                            A Legacy of Authentic Flavours
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-6"
                        >
                            <p className="text-lg md:text-xl text-white/90 font-sans leading-relaxed">
                                For generations, our families have perfected the art of South Indian cooking
                                in the towns of South India. Now, we bring those same time-honoured
                                recipes to you.
                            </p>
                            <p className="text-lg md:text-xl text-white/90 font-sans leading-relaxed">
                                Every dosa is made from batter fermented overnight. Every sambar carries
                                the essence of hand-ground spices. Every meal is a bridge between two
                                worlds.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-12"
                        >
                            <a
                                href="/our-story"
                                className="inline-flex items-center gap-3 bg-white text-[#F57C00] px-8 py-4 rounded-full font-bold hover:bg-beige transition-all group shadow-lg"
                            >
                                Learn More About Us
                                <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
