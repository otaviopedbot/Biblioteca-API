const express = require('express');
const router = express.Router();
const UserDetailsController = require('../controllers/UserDetailsController');

router.route('/')
    // .get(UserDetailsController.index)

router.route('/:id')
    .put(UserDetailsController.editUserDetails)
    .get(UserDetailsController.showUserDetails)
    // .delete(UserDetailsController.deleteUserDetails)

module.exports = router;