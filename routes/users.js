const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.route('/')
    .get(UserController.index)

router.route('/:id')
    .put(UserController.editUser)
    .get(UserController.showUser)
    .delete(UserController.deleteUser)

module.exports = router;