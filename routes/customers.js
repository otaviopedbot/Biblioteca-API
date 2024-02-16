const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');
const RentController = require('../controllers/RentController');
const checkToken = require('../middlewares/checkToken')
const checkTokenAdmin = require('../middlewares/checkTokenAdmin')


// Rotas para operações do cliente

router.route('/')
    .get(CustomerController.index)
    .post(CustomerController.createCustomer)

router.route('/:id')
    .put(CustomerController.editCustomer)
    .get(CustomerController.showCustomer)
    .delete(CustomerController.deleteCustomer)

// Rotas para alugueis do cliente

router.route('/:id/rents')
    .post(RentController.createRent)
    .get(RentController.showRent)

router.route('/:id/rents/:rentId')
    .put(RentController.editRent)
    .delete(RentController.deleteRent)

module.exports = router;