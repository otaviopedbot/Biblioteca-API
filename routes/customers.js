const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/CustomersController');

router.route('/')
    .get(CustomersController.index)
    .post(CustomersController.createCustomer)

router.route('/:id')
    .put(CustomersController.editCustomer)
    .get(CustomersController.showCustomer)
    .delete(CustomersController.deleteCustomer)

module.exports = router;