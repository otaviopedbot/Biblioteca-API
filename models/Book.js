const db = require('../database/db');


class Book {

    constructor({ title, page, quantity, author_id, bookshelve_id }) {
        this.title = title;
        this.page = page;
        this.quantity = quantity;
        this.author_id = author_id;
        this.bookshelve_id = bookshelve_id;
    }

    static getAll(callback) {
        db.query('SELECT * FROM books', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM books WHERE id = ?', [id], callback);
    }

    save(callback) {

        db.query('INSERT INTO books (title, page, quantity, author_id, bookshelve_id) VALUES (?, ?, ?, ?, ?)',
            [this.title, this.page, this.quantity, this.author_id, this.bookshelve_id], (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    this.id = result.insertId;
                    callback(null, this);
                }
            });

    }



    update(callback) {
        db.query('UPDATE books SET title = ?, page = ?, quantity = ?, author_id = ?, bookshelve_id = ?  WHERE id = ?', [this.title, this.page, this.quantity, this.author_id, this.bookshelve_id, this.id], (err) => {
            callback(err, this);
        });
    }

    static deleteById(id, callback) {
        db.query('DELETE FROM books WHERE id = ?', [id], (err) => {
            callback(err, this);
        });
    }
}

module.exports = Book;