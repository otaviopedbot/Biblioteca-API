const Rent = require('../models/Rent');
const Book = require('../models/Book');
const Customer = require('../models/Customer');

// visualizações:

module.exports.index = async (req, res, next) => {
    try {
        // Recuperar todos os aluguéis
        const rents = await Rent.getAll();

        // Mapear todos os aluguéis em um array de promessas
        const rentPromises = rents.map(async (rent) => {
            // Recuperar o livro associado ao aluguel
            const book = await Book.getById(rent.book_id);
            // Recuperar o cliente associado ao aluguel
            const customer = await Customer.getById(rent.customer_id);
            // Construir o objeto de resultado para o aluguel
            return {
                id: rent.id,
                date: rent.date,
                book_id: book[0].id,
                book_title: book[0].title,
                customer_id: customer[0].id,
                customer_name: customer[0].name
            };
        });

        // Aguardar a resolução de todas as promessas
        const rentDetails = await Promise.all(rentPromises);

        // Retorna os detalhes de todos os aluguéis em um array json
        res.json(rentDetails);
    } catch (error) {
        next(new Error('Erro interno ao buscar alugueis'));
    }
};

module.exports.showRent = async (req, res, next) => {
    const rentsId = req.params.id;

    try {

        const rent = await Rent.getById(rentsId)

        if (rent.length < 0) {
            return res.status(404).json({ message: 'Aluguel não encontrado' });
        }

        // busca o cliente e o livro

        const book = await Book.getById(rent[0].book_id)

        console.log(book[0].title)

        const customer = await Customer.getById(rent[0].customer_id)

        const result = {
            id: rent[0].id,
            date: rent[0].date,
            book: book[0],
            customer: customer[0]
        }

        res.json(result)

    } catch {
        next(new Error('Erro interno ao buscar Aluguel'));
    }

};

// operações:

module.exports.createRent = async (req, res, next) => {
    const { date, book_id, customer_id } = req.body;

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

        rentExists = await Rent.findOne({ customer_id: customer_id, book_id: book_id });

        if (rentExists) {
            return res.status(422).json({ message: 'Cliente já alugou este livro' });
        }

        // remove o livro do estoque

        bookExists.quantity = bookExists.quantity - 1

        const updatedBook = new Book(bookExists)
        updatedBook.id = bookExists.id

        updatedBook.update()

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

        const rentBookExists = await Rent.findOne({ customer_id: customer_id, book_id: book_id });

        if (rentBookExists && rentBookExists.id != rentId) {
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
            return res.status(404).json({ message: 'Aluguel não encontrado' });
        }

        //Busca e adiciona o livro do estoque

        const bookExists = await Book.findOne({ id: existingRent.book_id });

        if (!bookExists) {
            return res.status(422).json({ message: 'Livro não encontrado' });
        }

        bookExists.quantity = bookExists.quantity + 1

        const updatedBook = new Book(bookExists)
        updatedBook.id = bookExists.id

        updatedBook.update()

        // deleta o aluguel

        Rent.deleteById(rentId)

        res.json({ message: 'Aluguel excluido com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir Aluguel'));
    }

};