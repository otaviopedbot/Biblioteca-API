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
            res.json({ 'message': 'Erro interno ao obter Aluguéis', error: error });
        });

};

module.exports.showRent = (req, res) => {
    const rentsId = req.params.id;

    Rent.getById(rentsId)
        .then(rent => {
            if (rent.length > 0) {
                return res.json(rent);
            }
            return res.status(404).json({ message: 'Aluguel não encontrado' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Erro interno ao obter Aluguel por ID', error: error });
        });

};

// operações:

module.exports.createRent = async (req, res, next) => {
    const { date, customer_id, book_id } = req.body;

    try {

        if (!date || !customer_id || !book_id) {
            return res.status(422).json({ message: 'Preencha os campos com dados válidos' });
        }

        // Verifica se o cliente e o livro existe

        const customerExists = await Customer.findOne({ id: customer_id });
        const bookExists = await Book.findOne({ id: book_id });

        if (!customerExists) {
            return res.status(422).json({ message: 'Cliente não encontrado' });
        }

        if (!bookExists) {
            return res.status(422).json({ message: 'Livro não encontrado' });
        }

        // Verifica se o cliente já alugou o mesmo livro

        rentExists = await Rent.findOne({ customer_id:customer_id, book_id:book_id });

        if(rentExists){
            return res.status(422).json({ message: 'Cliente já alugou este livro' });
        }

        // Salva aluguel

        const newRent = new Rent({ date, customer_id, book_id });

        const savedRent = await newRent.save();

        res.json({ message: 'Aluguel criado com sucesso', savedRent });

    } catch (error) {
        console.log(error)
        next(new Error('Erro interno ao criar Aluguel'));
    }
};

module.exports.editRent = async (req, res, next) => {
    const rentId = req.params.id;
    const { date, customer_id, book_id } = req.body;

    try {

        // Verifica se o Aluguel existe

        const rentExists = await Rent.findOne({ id: rentId });

        if (!rentExists) {
            return res.status(422).json({ message: 'Aluguel não encontrado' });
        }

        if (!date || !customer_id || !book_id) {
            return res.status(422).json({ message: 'Dados não informados ao atualizar aluguel' });
        }

        // Verifica se o cliente e o livro existe

        const customerExists = await Customer.findOne({ id: customer_id });
        const bookExists = await Book.findOne({ id: book_id });

        if (!customerExists) {
            return res.status(422).json({ message: 'Cliente não encontrado' });
        }

        if (!bookExists) {
            return res.status(422).json({ message: 'Livro não encontrado' });
        }

        // Verifica se o cliente já alugou o mesmo livro

        const rentBookExists = await Rent.findOne({ customer_id:customer_id, book_id:book_id });

        if(rentBookExists && rentBookExists.id != rentId){
            return res.status(422).json({ message: 'Cliente já alugou este livro' });
        }

        // Atualiza Aluguel

        const updatedRents = new Rent({ date, customer_id, book_id });
        updatedRents.id = rentId;

        await updatedRents.update();

        res.json({ message: 'Aluguel atualizado com sucesso', updatedRents });
    } catch (error) {
        next(new Error('Erro interno ao editar Aluguel'));
    }

};

module.exports.deleteRent = async (req, res, next) => {
    const rentId = req.params.id

    try {
        const existingRent = await Rent.findOne({ id: rentId });

        if (!existingRent) {
            return res.status(404).json({ error: 'Aluguel não encontrado' });
        }

        Rent.deleteById(rentId)

        res.json({ message: 'Aluguel excluido com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir Aluguel'));
    }

};