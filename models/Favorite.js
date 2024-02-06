const DefaultModel = require('./DefaultModel')
const db = require('../database/db');

class Favorite extends DefaultModel {
    constructor({ user_id, book_id}) {
        super();
        this.user_id = user_id;
        this.book_id = book_id;
    }

    static modelName = 'user_favorite_books';

    save() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user_favorite_books (user_id, book_id) VALUES (?, ?)', [this.user_id, this.book_id], (err, results) => {
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
            db.query('UPDATE user_favorite_books SET user_id = ?, book_id = ? WHERE id = ?', [this.user_id, this.book_id, this.id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }
}

module.exports = Favorite