const Customer = require('../models/Customer');

// visualizações:

module.exports.index = (req, res) => {
    Customer.getAll((err, customers) => {
        if (err) {
            console.error('Erro ao obter clientes:', err);
        } else {
            res.render('customers/index', { customers });
        }
    });
};

module.exports.showCustomer = (req, res) => {
    const customerId = req.params.id;

    Customer.getById(customerId, (err, customer) => {
        if (err) {
            console.log('Erro ao obter cliente por ID:', err);
        } else {
            res.render('customers/show', { customer });
        }
    });
};


module.exports.renderEditForm = (req, res) => {
    const customerId = req.params.id;

    Customer.getById(customerId, (err, customer) => {
        if (err) {
            console.log('Erro ao obter cliente por ID:', err);
            return;
        }

        if (!customer) {
            console.log('Cliente não encontrado');
            res.redirect('/clientes');
            return;
        }

        res.render('customers/edit', { customer });
    });
};


module.exports.renderNewForm = (req, res) => {
    res.render('customers/new')
}


// metodos:


module.exports.createCustomer = async (req, res) => {

    const newCustomer = new Customer(req.body);

    newCustomer.save((err, savedCustomer) => {
        if (err) {
            console.error('Erro ao criar cliente:', err);
        } else {
            console.log('Cliente criado com sucesso:', savedCustomer);

            res.redirect('/customers');
        }
    });
};


module.exports.editCustomer = (req, res) => {
    const customerId = req.params.id;
    const { name, phone, adress } = req.body;

    const updatedCustomer = new Customer({ name, phone, adress });
    updatedCustomer.id = customerId;

    updatedCustomer.update((err, result) => {
        if (err) {
            console.log('Erro ao atualizar cliente:', err);
        } else {
            console.log('Cliente atualizado com sucesso:', result);
            res.redirect(`/customers/${customerId}`);
        }
    });
};


module.exports.deleteCustomer = (req, res) => {
    const customerId = req.params.id

    Customer.deleteById(customerId, (err) => {
        if (err) {
            console.log('Erro ao excluir cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            console.log('Cliente excluído com sucesso.');
            res.redirect('/customers');
        }
    });

};
