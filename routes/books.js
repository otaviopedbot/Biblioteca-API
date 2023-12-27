const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/BooksController');

router.route('/')
    .get(BooksController.index)
    .post(BooksController.createBooks)

router.get('/new', BooksController.renderNewForm);

router.route('/:id')
    .put(BooksController.editBooks)
    .get(BooksController.showBooks)
    .delete(BooksController.deleteBooks)

router.get('/:id/edit',(BooksController.renderEditForm))

module.exports = router;