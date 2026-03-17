import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const faqs = [
    {
        question: "What are your opening hours?",
        answer: "We are open Monday through Sunday, from 11:00 AM to 11:00 PM. On weekends and public holidays, we extend our hours until midnight."
    },
    {
        question: "Do you offer takeaway or delivery?",
        answer: "Yes, we offer both! You can place a takeaway order directly through our website's Menu page. For delivery, we are partnered with all major food delivery apps including Zomato and Swiggy."
    },
    {
        question: "Do you provide catering services?",
        answer: "Absolutely. We provide bespoke catering services for weddings, corporate events, and private parties. Please visit our Catering page to request a customized quote."
    },
    {
        question: "How can I book a table in advance?",
        answer: "You can easily book a table via our 'Book a Table' page. We accept reservations up to a month in advance. For large groups (10+), please call us directly."
    },
    {
        question: "Are there vegan and gluten-free options available?",
        answer: "Yes, our menu features a wide variety of clearly marked vegetarian and vegan dishes. We can also accommodate gluten-free diets—just let your server know your dietary restrictions."
    },
    {
        question: "Is there parking available at the restaurant?",
        answer: "We offer complimentary valet parking for all our dine-in guests. There is also ample street parking available nearby."
    }
];

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="min-h-screen bg-bgCreme pt-32 pb-24 px-6 md:px-10 font-outfit">
            <div className="max-w-4xl mx-auto">
                
                <div className="text-center mb-16 flex flex-col items-center">
                    <span className="section-label">ASSISTANCE</span>
                    <h1 className="text-4xl md:text-6xl font-black text-dark mb-4 font-playfair">Frequently Asked Questions</h1>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="text-grayCustom max-w-2xl text-lg">Find quick answers to common questions about our menu, reservations, and services.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-sm border border-orange-50 overflow-hidden"
                        >
                            <button 
                                onClick={() => toggleFaq(index)}
                                className={`w-full text-left px-8 py-6 flex justify-between items-center transition-colors ${openIndex === index ? 'bg-orange-50/50' : 'hover:bg-gray-50'}`}
                            >
                                <h3 className={`font-bold font-playfair text-xl pr-8 ${openIndex === index ? 'text-primary' : 'text-dark'}`}>
                                    {faq.question}
                                </h3>
                                <span className={`text-2xl font-black transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                                    ↓
                                </span>
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-8 pb-6 text-grayCustom leading-relaxed border-t border-gray-50 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
                    <h3 className="text-2xl font-black font-playfair text-dark mb-2 relative z-10">Still have questions?</h3>
                    <p className="text-grayCustom mb-6 relative z-10">Can't find the answer you're looking for? Reach out to our team.</p>
                    <Link to="/contact" className="inline-block bg-primary text-white font-black tracking-widest uppercase px-10 py-4 rounded-full shadow-[0_10px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,107,0,0.5)] hover:-translate-y-1 transition-all relative z-10">
                        Contact Us
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default FAQs;
