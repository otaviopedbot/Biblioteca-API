const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.route('/login')
    .get(UserController.login)

router.route('/register')
    .get(UserController.createUser)

router.route('/:id')
    .put(UserController.editUser)
    .get(UserController.showUser)
    .delete(UserController.deleteUser)

module.exports = router;