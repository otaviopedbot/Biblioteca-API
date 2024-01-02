const Author = require('../models/Author');

// visualizações:

module.exports.index = (req, res) => {

    Author.getAll()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.json({ 'message': 'Erro interno ao obter autores', error: err });
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


module.exports.createAuthor = async (req, res) => {
    const newAuthor = new Author(req.body);

    newAuthor.save()
        .then(savedAuthor => {
            res.json({ 'message': 'Autor criado com sucesso', savedAuthor });
        })
        .catch(error => {
            throw new Error('Erro ao criar autor: ', error);
        });

};


module.exports.editAuthor = async (req, res) => {
    const authorId = req.params.id;
    const { name } = req.body;

    try {
        const existingAuthor = await Author.getById(authorId);

        if (!existingAuthor || existingAuthor.length === 0) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }

        const updatedAuthor = new Author({ name });
        updatedAuthor.id = authorId;

        await updatedAuthor.update();

        res.json({ message: 'Autor atualizado com sucesso', updatedAuthor });
    } catch (error) {
        throw new Error('Erro interno ao editar autor');
    }










    module.exports.editAuthor = async (req, res) => {
        try {
            // Lógica de edição do autor...
    
            // Se ocorrer um erro interno, lançar uma exceção
            if (algumaCondicao) {
                throw new Error('Erro interno ao editar autor');
            }
    
            // Restante da lógica...
    
            res.json({ message: 'Autor editado com sucesso' });
        } catch (error) {
            console.error('Erro interno ao editar autor:', error);
            res.status(500).json({ error: 'Erro interno ao editar autor', message: error.message });
        }
    };
    










};


module.exports.deleteAuthor = async (req, res) => {
    const authorId = req.params.id

    try {
        const existingAuthor = await Author.getById(authorId);

        if (!existingAuthor || existingAuthor.length === 0) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }

        Author.deleteById(authorId)

        res.json({ message: 'Autor excluido com sucesso' });
    } catch (error) {
        throw new Error('Erro interno ao excluir autor: ', error);
    }

};