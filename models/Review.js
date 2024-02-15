const DefaultModel = require('./DefaultModel')
const db = require('../database/db');

class Review extends DefaultModel {
    constructor({ user_id, book_id, body, rating }) {
        super();
        this.user_id = user_id;
        this.book_id = book_id;
        this.body = body;
        this.rating = rating;
    }

    static modelName = 'user_book_reviews';

    save() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user_book_reviews (user_id, book_id, body, rating) VALUES (?, ?, ?, ?)', [this.user_id, this.book_id, this.body, this.rating], (err, results) => {
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
            db.query('UPDATE user_book_reviews SET user_id = ?, book_id = ?, body = ?, rating = ? WHERE id = ?', [this.user_id, this.book_id, this.body, this.rating, this.id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }
}

module.exports = Review