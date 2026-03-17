"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ContactSection from "@/components/ContactSection";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-beige">
            <Navbar />

            <section className="pt-32 pb-10 container mx-auto px-4 md:px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-serif font-bold text-dark mb-6"
                >
                    Contact Us
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-600 max-w-2xl mx-auto"
                >
                    Have a question or want to book a large event? We're here to help. Reach out to us through any of the channels below.
                </motion.p>
            </section>

            {/* Reusing the ContactSection component which already has the form and info */}
            <ContactSection />

            <Footer />
            <FloatingActions />
        </main>
    );
}
