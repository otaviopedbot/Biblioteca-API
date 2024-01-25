const DefaultModel = require('./DefaultModel')
const db = require('../database/db');


class Rent extends DefaultModel {

    constructor({ date, customer_id, book_id }) {
        super();
        this.date = date;
        this.customer_id = customer_id;
        this.book_id = book_id;
    }

    static modelName = 'rents';

    save() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO rents (date, customer_id, book_id) VALUES (?, ?, ?)', [this.date, this.customer_id, this.book_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    this.id = result.insertId;
                    resolve(this);
                }
            });
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            db.query('UPDATE rents SET date = ?, customer_id = ?, book_id = ? WHERE id = ?', [this.date, this.customer_id, this.book_id, this.id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }

}

module.exports = Rent;