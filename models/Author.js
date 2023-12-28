const DefaultModel = require('../classes/DefaultModel')
const db = require('../database/db');

class Author extends DefaultModel {
    constructor({ name }) {
        super();
        this.name = name;
    }

    static modelName = 'authors';

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
}

module.exports = Author