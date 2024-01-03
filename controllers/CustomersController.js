const Customer = require('../models/Customer');

// visualizações:

module.exports.index = (req, res) => {

    Customer.getAll()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.json({ 'message': 'Erro interno ao obter clientes', error: error });
        });

};

module.exports.showCustomer = (req, res) => {
    const customerId = req.params.id;

    Customer.getById(customerId)
        .then(customer => {
            if (customer && customer.length > 0) {
                res.json(customer);
            } else {
                res.status(404).json({ message: 'Cliente não encontrado' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Erro interno ao obter cliente por ID', error: error });
        });

};

// metodos:

module.exports.createCustomer = async (req, res, next) => {
    const {name, phone, adress} = req.body

    try {
        if (!name || !phone || !adress) {
            next(new Error('Dados não informados ao criar cliente'))
        }

        const newCustomer = new Customer({name, phone, adress});

        const savedCustomer = await newCustomer.save();
        res.json({ message: 'Cliente criado com sucesso', savedCustomer });
    } catch (error) {
        next(new Error('Erro interno ao criar cliente'));
    }
};

module.exports.editCustomer = async (req, res, next) => {
    const customerId = req.params.id;
    const { name, phone, adress } = req.body;

    try {
        const existingCustomer = await Customer.getById(customerId);

        if (!existingCustomer || existingCustomer.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        if (!name || !phone || !adress) {
            next(new Error('Dados não informados ao criar cliente'))
        }

        const updatedCustomer = new Customer({ name, phone, adress });
        updatedCustomer.id = customerId;

        await updatedCustomer.update();

        res.json({ message: 'Cliente atualizado com sucesso', updatedCustomer });
    } catch (error) {
        next(new Error('Erro interno ao editar cliente'));
    }

};

module.exports.deleteCustomer = async (req, res, next) => {
    const customerId = req.params.id

    try {
        const existingCustomer = await Customer.getById(customerId);

        if (!existingCustomer || existingCustomer.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        Customer.deleteById(customerId)

        res.json({ message: 'Cliente excluido com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir cliente'));
    }

};
