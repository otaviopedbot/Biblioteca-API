const express = require('express');
const router = express.Router();
const RentsController = require('../controllers/RentsController');

router.route('/')
    .get(RentsController.index)
    .post(RentsController.createRent)

router.get('/new', RentsController.renderNewForm);

router.route('/:id')
    .put(RentsController.editRent)
    .get(RentsController.showRent)
    .delete(RentsController.deleteRent)

router.get('/:id/edit',(RentsController.renderEditForm))

module.exports = router;