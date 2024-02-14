const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');
const checkToken = require('../middlewares/checkToken')
const checkTokenAdmin = require('../middlewares/checkTokenAdmin')

router.route('/')
    .get(CustomerController.index)
    .post(CustomerController.createCustomer)

router.route('/:id')
    .put(CustomerController.editCustomer)
    .get(CustomerController.showCustomer)
    .delete(CustomerController.deleteCustomer)

module.exports = router;