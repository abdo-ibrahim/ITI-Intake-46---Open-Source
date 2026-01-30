const util = require('util');
const User = require('../models/users');
const APIError = require('../utils/APIError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSign = util.promisify(jwt.sign);


const signUp = async (userData) => {
    const { email, password } = userData;
    // verfiy email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new APIError("User already exists", 400);
    }

    // extract plain password and hash it
    const hashedPassword = await bcrypt.hash(password, 12);


    // create user with hashed password
    const user = await User.create({ ...userData, password: hashedPassword });
    return user;
}


const signIn = async ({ email, password }) => {
    // find user by email
    const user = await User.findOne({ email }, { createdAt: 0, updatedAt: 0, __v: 0 });

    if (!user) {
        throw new APIError("Invalid email or password", 401);
    }

    // compare hashed password with the plain password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new APIError("Invalid email or password", 401);
    }

    const payload = {
        userId: user._id,
        role: user.role
    }

    // generate token 
    const token = await jwtSign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, user: { ...user.toObject(), password: undefined } };

}



const getAllUsers = async (query) => {
    let { page, limit } = query;
    page = Number(page);
    limit = Number(limit);
    const usersPromise = User.find({}, { password: 0 }).skip((page - 1) * limit).limit(limit);
    const totalPromise = User.countDocuments();
    const [users, total] = await Promise.all([usersPromise, totalPromise]);
    const pagenation = {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    }
    return { users, pagenation };
}



const getUserById = async (id) => {
    const user = await User.findOne({ _id: id }, { password: 0 });
    if (!user) {
        return null;
    }
    return user;
}


const updateUserById = async (id, userData) => {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, userData, { new: true });
    if (!updatedUser) {
        return null;
    }
    return updatedUser;
}


const deleteUserById = async (id) => {
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) {
        return null;
    }
    return deletedUser;
}


module.exports = { signUp, getAllUsers, getUserById, updateUserById, deleteUserById, signIn };
