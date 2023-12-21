const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'db',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'library'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados');
    }
});

module.exports = db;