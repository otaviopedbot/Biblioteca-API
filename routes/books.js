const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const checkToken = require('../middlewares/checkToken')

router.route('/')
    .get(checkToken, BookController.index)
    .post(checkToken, BookController.createBook)

router.route('/:id')
    .put(checkToken, BookController.editBook)
    .get(checkToken, BookController.showBook)
    .delete(checkToken, BookController.deleteBook)

module.exports = router;