const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Create Order
router.post('/create', auth, async (req, res) => {
    try {
        const { items, totalPrice, paymentMethod, address, mobile } = req.body;
        const order = new Order({
            userId: req.user.id,
            items,
            totalPrice,
            paymentMethod,
            address,
            mobile
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get User Orders
router.get('/user', auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
