const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const ReviewController = require('../controllers/ReviewController');
const checkToken = require('../middlewares/checkToken')
const checkTokenAdmin = require('../middlewares/checkTokenAdmin')

// Rotas para operações de livros
router.route('/')
    .get(BookController.index)
    .post(checkTokenAdmin, BookController.createBook)

router.route('/:id')
    .put(checkTokenAdmin, BookController.editBook)
    .get(checkToken,BookController.showBook)
    .delete(checkTokenAdmin, BookController.deleteBook)

// Rotas para reviews dos livros
router.route('/:id/reviews')
    .post(checkToken, ReviewController.createReview)
    .get(checkToken, ReviewController.showBookReviews);

router.route('/:id/reviews/:userId')
    .put(checkToken, ReviewController.editReview)
    .delete(checkToken, ReviewController.deleteReview);

module.exports = router;