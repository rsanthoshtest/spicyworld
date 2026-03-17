require('dotenv').config();
const mongoose = require('mongoose');
const Food = require('./models/Food');

const imageMap = {
    // Biryanis
    'Hyderabadi Chicken Biryani': 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?auto=format&fit=crop&q=80&w=800',
    'Mutton Dum Biryani': 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=800',
    'Egg Biryani': 'https://images.unsplash.com/photo-1541535889989-1ea8bfb02535?auto=format&fit=crop&q=80&w=800',
    'Paneer Biryani': 'https://plus.unsplash.com/premium_photo-1694141252774-c93719b4cf0a?auto=format&fit=crop&q=80&w=800',
    // Dosas
    'Masala Dosa': 'https://images.unsplash.com/photo-1668231599388-db12cfa2f1c8?auto=format&fit=crop&q=80&w=800',
    'Plain Dosa': 'https://images.unsplash.com/photo-1610192842407-28d8ed2a033c?auto=format&fit=crop&q=80&w=800',
    'Onion Rava Dosa': 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?auto=format&fit=crop&q=80&w=800',
    'Mysore Masala Dosa': 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=800',
    // Idli
    'Steamed Idli': 'https://images.unsplash.com/photo-1630132890520-2c7009477b8d?auto=format&fit=crop&q=80&w=800',
    'Mini Ghee Idli': 'https://images.unsplash.com/photo-1626804475147-ba242337d1ff?auto=format&fit=crop&q=80&w=800',
    'Thatte Idli': 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?auto=format&fit=crop&q=80&w=800', // reused dosa variant for diversity if needed
    // Curries
    'Butter Chicken': 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800',
    'Paneer Tikka Masala': 'https://images.unsplash.com/photo-1565557612051-57b1dc59c44d?auto=format&fit=crop&q=80&w=800',
    'Mutton Rogan Josh': 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&q=80&w=800',
    'Chicken Chettinad': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
    // Street Food
    'Samosa Chaat': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    'Pani Puri': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800',
    'Vada Pav': 'https://images.unsplash.com/photo-1585244517333-e009d73fcde0?auto=format&fit=crop&q=80&w=800',
    // Drinks
    'Classic Sweet Lassi': 'https://plus.unsplash.com/premium_photo-1695297514332-9cb52baffdce?auto=format&fit=crop&q=80&w=800',
    'Mango Lassi': 'https://images.unsplash.com/photo-1546889895-cd2786bdf3b5?auto=format&fit=crop&q=80&w=800',
    'Masala Chai': 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=800',
    // Desserts
    'Gulab Jamun': 'https://plus.unsplash.com/premium_photo-1695297516590-7bd730f5cfdf?auto=format&fit=crop&q=80&w=800',
    'Rasmalai': 'https://images.unsplash.com/photo-1668231599388-db12cfa2f1c8?auto=format&fit=crop&q=80&w=800', // fallback reused
    'Gajar Ka Halwa': 'https://images.unsplash.com/photo-1605634691459-cd91faba2f12?auto=format&fit=crop&q=80&w=800',
};

// Generic Fallback
const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';

const fixImages = async () => {
    try {
        // Apply DNS fix for ECONNREFUSED issues as verified in test-db.js
        const dns = require('dns');
        dns.setDefaultResultOrder('ipv4first');
        dns.setServers(['8.8.8.8', '8.8.4.4']);

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });
        
        console.log("Connected to MongoDB. Starting image mapping fix...");
        
        const foods = await Food.find({});
        console.log(`Checking ${foods.length} foods...`);
        
        let updatedCount = 0;
        
        for (let food of foods) {
            let correctImage = imageMap[food.name];
            
            if (!correctImage) {
                // Heuristic matching
                if (food.name.toLowerCase().includes('dosa')) correctImage = imageMap['Masala Dosa'];
                else if (food.name.toLowerCase().includes('idli')) correctImage = imageMap['Steamed Idli'];
                else if (food.name.toLowerCase().includes('biryani')) correctImage = imageMap['Hyderabadi Chicken Biryani'];
                else if (food.name.toLowerCase().includes('chicken')) correctImage = imageMap['Butter Chicken'];
                else if (food.name.toLowerCase().includes('paneer')) correctImage = imageMap['Paneer Tikka Masala'];
                else correctImage = fallbackImage;
            }
            
            if (food.image !== correctImage) {
                food.image = correctImage;
                await food.save();
                console.log(`✓ Fixed image for: ${food.name}`);
                updatedCount++;
            }
        }
        
        console.log(`Update complete. ${updatedCount} out of ${foods.length} items modified.`);
        
    } catch (error) {
        console.error("Error fixing DB:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
};

fixImages();
