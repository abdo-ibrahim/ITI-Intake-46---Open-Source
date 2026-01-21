const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' },
    age: { type: Number, required: true, min: 18, max: 150 },
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

// model
const User = mongoose.model('User', userSchema);


module.exports = User;