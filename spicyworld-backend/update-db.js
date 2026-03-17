require('dotenv').config();
const mongoose = require('mongoose');
const Food = require('./models/Food');

const updateFoods = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });
        
        console.log("Connected to MongoDB. Starting update...");
        
        const foods = await Food.find({});
        console.log(`Found ${foods.length} foods. Upgrading documents...`);
        
        let updatedCount = 0;
        
        for (let food of foods) {
            let changed = false;
            
            // Assign realistic random rating between 4.0 and 5.0 if not already set or if it's 0
            if (!food.rating || food.rating === 0) {
                food.rating = Number((Math.random() * (5.0 - 4.0) + 4.0).toFixed(1));
                changed = true;
            }
            
            // Assign Chef's Special (roughly 15% chance, or guarantee for specific high-end items)
            if (food.isChefSpecial === undefined) {
                const specialNames = ['Hyderabadi Chicken Biryani', 'Mutton Dum Biryani', 'Paneer Tikka Masala', 'Butter Chicken', 'Masala Dosa'];
                if (specialNames.includes(food.name) || Math.random() < 0.15) {
                    food.isChefSpecial = true;
                } else {
                    food.isChefSpecial = false;
                }
                changed = true;
            }
            
            if (changed) {
                await food.save();
                updatedCount++;
            }
        }
        
        console.log(`Update complete. ${updatedCount} foods were updated with new schema fields.`);
        
    } catch (error) {
        console.error("Error updating DB:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
};

updateFoods();
