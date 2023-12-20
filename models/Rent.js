const db = require('../database/db');
const Customer = require('../models/Customer')
const Book = require('../models/Book')


class Rent {

    constructor({ date, customer_id, book_id }) {
        this.date = date;
        this.customer_id = customer_id;
        this.book_id = book_id;
    }

    static getAll(callback) {
        db.query('SELECT * FROM rents', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM rents WHERE id = ?', [id], callback);
    }

    save(callback) {

        const customerId = this.customer_id;

        Customer.getById(customerId, (err, customer) => {
            if (err) {
                console.log('Erro ao obter cliente por ID');
            }
        })

        const bookId = this.book_id;

        Book.getById(bookId, (err, book) => {
            if (err) {
                console.log('Erro ao obter livro por ID:', err);
            }
        })

        db.query('INSERT INTO rents (date, customer_id, book_id) VALUES (?, ?, ?)', [this.date, this.customer_id, this.book_id], (err, result) => {
            if (err) {
                console.log('Erro ao inserir dados na tabela rents:', err);
                callback(err, null);
            } else {
                this.id = result.insertId;
                callback(null, this);
            }
        });

    }


    update(callback) {
        db.query('UPDATE rents SET date = ?, customer_id = ?, book_id = ? WHERE id = ?', [this.date, this.customer_id, this.book_id], (err) => {
            callback(err, this);
        });
    }

    static deleteById(id, callback) {
        db.query('DELETE FROM rents WHERE id = ?', [id], (err) => {
            callback(err, this);
        });
    }
}

module.exports = Rent;
