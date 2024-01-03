const express = require('express');
const router = express.Router();
const BookshelvesController = require('../controllers/BookshelvesController');

router.route('/')
    .get(BookshelvesController.index)
    .post(BookshelvesController.createBookshelve)

router.route('/:id')
    .put(BookshelvesController.editBookshelve)
    .get(BookshelvesController.showBookshelve)
    .delete(BookshelvesController.deleteBookshelve)

module.exports = router;