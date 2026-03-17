"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Button from "@/components/Button";
import { motion } from "framer-motion";

export default function BookTablePage() {
    return (
        <main className="min-h-screen bg-beige">
            <Navbar />

            <section className="pt-32 pb-20 container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h4 className="text-primary font-accent text-3xl mb-2">Reservations</h4>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-dark mb-8">Book a Table</h1>
                            <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                                Experience the magic of authentic South Indian cuisine. Whether it's a romantic dinner,
                                a family celebration, or a casual meal with friends, we'll make sure your table is ready.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4 text-gray-700">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                    </div>
                                    <span>For groups larger than 10, please call us directly.</span>
                                </div>
                                <div className="flex items-center space-x-4 text-gray-700">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    </div>
                                    <span>Reservations are held for 15 minutes.</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-primary/10"
                        >
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Date
                                        </label>
                                        <input type="date" className="w-full px-4 py-3 rounded-xl bg-beige/50 border-none focus:ring-2 focus:ring-primary transition-all font-sans" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Guests
                                        </label>
                                        <select className="w-full px-4 py-3 rounded-xl bg-beige/50 border-none focus:ring-2 focus:ring-primary transition-all font-sans">
                                            <option>2 People</option>
                                            <option>3 People</option>
                                            <option>4 People</option>
                                            <option>5 People</option>
                                            <option>6+ People</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Preferred Time
                                    </label>
                                    <select className="w-full px-4 py-3 rounded-xl bg-beige/50 border-none focus:ring-2 focus:ring-primary transition-all font-sans">
                                        <option>12:00 PM</option>
                                        <option>01:00 PM</option>
                                        <option>06:00 PM</option>
                                        <option>07:30 PM</option>
                                        <option>08:30 PM</option>
                                    </select>
                                </div>

                                <hr className="border-gray-100" />

                                <div className="space-y-4">
                                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-neutral border-none focus:ring-2 focus:ring-primary transition-all font-sans" />
                                    <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-neutral border-none focus:ring-2 focus:ring-primary transition-all font-sans" />
                                    <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-neutral border-none focus:ring-2 focus:ring-primary transition-all font-sans" />
                                </div>

                                <Button className="w-full py-4 text-lg">Confirm Booking</Button>
                                <p className="text-center text-xs text-gray-400">By clicking confirm, you agree to our terms of service.</p>
                            </form>
                        </motion.div>

                    </div>
                </div>
            </section>

            <Footer />
            <FloatingActions />
        </main>
    );
}
