const express = require('express');
const router = express.Router();
const PublisherController = require('../controllers/PublisherController');

router.route('/')
    .get(PublisherController.index)
    .post(PublisherController.createPublisher)

router.get('/new', PublisherController.renderNewForm);

router.route('/:id')
    .put(PublisherController.editPublisher)
    .get(PublisherController.showPublisher)
    .delete(PublisherController.deletePublisher)

router.get('/:id/edit',(PublisherController.renderEditForm))

module.exports = router;