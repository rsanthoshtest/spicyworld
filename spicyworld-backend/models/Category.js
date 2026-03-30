const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    createdAt: { type: Date, default: Date.now }
});

// Auto-generate slug from name before saving
categorySchema.pre('save', function () {
    if (this.isModified('name')) {
        this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
    }
});

module.exports = mongoose.model('Category', categorySchema);
