const express = require('express');
const router = express.Router();
const BookshelveController = require('../controllers/BookshelveController');
const checkToken = require('../middlewares/checkToken')
const checkTokenAdmin = require('../middlewares/checkTokenAdmin')

router.route('/')
    .get(BookshelveController.index)
    .post(checkTokenAdmin, BookshelveController.createBookshelve)

router.route('/:id')
    .put(checkTokenAdmin, BookshelveController.editBookshelve)
    .get(checkToken, BookshelveController.showBookshelve)
    .delete(checkTokenAdmin, BookshelveController.deleteBookshelve)

module.exports = router;