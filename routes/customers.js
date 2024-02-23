const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');
const RentController = require('../controllers/RentController');
const checkToken = require('../middlewares/checkToken')
const checkTokenAdmin = require('../middlewares/checkTokenAdmin')


// Rotas para operações do cliente

router.route('/')
    .get(CustomerController.index)
    .post(checkTokenAdmin, CustomerController.createCustomer)

router.route('/:id')
    .put(checkTokenAdmin, CustomerController.editCustomer)
    .get(checkTokenAdmin, CustomerController.showCustomer)
    .delete(checkTokenAdmin, CustomerController.deleteCustomer)

module.exports = router;