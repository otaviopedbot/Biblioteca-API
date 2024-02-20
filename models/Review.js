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

    static getById(id, page, pageSize) {
        return new Promise((resolve, reject) => {
            let query = '';

            if (page && pageSize) {
                const offset = (page - 1) * pageSize;
                const limit = parseInt(pageSize);
                query = `SELECT * FROM ${this.modelName} WHERE book_id = ? LIMIT ${limit} OFFSET ${offset};`
            } else {
                query = `SELECT * FROM ${this.modelName} WHERE book_id = ?`
            }

            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static countTotal(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) AS total_items FROM ${this.modelName} WHERE book_id = ?;`;
            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].total_items);
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