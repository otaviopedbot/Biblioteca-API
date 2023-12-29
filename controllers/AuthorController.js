const Author = require('../models/Author');

// visualizações:

module.exports.index = (req, res) => {
    Author.getAll((err, authors) => {
        if (err) {
            res.status(500).json({ error: 'Erro interno ao obter autores', message: err.message });
        } else {
            res.json(authors);
        }
    });
};

module.exports.showAuthor = (req, res) => {
    const authorId = req.params.id;

    Author.getById(authorId, (err, author) => {
        if (err) {
            res.status(500).json({ error: 'Erro interno ao obter autor por ID', message: err.message });
        } else {
            if (author && author.length > 0) {
                res.json(author);
            } else {
                res.status(404).json({ error: 'Autor não encontrado' });
            }
        }
    });
};


// module.exports.renderEditForm = (req, res) => {
//     const authorId = req.params.id;

//     Author.getById(authorId, (err, author) => {

//         if (err) {
//             throw new Error('Erro ao obter autor por ID: ', err);
//         } else {
//             if (author && author.length > 0) {
//                 res.render('authors/edit', { author });
//             } else {
//                 throw new Error('autor não encontrado: ', err);
//             }
//         }
//     });
// };

// module.exports.renderNewForm = (req, res) => {
//     res.render('authors/new')
// }


// metodos:


module.exports.createAuthor = async (req, res) => {

    try{
        const newAuthor = new Author(req.body);

        newAuthor.save((err, savedAuthor) => {
            if (err) {
                throw new Error('Erro ao criar autor:', err);
            }
            res.json({ message: 'Autor criado com sucesso:', savedAuthor });
        });
    } catch (err){
        throw new Error('Erro ao criar autor:', err);
    }

};

module.exports.editAuthor = (req, res) => {
    const authorId = req.params.id;
    const { name } = req.body;

    const updatedAuthor = new Author({ name });
    updatedAuthor.id = authorId;

    updatedAuthor.update((err, result) => {
        if (err) {
            throw new Error('Erro ao atualizar autor:', err);
        }
        res.json({ message: 'Autor atualizado com sucesso:', result });

    });
};

module.exports.deleteAuthor = (req, res) => {
    const authorId = req.params.id

    Author.deleteById(authorId, (err) => {
        if (err) {
            throw new Error('Erro ao excluir autor:', err);
        }
        res.json({ message: 'Autor excluido com sucesso' });

    });

};