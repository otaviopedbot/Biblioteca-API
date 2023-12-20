const Publisher = require('../models/Publisher');

// visualizações:

module.exports.index = (req, res) => {
    Publisher.getAll((err, publishers) => {
        if (err) {
            console.error('Erro ao obter editoras:', err);
        } else {
            res.render('publishers/index', { publishers });
        }
    });
};

module.exports.showPublisher = (req, res) => {
    const publisherId = req.params.id;

    Publisher.getById(publisherId, (err, publisher) => {
        if (err) {
            console.log('Erro ao obter editora por ID:', err);
        } else {
            res.render('publishers/show', { publisher });
        }
    });
};


module.exports.renderEditForm = (req, res) => {
    const publisherId = req.params.id;

    Publisher.getById(publisherId, (err, publisher) => {
        if (err) {
            console.log('Erro ao obter editora por ID:', err);
            return;
        }

        if (!publisher) {
            console.log('editora não encontrada');
            res.redirect('/publishers');
            return;
        }

        res.render('publishers/edit', { publisher });
    });
};


module.exports.renderNewForm = (req, res) => {
    res.render('publishers/new')
}


// metodos:


module.exports.createPublisher = async (req, res) => {

    const newPublisher = new Publisher(req.body);

    newPublisher.save((err, savedPublisher) => {
        if (err) {
            console.error('Erro ao criar editora:', err);
        } else {
            console.log('editora criado com sucesso:', savedPublisher);

            res.redirect('/publishers');
        }
    });
};


module.exports.editPublisher = (req, res) => {
    const publisherId = req.params.id;
    const { name, phone } = req.body;

    const updatedPublisher = new Publisher({ name, phone });
    updatedPublisher.id = publisherId;

    updatedPublisher.update((err, result) => {
        if (err) {
            console.log('Erro ao atualizar editora:', err);
        } else {
            console.log('editora atualizada com sucesso:', result);
            res.redirect(`/Publishers/${publisherId}`);
        }
    });
};


module.exports.deletePublisher = (req, res) => {
    const publisherId = req.params.id

    Publisher.deleteById(publisherId, (err) => {
        if (err) {
            console.log('Erro ao excluir editora:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            console.log('editora excluída com sucesso.');
            res.redirect('/publishers');
        }
    });

};