const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/AuthorController');
const checkToken = require('../middlewares/checkToken')
const checkTokenAdmin = require('../middlewares/checkTokenAdmin')

// checkToken,

router.route('/')
    .get(AuthorController.index)
    .post(checkTokenAdmin, AuthorController.createAuthor)

router.route('/:id')
    .put(checkTokenAdmin, AuthorController.editAuthor)
    .get(checkToken, AuthorController.showAuthor)
    .delete(checkTokenAdmin, AuthorController.deleteAuthor)

module.exports = router;