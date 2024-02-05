const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const checkToken = require('../middlewares/checkToken')

router.route('/login')
    .post(UserController.login)

router.route('/register')
    .post(UserController.createUser)

router.route('/:id')
    .put(checkToken, UserController.editUser)
    .get(checkToken, UserController.showUser)
    .delete(checkToken, UserController.deleteUser)

router.route('/search/:username')
    .get(UserController.showUserByUsername)

router.route('/')
    .get(checkToken, UserController.index)

module.exports = router;