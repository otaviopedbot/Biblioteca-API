const db = require('../database/db');


class Publisher {

    constructor({ name, phone }) {
        this.name = name;
        this.phone = phone;
    }

    static getAll(callback) {
        db.query('SELECT * FROM publishers', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM publishers WHERE id = ?', [id], callback);
    }

    save(callback) {
        db.query('INSERT INTO publishers (name, phone) VALUES (?, ?)', [this.name, this.phone], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                this.id = results.insertId;
                callback(null, this);
            }
        });
    }

    update(callback) {
        db.query('UPDATE publishers SET name = ?, phone = ? WHERE id = ?', [this.name, this.phone, this.id], (err) => {
            callback(err, this);
        });
    }

    static deleteById(id, callback) {
        db.query('DELETE FROM publishers WHERE id = ?', [id], (err) => {
            callback(err, this);
        });
    }
}

module.exports = Publisher;
