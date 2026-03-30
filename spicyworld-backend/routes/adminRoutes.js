const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const Food = require('../models/Food');
const Order = require('../models/Order');
const Category = require('../models/Category');
const User = require('../models/User');

// ─── STATS ─────────────────────────────────────────────────────────────────
router.get('/stats', adminAuth, async (req, res) => {
    try {
        const totalFoods = await Food.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments({ role: 'user' });
        const revenueData = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);
        const totalRevenue = revenueData[0]?.total || 0;
        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('userId', 'name email');
        res.json({ totalFoods, totalOrders, totalUsers, totalRevenue, recentOrders });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ─── FOODS ─────────────────────────────────────────────────────────────────
router.get('/foods', adminAuth, async (req, res) => {
    try {
        const foods = await Food.find().sort({ name: 1 });
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/foods', adminAuth, async (req, res) => {
    try {
        const { name, category, price, image, isVeg, rating, spicyLevel, description, isChefSpecial, isBestseller, ingredients, isAvailable } = req.body;
        if (!name || !category || !price || !image || isVeg === undefined || !spicyLevel || !description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const food = new Food({ name, category, price, image, isVeg, rating, spicyLevel, description, isChefSpecial, isBestseller, ingredients, isAvailable });
        await food.save();
        res.status(201).json(food);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.put('/foods/:id', adminAuth, async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!food) return res.status(404).json({ message: 'Food not found' });
        res.json(food);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.delete('/foods/:id', adminAuth, async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food not found' });
        res.json({ message: 'Food deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ─── CATEGORIES ────────────────────────────────────────────────────────────
router.get('/categories', adminAuth, async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/categories', adminAuth, async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Category name is required' });
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        const exists = await Category.findOne({ slug });
        if (exists) return res.status(400).json({ message: 'Category already exists' });
        const category = new Category({ name, slug });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.put('/categories/:id', adminAuth, async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Category name is required' });
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        const category = await Category.findByIdAndUpdate(req.params.id, { name, slug }, { new: true });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.delete('/categories/:id', adminAuth, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ─── ORDERS ────────────────────────────────────────────────────────────────
router.get('/orders', adminAuth, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).populate('userId', 'name email mobile');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.put('/orders/:id/status', adminAuth, async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const allowed = ['Pending', 'Processing', 'Out for Delivery', 'Delivered'];
        if (!allowed.includes(orderStatus)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }
        const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ─── USERS ─────────────────────────────────────────────────────────────────
router.get('/users', adminAuth, async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
