const express = require('express');
const router = express.Router();
const BookshelveController = require('../controllers/BookshelveController');

router.route('/')
    .get(BookshelveController.index)
    .post(BookshelveController.createBookshelve)

router.route('/:id')
    .put(BookshelveController.editBookshelve)
    .get(BookshelveController.showBookshelve)
    .delete(BookshelveController.deleteBookshelve)

module.exports = router;