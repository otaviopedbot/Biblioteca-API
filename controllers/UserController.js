const User = require('../models/User');
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
    // const expiresIn = '1h'

    try {

        const token = jwt.sign(
            {
                id: user.id
            },
            secret,
            // {
            //     expiresIn
            // },

        )
        res.status(200).json({ message: "Autenticação realizada com sucesso", token, user })

    } catch {
        next(new Error('Erro interno ao logar Usuário'));
    }

};

//visualizações:

module.exports.index =  async (req, res) => {
    const {page, pageSize} = req.query;

    try {
        const users = await User.getAll(page, pageSize);
        const detailedUsers = await Promise.all(users.map(async (user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                is_admin: user.is_admin,
            };
        }));

        if (page && pageSize) {

            const total_items = await User.countTotal()
            res.json({
                data: detailedUsers,
                total_items: total_items
            });
        } else {
            res.json(detailedUsers);
        }
    } catch (error) {
        res.json({ 'message': 'Erro interno ao obter Usuários', error: error });
    }

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

    const existingUser = await User.findOne({ id: userId });

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