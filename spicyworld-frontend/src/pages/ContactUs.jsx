import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => setIsSubmitted(true), 800);
    };

    return (
        <div className="min-h-screen bg-bgCreme pt-32 pb-20 px-6 md:px-10 font-outfit">
            <div className="max-w-7xl mx-auto">
                
                <div className="text-center mb-20 flex flex-col items-center">
                    <span className="section-label">GET IN TOUCH</span>
                    <h1 className="text-4xl md:text-6xl font-black text-dark mb-4 font-playfair">Contact Us</h1>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="text-grayCustom max-w-2xl text-lg">We would love to hear from you. Reach out for reservations, private events, or general inquiries.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-20">
                    {/* Contact Info Cards */}
                    {[
                        { icon: '📍', title: 'Visit Us', text: '123 Spicy Blvd, Food City,\nFC 45678, India' },
                        { icon: '📞', title: 'Call Us', text: '+91 98765 43210\n+91 12345 67890' },
                        { icon: '✉️', title: 'Email Us', text: 'hello@spicyworld.com\nevents@spicyworld.com' }
                    ].map((info, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-3xl shadow-xl text-center border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-16 h-16 bg-orange-50 text-3xl flex items-center justify-center rounded-2xl mx-auto mb-6 shadow-inner">{info.icon}</div>
                            <h3 className="text-2xl font-black text-dark mb-4 font-playfair">{info.title}</h3>
                            <p className="text-grayCustom whitespace-pre-line leading-relaxed">{info.text}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
                    {/* Google Map Placeholder */}
                    <div className="lg:w-1/2 h-80 lg:h-auto bg-gray-200 relative">
                        <img 
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                            alt="Map Location" 
                            className="w-full h-full object-cover grayscale opacity-70 mix-blend-multiply"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-white p-4 rounded-full shadow-2xl animate-bounce">
                                <span className="text-4xl">📍</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-10 md:p-16 lg:w-1/2 relative">
                        {isSubmitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">✓</div>
                                <h3 className="text-3xl font-playfair font-black text-dark mb-4">Message Sent!</h3>
                                <p className="text-grayCustom">Thank you for reaching out. Our team will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h3 className="text-3xl font-playfair font-black text-dark mb-8">Send a Message</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-dark tracking-wider">FULL NAME</label>
                                        <input type="text" required onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors font-medium" placeholder="Your Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-dark tracking-wider">EMAIL ADDRESS</label>
                                        <input type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors font-medium" placeholder="Your Email" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-dark tracking-wider">SUBJECT</label>
                                    <input type="text" required onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors font-medium" placeholder="How can we help?" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-dark tracking-wider">MESSAGE</label>
                                    <textarea required rows="4" onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors font-medium resize-none" placeholder="Write your message here..."></textarea>
                                </div>
                                <button type="submit" className="bg-primary text-white font-black tracking-widest uppercase px-10 py-4 rounded-full mt-4 shadow-[0_10px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,107,0,0.5)] hover:-translate-y-1 transition-all">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
