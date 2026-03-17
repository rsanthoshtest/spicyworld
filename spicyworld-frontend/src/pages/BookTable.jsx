import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BookTable = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        guests: '2',
        date: '',
        time: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
        }, 800);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-bgCreme pt-32 pb-20 px-6 md:px-10">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="section-label">RESERVATIONS</span>
                    <h1 className="text-4xl md:text-6xl font-black text-dark mb-4 font-playfair">Book a Table</h1>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="text-grayCustom max-w-2xl mx-auto text-lg font-outfit">
                        Experience the finest Indian culinary journey. Reserve your spot and let us treat you to an unforgettable evening of authentic flavors.
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
                    {/* Image Section */}
                    <div className="md:w-2/5 h-64 md:h-auto relative">
                        <img 
                            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000" 
                            alt="Restaurant Interior" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent flex flex-col justify-end p-8">
                            <h3 className="text-white font-playfair text-2xl font-bold mb-2">SpicyWorld Premium</h3>
                            <p className="text-white/80 text-sm">Open Daily: 11:00 AM - 11:00 PM</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-10 md:p-14 md:w-3/5 bg-white relative">
                        {isSubmitted ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-10"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                                    ✓
                                </div>
                                <h3 className="text-3xl font-playfair font-black text-dark mb-4">Reservation Confirmed!</h3>
                                <p className="text-grayCustom mb-8">
                                    Thank you, <span className="font-bold text-dark">{formData.name}</span>.<br />
                                    Your table for {formData.guests} on {formData.date} at {formData.time} has been successfully booked.
                                </p>
                                <button 
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setFormData({ name: '', phone: '', guests: '2', date: '', time: '' });
                                    }}
                                    className="btn-premium btn-outline text-sm px-8 py-3"
                                >
                                    Make Another Booking
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-dark tracking-wider">FULL NAME</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors font-medium" 
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-dark tracking-wider">PHONE NUMBER</label>
                                        <input 
                                            type="tel" 
                                            name="phone" 
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors font-medium" 
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-dark tracking-wider">NUMBER OF GUESTS</label>
                                    <select 
                                        name="guests" 
                                        value={formData.guests}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors font-medium text-dark cursor-pointer drop-shadow-sm"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map(num => (
                                            <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-dark tracking-wider">DATE</label>
                                        <input 
                                            type="date" 
                                            name="date" 
                                            required
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors font-medium text-dark" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-dark tracking-wider">TIME</label>
                                        <input 
                                            type="time" 
                                            name="time" 
                                            required
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-primary transition-colors font-medium text-dark" 
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-primary text-white font-black tracking-widest uppercase py-4 rounded-full mt-8 shadow-[0_10px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,107,0,0.5)] hover:-translate-y-1 transition-all"
                                >
                                    Confirm Reservation
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookTable;
