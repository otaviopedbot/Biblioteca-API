const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const checkToken = require('../middlewares/checkToken')

router.route('/login')
    .post(UserController.login)

router.route('/register')
    .post(UserController.createUser)
<<<<<<< HEAD
=======

router.route('/')
    .get(UserController.index)
>>>>>>> 377baec5882eb7e322ab00100e67ca9964b8df64

router.route('/:id')
    .put(checkToken, UserController.editUser)
    .get(checkToken, UserController.showUser)
    .delete(checkToken, UserController.deleteUser)
<<<<<<< HEAD

router.route('/')
    .get(checkToken, UserController.index)
=======
>>>>>>> 377baec5882eb7e322ab00100e67ca9964b8df64

module.exports = router;