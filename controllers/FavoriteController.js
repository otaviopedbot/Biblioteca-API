const User = require('../models/User');
const Favorite = require('../models/Favorite');
const Book = require('../models/Book');


//visualizações:

module.exports.showUserFavorites = async (req, res) => {
    const userId = req.params.id;

    try {
        // Obter o usuário pelo ID
        const user = await User.getById(userId);

        // Verificar se o usuário existe
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Encontrar os favoritos do usuário pelo ID do usuário
        const favorites = await Favorite.find({ user_id: userId });

        // Mapear todas as chamadas de Book.getById() em um array de promessas
        const bookPromises = favorites.map(async (item) => {
            const book = await Book.getById(item.book_id);
            return { book: book[0], favorite_id: item.id }; // Incluir o ID do favorito no objeto retornado
        });

        // Aguardar a resolução de todas as promessas
        const userFavorites = await Promise.all(bookPromises);

        // Retorna os favoritos do usuário em um array json
        res.json(userFavorites);

    } catch (error) {
        res.status(500).json({ message: 'Erro interno ao obter Favoritos do Usuário por ID', error: error });
    }
};

//operações:

module.exports.createFavorite = async (req, res, next) => {

    const userId = req.params.id
    const { book_id } = req.body;

    if (!book_id || book_id <= 0) {
        return res.status(422).json({ message: 'Preencha todos os campos com valores válidos' });
    }

    // Verifica se o usuário existe

    const userExists = await User.getById(userId);

    if (!userExists || Object.keys(userExists).length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se o livro existe

    const bookExists = await Book.getById(book_id);

    if (!bookExists || Object.keys(bookExists).length === 0) {
        return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Verifica se o livro já foi favoritado pelo usuario

    const favoritedBook = await Favorite.findOne({ user_id: userId, book_id: book_id });

    if (favoritedBook) {
        return res.status(404).json({ message: 'Livro já favoritado' });
    }

    // Verifica se o usuario já possui 3 livros favoritos

    const favoritedBooksLimit = await Favorite.find({ user_id: userId });

    if (favoritedBooksLimit.length == 3) {
        return res.status(404).json({ message: 'Limite de favoritos atingido pelo usuário' });
    }

    // Cria o favorito

    const favorite = new Favorite({
        user_id: userId,
        book_id: book_id,
    });

    try {
        await favorite.save()

        res.status(201).json({ message: 'Livro favoritado com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao favoritar livro' + error));
    }
};

// module.exports.editFavorite = async (req, res, next) => {

//     const userId = req.params.id;
//     const { book_id } = req.body;
//     const favoriteId = req.params.favoriteId;

//     // Verifica se todos os campos foram preenchidos corretamente
//     if (!book_id || book_id <= 0 || !favoriteId || favoriteId <= 0) {
//         return res.status(422).json({ message: 'Preencha todos os campos com valores válidos' });
//     }

//     try {
//         // Verifica se o usuário existe
//         const userExists = await User.getById(userId);
//         if (!userExists || Object.keys(userExists).length === 0) {
//             return res.status(404).json({ message: 'Usuário não encontrado' });
//         }

//         // Verifica se o livro existe
//         const bookExists = await Book.getById(book_id);
//         if (!bookExists || Object.keys(bookExists).length === 0) {
//             return res.status(404).json({ message: 'Livro não encontrado' });
//         }

//         // Verifica se o favorito já existe
//         const favoriteExists = await Favorite.findOne({ user_id: userId, book_id: book_id });
//         if (favoriteExists) {
//             return res.status(404).json({ message: 'Favorito já cadastrado' });
//         }

//         // Atualiza o favorito
//         const updatedFavorite = new Favorite({ user_id: userId, book_id });
//         updatedFavorite.id = favoriteId;

//         await updatedFavorite.update();

//         res.json({ message: 'Favorito atualizado com sucesso', updatedFavorite });
//     } catch (error) {
//         console.log(error);
//         next(new Error('Erro interno ao editar Favorito'));
//     }
// };

module.exports.deleteFavorite = async (req, res, next) => {
    const bookId = req.params.bookId;
    const id = req.params.id;

    try {

        const existingFavorite = await Favorite.findOne({ user_id: id, book_id: bookId });

        console.log(existingFavorite)

        if (!existingFavorite) {
            return res.status(404).json({ message: 'Favorito não encontrado' });
        }

        // Deletar o favorito
        await Favorite.deleteById(existingFavorite.id);

        res.json({ message: 'Favorito excluído com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir Favorito'));
    }
};