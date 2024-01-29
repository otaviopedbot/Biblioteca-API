const express = require('express');
const router = express.Router();
const RentController = require('../controllers/RentController');
const checkToken = require('../middlewares/checkToken')

router.route('/')
    .get(checkToken, RentController.index)
    .post(checkToken, RentController.createRent)

router.route('/:id')
    .put(checkToken, RentController.editRent)
    .get(checkToken, RentController.showRent)
    .delete(checkToken, RentController.deleteRent)

module.exports = router;