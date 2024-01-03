const express = require('express');
const router = express.Router();
const RentsController = require('../controllers/RentsController');

router.route('/')
    .get(RentsController.index)
    .post(RentsController.createRent)

router.route('/:id')
    .put(RentsController.editRent)
    .get(RentsController.showRent)
    .delete(RentsController.deleteRent)

module.exports = router;