import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Catering = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: 'Wedding',
        guestCount: '50-100',
        date: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => setIsSubmitted(true), 800);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-white pt-24 font-outfit">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full bg-dark overflow-hidden flex items-center justify-center text-center">
                <img 
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=2000" 
                    alt="Catering Setup" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="relative z-10 max-w-3xl px-6">
                    <span className="section-label text-white/90 mb-4 inline-block">PREMIUM SERVICES</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white font-playfair mb-6 drop-shadow-lg">Elevate Your Events</h1>
                    <p className="text-lg md:text-xl text-white/90 font-medium">Bring the authentic, bold flavors of SpicyWorld to your special occasions with our bespoke catering services.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    
                    {/* Information Section */}
                    <div>
                        <h2 className="text-4xl font-black text-dark font-playfair mb-6">Unforgettable Culinary Experiences</h2>
                        <div className="w-16 h-1 bg-primary rounded-full mb-8"></div>
                        <p className="text-grayCustom text-lg mb-10 leading-relaxed">
                            Whether you’re planning an intimate gathering, a corporate corporate event, or a grand wedding, our expert chefs craft tailored menus to suit your palate. We don’t just deliver food; we deliver an experience.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {[
                                { title: 'Weddings', icon: '💍', desc: 'Grand feasts for your special day.' },
                                { title: 'Corporate Events', icon: '💼', desc: 'Professional, elegant, and timely.' },
                                { title: 'Private Parties', icon: '🎉', desc: 'Customized menus for intimate crowds.' },
                                { title: 'Outdoor Events', icon: '⛺', desc: 'Live counters and buffet setups.' }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-6 bg-bgCreme rounded-2xl hover:shadow-lg transition-shadow border border-orange-50"
                                >
                                    <div className="text-3xl mb-4">{item.icon}</div>
                                    <h4 className="font-bold text-xl text-dark mb-2">{item.title}</h4>
                                    <p className="text-sm text-grayCustom">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 text-dark font-bold bg-orange-50 p-6 rounded-2xl border border-orange-100">
                            <span className="text-3xl">📞</span>
                            <div>
                                <p className="text-sm text-grayCustom font-medium">Prefer to speak with our event manager?</p>
                                <p className="text-xl text-primary">+91 98765 43210</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white rounded-[2rem] shadow-2xl p-10 md:p-14 border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>
                        
                        {isSubmitted ? (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mb-8 shadow-inner">
                                    ✓
                                </div>
                                <h3 className="text-3xl font-playfair font-black text-dark mb-4">Enquiry Received!</h3>
                                <p className="text-grayCustom mb-8 text-lg">
                                    Thank you for considering SpicyWorld. Our event manager will contact you within 24 hours to discuss your catering needs.
                                </p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-3xl font-playfair font-black text-dark mb-2">Request a Quote</h3>
                                <p className="text-grayCustom mb-8">Fill out the details below, and we'll get back to you.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-dark tracking-wider">FULL NAME</label>
                                            <input type="text" name="name" required onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium" placeholder="Your Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-dark tracking-wider">PHONE NUMBER</label>
                                            <input type="tel" name="phone" required onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium" placeholder="Your Phone" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-dark tracking-wider">EMAIL ADDRESS</label>
                                        <input type="email" name="email" required onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium" placeholder="Your Email" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-dark tracking-wider">EVENT TYPE</label>
                                            <select name="eventType" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-dark cursor-pointer">
                                                <option>Wedding</option>
                                                <option>Corporate</option>
                                                <option>Private Party</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-dark tracking-wider">GUEST COUNT</label>
                                            <select name="guestCount" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-dark cursor-pointer">
                                                <option>Under 50</option>
                                                <option>50 - 100</option>
                                                <option>100 - 300</option>
                                                <option>300+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-dark tracking-wider">EVENT DATE</label>
                                        <input type="date" name="date" required onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-dark" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-dark tracking-wider">ADDITIONAL DETAILS</label>
                                        <textarea name="message" rows="3" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium resize-none" placeholder="Any specific dietary requirements or preferences?"></textarea>
                                    </div>

                                    <button type="submit" className="w-full bg-dark text-white font-black tracking-widest uppercase py-4 rounded-xl mt-4 hover:bg-primary transition-colors shadow-lg shadow-black/10">
                                        Submit Enquiry
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catering;
