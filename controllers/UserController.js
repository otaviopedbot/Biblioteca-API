const User = require('../models/User');
const { use } = require('../routes/customers');

// visualizações:

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
                return res.json(User);
            }
            return res.status(404).json({ message: 'Usuário não encontrado' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Erro interno ao obter Usuário por ID', error: error });
        });

};

//login / loggout

module.exports.login = (req, res) => {



};

//operações

module.exports.createUser = async (req, res, next) => {
    let { username, email, password } = req.body;

    try {

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

        if (usernameExists || emailExists) {
            if (usernameExists) {
                return res.status(422).json({ message: 'Nome de usuário já cadastrado' });
            }

            if (emailExists) {
                return res.status(422).json({ message: 'E-mail já cadastrado' });
            }
        }

        // Salva o usuário

        const newUser = new User({ username, email, password });

        const savedUser = await newUser.save();

        res.json({ message: 'Usuário criado com sucesso', savedUser });
    } catch (error) {
        next(new Error('Erro interno ao criar Usuário'));
    }
};

module.exports.editUser = async (req, res, next) => {
    const userId = req.params.id;
    let { username, email, password } = req.body

    try {
        const existingUser = await User.findOne({ id: userId });

        if (!existingUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (!username || !email || !password) {
            return res.status(422).json({ message: 'Preencha todos os campos' });
        }

        username = username.trim();
        email = email.trim();
        password = password.trim();

        // Verifica se os dados do usuário já existem

        const usernameExists = await User.findOne({ username: username });
        const emailExists = await User.findOne({ email: email });

        if (usernameExists || emailExists) {
            if (usernameExists) {
                return res.status(422).json({ message: 'Nome de usuário já cadastrado' });
            }

            if (emailExists) {
                return res.status(422).json({ message: 'E-mail já cadastrado' });
            }
        }

        const updatedUser = new User({ username, email, password });
        updatedUser.id = userId;

        await updatedUser.update();

        res.json({ message: 'Usuário atualizado com sucesso', updatedUser });
    } catch (error) {
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