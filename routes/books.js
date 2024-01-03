const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/BooksController');

router.route('/')
    .get(BooksController.index)
    .post(BooksController.createBook)

router.route('/:id')
    .put(BooksController.editBook)
    .get(BooksController.showBook)
    .delete(BooksController.deleteBook)

module.exports = router;