const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/AuthorController');
const checkToken = require('../middlewares/checkToken')
const checkTokenAdmin = require('../middlewares/checkTokenAdmin')

// checkToken,

router.route('/')
    .get(AuthorController.index)
    .post(AuthorController.createAuthor)

router.route('/:id')
    .put(AuthorController.editAuthor)
    .get(AuthorController.showAuthor)
    .delete(AuthorController.deleteAuthor)

module.exports = router;