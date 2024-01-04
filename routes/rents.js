const express = require('express');
const router = express.Router();
const RentController = require('../controllers/RentController');

router.route('/')
    .get(RentController.index)
    .post(RentController.createRent)

router.route('/:id')
    .put(RentController.editRent)
    .get(RentController.showRent)
    .delete(RentController.deleteRent)

module.exports = router;