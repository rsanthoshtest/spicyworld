import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Food Blogger",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        text: "The Hyderabadi Biryani here is unparalleled. Every grain of rice is infused with rich, authentic spices. It truly feels like a meal straight from a royal kitchen."
    },
    {
        name: "Rahul Desai",
        role: "Regular Customer",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        text: "I booked SpicyWorld for my daughter's wedding catering, and the guests couldn't stop praising the food. Exceptional service and breathtaking taste!"
    },
    {
        name: "Sarah Jenkins",
        role: "Local Guide",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
        rating: 4,
        text: "A fantastic ambiance matched by equally impressive food. The garlic naan and butter chicken combo is a must-try. Just incredibly delicious."
    },
    {
        name: "Amit Patel",
        role: "Spice Enthusiast",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        text: "Finally, a restaurant that understands how to balance heat and flavor perfectly! The fiery vindaloo was amazing and kept me coming back for more."
    },
    {
        name: "Neha Gupta",
        role: "Event Planner",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        text: "Their attention to detail, both in plating and taste, is what sets SpicyWorld apart. It is always my top recommendation for premium dining experiences."
    },
    {
        name: "James Wilson",
        role: "First Time Visitor",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        text: "I was blown away by the hospitality and the exquisite flavors. The tandoori platter is arguably the best I've ever had outside of India."
    }
];

const Testimonials = () => {
    return (
        <div className="min-h-screen bg-bgCreme pt-32 pb-24 px-6 md:px-10 font-outfit">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 flex flex-col items-center">
                    <span className="section-label">GUEST REVIEWS</span>
                    <h1 className="text-4xl md:text-6xl font-black text-dark mb-4 font-playfair">What People Say</h1>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="text-grayCustom max-w-2xl text-lg">Don't just take our word for it. Read what our beloved patrons have to say about their SpicyWorld experience.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((review, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative group hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="absolute top-6 right-8 text-6xl text-orange-100 font-playfair leading-none group-hover:text-primary/20 transition-colors">"</div>
                            
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} className={`text-xl ${index < review.rating ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                                ))}
                            </div>
                            
                            <p className="text-gray-600 text-lg mb-8 italic relative z-10 line-clamp-4 min-h-[110px]">
                                "{review.text}"
                            </p>
                            
                            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                                <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
                                <div>
                                    <h4 className="font-bold text-dark font-playfair text-lg">{review.name}</h4>
                                    <p className="text-sm text-primary font-medium">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <button className="bg-dark text-white font-black px-10 py-4 rounded-full uppercase tracking-widest hover:bg-primary transition-colors shadow-lg shadow-black/10">
                        Leave a Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
