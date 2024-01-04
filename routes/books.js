const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.route('/')
    .get(BookController.index)
    .post(BookController.createBook)

router.route('/:id')
    .put(BookController.editBook)
    .get(BookController.showBook)
    .delete(BookController.deleteBook)

module.exports = router;