const Book = require('../models/Book');
const Author = require('../models/Author');
const Bookshelve = require('../models/Bookshelve');

// visualizações:

module.exports.index = (req, res) => {

    Book.getAll()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.json({ 'message': 'Erro interno ao obter livros', error: error });
        });

};

module.exports.showBook = (req, res) => {
    const bookId = req.params.id;

    Book.getById(bookId)
        .then(book => {
            if (book.length > 0) {
                return res.json(book);
            }
            return res.status(404).json({ message: 'Livro não encontrado' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Erro interno ao obter livro por ID', error: error });
        });

};

// operações:

module.exports.createBook = async (req, res, next) => {
    const { title, page, quantity, author_id, bookshelve_id } = req.body;

    try {

        if (!title || !page || !quantity || !author_id || !bookshelve_id) {
            next(new Error('Dados não informados ao criar livro'));
        }

        const newBook = new Book({ title, page, quantity, author_id, bookshelve_id });

        const savedBook = await newBook.save();
        res.json({ message: 'Livro criado com sucesso', savedBook });
    } catch (error) {
        next(new Error('Erro interno ao criar livro'));
    }
};

module.exports.editBook = async (req, res, next) => {
    const BookId = req.params.id;
    const { title, page, quantity, author_id, bookshelve_id } = req.body;

    try {

        const existingBook = await Book.getById(BookId);

        if (existingBook.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        if (!title || !page || !quantity || !author_id || !bookshelve_id) {
            next(new Error('Dados não informados ao atualizar livro'));
        }

        const existingAuthor = await Author.getById(author_id);

        if (!existingAuthor || existingAuthor.length === 0) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }

        const existingBookshelve = await Bookshelve.getById(bookshelve_id);

        if (!existingBookshelve || existingBookshelve.length === 0) {
            return res.status(404).json({ error: 'Estante não encontrada' });
        }

        const updatedBook = new Book({ title, page, quantity, author_id, bookshelve_id });
        updatedBook.id = BookId;

        await updatedBook.update();

        res.json({ message: 'Livro atualizado com sucesso', updatedBook });
    } catch (error) {
        next(new Error('Erro interno ao editar Livro'));
    }

};

module.exports.deleteBook = async (req, res, next) => {
    const bookId = req.params.id

    try {
        const existingBook = await Book.getById(bookId);

        if (existingBook.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        Book.deleteById(bookId)

        res.json({ message: 'Livro excluido com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir Livro'));
    }

};