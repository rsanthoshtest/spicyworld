import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '', address: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signup(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark pt-20 pb-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2000" 
                    className="w-full h-full object-cover opacity-30 scale-105"
                    alt="Background" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark via-dark/90 to-transparent"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[540px] p-6 lg:p-0"
            >
                <div className="bg-white/95 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.4)] border border-white/20">
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-block text-3xl mb-4">🌶️</Link>
                        <h2 className="text-3xl font-black text-dark mb-2 tracking-tighter">Join the Family</h2>
                        <p className="text-[10px] font-black text-grayCustom tracking-[0.2em] uppercase">CREATE YOUR SPICYWORLD PROFILE</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-accent/10 text-accent p-4 rounded-2xl text-xs font-bold mb-8 border border-accent/20 flex items-center gap-3"
                        >
                            <span>⚠️</span> {error}
                        </motion.div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="group">
                                <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-2 block group-focus-within:text-primary transition-colors">FULL NAME</label>
                                <input 
                                    type="text" required
                                    placeholder="John Doe"
                                    className="w-full bg-bgCreme/50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:border-primary/50 focus:bg-white outline-none transition-all font-medium text-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="group">
                                <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-2 block group-focus-within:text-primary transition-colors">MOBILE</label>
                                <input 
                                    type="text" required
                                    placeholder="+91 00000 00000"
                                    className="w-full bg-bgCreme/50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:border-primary/50 focus:bg-white outline-none transition-all font-medium text-sm"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-2 block group-focus-within:text-primary transition-colors">EMAIL ADDRESS</label>
                            <input 
                                type="email" required
                                placeholder="name@example.com"
                                className="w-full bg-bgCreme/50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:border-primary/50 focus:bg-white outline-none transition-all font-medium text-sm"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-2 block group-focus-within:text-primary transition-colors">DELIVERY ADDRESS</label>
                            <textarea 
                                required
                                placeholder="Your full address for deliveries..."
                                className="w-full bg-bgCreme/50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:border-primary/50 focus:bg-white outline-none transition-all font-medium text-sm h-24 resize-none"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-2 block group-focus-within:text-primary transition-colors">PASSWORD</label>
                            <input 
                                type="password" required
                                placeholder="Create a secure password"
                                className="w-full bg-bgCreme/50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:border-primary/50 focus:bg-white outline-none transition-all font-medium text-sm"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full btn-premium btn-primary-red py-4 mt-4 shadow-xl disabled:opacity-50"
                        >
                             {loading ? 'CREATING PROFILE...' : 'BECOME A MEMBER'}
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-gray-50 text-center">
                        <p className="text-xs font-bold text-grayCustom">
                            ALREADY A SPICE LOVER? <Link to="/login" className="text-primary hover:underline ml-1">SIGN IN HERE</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
