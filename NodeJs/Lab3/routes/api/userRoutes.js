const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../../controllers/userController");
const { validate } = require("../../middlewares/validate");
const { users: userValidation } = require("../../validations");

router.post("/", validate(userValidation.createUser), createUser);
router.get("/", validate(userValidation.getAllUsers), getAllUsers);
router.get("/:id", validate(userValidation.getUserById), getUserById);
router.patch("/:id", validate(userValidation.updateUser), updateUser);
router.delete("/:id", validate(userValidation.deleteUser), deleteUser);

module.exports = router;
