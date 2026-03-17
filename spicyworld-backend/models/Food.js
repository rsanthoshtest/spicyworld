const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    isVeg: { type: Boolean, required: true },
    rating: { type: Number, default: 0 },
    spicyLevel: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, required: true },
    isChefSpecial: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    ingredients: [{ type: String }]
});

module.exports = mongoose.model('Food', foodSchema);
