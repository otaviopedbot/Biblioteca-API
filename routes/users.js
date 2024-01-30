const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const checkToken = require('../middlewares/checkToken')

router.route('/login')
    .post(UserController.login)

router.route('/register')
    .post(UserController.createUser)

router.route('/')
    .get(UserController.index)

router.route('/:id')
    .put(checkToken, UserController.editUser)
    .get(checkToken, UserController.showUser)
    .delete(checkToken, UserController.deleteUser)

module.exports = router;