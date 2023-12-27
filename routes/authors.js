const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/AuthorController');

router.route('/')
    .get(AuthorController.index)
    .post(AuthorController.createAuthor)

router.get('/new', AuthorController.renderNewForm);

router.route('/:id')
    .put(AuthorController.editAuthor)
    .get(AuthorController.showAuthor)
    .delete(AuthorController.deleteAuthor)

router.get('/:id/edit',(AuthorController.renderEditForm))

module.exports = router;