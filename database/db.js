const mysql = require('mysql');
const createTables = require('./CreateTables')
const createAdmin = require('./CreateAdmin')


const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

function connectWithRetry() {
    db.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados: ', err);
            console.log('Tentando novamente em 3 segundos...');
            setTimeout(connectWithRetry, 3000); // Tenta novamente após 3 segundos
        } else {
            console.log('Conectado ao banco de dados');

            createTables.CreateTables(db)
            createAdmin.CreateAdmin(db)
        }
    });
}

connectWithRetry();

module.exports = db;