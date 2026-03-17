"use client";

import { motion } from "framer-motion";
import Button from "./Button";

export default function ContactSection() {
    return (
        <section className="py-24 bg-white" id="contact">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info & Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-primary font-accent text-3xl mb-2">Get in Touch</h4>
                        <h2 className="text-4xl md:text-5xl font-serif text-dark font-bold mb-8">Visit Us Today</h2>

                        <div className="space-y-8 mb-12">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-beige rounded-xl text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </div>
                                <div>
                                    <h5 className="text-xl font-bold text-dark mb-1">Our Location</h5>
                                    <p className="text-gray-600">123 Dosa Lane, Brighton, East Sussex, BN1 1AA</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-beige rounded-xl text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </div>
                                <div>
                                    <h5 className="text-xl font-bold text-dark mb-1">Call Us</h5>
                                    <p className="text-gray-600">01273 933 933</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-beige rounded-xl text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                </div>
                                <div>
                                    <h5 className="text-xl font-bold text-dark mb-1">Opening Hours</h5>
                                    <p className="text-gray-600">Mon - Fri: 12:00 PM - 10:00 PM</p>
                                    <p className="text-gray-600">Sat - Sun: 11:00 AM - 11:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Google Map Placeholder */}
                        <div className="w-full h-64 rounded-2xl overflow-hidden shadow-inner grayscale hover:grayscale-0 transition-all duration-500 border-2 border-beige">
                            <div className="w-full h-full bg-neutral flex items-center justify-center text-gray-400">
                                <div className="text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-50"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <p className="font-semibold">Interactive Map Placeholder</p>
                                    <p className="text-sm">Brighton, UK</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-beige p-8 md:p-12 rounded-3xl shadow-xl"
                    >
                        <h3 className="text-3xl font-serif font-bold text-dark mb-8">Send us a Message</h3>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-dark uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl border-transparent focus:border-primary focus:ring-0 transition-all font-sans"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-dark uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl border-transparent focus:border-primary focus:ring-0 transition-all font-sans"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-bold text-dark uppercase tracking-wider">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="01234 567 890"
                                    className="w-full px-4 py-3 rounded-xl border-transparent focus:border-primary focus:ring-0 transition-all font-sans"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-dark uppercase tracking-wider">Your Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Tell us about your catering needs or feedback..."
                                    className="w-full px-4 py-3 rounded-xl border-transparent focus:border-primary focus:ring-0 transition-all font-sans"
                                ></textarea>
                            </div>

                            <Button className="w-full py-4 text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                Send Message
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
