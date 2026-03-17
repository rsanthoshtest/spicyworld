const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Cash on Delivery', 'UPI'], default: 'Cash on Delivery' },
    orderStatus: { type: String, enum: ['Pending', 'Processing', 'Out for Delivery', 'Delivered'], default: 'Pending' },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
