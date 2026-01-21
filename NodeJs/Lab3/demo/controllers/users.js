const UserService = require('../services/users');
const APIError = require('../utils/APIError');


const createUser = async (req, res) => {
    const user = await UserService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", data: user })
}

const getAllUsers = async (req, res) => {
    const { users, pagenation } = await UserService.getAllUsers(req.query);

    res.status(200).json({ message: "Users fetched successfully", data: users, pagenation })
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    if (!user) {
        throw new APIError("User not found", 404);
    }
    res.status(200).json({ message: "User fetched successfully", data: user })
}


const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const updatedUser = await UserService.updateUserById(id, { name, email, age });
    if (!updatedUser) {
        throw new APIError("User not found", 404);
    }
    res.status(200).json({ message: "User updated successfully", data: updatedUser })
}


const deleteUserById = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await UserService.deleteUserById(id);
    if (!deletedUser) {
        throw new APIError("User not found", 404);
    }
    res.status(200).json({ message: "User deleted successfully" })
}


module.exports = { createUser, getAllUsers, getUserById, updateUserById, deleteUserById };