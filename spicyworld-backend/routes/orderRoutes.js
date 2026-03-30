const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const { sendOrderConfirmationEmail } = require('../utils/sendEmail');

// Create Order
router.post('/create', auth, async (req, res) => {
    try {
        const { items, totalPrice, paymentMethod, address, mobile, email } = req.body;
        const order = new Order({
            userId: req.user.id,
            items,
            totalPrice,
            paymentMethod,
            address,
            mobile
        });
        await order.save();

        // Send confirmation email (async non-blocking)
        const recipientEmail = email || req.user.email;
        if (recipientEmail) {
            sendOrderConfirmationEmail(order, recipientEmail).catch(err => 
                console.error("Email trigger failed:", err)
            );
        }

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get User Orders
router.get('/user', auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
            .populate('items.foodId', 'image')
            .sort({ createdAt: -1 });
        
        // Ensure image fallback
        const formattedOrders = orders.map(order => {
            const orderObj = order.toObject();
            orderObj.items = orderObj.items.map(item => ({
                ...item,
                image: item.image || item.foodId?.image
            }));
            return orderObj;
        });
        
        res.json(formattedOrders);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get Order by ID
router.get('/:id', auth, async (req, res) => {
    console.log("🎯 Fetching Order by ID:", req.params.id, "for User:", req.user.id);
    try {
        const order = await Order.findOne({ _id: req.params.id, userId: req.user.id })
            .populate('items.foodId', 'image');
            
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const orderObj = order.toObject();
        orderObj.items = orderObj.items.map(item => ({
            ...item,
            image: item.image || item.foodId?.image
        }));

        res.json(orderObj);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
