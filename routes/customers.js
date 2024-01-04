const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

router.route('/')
    .get(CustomerController.index)
    .post(CustomerController.createCustomer)

router.route('/:id')
    .put(CustomerController.editCustomer)
    .get(CustomerController.showCustomer)
    .delete(CustomerController.deleteCustomer)

module.exports = router;