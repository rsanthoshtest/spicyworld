/**
 * SpicyWorld Admin Setup Script
 * 
 * This script promotes an existing user to admin role.
 * Usage: node make-admin.js <email>
 * Example: node make-admin.js admin@spicyworld.com
 */

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Category = require('./models/Category');

const email = process.argv[2];

const DEFAULT_CATEGORIES = [
    'Biryani', 'Dosa', 'Idli', 'Rice', 'Curries',
    'Street Food', 'Snacks', 'Drinks', 'Desserts'
];

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log('✓ Connected to MongoDB');

        // Promote user to admin
        if (email) {
            const user = await User.findOneAndUpdate(
                { email },
                { role: 'admin' },
                { new: true }
            );
            if (user) {
                console.log(`✓ Promoted "${user.name}" (${email}) to admin role.`);
            } else {
                console.log(`✗ No user found with email: ${email}`);
            }
        } else {
            console.log('⚠️  No email provided. Skipping user promotion.');
            console.log('   Usage: node make-admin.js <email>');
        }

        // Seed default categories if not present
        let seeded = 0;
        for (const name of DEFAULT_CATEGORIES) {
            const slug = name.toLowerCase().replace(/\s+/g, '-');
            const exists = await Category.findOne({ slug });
            if (!exists) {
                await Category.create({ name, slug });
                seeded++;
            }
        }
        if (seeded > 0) console.log(`✓ Seeded ${seeded} default categories.`);
        else console.log('✓ All default categories already exist.');

        console.log('\n🎉 Admin setup complete!');
        process.exit(0);
    } catch (err) {
        console.error('✗ Setup failed:', err.message);
        process.exit(1);
    }
}

run();
