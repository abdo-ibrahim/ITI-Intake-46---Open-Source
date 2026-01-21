const User = require('../models/users');

const createUser = async (userData) => {
    const createdUser = await User.create(userData);
    return createdUser;
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


module.exports = { createUser, getAllUsers, getUserById, updateUserById, deleteUserById };