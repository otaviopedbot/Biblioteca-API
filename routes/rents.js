const express = require('express');
const router = express.Router();
const RentController = require('../controllers/RentController');
const checkToken = require('../middlewares/checkToken')
const checkTokenAdmin = require('../middlewares/checkTokenAdmin')

router.route('/')
    .get(checkTokenAdmin, RentController.index)
    .post(checkTokenAdmin, RentController.createRent)

router.route('/:id')
    .put(checkTokenAdmin, RentController.editRent)
    .get(checkTokenAdmin, RentController.showRent)
    .delete(checkTokenAdmin, RentController.deleteRent)

module.exports = router;