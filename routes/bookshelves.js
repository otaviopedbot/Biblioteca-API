const express = require('express');
const router = express.Router();
const BookshelveController = require('../controllers/BookshelveController');
const checkToken = require('../middlewares/checkToken')

router.route('/')
    .get(checkToken, BookshelveController.index)
    .post(checkToken, BookshelveController.createBookshelve)

router.route('/:id')
    .put(checkToken, BookshelveController.editBookshelve)
    .get(checkToken, BookshelveController.showBookshelve)
    .delete(checkToken, BookshelveController.deleteBookshelve)

module.exports = router;