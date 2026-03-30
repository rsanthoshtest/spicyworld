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

            {/* Back to Home Link */}
            <Link to="/" className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors z-30 font-black tracking-widest text-xs uppercase bg-dark/40 px-5 py-2.5 rounded-full backdrop-blur-xl border border-white/10 hover:bg-dark/60 hover:scale-105 active:scale-95 duration-300">
                <span className="text-lg leading-none mb-0.5">←</span> RETURN
            </Link>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[480px] p-4 scale-100"
            >
                {/* Premium Glassmorphism Card */}
                <div className="bg-white/90 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-white/40 relative overflow-hidden">
                    
                    {/* Subtle inner top highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                    <div className="text-center mb-12 relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl mb-6 shadow-lg shadow-orange-500/10 border border-orange-200/50">
                            <span className="text-3xl drop-shadow-sm">🌶️</span>
                        </div>
                        <h2 className="text-3xl font-black text-dark mb-3 tracking-tighter">Welcome Back</h2>
                        <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">SIGN IN TO YOUR SPICYWORLD ACCOUNT</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, x: [-10, 10, -10, 10, 0] }}
                            transition={{ duration: 0.4 }}
                            className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold mb-8 border border-red-100 flex items-center gap-3 shadow-sm"
                        >
                            <span className="text-base">⚠️</span> {error}
                        </motion.div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="group">
                            <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-2 block transition-colors group-focus-within:text-primary">EMAIL ADDRESS</label>
                            <input 
                                type="email" 
                                required
                                placeholder="name@example.com"
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-6 py-4 focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(245,124,0,0.1)] outline-none transition-all font-medium text-dark"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="group">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase block transition-colors group-focus-within:text-primary">PASSWORD</label>
                                <Link to="#" className="text-[10px] font-black text-primary hover:underline hover:text-dark transition-colors">FORGOT?</Link>
                            </div>
                            <input 
                                type="password" 
                                required
                                placeholder="••••••••"
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-6 py-4 focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(245,124,0,0.1)] outline-none transition-all font-medium text-dark"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-primary hover:bg-orange-600 text-white font-black tracking-widest uppercase py-4 rounded-xl mt-4 shadow-[0_10px_30px_rgba(245,124,0,0.3)] hover:shadow-[0_15px_40px_rgba(245,124,0,0.4)] disabled:opacity-60 disabled:shadow-none transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>AUTHENTICATING</span>
                                </>
                            ) : (
                                <>
                                    <span className="relative z-10">ACCESS ACCOUNT</span>
                                    {/* Subtle hover sweep effect */}
                                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-out z-0"></div>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-100 text-center relative z-10">
                        <p className="text-[11px] font-black text-grayCustom tracking-wider bg-white/50 inline-block px-4 py-1 rounded-full border border-gray-100">
                            NEW TO THE HEAT? <Link to="/signup" className="text-primary hover:underline hover:text-dark ml-1 transition-colors">JOIN SPICYWORLD</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
