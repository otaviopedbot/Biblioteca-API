const con = require('../database/db');
const bcrypt = require('bcrypt');
const salts = 10;

con.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o banco de dados:', err);
    } else {
        try {
            const password = '1234';
            const passwordHash = bcrypt.hashSync(password, salts);

            const checkAdminQuery = `SELECT * FROM users WHERE email = 'admin@library.com'`;
            con.query(checkAdminQuery, (err, result) => {
                if (err) {
                    console.error('Erro ao verificar usuário administrador:', err);
                } else if (result.length > 0) {
                    console.log('Usuário administrador já existe');
                } else {
                    const insertAdminQuery = `INSERT INTO users (email, username, password, img, description ,admin) VALUES ('admin@library.com', 'admin', '${passwordHash}', 'HAAHAAHA', 'Eu amo livros HAHAHAHAHAH','1')`;

                    con.query(insertAdminQuery, (err, result) => {
                        if (err) {
                            console.error('Erro ao inserir usuário administrador:', err);
                        } else {
                            console.log('Usuário administrador inserido com sucesso');
                        }
                    });
                }
            });
        } catch (err) {
            console.error('Erro inesperado:', err);
        }
    }
});

module.exports = con;
