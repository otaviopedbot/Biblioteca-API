const Book = require('../models/Book');
const Author = require('../models/Author');
const Bookshelve = require('../models/Bookshelve');

// visualizações:

module.exports.index = async (req, res) => {
    const { page, pageSize } = req.query;

    try {
        const books = await Book.getAll(page, pageSize);
        const detailedBooks = await Promise.all(books.map(async (book) => {
            const bookshelve = await Bookshelve.getById(book.bookshelve_id);
            const author = await Author.getById(book.author_id);
            return {
                id: book.id,
                title: book.title,
                page: book.page,
                quantity: book.quantity,
                author: author[0].name,
                bookshelve: bookshelve[0].name
            };
        }));

        if (page && pageSize) {

            const total_items = await Book.countTotal()
            res.json({
                data: detailedBooks,
                total_items: total_items
            });
        } else {
            res.json(detailedBooks);
        }
    } catch (error) {
        res.json({ 'message': 'Erro interno ao obter livros', error: error });
    }
};

module.exports.showBook = async (req, res, next) => {
    const bookId = req.params.id;

    try {

        const book = await Book.getById(bookId)

        if (book.length < 0) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // busca o Autor e a estante

        const bookshelve = await Bookshelve.getById(book[0].bookshelve_id)

        const author = await Author.getById(book[0].author_id)

        const result = {
            id: book[0].id,
            title: book[0].title,
            page: book[0].page,
            quantity: book[0].quantity,
            synopsis: book[0].synopsis,
            author: author[0],
            bookshelve: bookshelve[0]
        }

        res.json(result)

    } catch {
        next(new Error('Erro interno ao buscar Livro'));
    }

};

// operações:

module.exports.createBook = async (req, res, next) => {
    let { title, page, quantity, author_id, bookshelve_id } = req.body;

    try {

        if (!title || !page || !quantity || !author_id || !bookshelve_id) {
            return res.status(422).json({ message: 'Preencha todos os campos' });
        }

        title = title.trim();

        if (title === '') {
            return res.status(422).json({ message: 'Preencha os campos com dados válidos' });
        }

        // Verifica se o titulo já existe

        const titleExists = await Book.findOne({ title: title });

        if (titleExists) {
            return res.status(422).json({ message: 'Título já cadastrado' });
        }

        // verifica se o autor e a estante existem

        const existingAuthor = await Author.findOne({ id: author_id });

        if (!existingAuthor) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }

        const existingBookshelve = await Bookshelve.findOne({ id: bookshelve_id });

        if (!existingBookshelve) {
            return res.status(404).json({ message: 'Estante não encontrada' });
        }

        // Salva o livro

        const newBook = new Book({ title, page, quantity, author_id, bookshelve_id });

        const savedBook = await newBook.save();

        res.json({ message: 'Livro criado com sucesso', savedBook });
    } catch (error) {
        next(new Error('Erro interno ao criar livro'));
    }
};

module.exports.editBook = async (req, res, next) => {
    const bookId = req.params.id;
    let { title, page, quantity, author_id, bookshelve_id } = req.body;

    try {
        const existingBook = await Book.findOne({ id: bookId });

        if (!existingBook) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        if (!title || !page || !quantity || !author_id || !bookshelve_id) {
            return res.status(422).json({ message: 'Preencha todos os campos' });
        }

        title = title.trim();

        // Verifica se o titulo já existe

        const titleExists = await Book.findOne({ title: title });

        if (titleExists && titleExists.id != bookId) {
            return res.status(422).json({ message: 'Título já cadastrado' });
        }

        // verifica se o autor e a estante existem

        const existingAuthor = await Author.findOne({ id: author_id });

        if (!existingAuthor) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }

        const existingBookshelve = await Bookshelve.findOne({ id: bookshelve_id });

        if (!existingBookshelve) {
            return res.status(404).json({ message: 'Estante não encontrada' });
        }

        // atualiza o livro

        const updatedBook = new Book({ title, page, quantity, author_id, bookshelve_id });
        updatedBook.id = bookId;

        await updatedBook.update();

        res.json({ message: 'Livro atualizado com sucesso', updatedBook });
    } catch (error) {
        next(new Error('Erro interno ao editar Livro'));
    }

};

module.exports.deleteBook = async (req, res, next) => {
    const bookId = req.params.id

    try {
        const existingBook = await Book.findOne({ id: bookId });

        if (!existingBook) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        const hasReferences = await Book.hasReferences('rents', 'book_id', bookId);

        if (hasReferences) {
            return res.status(400).json({ message: 'Não é possível excluir o Livro, pois há Aluguéis associados a ele.' });
        }

        Book.deleteById(bookId)

        res.json({ message: 'Livro excluido com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir Livro'));
    }

};