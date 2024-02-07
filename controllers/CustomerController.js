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
            if (customer.length > 0) {
                return res.json(customer[0]);
            }
            return res.status(404).json({ message: 'Cliente não encontrado' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Erro interno ao obter cliente por ID', error: error });
        });

};

// operações:

module.exports.createCustomer = async (req, res, next) => {
    let { name, phone, adress } = req.body

    try {
        if (!name || !phone || !adress) {
            return res.status(422).json({ message: 'Preencha todos os campos' });
        }

        name = name.trim();
        phone = phone.trim();
        adress = adress.trim();

        if (name === '' || phone === '' || adress === '') {
            return res.status(422).json({ message: 'Preencha os campos com dados válidos' });
        }

        // Verifica se o cliente existe

        const nameExists = await Customer.findOne({ name: name });

        if (nameExists) {
            return res.status(422).json({ message: 'Nome já cadastrado' });
        }

        // Salva o cliente

        const newCustomer = new Customer({ name, phone, adress });

        const savedCustomer = await newCustomer.save();
        res.json({ message: 'Cliente criado com sucesso', savedCustomer });
    } catch (error) {
        next(new Error('Erro interno ao criar cliente'));
    }
};

module.exports.editCustomer = async (req, res, next) => {
    const customerId = req.params.id;
    let { name, phone, adress } = req.body;

    try {
        const existingCustomer = await Customer.findOne({ id: customerId });

        if (!existingCustomer) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        if (!name || !phone || !adress) {
            return res.status(422).json({ message: 'Preencha todos os campos' });
        }

        name = name.trim();
        phone = phone.trim();
        adress = adress.trim();

        // Verifica se os dados do usuário já existem

        const nameExists = await Customer.findOne({ name: name });

        if (nameExists && nameExists.id != customerId) {
            return res.status(422).json({ message: 'Nome já cadastrado' });
        }

        // atualiza cliente

        const updatedCustomer = new Customer({ name, phone, adress });
        updatedCustomer.id = customerId;

        await updatedCustomer.update();

        res.json({ message: 'Cliente atualizado com sucesso', updatedCustomer });
    } catch (error) {
        next(new Error('Erro interno ao editar cliente'));
    }

};

module.exports.deleteCustomer = async (req, res, next) => {
    const CustomerId = req.params.id

    try {
        const existingCustomer = await Customer.findOne({ id: CustomerId });

        if (!existingCustomer) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        const hasReferences = await Customer.hasReferences('rents', 'customer_id', CustomerId);

        if (hasReferences) {
            return res.status(400).json({ error: 'Não é possível excluir o Cliente, pois há Aluguéis associados a ele.' });
        }

        Customer.deleteById(CustomerId)

        res.json({ message: 'Cliente excluido com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir Cliente'));
    }

};