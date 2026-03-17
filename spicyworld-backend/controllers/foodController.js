const mongoose = require('mongoose');
const Food = require('../models/Food');

// Get all food items
exports.getAllFood = async (req, res) => {
    console.log('--- GET /api/foods requested ---');
    const start = Date.now();
    try {
        // Check if DB is connected
        if (mongoose.connection.readyState !== 1) {
            console.log('✗ DB Not ready. State:', mongoose.connection.readyState);
            return res.status(503).json({ 
                message: 'Database is warming up or unreachable', 
                error: 'Service Unavailable' 
            });
        }
        
        console.log('Querying Food.find()...');
        const foods = await Food.find().maxTimeMS(5000); // Add a query-level timeout
        console.log(`✓ Query complete. Found ${foods.length} items in ${Date.now() - start}ms`);
        res.json(foods);
    } catch (err) {
        console.error(`✗ Error in getAllFood after ${Date.now() - start}ms:`, err.message);
        res.status(500).json({ message: 'Internal server error while fetching food items', error: err.message });
    }
};

// Auto-seed if DB is empty
exports.autoSeedIfEmpty = async () => {
    try {
        const count = await Food.countDocuments();
        if (count > 0) return console.log(`✓ Food DB already has ${count} items.`);
        
        const foods = [
            // ---- BIRYANI ----
            {
                name: "Hyderabadi Chicken Biryani",
                category: "Biryani",
                price: 350,
                image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=800",
                isVeg: false, rating: 4.8, spicyLevel: 4,
                description: "Authentic Hyderabadi dum biryani with succulent chicken and aromatic basmati rice.",
                isChefSpecial: true, isBestseller: true,
                ingredients: ["Chicken", "Basmati Rice", "Yogurt", "Ghee", "Saffron", "Fried Onions", "Mint Leaves", "Biryani Spices"]
            },
            {
                name: "Mutton Dum Biryani",
                category: "Biryani",
                price: 450,
                image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
                isVeg: false, rating: 4.9, spicyLevel: 5,
                description: "Slow-cooked tender mutton sealed in a pot over fragrant basmati rice.",
                isBestseller: true,
                ingredients: ["Mutton", "Basmati Rice", "Ghee", "Yogurt", "Saffron", "Rose Water", "Cardamom", "Cloves"]
            },
            {
                name: "Paneer Biryani",
                category: "Biryani",
                price: 300,
                image: "https://plus.unsplash.com/premium_photo-1694608354674-51ce61ec009d?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.5, spicyLevel: 3,
                description: "Fragrant vegetarian biryani loaded with spiced paneer and fresh herbs.",
                ingredients: ["Paneer Cubes", "Basmati Rice", "Peas", "Carrots", "Mint", "Coriander", "Ghee", "Garam Masala"]
            },
            {
                name: "Egg Biryani",
                category: "Biryani",
                price: 220,
                image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800",
                isVeg: false, rating: 4.3, spicyLevel: 3,
                description: "Classic dum biryani with perfectly boiled masala eggs layered in fragrant rice.",
                ingredients: ["Boiled Eggs", "Basmati Rice", "Onions", "Tomatoes", "Ginger-Garlic Paste", "Biryani Masala"]
            },
            // ---- DOSA ----
            {
                name: "Masala Dosa",
                category: "Dosa",
                price: 120,
                image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.7, spicyLevel: 2,
                description: "Crispy golden dosa with a spiced potato filling served with chutneys & sambar.",
                isBestseller: true,
                ingredients: ["Rice-Lentil Batter", "Potatoes", "Onions", "Mustard Seeds", "Turmeric", "Curry Leaves"]
            },
            {
                name: "Mysore Masala Dosa",
                category: "Dosa",
                price: 140,
                image: "https://images.unsplash.com/photo-1668236543090-e2609095bb18?auto=format&fit=crop&q=80&w=800", // using different dosa img
                isVeg: true, rating: 4.6, spicyLevel: 4,
                description: "Spicy red chutney base with potato masala in a perfectly crispy dosa.",
                isChefSpecial: true,
                ingredients: ["Rice-Lentil Batter", "Spicy Red Garlic Chutney", "Potato Masala", "Ghee", "Coconut Chutney"]
            },
            {
                name: "Ghee Roast Dosa",
                category: "Dosa",
                price: 160,
                image: "https://images.unsplash.com/photo-1630383249896-424e482df721?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.8, spicyLevel: 2,
                description: "Rich, buttery dosa roasted to perfection in clarified butter. Crispy heaven!",
                ingredients: ["Rice-Lentil Batter", "Pure Ghee", "Sambar", "Coconut Chutney", "Tomato Chutney"]
            },
            {
                name: "Paneer Dosa",
                category: "Dosa",
                price: 180,
                image: "https://plus.unsplash.com/premium_photo-1694608354674-51ce61ec009e?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.4, spicyLevel: 3,
                description: "Stuffed with a spiced paneer filling, wrapped in a crispy golden crepe.",
                ingredients: ["Rice-Lentil Batter", "Grated Paneer", "Onions", "Green Chillies", "Garam Masala"]
            },
            // ---- IDLI ----
            {
                name: "Idli Sambar",
                category: "Idli",
                price: 80,
                image: "https://images.unsplash.com/photo-1549488344-c1eaab08bd2f?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.3, spicyLevel: 1,
                description: "Soft steamed rice cakes with a bowl of rich lentil sambar and chutneys.",
                isBestseller: true,
                ingredients: ["Steamed Rice-Lentil Cakes", "Toor Dal", "Vegetables", "Tamarind", "Sambar Powder"]
            },
            {
                name: "Ghee Podi Idli",
                category: "Idli",
                price: 110,
                image: "https://images.unsplash.com/photo-1627308595229-7830f5c9c66e?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.6, spicyLevel: 4,
                description: "Steamed idlis tossed in melted ghee and fiery gunpowder spice mix.",
                ingredients: ["Mini Idlis", "Ghee", "Gunpowder (Podi masala)", "Sesame Oil", "Curry Leaves"]
            },
            {
                name: "Mini Idli",
                category: "Idli",
                price: 90,
                image: "https://plus.unsplash.com/premium_photo-1661335359781-a7b2184f04d4?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.2, spicyLevel: 1,
                description: "Adorable bite-sized idlis served with a flavorful sambar dip.",
                ingredients: ["Mini Rice-Lentil Cakes", "Sambar", "Coconut Chutney"]
            },
            // ---- RICE ----
            {
                name: "Curd Rice",
                category: "Rice",
                price: 100,
                image: "https://images.unsplash.com/photo-1516714435131-44321287900b?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.1, spicyLevel: 1,
                description: "Cooling, mildly seasoned South Indian yogurt rice with a tempering of mustard seeds.",
                ingredients: ["Soft Cooked Rice", "Yogurt", "Milk", "Mustard Seeds", "Curry Leaves", "Pomegranate Seeds", "Green Chillies"]
            },
            {
                name: "Lemon Rice",
                category: "Rice",
                price: 110,
                image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.3, spicyLevel: 2,
                description: "Tangy South Indian rice tempered with mustard, turmeric and curry leaves.",
                ingredients: ["Cooked Rice", "Lemon Juice", "Peanuts", "Turmeric", "Mustard Seeds", "Curry Leaves"]
            },
            {
                name: "Tamarind Rice",
                category: "Rice",
                price: 110,
                image: "https://plus.unsplash.com/premium_photo-1694608354675-51ce61ec009d?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.4, spicyLevel: 3,
                description: "Tangy, spicy rice cooked with tamarind paste and a blend of South Indian spices.",
                ingredients: ["Cooked Rice", "Tamarind Pulp", "Peanuts", "Sesame Oil", "Red Chillies", "Chana Dal"]
            },
            // ---- CURRIES ----
            {
                name: "Butter Chicken",
                category: "Curries",
                price: 320,
                image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
                isVeg: false, rating: 4.8, spicyLevel: 2,
                description: "The classic North-Indian creamy tomato butter chicken that everyone loves.",
                isBestseller: true,
                ingredients: ["Tandoori Chicken Tikka", "Tomato Puree", "Cream", "Butter", "Kasuri Methi", "Cashew Paste"]
            },
            {
                name: "Chicken Chettinad",
                category: "Curries",
                price: 340,
                image: "https://images.unsplash.com/photo-1585232351009-aa87c33391cd?auto=format&fit=crop&q=80&w=800",
                isVeg: false, rating: 4.9, spicyLevel: 5,
                description: "Fiery and aromatic Chettinad style chicken with freshly ground masala.",
                isChefSpecial: true,
                ingredients: ["Chicken", "Fresh Coconut", "Fennel Seeds", "Black Pepper", "Star Anise", "Curry Leaves"]
            },
            {
                name: "Paneer Butter Masala",
                category: "Curries",
                price: 280,
                image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.7, spicyLevel: 2,
                description: "Creamy tomato gravy with soft cubes of cottage cheese and rich butter.",
                isBestseller: true,
                ingredients: ["Paneer Cubes", "Tomato Puree", "Butter", "Cream", "Cashew Paste", "Garam Masala"]
            },
            {
                name: "Kadai Chicken",
                category: "Curries",
                price: 300,
                image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800",
                isVeg: false, rating: 4.6, spicyLevel: 4,
                description: "Rustic iron wok chicken curry with bell peppers and freshly pounded spices.",
                ingredients: ["Chicken", "Bell Peppers", "Onions", "Tomatoes", "Coriander Seeds", "Dry Red Chillies"]
            },
            // ---- STREET FOOD ----
            {
                name: "Pani Puri",
                category: "Street Food",
                price: 60,
                image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.9, spicyLevel: 4,
                description: "The king of Indian street food! Crispy hollow puris with sweet and spicy water.",
                isBestseller: true,
                ingredients: ["Semolina Puris", "Spiced Mint-Coriander Water", "Tamarind Chutney", "Mashed Potatoes", "Boiled Chickpeas"]
            },
            {
                name: "Samosa",
                category: "Street Food",
                price: 40,
                image: "https://images.unsplash.com/photo-1601050690117-94f5f6bdcd40?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.7, spicyLevel: 2,
                description: "Golden deep-fried pastry stuffed with spiced potatoes and peas.",
                ingredients: ["Flour Pastry", "Mashed Potatoes", "Green Peas", "Coriander Seeds", "Amchur (Mango Powder)", "Garam Masala"]
            },
            {
                name: "Vada Pav",
                category: "Street Food",
                price: 50,
                image: "https://plus.unsplash.com/premium_photo-1694608354676-51ce61ec009d?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.8, spicyLevel: 3,
                description: "Mumbai's iconic street burger: spiced potato fritter in a soft bun with chutneys.",
                isBestseller: true,
                ingredients: ["Pav (Bread Bun)", "Deep-fried Potato Patty", "Dry Garlic Chutney", "Green Chutney", "Fried Green Chilli"]
            },
            {
                name: "Chilli Paneer",
                category: "Street Food",
                price: 220,
                image: "https://images.unsplash.com/photo-1626132647523-66e6bc052b6a?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.6, spicyLevel: 5,
                description: "Indo-Chinese fusion with crispy paneer tossed in a fiery chilli-soy sauce.",
                ingredients: ["Fried Paneer Cubes", "Bell Peppers", "Onions", "Soy Sauce", "Green Chilli Sauce", "Garlic", "Spring Onions"]
            },
            // ---- SNACKS ----
            {
                name: "Medu Vada",
                category: "Snacks",
                price: 80,
                image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.5, spicyLevel: 2,
                description: "Crispy deep-fried savory doughnuts made from black gram lentils.",
                ingredients: ["Urad Dal Batter", "Green Chillies", "Ginger", "Curry Leaves", "Black Peppercorns", "Coconut Chutney"]
            },
            {
                name: "Onion Pakoda",
                category: "Snacks",
                price: 70,
                image: "https://plus.unsplash.com/premium_photo-1694608354677-51ce61ec009d?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.4, spicyLevel: 3,
                description: "Crunchy onion fritters made with spiced chickpea batter. Perfect monsoon snack.",
                ingredients: ["Sliced Onions", "Gram Flour (Besan)", "Rice Flour", "Ajwain (Carom Seeds)", "Green Chillies", "Curry Leaves"]
            },
            {
                name: "Paneer Pakoda",
                category: "Snacks",
                price: 130,
                image: "https://plus.unsplash.com/premium_photo-1694608354678-51ce61ec009e?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.6, spicyLevel: 2,
                description: "Soft paneer cubes dipped in spiced chickpea batter and deep fried to golden perfection.",
                ingredients: ["Paneer Cubes", "Gram Flour (Besan)", "Ajwain", "Turmeric", "Chaat Masala", "Mint Chutney"]
            },
            // ---- DRINKS ----
            {
                name: "Filter Coffee",
                category: "Drinks",
                price: 60,
                image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.8, spicyLevel: 1,
                description: "Frothy South Indian filter coffee with strong decoction and full-fat milk.",
                isBestseller: true,
                ingredients: ["Coffee Decoction", "Chicory", "Full-fat Milk", "Sugar"]
            },
            {
                name: "Masala Chai",
                category: "Drinks",
                price: 40,
                image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.7, spicyLevel: 2,
                description: "Traditional Indian spiced tea brewed with ginger, cardamom and cinnamon.",
                isBestseller: true,
                ingredients: ["Tea Leaves", "Milk", "Fresh Ginger", "Cardamom", "Cinnamon", "Cloves"]
            },
            {
                name: "Mango Lassi",
                category: "Drinks",
                price: 90,
                image: "https://images.unsplash.com/photo-1528750849500-1b203a9856a9?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.6, spicyLevel: 1,
                description: "Sweet and refreshing yogurt-based drink blended with fresh Alphonso mango pulp.",
                isBestseller: true,
                ingredients: ["Yogurt", "Alphonso Mango Pulp", "Sugar", "Cardamom Powder", "Pistachio Garnish"]
            },
            {
                name: "Sweet Lassi",
                category: "Drinks",
                price: 70,
                image: "https://plus.unsplash.com/premium_photo-1694608354679-51ce61ec009d?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.4, spicyLevel: 1,
                description: "Chilled, creamy blended yogurt drink sweetened with sugar and rose water.",
                ingredients: ["Yogurt", "Milk", "Sugar", "Rose Water", "Malai (Cream)"]
            },
            // ---- DESSERTS ----
            {
                name: "Gulab Jamun",
                category: "Desserts",
                price: 70,
                image: "https://images.unsplash.com/photo-1594179047519-f34a311b6f0e?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.8, spicyLevel: 1,
                description: "Melt-in-mouth milk solid balls soaked in warm cardamom-rose sugar syrup.",
                isBestseller: true,
                ingredients: ["Khoya (Milk Solids)", "Maida (Flour)", "Sugar Syrup", "Cardamom", "Rose Water", "Ghee"]
            },
            {
                name: "Rasmalai",
                category: "Desserts",
                price: 90,
                image: "https://images.unsplash.com/photo-1631452180493-272e2cf83f5c?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.9, spicyLevel: 1,
                description: "Silky cottage cheese discs soaked in saffron and cardamom flavored milk.",
                isChefSpecial: true,
                ingredients: ["Chenna (Soft Paneer)", "Thickened Milk", "Saffron", "Cardamom", "Pistachios", "Almonds"]
            },
            {
                name: "Carrot Halwa",
                category: "Desserts",
                price: 80,
                image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.7, spicyLevel: 1,
                description: "Slow-cooked grated carrots in milk and ghee with cashews and cardamom.",
                ingredients: ["Grated Carrots", "Full-fat Milk", "Ghee", "Sugar", "Cashews", "Raisins", "Cardamom Powder"]
            },
            {
                name: "Kesari",
                category: "Desserts",
                price: 60,
                image: "https://plus.unsplash.com/premium_photo-1694608354680-51ce61ec009d?auto=format&fit=crop&q=80&w=800",
                isVeg: true, rating: 4.5, spicyLevel: 1,
                description: "South Indian semolina pudding with saffron, ghee, and cashews.",
                ingredients: ["Rava (Semolina)", "Sugar", "Ghee", "Saffron", "Cashews", "Raisins"]
            },
        ];

        await Food.insertMany(foods);
        console.log(`✓ Seeded ${foods.length} food items into DB.`);
    } catch (err) {
        console.error('Food seed error:', err.message);
    }
};

// Manual seed endpoint (for POST /api/foods/seed)
exports.seedFood = async (req, res) => {
    try {
        await Food.deleteMany();
        await exports.autoSeedIfEmpty();
        const count = await Food.countDocuments();
        res.json({ message: `Seeded ${count} food items successfully.` });
    } catch (err) {
        res.status(500).json({ message: 'Seed error', error: err.message });
    }
};
