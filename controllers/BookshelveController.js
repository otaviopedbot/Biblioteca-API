const Bookshelve = require('../models/Bookshelve');

// visualizações:

module.exports.index = (req, res) => {

    Bookshelve.getAll()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.json({ 'message': 'Erro interno ao obter Estantes', error: error });
        });

};

module.exports.showBookshelve = (req, res) => {
    const bookshelveId = req.params.id;

    Bookshelve.getById(bookshelveId)
        .then(bookshelve => {
            if (bookshelve.length > 0) {
                return res.json(bookshelve);
            }
            return res.status(404).json({ message: 'Estante não encontrada' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Erro interno ao obter estante por ID', error: error });
        });

};

// operações:

module.exports.createBookshelve = async (req, res, next) => {
    let { name } = req.body

    try {
        if (!name) {
            return res.status(422).json({ message: 'Preencha todos os campos' });
        }

        name = name.trim();

        if (name === '') {
            return res.status(422).json({ message: 'Preencha os campos com dados válidos' });
        }

        // Verifica se a estante existe

        const nameExists = await Bookshelve.findOne({ name: name });

        if (nameExists) {
            return res.status(422).json({ message: 'Nome já cadastrado' });
        }

        // Salva a estante

        const newBookshelve = new Bookshelve({ name });

        const savedBookshelve = await newBookshelve.save();

        res.json({ message: 'Estante criada com sucesso', savedBookshelve });
    } catch (error) {
        next(new Error('Erro interno ao criar estante'));
    }
};

module.exports.editBookshelve = async (req, res, next) => {
    const bookshelveId = req.params.id;
    let { name } = req.body;

    try {
        const existingBookshelve = await Bookshelve.findOne({ id: bookshelveId });

        if (!existingBookshelve) {
            return res.status(404).json({ error: 'Estante não encontrada' });
        }

        if (!name) {
            return res.status(422).json({ message: 'Preencha todos os campos' });
        }

        name = name.trim();

        if (name === '') {
            return res.status(422).json({ message: 'Preencha os campos com dados válidos' });
        }

        // Verifica se os dados da estante já existem

        const nameExists = await Bookshelve.findOne({ name: name });

        if (nameExists && nameExists.id != bookshelveId) {
            return res.status(422).json({ message: 'Nome já cadastrado' });
        }

        // atualiza a estante

        const updatedBookshelve = new Bookshelve({ name });
        updatedBookshelve.id = bookshelveId;

        await updatedBookshelve.update();

        res.json({ message: 'Estante atualizada com sucesso', updatedBookshelve });
    } catch (error) {
        next(new Error('Erro interno ao editar estante'));
    }

};

module.exports.deleteBookshelve = async (req, res, next) => {
    const bookshelveId = req.params.id

    try {
        const existingBookshelve = await Bookshelve.findOne({ id: bookshelveId });

        if (!existingBookshelve) {
            return res.status(404).json({ error: 'Estante não encontrada' });
        }

        const hasReferences = await Bookshelve.hasReferences('books', 'bookshelve_id', bookshelveId);

        if (hasReferences) {
            return res.status(400).json({ error: 'Não é possível excluir a estante, pois há livros associados a ela.' });
        }

        Bookshelve.deleteById(bookshelveId)

        res.json({ message: 'Estante excluida com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir Estante'));
    }

};