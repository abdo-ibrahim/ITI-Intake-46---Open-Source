const express = require('express');
const usersController = require('../controllers/users');
const schemas = require('../schemas');
const validate = require('../middlewares/validate');

const router = express.Router();


// create user
router.post('/', validate(schemas.createUserSchema), usersController.createUser);

// get all users
router.get('/', validate(schemas.getAllUsersSchema), usersController.getAllUsers);


// get user by id
router.get('/:id', usersController.getUserById);

// update user by id
router.patch('/:id', validate(schemas.updateUserSchema), usersController.updateUserById);


// delete user by id
router.delete('/:id', usersController.deleteUserById);


module.exports = router;