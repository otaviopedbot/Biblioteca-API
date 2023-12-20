const db = require('../database/db');


class Author {

    constructor({ name }) {
        this.name = name;
    }

    static getAll(callback) {
        db.query('SELECT * FROM authors', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM authors WHERE id = ?', [id], callback);
    }

    save(callback) {
        db.query('INSERT INTO authors (name) VALUES (?)', [this.name], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                this.id = results.insertId;
                callback(null, this);
            }
        });
    }

    update(callback) {
        db.query('UPDATE authors SET name = ? WHERE id = ?', [this.name, this.id], (err) => {
            callback(err, this);
        });
    }

    static deleteById(id, callback) {
        db.query('DELETE FROM authors WHERE id = ?', [id], (err) => {
            callback(err, this);
        });
    }
}

module.exports = Author;
