const Author = require('../models/Author');

// visualizações:

module.exports.index = (req, res) => {
    Author.getAll((err, authors) => {
        if (err) {
            console.error('Erro ao obter autores:', err);
        } else {
            res.render('authors/index', { authors });
        }
    });
};

module.exports.showAuthor = (req, res) => {
    const customerId = req.params.id;

    Author.getById(customerId, (err, author) => {
        if (err) {
            console.log('Erro ao obter autor por ID:', err);
        } else {
            res.render('authors/show', { author });
        }
    });
};


module.exports.renderEditForm = (req, res) => {
    const authorId = req.params.id;

    Author.getById(authorId, (err, author) => {
        if (err) {
            console.log('Erro ao obter autor por ID:', err);
            return;
        }

        if (!author) {
            console.log('Autor não encontrado');
            res.redirect('/authors');
            return;
        }

        res.render('authors/edit', { author });
    });
};


module.exports.renderNewForm = (req, res) => {
    res.render('authors/new')
}


// metodos:


module.exports.createAuthor = async (req, res) => {

    const newAuthor = new Author(req.body);

    newAuthor.save((err, savedAuthor) => {
        if (err) {
            console.error('Erro ao criar autor:', err);
        } else {
            console.log('Autor criado com sucesso:', savedAuthor);

            res.redirect('/authors');
        }
    });
};


module.exports.editAuthor = (req, res) => {
    const authorId = req.params.id;
    const { name } = req.body;

    const updatedAuthor = new Author({ name });
    updatedAuthor.id = authorId;

    updatedAuthor.update((err, result) => {
        if (err) {
            console.log('Erro ao atualizar autor:', err);
        } else {
            console.log('Autor atualizado com sucesso:', result);
            res.redirect(`/authors/${authorId}`);
        }
    });
};


module.exports.deleteAuthor = (req, res) => {
    const authorId = req.params.id

    Author.deleteById(authorId, (err) => {
        if (err) {
            console.log('Erro ao excluir autor:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            console.log('Autor excluído com sucesso.');
            res.redirect('/authors');
        }
    });

};