const DefaultModel = require('./DefaultModel')
const db = require('../database/db');

class UserDetails extends DefaultModel {
    constructor({ userId, description, favorite_books, image }) {
        super();
        this.user_id = userId;
        this.description = description;
        this.favorite_books = favorite_books;
        this.image = image
    }

    static modelName = 'user_details';

    save() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user_details (user_id, description, favorite_books, image) VALUES (?, ?, ?, ?)', [this.user_id, this.description, this.favorite_books, this.image], (err, results) => {
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
            db.query('UPDATE user_details SET user_id = ?, description = ?, favorite_books = ?, image = ? WHERE id = ?', [this.user_id, this.description, this.favorite_books, this.image, this.id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }
}

module.exports = UserDetails