"use client";

import { motion } from "framer-motion";
import Button from "./Button";

export default function BookingCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />

            {/* Abstract Pattern overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-serif font-bold mb-8"
                    >
                        Ready to Experience the <br /> Magic of South India?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
                    >
                        Book your table today and let us take you on a flavorful journey you won't forget.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                        <Button variant="secondary" href="/book-table" className="bg-white text-primary hover:bg-beige hover:text-dark px-10 py-4 text-lg w-full sm:w-auto shadow-xl hover:shadow-primary/30">
                            Book Your Table Now
                        </Button>
                        <Button variant="outline" href="/menu" className="border-white text-white hover:bg-white hover:text-primary px-10 py-4 text-lg w-full sm:w-auto">
                            View Our Full Menu
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
