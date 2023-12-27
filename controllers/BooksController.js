const Book = require('../models/Book');

// visualizações:

module.exports.index = (req, res) => {
    Book.getAll((err, books) => {
        if (err) {
            console.error('Erro ao obter livros:', err);
        } else {
            res.render('books/index', { books });
        }
    });
};

module.exports.showBooks = (req, res) => {
    const BooksId = req.params.id;

    Book.getById(BooksId, (err, book) => {
        if (err) {
            console.log('Erro ao obter livro por ID:', err);
        } else {
            res.render('books/show', { book });
        }
    });
};


module.exports.renderEditForm = (req, res) => {
    const BooksId = req.params.id;

    Book.getById(BooksId, (err, book) => {
        if (err) {
            console.log('Erro ao obter livro por ID:', err);
            return;
        }

        if (!book) {
            console.log('livro não encontrado');
            res.redirect('/books');
            return;
        }

        res.render('books/edit', { book });
    });
};


module.exports.renderNewForm = (req, res) => {
    res.render('books/new')
}


// metodos:


module.exports.createBooks = (req, res) => {
    const newBook = new Book(req.body);

    newBook.save((err, savedBook) => {
        if (err) {
            console.error('Erro ao criar livro:', err.message);
        } else {
            console.log('Livro criado com sucesso:', savedBook);
            res.redirect('/books');
        }
    });
};



module.exports.editBooks = (req, res) => {
    const BooksId = req.params.id;
    const { title, page, quantity, author_id, bookshelve_id } = req.body;

    const updatedBooks = new Book({ title, page, quantity, author_id, bookshelve_id });
    updatedBooks.id = BooksId;

    updatedBooks.update((err, result) => {
        if (err) {
            console.log('Erro ao atualizar livro:', err);
        } else {
            console.log('livro atualizado com sucesso:', result);
            res.redirect(`/books/${BooksId}`);
        }
    });
};

module.exports.deleteBooks = (req, res) => {
    const BooksId = req.params.id

    Book.deleteById(BooksId, (err) => {
        if (err) {
            console.log('Erro ao excluir livro:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            console.log('livro excluído com sucesso.');
            res.redirect('/books');
        }
    });

}