"use client";

import { motion } from "framer-motion";

export default function FloatingActions() {
    return (
        <div className="fixed bottom-8 right-8 z-40 flex flex-col space-y-4">
            {/* WhatsApp Button */}
            <motion.a
                href="https://wa.me/441273933933"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#128C7E] transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
            </motion.a>

            {/* Cart Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-accent transition-colors relative"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <span className="absolute top-0 right-0 bg-white text-primary text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-primary">
                    0
                </span>
            </motion.button>
        </div>
    );
}
