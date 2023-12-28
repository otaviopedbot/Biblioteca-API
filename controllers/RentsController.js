const Rent = require('../models/Rent');


// visualizações:

module.exports.index = (req, res) => {
    Rent.getAll((err, rents) => {
        if (err) {
            console.error('Erro ao obter emprestimos:', err);
        } else {
            res.render('rents/index', { rents });
        }
    });
};

module.exports.showRent = (req, res) => {
    const rentsId = req.params.id;

    Rent.getById(rentsId, (err, rent) => {
        if (err) {
            throw new Error('Erro ao obter emprestimo por ID:', err);
        } else {
            res.render('rents/show', { rent });
        }
    });
};

module.exports.renderEditForm = (req, res) => {
    const rentsId = req.params.id;

    Rent.getById(rentsId, (err, rent) => {
        if (err) {
            throw new Error('Erro ao obter emprestimo por ID:', err);
            return;
        }

        if (!rent) {
            throw new Error('emprestimo não encontrado');
            res.redirect('/rents');
            return;
        }

        res.render('rents/edit', { rent });
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render('rents/new')
}


// metodos:


module.exports.createRent = (req, res) => {
    const newrent = new Rent(req.body);

    newrent.save((err, savedRent) => {
        if (err) {
            throw new Error('Erro ao criar emprestimo:', err.message);
        } else {
            console.log('emprestimo criado com sucesso:', savedRent);
            res.redirect('/rents');
        }
    });
};


module.exports.editRent = (req, res) => {
    const rentsId = req.params.id;
    const { date, customer_id, book_id } = req.body;

    const updatedrents = new Rent({ date, customer_id, book_id });
    updatedrents.id = rentsId;

    updatedrents.update((err, result) => {
        if (err) {
            throw new Error('Erro ao atualizar emprestimo:', err);
        } else {
            console.log('emprestimo atualizado com sucesso:', result);
            res.redirect(`/rents/${rentsId}`);
        }
    });
};


module.exports.deleteRent = (req, res) => {
    const rentsId = req.params.id

    Rent.deleteById(rentsId, (err) => {
        if (err) {
            throw new Error('Erro ao excluir emprestimo:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            console.log('emprestimo excluído com sucesso.');
            res.redirect('/rents');
        }
    });

};
