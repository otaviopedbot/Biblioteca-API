const UserDetails = require('../models/UserDetails');

// visualizações:

module.exports.showUserDetails = (req, res) => {
    const UserDetailsId = req.params.id;

    UserDetails.getById(UserDetailsId)
        .then(UserDetails => {
            if (UserDetails.length > 0) {
                return res.json(UserDetails);
            }
            return res.status(404).json({ message: 'Detalhes do Usuário não encontrados' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Erro interno ao obter Detalhes do Usuário por ID', error: error });
        });

};

// operações:

module.exports.createUserDetails = async (req, res, next) => {
    let { UserDetailsname, email, password } = req.body;

    try {

        if (!UserDetailsname || !email || !password) {
            return res.status(422).json({ message: 'Preencha todos os campos' });
        }

        UserDetailsname = UserDetailsname.trim();
        email = email.trim();
        password = password.trim();

        if (UserDetailsname === '' || email === '' || password === '') {
            return res.status(422).json({ message: 'Preencha os campos com dados válidos' });
        }

        // Verifica se o Detalhes do usuário existe

        const UserDetailsnameExists = await UserDetails.findOne({ UserDetailsname: UserDetailsname });
        const emailExists = await UserDetails.findOne({ email: email });

        if (UserDetailsnameExists) {
            return res.status(422).json({ message: 'Nome de Detalhes do usuário já cadastrado' });
        }

        if (emailExists) {
            return res.status(422).json({ message: 'E-mail já cadastrado' });
        }

        // Salva o Detalhes do usuário

        const newUserDetails = new UserDetails({ UserDetailsname, email, password });

        const savedUserDetails = await newUserDetails.save();

        res.json({ message: 'Detalhes do Usuário criado com sucesso', savedUserDetails });
    } catch (error) {
        next(new Error('Erro interno ao criar Detalhes do Usuário'));
    }
};

module.exports.editUserDetails = async (req, res, next) => {
    const UserDetailsId = req.params.id;
    let { UserDetailsname, email, password } = req.body

    try {
        const existingUserDetails = await UserDetails.findOne({ id: UserDetailsId });

        if (!existingUserDetails) {
            return res.status(404).json({ error: 'Detalhes do Usuário não encontrado' });
        }

        if (!UserDetailsname || !email || !password) {
            return res.status(422).json({ message: 'Preencha todos os campos' });
        }

        UserDetailsname = UserDetailsname.trim();
        email = email.trim();
        password = password.trim();

        // Verifica se os dados do Detalhes do usuário já existem

        const UserDetailsnameExists = await UserDetails.findOne({ UserDetailsname: UserDetailsname });
        const emailExists = await UserDetails.findOne({ email: email });

        if (UserDetailsnameExists && UserDetailsnameExists.id != UserDetailsId) {
            return res.status(422).json({ message: 'Nome de Detalhes do usuário já cadastrado' });
        }

        if (emailExists && emailExists.id != UserDetailsId) {
            return res.status(422).json({ message: 'E-mail já cadastrado' });
        }

        // atualiza usuario

        const updatedUserDetails = new UserDetails({ UserDetailsname, email, password });
        updatedUserDetails.id = UserDetailsId;

        await updatedUserDetails.update();

        res.json({ message: 'Detalhes do Usuário atualizado com sucesso', updatedUserDetails });
    } catch (error) {
        next(new Error('Erro interno ao editar Detalhes do Usuário'));
    }

};