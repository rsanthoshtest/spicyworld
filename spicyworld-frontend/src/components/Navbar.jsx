import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PLACE YOUR ORDER', path: '/menu' },
    { name: 'BOOK A TABLE', path: '/book-table' },
    { name: 'CATERING', path: '/catering' },
    { name: 'OUR STORY', path: '/our-story' },
    { name: 'CONTACT US', path: '/contact' },
    { name: 'TESTIMONIALS', path: '/testimonials' },
    { name: 'FAQS', path: '/faqs' },
  ];

  const isActive = (path) => location.pathname === path;
  const isHomePage = location.pathname === '/';
  const shouldBeSolid = scrolled || !isHomePage;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${shouldBeSolid ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="text-3xl"
          >
            🌶️
          </motion.div>
          <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${shouldBeSolid ? 'text-dark' : 'text-white'}`}>
            Spicy<span className="text-primary">World</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] font-black tracking-[0.1em] transition-all duration-300 hover:text-primary ${
                isActive(link.path) ? 'text-primary' : shouldBeSolid ? 'text-dark/80' : 'text-white/90'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <Link to="/cart" className="relative group p-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-300 ${shouldBeSolid ? 'text-dark' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          {/* User Profile */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className={`flex items-center gap-2 group`}>
                   <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/20 overflow-hidden">
                      {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name.charAt(0)}
                   </div>
                </Link>
                <button onClick={logout} className={`text-[10px] font-black tracking-widest px-4 py-2 rounded-full border transition-all ${shouldBeSolid ? 'border-dark/10 text-dark hover:bg-dark hover:text-white' : 'border-white/20 text-white hover:bg-white hover:text-dark'}`}>
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link to="/login" className={`text-[10px] font-black tracking-widest px-6 py-2.5 rounded-full border-2 transition-all ${shouldBeSolid ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'border-white text-white hover:bg-white hover:text-dark'}`}>
                LOGIN
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${shouldBeSolid ? 'bg-dark' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${shouldBeSolid ? 'bg-dark' : 'bg-white'} ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 transition-all ${shouldBeSolid ? 'bg-dark' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-black text-dark">Spicy<span className="text-primary">World</span></span>
              <button onClick={() => setIsOpen(false)} className="p-2 text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black text-dark hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-100" />
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="text-xl font-bold text-dark">MY PROFILE</Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="text-xl font-bold text-primary text-left">LOGOUT</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-xl font-bold text-primary">LOGIN / SIGNUP</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
