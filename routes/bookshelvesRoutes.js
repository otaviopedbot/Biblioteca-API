const express = require('express');
const router = express.Router();
const BookshelveController = require('../controllers/BookshelveController');

router.route('/')
    .get(BookshelveController.index)
    .post(BookshelveController.createBookshelve)

router.get('/new', BookshelveController.renderNewForm);

router.route('/:id')
    .put(BookshelveController.editBookshelve)
    .get(BookshelveController.showBookshelve)
    .delete(BookshelveController.deleteBookshelve)

router.get('/:id/edit',(BookshelveController.renderEditForm))

module.exports = router;