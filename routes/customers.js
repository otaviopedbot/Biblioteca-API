const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');
const checkToken = require('../middlewares/checkToken')

router.route('/')
    .get(checkToken, CustomerController.index)
    .post(checkToken, CustomerController.createCustomer)

router.route('/:id')
    .put(checkToken, CustomerController.editCustomer)
    .get(checkToken, CustomerController.showCustomer)
    .delete(checkToken, CustomerController.deleteCustomer)

module.exports = router;