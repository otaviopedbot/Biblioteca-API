const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/AuthorController');
const checkToken = require('../middlewares/checkToken')

router.route('/')
    .get(checkToken, AuthorController.index)
    .post(checkToken, AuthorController.createAuthor)

router.route('/:id')
    .put(checkToken, AuthorController.editAuthor)
    .get(checkToken, AuthorController.showAuthor)
    .delete(checkToken, AuthorController.deleteAuthor)

module.exports = router;