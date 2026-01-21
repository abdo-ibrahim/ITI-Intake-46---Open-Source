const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../../controllers/userController");
const { validate } = require("../../middlewares/validate");
const authenticate = require("../../middlewares/authenticate");
const allowTo = require("../../middlewares/allowTo");
const { users: userSchema } = require("../../schemas");

router.get("/", authenticate, allowTo("admin"), validate(userSchema.getAllUsers), getAllUsers);
router.get("/:id", authenticate, allowTo("admin"), validate(userSchema.getUserById), getUserById);
router.patch("/:id", authenticate, allowTo("admin"), validate(userSchema.updateUser), updateUser);
router.delete("/:id", authenticate, allowTo("admin"), validate(userSchema.deleteUser), deleteUser);

module.exports = router;
