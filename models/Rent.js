const DefaultModel = require('../classes/DefaultModel')
const db = require('../database/db');


class Rent extends DefaultModel {

    constructor({ date, customer_id, book_id }) {
        super();
        this.date = date;
        this.customer_id = customer_id;
        this.book_id = book_id;
    }

    static modelName = 'rents';

    save(callback) {

        db.query('INSERT INTO rents (date, customer_id, book_id) VALUES (?, ?, ?)', [this.date, this.customer_id, this.book_id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                this.id = result.insertId;
                callback(null, this);
            }
        });

    }

    update(callback) {
        db.query('UPDATE rents SET date = ?, customer_id = ?, book_id = ? WHERE id = ?', [this.date, this.customer_id, this.book_id, this.author_id, this.rentshelve_id, this.id], (err) => {
            callback(err, this);
        });
    }

}

module.exports = Rent;
