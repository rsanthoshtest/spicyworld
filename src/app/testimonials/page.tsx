"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { motion } from "framer-motion";

const allTestimonials = [
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
    {
        name: "David Smith",
        role: "Local Resident",
        content: "Absolutely love the atmosphere here. The Mysore Dosa is my personal favorite. Highly recommended for anyone who loves real flavors.",
        rating: 5,
    },
    {
        name: "Priya Sharma",
        role: "Home Chef",
        content: "Reminded me of my grandmother's cooking. The idlis were soft like clouds. DosaBar brings a piece of home to Brighton.",
        rating: 5,
    },
    {
        name: "Robert Brown",
        role: "Spice Enthusiast",
        content: "Incredible range of chutneys! Each one has a distinct personality. The service is prompt and very welcoming.",
        rating: 5,
    },
];

export default function TestimonialsPage() {
    return (
        <main className="min-h-screen bg-beige">
            <Navbar />

            <section className="pt-32 pb-20 container mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-dark mb-6"
                    >
                        Guest Voices
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Read what our wonderful community has to say about their dining experience at DosaBar.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allTestimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-[2rem] shadow-xl border border-primary/5 hover:border-primary/20 transition-all relative group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H5c-1.25 0-2 .75-2 2v3c0 1.25.75 2 2 2h3c0 4-4 4-4 4"></path><path d="M14 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-3c-1.25 0-2 .75-2 2v3c0 1.25.75 2 2 2h3c0 4-4 4-4 4"></path></svg>
                            <div className="flex space-x-1 mb-4">
                                {[...Array(t.rating)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-accent"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-8 relative z-10 font-serif leading-relaxed">
                                "{t.content}"
                            </p>
                            <div>
                                <h4 className="text-xl font-bold text-dark">{t.name}</h4>
                                <p className="text-primary font-medium text-sm">{t.role}</p>
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
