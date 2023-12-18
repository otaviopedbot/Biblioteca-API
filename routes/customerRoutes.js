const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

router.route('/')
    .get(CustomerController.index)
    .post(CustomerController.createCustomer)

router.get('/new', CustomerController.renderNewForm);

router.route('/:id')
    .delete(CustomerController.deleteCustomer)
    .put(CustomerController.editCustomer)
    .get(CustomerController.showCustomer)

router.get('/:id/edit',(CustomerController.renderEditForm))



module.exports = router;