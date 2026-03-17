import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-24 pb-12 px-6 md:px-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                
                {/* Brand & Mission */}
                <div className="flex flex-col gap-6">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="text-3xl">🌶️</span>
                        <span className="text-2xl font-black tracking-tighter">
                            Spicy<span className="text-primary">World</span>
                        </span>
                    </Link>
                    <p className="text-gray-400 font-outfit leading-relaxed">
                        Experience the soul of Indian spice. We bring authentic, fiery flavours from the streets of India directly to your table with love and tradition.
                    </p>
                    <div className="flex gap-4">
                        {['FB', 'IG', 'TW', 'YT'].map(social => (
                            <div key={social} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-black hover:bg-primary hover:border-primary transition-all cursor-pointer">
                                {social}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="section-label text-white border-b border-primary/30 pb-2 mb-8">EXPLORE</h3>
                    <ul className="space-y-4 font-bold text-sm text-gray-400">
                        <li><Link to="/menu" className="hover:text-primary transition-colors">Place Your Order</Link></li>
                        <li><Link to="#" className="hover:text-primary transition-colors">Book a Table</Link></li>
                        <li><Link to="#" className="hover:text-primary transition-colors">Bulk Catering</Link></li>
                        <li><Link to="#" className="hover:text-primary transition-colors">Our Story</Link></li>
                    </ul>
                </div>

                {/* Information */}
                <div>
                    <h3 className="section-label text-white border-b border-primary/30 pb-2 mb-8">INFORMATION</h3>
                    <ul className="space-y-4 font-bold text-sm text-gray-400">
                        <li><Link to="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        <li><Link to="#" className="hover:text-primary transition-colors">Testimonials</Link></li>
                        <li><Link to="#" className="hover:text-primary transition-colors">FAQs</Link></li>
                        <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="section-label text-white border-b border-primary/30 pb-2 mb-8">VISIT US</h3>
                    <div className="text-gray-400 font-medium space-y-6">
                        <div className="flex gap-4">
                            <span className="text-primary">📍</span>
                            <p className="text-sm leading-relaxed">123 Spice Garden, <br />Hitech City, Hyderabad, 500081</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-primary">📞</span>
                            <p className="text-sm">+91 98765 43210</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-primary">✉️</span>
                            <p className="text-sm">hello@spicyworld.in</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black tracking-widest text-gray-500 uppercase">
                <p>© {new Date().getFullYear()} SpicyWorld. AUTHENTIC INDIAN TASTE.</p>
                <div className="flex gap-8">
                    <span>TERMS OF SERVICE</span>
                    <span>COOKIES</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
