"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import Image from "next/image";

const services = [
    {
        title: "Corporate Events",
        desc: "Elevate your office lunch or company gala with our sophisticated South Indian catering options.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>,
    },
    {
        title: "Private Parties",
        desc: "Birthdays, anniversaries, or just a get-together — we bring the restaurant experience to your home.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    },
    {
        title: "Wedding Catering",
        desc: "Make your special day even more memorable with a traditional feast served with elegance.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.94-8.94 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
    },
    {
        title: "Custom Menus",
        desc: "Our chefs will work with you to create a personalized menu tailored to your preferences.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.8 4.23a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4.2 1.4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path><path d="M7 21h10"></path><path d="M12 21v-6"></path></svg>,
    },
];

export default function CateringPage() {
    return (
        <main className="min-h-screen bg-beige">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1920"
                    alt="Catering Background"
                    fill
                    className="object-cover brightness-50"
                />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Premium Catering</h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans">
                            Authentic South Indian flavours, professionally served at your venue.
                        </p>
                        <Button variant="secondary" onClick={() => document.getElementById('catering-form')?.scrollIntoView({ behavior: 'smooth' })}>
                            Request a Quote
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-lg border border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl"
                        >
                            <div className="text-primary mb-6">{service.icon}</div>
                            <h3 className="text-2xl font-serif font-bold text-dark mb-4">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Quote Form Section */}
            <section id="catering-form" className="py-20 bg-primary/5">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-1/3 bg-primary p-12 text-white flex flex-col justify-center">
                            <h2 className="text-3xl font-serif font-bold mb-6">Let's Plan Your Event</h2>
                            <p className="text-white/80">Tell us a bit about your requirements and we'll get back to you with a customized plan.</p>
                        </div>
                        <div className="md:w-2/3 p-8 md:p-12">
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-neutral border-none focus:ring-2 focus:ring-primary" />
                                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-neutral border-none focus:ring-2 focus:ring-primary" />
                                <input type="text" placeholder="Event Type" className="w-full px-4 py-3 rounded-xl bg-neutral border-none focus:ring-2 focus:ring-primary" />
                                <input type="number" placeholder="Estimated Guests" className="w-full px-4 py-3 rounded-xl bg-neutral border-none focus:ring-2 focus:ring-primary" />
                                <div className="md:col-span-2">
                                    <textarea rows={4} placeholder="Additional Details (Preferences, Allergies, etc.)" className="w-full px-4 py-3 rounded-xl bg-neutral border-none focus:ring-2 focus:ring-primary" />
                                </div>
                                <div className="md:col-span-2">
                                    <Button className="w-full">Get Free Consultation</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <FloatingActions />
        </main>
    );
}
