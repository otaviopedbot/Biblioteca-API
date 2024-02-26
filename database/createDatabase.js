// const db = require('./db');


// //criação da tabela authors
// db.connect(() => {

//     const query = `
//         CREATE TABLE IF NOT EXISTS authors (
//         id INT NOT NULL AUTO_INCREMENT,
//         name VARCHAR(45) NOT NULL,
//         PRIMARY KEY (id),
//         UNIQUE KEY name (name)
//     );`;

//     db.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Tabela authors criada");
//     });

// });

// //criação da tabela book_publishers
// db.connect(() => {

//     const query = `
//     CREATE TABLE IF NOT EXISTS book_publishers (
//         id INT NOT NULL AUTO_INCREMENT,
//         publisher_id INT NOT NULL,
//         book_id INT NOT NULL,
//         PRIMARY KEY (id),
//         KEY book_id (book_id),
//         KEY publisher_id (publisher_id),
//         CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES books (id),
//         CONSTRAINT fk_publisher_id FOREIGN KEY (publisher_id) REFERENCES publishers (id)
//       );`;

//     db.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Tabela book_publishers criada");
//     });

// });

// //criação da tabela books
// db.connect(() => {

//     const query = `
//     CREATE TABLE books (
//         id INT NOT NULL AUTO_INCREMENT,
//         title VARCHAR(45) NOT NULL,
//         page INT NOT NULL,
//         quantity INT NOT NULL,
//         author_id INT NOT NULL,
//         bookshelve_id INT NOT NULL,
//         synopsis TEXT,
//         cover TEXT,
//         PRIMARY KEY (id),
//         UNIQUE KEY title (title),
//         KEY author_id (author_id),
//         KEY bookshelve_id (bookshelve_id),
//         CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES authors (id),
//         CONSTRAINT fk_bookshelve FOREIGN KEY (bookshelve_id) REFERENCES bookshelves (id)
//     );`;

//     db.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Tabela books criada");
//     });

// });

// //criação da tabela bookshelves
// db.connect(() => {

//     const query = `
//     CREATE TABLE bookshelves (
//         id INT NOT NULL AUTO_INCREMENT,
//         name VARCHAR(45) NOT NULL,
//         PRIMARY KEY (id),
//         UNIQUE KEY name (name)
//     );`;

//     db.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Tabela bookshelves criada");
//     });

// });

// //criação da tabela customers
// db.connect(() => {

//     const query = `
//     CREATE TABLE IF NOT EXISTS customers (
//         id INT NOT NULL AUTO_INCREMENT,
//         name VARCHAR(45) NOT NULL,
//         phone VARCHAR(45) DEFAULT NULL,
//         address VARCHAR(45) NOT NULL,
//         PRIMARY KEY (id),
//         UNIQUE KEY name (name)
//       );`;

//     db.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Tabela customers criada");
//     });

// });

// //criação da tabela publishers
// db.connect(() => {

//     const query = `
//     CREATE TABLE IF NOT EXISTS publishers (
//         id INT NOT NULL AUTO_INCREMENT,
//         name VARCHAR(45) NOT NULL,
//         phone VARCHAR(45) NOT NULL,
//         PRIMARY KEY (id),
//         UNIQUE KEY name (name)
//     );`;

//     db.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Tabela publishers criada");
//     });

// });

// //seeds da tabela publishers
// db.connect(() => {

//     const query = `
//     INSERT INTO publishers (id, name, phone) VALUES 
//     (1, 'Editora Magia', '111-111-1111'),
//     (2, 'Editora dos Tronos', '222-222-2222'),
//     (3, 'Editora do Medo', '333-333-3333'),
//     (4, 'Editora da Floresta', '444-444-4444'),
//     (5, 'Editora da Aventura', '555-555-5555'),
//     (6, 'Editora do Mistério', '666-666-6666'),
//     (7, 'Editora do Amor', '777-777-7777'),
//     (8, 'Editora dos Deuses', '888-888-8888'),
//     (9, 'Editora da Solidão', '999-999-9999'),
//     (10, 'Editora do Complexo', '101-101-1010'),
//     (11, 'Editora da Cor', '202-202-2020'),
//     (12, 'Editora da Lei', '303-303-3030'),
//     (13, 'Editora do Mar', '404-404-4040'),
//     (14, 'Editora do Encanto', '505-505-5050'),
//     (15, 'Editora do Conto', '606-606-6060'),
//     (16, 'Editora do Código', '707-707-7070'),
//     (17, 'Editora dos Espíritos', '808-808-8080'),
//     (18, 'Editora do Nunca', '909-909-9090'),
//     (19, 'Editora do Para Sempre', '010-010-1010'),
//     (20, 'Editora dos Dinossauros', '014-014-1014');`;

//     db.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("seeds de publishers criadas");
//     });

// });

// //criação da tabela rents
// db.connect(() => {

//     const query = `
//     CREATE TABLE rents (
//         id INT NOT NULL AUTO_INCREMENT,
//         date DATE DEFAULT NULL,
//         customer_id INT NOT NULL,
//         book_id INT NOT NULL,
//         PRIMARY KEY (id),
//         KEY book_id (book_id),
//         KEY customer_id (customer_id),
//         CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES books(id),
//         CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers(id)
//     );`;

//     db.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Tabela rents criada");
//     });

// });

// //criação da tabela user_book_reviews
// db.connect(() => {

//     const query = `
//     CREATE TABLE user_book_reviews (
//         id INT(11) NOT NULL AUTO_INCREMENT,
//         rating INT(11) NOT NULL,
//         body VARCHAR(255) DEFAULT NULL,
//         user_id INT(11) NOT NULL,
//         book_id INT(11) DEFAULT NULL,
//         PRIMARY KEY (id),
//         KEY fk_book_id (book_id),
//         KEY user_book_reviews_ibfk_1 (user_id),
//         CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES books (id),
//         CONSTRAINT user_book_reviews_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
//     );`;

//     db.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Tabela user_book_reviews criada");
//     });

// });

// //criação da tabela user_favorite_books
// db.connect(() => {

//     const query = `
//     CREATE TABLE IF NOT EXISTS user_favorite_books (
//         id INT NOT NULL AUTO_INCREMENT,
//         user_id INT,
//         book_id INT,
//         PRIMARY KEY (id),
//         UNIQUE KEY unique_favorites (user_id, book_id),
//         KEY book_id (book_id),
//         CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
//         CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES books(id)
//     );`;

//     db.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Tabela user_favorite_books criada");
//     });

// });

// //criação da tabela users
// db.connect(() => {

//     const query = `
//     CREATE TABLE IF NOT EXISTS users (
//         id INT NOT NULL AUTO_INCREMENT,
//         username VARCHAR(45) NOT NULL,
//         email VARCHAR(45) NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         is_admin TINYINT(1) DEFAULT '0',
//         image TEXT,
//         details TEXT,
//         PRIMARY KEY (id),
//         UNIQUE KEY user (username),
//         UNIQUE KEY email (email)
//     );`;

//     db.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Tabela users criada");
//     });

// });
