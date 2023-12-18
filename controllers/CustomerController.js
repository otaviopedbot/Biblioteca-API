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

module.exports.editCustomer = async (req, res) => {

    const customerId = req.params;
    const customer = req.body + customerId

    customer.update((err, updatedCustomer) => {
        if (err) {
            console.error('Erro ao atualizar cliente:', err);
        } else {
            console.log('Cliente atualizado com sucesso:', updatedCustomer);

            res.redirect(`/customers/${customerId}`);
        }
    });

}

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

module.exports.deleteCustomer = async (req, res) => {
}
