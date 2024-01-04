const Rent = require('../models/Rent');
const Book = require('../models/Book');
const Customer = require('../models/Customer');

// visualizações:

module.exports.index = (req, res) => {

    Rent.getAll()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.json({ 'message': 'Erro interno ao obter emprestimos', error: error });
        });

};

module.exports.showRent = (req, res) => {
    const rentsId = req.params.id;

    Rent.getById(rentsId)
        .then(rent => {
            if (rent.length > 0) {
                return res.json(rent);
            }
            return res.status(404).json({ message: 'Emprestimo não encontrado' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Erro interno ao obter emprestimo por ID', error: error });
        });

};

// metodos:

module.exports.createRent = async (req, res, next) => {
    const { date, customer_id, book_id } = req.body;

    try {

        if (!date, !customer_id, !book_id) {
            next(new Error('Dados não informados ao criar emprestimo'))
        }

        const existingCustomer = await Customer.getById(customer_id);

        if (!existingCustomer || existingCustomer.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        const existingBook = await Book.getById(book_id);

        if (!existingBook || existingBook.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        const newrent = new Rent({ date, customer_id, book_id });

        const savedRent = await newrent.save();
        res.json({ message: 'Emprestimo criado com sucesso', savedRent });
    } catch (error) {
        next(new Error('Erro interno ao criar emprestimo'));
    }
};

module.exports.editRent = async (req, res, next) => {
    const rentId = req.params.id;
    const { date, customer_id, book_id } = req.body;

    try {

        const existingRent = await Rent.getById(rentId);

        if (existingRent.length === 0) {
            return res.status(404).json({ error: 'Emprestimo não encontrado' });
        }

        if (!date, !customer_id, !book_id) {
            next(new Error('Dados não informados ao atualizar emprestimo'))
        }

        const existingCustomer = await Customer.getById(customer_id);

        if (!existingCustomer || existingCustomer.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        const existingBook = await Book.getById(book_id);

        if (!existingBook || existingBook.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        const updatedrents = new Rent({ date, customer_id, book_id });
        updatedrents.id = rentId;

        await updatedrents.update();

        res.json({ message: 'Emprestimo atualizado com sucesso', updatedrents });
    } catch (error) {
        next(new Error('Erro interno ao editar emprestimo'));
    }

};

module.exports.deleteRent = async (req, res, next) => {
    const rentId = req.params.id

    try {
        const existingRent = await Rent.getById(rentId);

        if (existingRent.length === 0) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }

        Rent.deleteById(rentId)

        res.json({ message: 'Emprestimo excluido com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir emprestimo'));
    }

};