const Author = require('../models/Author');

// visualizações:

module.exports.index = (req, res) => {

    Author.getAll()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.json({ 'message': 'Erro interno ao obter autores', error: error });
        });

};

module.exports.showAuthor = (req, res) => {
    const authorId = req.params.id;

    Author.getById(authorId)
        .then(author => {
            if (author && author.length > 0) {
                res.json(author);
            } else {
                res.status(404).json({ message: 'Autor não encontrado' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Erro interno ao obter autor por ID', error: error });
        });

};

//operações

module.exports.createAuthor = async (req, res, next) => {
    const { name } = req.body

    try {
        if (!name) {
            next(new Error('Nome não informado ao criar autor'));
        }

        const newAuthor = new Author({name});

        const savedAuthor = await newAuthor.save();
        res.json({ message: 'Autor criado com sucesso', savedAuthor });
    } catch (error) {
        next(new Error('Erro interno ao criar autor'));
    }
};

module.exports.editAuthor = async (req, res, next) => {
    const authorId = req.params.id;
    const { name } = req.body;

    try {
        const existingAuthor = await Author.getById(authorId);

        if (!existingAuthor || existingAuthor.length === 0) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }

        if (!name) {
            next(new Error('Nome não informado ao editar autor'));
        }

        const updatedAuthor = new Author({ name });
        updatedAuthor.id = authorId;

        await updatedAuthor.update();

        res.json({ message: 'Autor atualizado com sucesso', updatedAuthor });
    } catch (error) {
        next(new Error('Erro interno ao editar autor'));
    }

};

module.exports.deleteAuthor = async (req, res, next) => {
    const authorId = req.params.id

    try {
        const existingAuthor = await Author.getById(authorId);

        if (!existingAuthor || existingAuthor.length === 0) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }

        Author.deleteById(authorId)

        res.json({ message: 'Autor excluido com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir autor'));
    }

};