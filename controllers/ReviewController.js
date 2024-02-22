const User = require('../models/User');
const Review = require('../models/Review');
const Book = require('../models/Book');


//visualizações:

module.exports.showBookReviews = async (req, res) => {
    const bookId = req.params.id;
    const { page, pageSize } = req.query;


    try {
        // Obter o Livro pelo ID
        const book = await Book.getById(bookId);

        // Verificar se o Livro existe
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // Encontrar as avaliações do Livro pelo ID do Livro
        const reviews = await Review.getById(bookId, page, pageSize);

        // Verificar se o livro possui avaliações
        if (!reviews || reviews.length === 0) {
            return res.status(202).json({ message: 'O Livro ainda não possui avaliações' });
        }

        // Mapear todas as avaliações para adicionar o nome do usuário
        const reviewsWithUsernames = await Promise.all(reviews.map(async (review) => {
            const user = await User.getById(review.user_id);
            if (user) {
                review.username = user[0].username;
            }
            return review;
        }));


        if (page && pageSize) {

            const total_items = await Review.countTotal(bookId)
            
            res.json({
                data: reviewsWithUsernames,
                total_items: total_items
            });
        } else {
            res.json(reviewsWithUsernames);
        }






    } catch (error) {
        res.status(500).json({ message: 'Erro interno ao obter avaliações do livro por ID', error: error });
    }
};

//operações:

module.exports.createReview = async (req, res, next) => {

    const bookId = req.params.id
    let { user_id, body, rating } = req.body;

    // Verifica se o livro existe

    const bookExists = await Book.getById(bookId);

    if (!bookExists || Object.keys(bookExists).length === 0) {
        return res.status(404).json({ message: 'Livro não encontrado' });
    }

    if (!user_id || !body || rating < 0 ) {
        return res.status(422).json({ message: 'Preencha todos os campos' });
    }

    body = body.trim();

    if (body === '' || user_id <= 0 || rating < 0) {
        return res.status(422).json({ message: 'Preencha os campos com dados válidos' });
    }

    // Verifica se o usuário existe

    const userExists = await User.getById(user_id);

    if (!userExists || Object.keys(userExists).length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se o livro já foi avaliado pelo usuario

    const reviewedBook = await Review.findOne({ user_id: user_id, book_id: bookId });

    if (reviewedBook) {
        return res.status(404).json({ message: 'Livro já avaliado' });
    }

    // Cria o favorito

    const review = new Review({
        user_id,
        book_id: bookId,
        body: body,
        rating: rating
    }); 

    try {
        await review.save()

        res.status(201).json({ message: 'Livro avaliado com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao avaliar livro' + error));
    }
};

module.exports.editReview = async (req, res, next) => {
    let { body, rating } = req.body;
    const userId = req.params.userId;
    const bookId = req.params.id;

    // Verifica se todos os campos foram preenchidos corretamente
    if (!userId || !body || !rating) {
        return res.status(422).json({ message: 'Preencha todos os campos' });
    }

    body.trim()

    if (body == '', userId <= 0) {
        return res.status(422).json({ message: 'Preencha os campos com valores validos' });
    }

    try {

        // Verifica se o livro existe
        const book = await Book.getById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // Verifica se o review existe
        const review = await Review.findOne({user_id: userId, book_id: bookId});

        if (!review) {
            return res.status(404).json({ message: 'Avaliação não encontrada' });
        }

        // Verifica se o usuário existe
        const user = await User.getById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Atualiza o review

        const updatedReview = new Review({
            book_id: bookId,
            user_id: userId,
            body,
            rating
        })

        updatedReview.id = review.id

        await updatedReview.update();

        res.json({ message: 'Avaliação atualizada com sucesso', updatedReview: updatedReview });
    } catch (error) {
        console.log(error);
        next(new Error('Erro interno ao editar Avaliação'));
    }
};

module.exports.deleteReview = async (req, res, next) => {
    const bookId = req.params.id
    const userId = req.params.userId;

    try {
        const existingReview = await Review.findOne({ user_id: userId, book_id: bookId});

        if (!existingReview) {
            return res.status(404).json({ message: 'Avaliação não encontrada' });
        }

        // Deletar a avaliação
        await Review.deleteById(existingReview.id);

        res.json({ message: 'Avaliação excluída com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir Avaliação'));
    }
};