const db = require('./db');
const bcrypt = require('bcryptjs');

module.exports.CreateAdmin = async () => {

    //Admin

    const username = 'admin'
    const email = 'admin@mail.com'
    const password = 'admin'
    const image = 'https://t3.ftcdn.net/jpg/00/65/75/68/240_F_65756860_GUZwzOKNMUU3HldFoIA44qss7ZIrCG8I.jpg'
    const details = 'Usuário admin'

    try {
        // Cria senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // Cadastra o usuário
        db.query(
            `INSERT IGNORE INTO users (email, username, password, is_admin, image, details) 
                VALUES ('${email}', '${username}', '${passwordHash}', 1, '${image}', '${details}' );
                `,
            (err, result) => {
                if (err) {
                    throw err;
                }
                console.log("Usuário administrador criado com sucesso");
            });

    } catch (error) {
        throw Error('Erro interno ao criar Usuário Administrador');
    }
}
