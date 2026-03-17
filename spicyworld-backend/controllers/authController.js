const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.signup = async (req, res) => {
    try {
        const { name, email, mobile, password, address } = req.body;
        
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ name, email, mobile, password, address });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.status(201).json({ token, user: { id: user._id, name, email, mobile, address } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email, mobile: user.mobile, address: user.address } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, mobile, address } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { name, mobile, address }, { new: true });
        res.json({ user: { id: user._id, name, email: user.email, mobile, address } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
