const Bookshelve = require('../models/Bookshelve');

// visualizações:

module.exports.index = (req, res) => {
    Bookshelve.getAll((err, bookshelves) => {
        if (err) {
            console.error('Erro ao obter estantes:', err);
        } else {
            res.render('bookshelves/index', { bookshelves });
        }
    });
};

module.exports.showBookshelve = (req, res) => {
    const bookshelveId = req.params.id;

    Bookshelve.getById(bookshelveId, (err, bookshelve) => {
        if (err) {
            console.log('Erro ao obter estante por ID:', err);
        } else {
            res.render('bookshelves/show', { bookshelve });
        }
    });
};


module.exports.renderEditForm = (req, res) => {
    const bookshelveId = req.params.id;

    Bookshelve.getById(bookshelveId, (err, bookshelve) => {
        if (err) {
            console.log('Erro ao obter estante por ID:', err);
            return;
        }

        if (!bookshelve) {
            console.log('Estante não encontrada');
            res.redirect('/bookshelves');
            return;
        }

        res.render('bookshelves/edit', { bookshelve });
    });
};


module.exports.renderNewForm = (req, res) => {
    res.render('bookshelves/new')
}


// metodos:


module.exports.createBookshelve = async (req, res) => {

    const newBookshelve = new Bookshelve(req.body);

    newBookshelve.save((err, savedBookshelve) => {
        if (err) {
            console.error('Erro ao criar estante:', err);
        } else {
            console.log('Estante criada com sucesso:', savedBookshelve);

            res.redirect('/bookshelves');
        }
    });
};


module.exports.editBookshelve = (req, res) => {
    const bookshelveId = req.params.id;
    const { name } = req.body;

    const updatedBookshelve = new Bookshelve({ name });
    updatedBookshelve.id = bookshelveId;

    updatedBookshelve.update((err, result) => {
        if (err) {
            console.log('Erro ao atualizar estante:', err);
        } else {
            console.log('Estante atualizada com sucesso:', result);
            res.redirect(`/bookshelves/${bookshelveId}`);
        }
    });
};


module.exports.deleteBookshelve = (req, res) => {
    const bookshelveId = req.params.id

    Bookshelve.deleteById(bookshelveId, (err) => {
        if (err) {
            console.log('Erro ao excluir autor:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            console.log('estante excluída com sucesso.');
            res.redirect('/bookshelves');
        }
    });

};