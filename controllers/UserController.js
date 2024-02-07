const User = require('../models/User');
const Favorite = require('../models/Favorite');
const Book = require('../models/Book');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//login

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ message: 'Preencha todos os campos' });
    }

    // verifica se o usuario existe

    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(404).json({ message: 'E-mail não cadastrado' });
    }

    // verifica se a senha é correta

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({ message: 'Senha incorreta' });
    }

    const secret = process.env.SECRET
    const expiresIn = '1h'

    try {

        const token = jwt.sign(
            {
                id: user.id
            },
            secret,
            {
                expiresIn
            },

        )
        res.status(200).json({ message: "Autenticação realizada com sucesso", token, user })

    } catch {
        next(new Error('Erro interno ao logar Usuário'));
    }

};

visualizações:

module.exports.index = (req, res) => {

    User.getAll()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.json({ 'message': 'Erro interno ao obter Usuários', error: error });
        });

};

module.exports.showUser = (req, res) => {
    const UserId = req.params.id;

    User.getById(UserId)
        .then(User => {
            if (User.length > 0) {
                return res.json(User[0]);
            }
            return res.status(404).json({ message: 'Usuário não encontrado' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Erro interno ao obter Usuário por ID', error: error });
        });

};

module.exports.showUserByUsername = async (req, res) => {
    const username = req.params.username;

    const user = await User.findOne({ username: username })
    try {

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro interno ao obter Usuário pelo username', error: error });
    };

};

//operações:

module.exports.createUser = async (req, res, next) => {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(422).json({ message: 'Preencha todos os campos' });
    }

    username = username.trim();
    email = email.trim();
    password = password.trim();

    if (username === '' || email === '' || password === '') {
        return res.status(422).json({ message: 'Preencha os campos com dados válidos' });
    }

    // Verifica se o usuário existe

    const usernameExists = await User.findOne({ username: username });
    const emailExists = await User.findOne({ email: email });

    if (usernameExists) {
        return res.status(422).json({ message: 'Nome de usuário já cadastrado' });
    }

    if (emailExists) {
        return res.status(422).json({ message: 'E-mail já cadastrado' });
    }

    // Cria senha

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Cria o usuário

    const user = new User({
        username,
        email,
        password: passwordHash,
    });

    try {

        await user.save()

        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao criar Usuário'));
    }
};

module.exports.editUser = async (req, res, next) => {

    const userId = req.params.id;
    let { username, email, password, image, details } = req.body

    const existingUser = await User.findOne({id: userId});

    if (userId != req.user.id) {
        return res.status(404).json({ message: 'Você não pode editar este Usuário' });
    }

    if (!existingUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (!username || !email || !password) {
        return res.status(422).json({ message: 'Preencha todos os campos' });
    }

    username = username.trim();
    email = email.trim();
    password = password.trim();
    if (image) {
        image = image.trim();
    }
    if (details) {
        details = details.trim();
    }

    // Verifica se os campos estão vazios

    if (username === '' || email === '' || password === '') {
        return res.status(422).json({ message: 'Preencha os campos com dados válidos' });
    }

    // Verifica se os dados do usuário já existem

    const usernameExists = await User.findOne({ username: username });
    const emailExists = await User.findOne({ email: email });

    if (usernameExists && usernameExists.id != userId) {
        return res.status(422).json({ message: 'Nome de usuário já cadastrado' });
    }

    if (emailExists && emailExists.id != userId) {
        return res.status(422).json({ message: 'E-mail já cadastrado' });
    }

    try {
        // Verifica se a senha mudou e cria a senha hash

        if (password != existingUser.password) {
            const salt = await bcrypt.genSalt(12)
            password = await bcrypt.hash(password, salt)
        }

        // atualiza usuario

        const updatedUser = new User({ username, email, password, image, details });
        updatedUser.id = userId;

        await updatedUser.update();

        res.json({ message: 'Usuário atualizado com sucesso', updatedUser });
    } catch (error) {
        console.log(error)
        next(new Error('Erro interno ao editar Usuário'));
    }

};

module.exports.deleteUser = async (req, res, next) => {
    const userId = req.params.id

    try {
        const existingUser = await User.findOne({ id: userId });

        if (!existingUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        User.deleteById(userId)

        res.json({ message: 'Usuário excluido com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir Usuário'));
    }

};


// funções de Livros favoritos

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

        // Verificar se o usuário possui favoritos
        if (!favorites || favorites.length === 0) {
            return res.status(404).json({ message: 'Usuário ainda não possui livros favoritos' });
        }

        // Mapear todas as chamadas de Book.getById() em um array de promessas
        const bookPromises = favorites.map(async (item) => {
            const book = await Book.getById(item.book_id);
            return book[0];
        });

        // Aguardar a resolução de todas as promessas
        const userFavorites = await Promise.all(bookPromises);

        // Retorna os favoritos do usuário em um array json
        res.json(userFavorites);

    } catch (error) {
        res.status(500).json({ message: 'Erro interno ao obter Favoritos do Usuário por ID', error: error });
    }
};


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

module.exports.editFavorite = async (req, res, next) => {

    const userId = req.params.id;
    const { book_id } = req.body;
    const favoriteId = req.params.favoriteId;

    // Verifica se todos os campos foram preenchidos corretamente
    if (!book_id || book_id <= 0 || !favoriteId || favoriteId <= 0) {
        return res.status(422).json({ message: 'Preencha todos os campos com valores válidos' });
    }

    try {
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

        // Verifica se o favorito já existe
        const favoriteExists = await Favorite.findOne({ user_id: userId, book_id: book_id });
        if (favoriteExists) {
            return res.status(404).json({ message: 'Favorito já cadastrado' });
        }

        // Atualiza o favorito
        const updatedFavorite = new Favorite({ user_id: userId, book_id });
        updatedFavorite.id = favoriteId;

        await updatedFavorite.update();

        res.json({ message: 'Favorito atualizado com sucesso', updatedFavorite });
    } catch (error) {
        console.log(error);
        next(new Error('Erro interno ao editar Favorito'));
    }
};

module.exports.deleteFavorite = async (req, res, next) => {
    const favoriteId = req.params.favoriteId;

    try {
        const existingFavorite = await Favorite.findOne({ id: favoriteId });

        if (!existingFavorite) {
            return res.status(404).json({ message: 'Favorito não encontrado' });
        }

        // Deletar o favorito
        await Favorite.deleteById(favoriteId);

        res.json({ message: 'Favorito excluído com sucesso' });
    } catch (error) {
        next(new Error('Erro interno ao excluir Favorito'));
    }
};