import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        mobile: user?.mobile || '',
        address: user?.address || ''
    });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile(formData);
            setStatus('Profile successfully updated.');
            setTimeout(() => setStatus(''), 5000);
        } catch (err) {
            setStatus('Unable to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-bgCreme min-h-screen pt-32 pb-24 px-6 md:px-10">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16">
                    <span className="section-label">ACCOUNT MANAGEMENT</span>
                    <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tighter">Your Profile</h1>
                </header>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Profile Summary */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-80 flex-shrink-0"
                    >
                        <div className="bg-white p-10 rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 text-center">
                            <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl font-black mx-auto mb-6 border border-primary/20 shadow-inner">
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <h2 className="text-2xl font-black text-dark mb-1">{user?.name}</h2>
                            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-8">{user?.email}</p>
                            
                            <div className="pt-8 border-t border-gray-50 flex flex-col gap-3">
                                <div className="text-left bg-bgCreme p-4 rounded-2xl">
                                    <span className="text-[9px] font-black text-gray-400 tracking-widest block mb-1">MEMBERSHIP</span>
                                    <span className="text-sm font-black text-dark flex items-center gap-2">
                                        <span className="text-primary text-lg">★</span> SPICE ELITE
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Profile Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1"
                    >
                        <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.02)] border border-gray-50">
                            <h3 className="text-xl font-black text-dark mb-10 tracking-tight">Edit Information</h3>
                            
                            {status && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-2xl mb-10 text-xs font-black border flex items-center gap-3 ${
                                        status.includes('successfully') ? 'bg-green-50 border-green-100 text-green-600' : 'bg-accent/5 border-accent/10 text-accent'
                                    }`}
                                >
                                    <span>{status.includes('successfully') ? '✓' : '⚠️'}</span> {status}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="group">
                                    <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-2 block group-focus-within:text-primary transition-colors">FULL NAME</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-bgCreme/50 border border-gray-100 rounded-2xl px-6 py-4 focus:border-primary/50 focus:bg-white outline-none transition-all font-medium text-sm"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="group">
                                    <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-2 block group-focus-within:text-primary transition-colors">MOBILE NUMBER</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-bgCreme/50 border border-gray-100 rounded-2xl px-6 py-4 focus:border-primary/50 focus:bg-white outline-none transition-all font-medium text-sm"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                    />
                                </div>
                                <div className="group">
                                    <label className="text-[10px] font-black text-grayCustom tracking-widest uppercase mb-2 block group-focus-within:text-primary transition-colors">DEFAULT DELIVERY ADDRESS</label>
                                    <textarea 
                                        className="w-full bg-bgCreme/50 border border-gray-100 rounded-2xl px-6 py-4 focus:border-primary/50 focus:bg-white outline-none transition-all font-medium text-sm h-32 resize-none"
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="btn-premium btn-primary-red px-10 py-5 w-fit shadow-xl disabled:opacity-50"
                                >
                                    {loading ? 'SAVING CHANGES...' : 'UPDATE PROFILE'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
