const express = require('express');
const router = express.Router();
const AuthorsController = require('../controllers/AuthorsController');

router.route('/')
    .get(AuthorsController.index)
    .post(AuthorsController.createAuthor)

router.route('/:id')
    .put(AuthorsController.editAuthor)
    .get(AuthorsController.showAuthor)
    .delete(AuthorsController.deleteAuthor)

module.exports = router;