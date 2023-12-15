// controllers/CustomerController.js
const Customer = require('../models/Customer');

class CustomerController {

    static getAll(req, res) {
        const customers = Customer.getAll((err, results) => {
            if (err) {
                res.status(500);
            } else {
                res.results;
            }
        res.render('customers/index', {customers})
        });
    }

    static getById(req, res) {
        const id = req.params.id;
        Customer.getById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else if (!result) {
                res.status(404).json({ error: 'Cliente não encontrado' });
            } else {
                res.json(result);
            }
        });
    }

    static create(req, res) {
        const { name, phone, address } = req.body;
        const customer = new Customer({ name, phone, address });

        customer.save((err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                res.status(201).json(result);
            }
        });
    }

    static update(req, res) {
        const id = req.params.id;
        const { name, phone, address } = req.body;

        Customer.getById(id, (err, existingCustomer) => {
            if (err) {
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else if (!existingCustomer) {
                res.status(404).json({ error: 'Cliente não encontrado' });
            } else {
                const customer = new Customer({ id, name, phone, address });

                customer.update((err, result) => {
                    if (err) {
                        res.status(500).json({ error: 'Erro interno do servidor' });
                    } else {
                        res.json(result);
                    }
                });
            }
        });
    }

    static delete(req, res) {
        const id = req.params.id;

        Customer.getById(id, (err, existingCustomer) => {
            if (err) {
                res.status(500).json({ error: 'Erro interno do servidor' });
            } else if (!existingCustomer) {
                res.status(404).json({ error: 'Cliente não encontrado' });
            } else {
                existingCustomer.delete((err, result) => {
                    if (err) {
                        res.status(500).json({ error: 'Erro interno do servidor' });
                    } else {
                        res.json(result);
                    }
                });
            }
        });
    }
}

module.exports = CustomerController;
