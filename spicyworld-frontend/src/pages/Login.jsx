import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000" 
                    className="w-full h-full object-cover opacity-40 scale-105"
                    alt="Background" 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/80 to-transparent"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[480px] p-1 scale-105 md:scale-100"
            >
                <div className="bg-white/95 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/20">
                    <div className="text-center mb-12">
                        <Link to="/" className="inline-block text-4xl mb-6">🌶️</Link>
                        <h2 className="text-3xl font-black text-dark mb-3 tracking-tighter">Welcome Back</h2>
                        <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">SIGN IN TO YOUR SPICYWORLD ACCOUNT</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-accent/10 text-accent p-4 rounded-2xl text-xs font-bold mb-8 border border-accent/20 flex items-center gap-3"
                        >
                            <span>⚠️</span> {error}
                        </motion.div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group">
                            <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-2 block transition-colors group-focus-within:text-primary">EMAIL ADDRESS</label>
                            <input 
                                type="email" 
                                required
                                placeholder="name@example.com"
                                className="w-full bg-bgCreme/50 border border-gray-100 rounded-2xl px-6 py-4 focus:border-primary/50 focus:bg-white outline-none transition-all font-medium"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="group">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase block transition-colors group-focus-within:text-primary">PASSWORD</label>
                                <Link to="#" className="text-[10px] font-black text-primary hover:underline">FORGOT?</Link>
                            </div>
                            <input 
                                type="password" 
                                required
                                placeholder="••••••••"
                                className="w-full bg-bgCreme/50 border border-gray-100 rounded-2xl px-6 py-4 focus:border-primary/50 focus:bg-white outline-none transition-all font-medium"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full btn-premium btn-primary-red py-4 mt-4 shadow-xl disabled:opacity-50"
                        >
                            {loading ? 'AUTHENTICATING...' : 'ACCESS ACCOUNT'}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-50 text-center">
                        <p className="text-sm font-bold text-grayCustom">
                            NEW TO THE HEAT? <Link to="/signup" className="text-primary hover:underline ml-1">JOIN SPICYWORLD</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
