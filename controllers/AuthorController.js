const Author = require('../models/Author');

// visualizações:

module.exports.index = (req, res) => {

    Author.getAll()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.json({ message: 'Erro interno ao obter autores', error: error });
        });

};

module.exports.showAuthor = (req, res) => {
    const authorId = req.params.id;

    Author.getById(authorId)
        .then(author => {
            if (author.length > 0) {
                return res.json(author);
            }
            return res.status(404).json({ message: 'Autor não encontrado' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Erro interno ao obter autor por ID', error: error });
        });

};

//operações

module.exports.createAuthor = async (req, res, next) => {
    let { name } = req.body

    try {
        if (!name) {
            return res.status(422).json({ message: 'Preencha todos os campos' });
        }

        name = name.trim();

        if (name === '') {
            return res.status(422).json({ message: 'Preencha os campos com dados válidos' });
        }

        // Verifica se o autor existe

        const nameExists = await Author.findOne({ name: name });

        if (nameExists) {
            return res.status(422).json({ message: 'Nome já cadastrado' });
        }

        // Salva o autor

        const newAuthor = new Author({ name });

        const savedAuthor = await newAuthor.save();

        res.json({ message: 'Autor criado com sucesso', savedAuthor });
    } catch (error) {
        next(new Error('Erro interno ao criar autor'));
    }
};

module.exports.editAuthor = async (req, res, next) => {
    const authorId = req.params.id;
    let { name } = req.body;

    try {
        const existingAuthor = await Author.findOne({ id: authorId });

        if (!existingAuthor) {
            return res.status(404).json({ error: 'Estante não encontrada' });
        }

        if (!name) {
            return res.status(422).json({ message: 'Preencha todos os campos' });
        }

        name = name.trim();

        if (name === '') {
            return res.status(422).json({ message: 'Preencha os campos com dados válidos' });
        }

        // verifica se os dados do autor já existem

        const nameExists = await Author.findOne({ name: name });

        if (nameExists && nameExists.id != authorId) {
            return res.status(422).json({ message: 'Nome já cadastrado' });
        }

        // atualiza a estante

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
        const existingAuthor = await Author.findOne({ id: authorId });

        if (!existingAuthor) {
            return res.status(404).json({ error: 'Estante não encontrada' });
        }

        Author.deleteById(authorId)

        res.json({ message: 'Autor excluido com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir Autor'));
    }

};