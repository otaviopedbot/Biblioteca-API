const DefaultModel = require('../classes/DefaultModel')
const db = require('../database/db');


class Bookshelve extends DefaultModel{

    constructor({ name }) {
        super();
        this.name = name;
    }

    static modelName = 'bookshelves';

    save() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO bookshelves (name) VALUES (?)', [this.name], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    this.id = results.insertId;
                    resolve(this);
                }
            });
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            db.query('UPDATE bookshelves SET name = ? WHERE id = ?', [this.name, this.id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }

}

module.exports = Bookshelve;
