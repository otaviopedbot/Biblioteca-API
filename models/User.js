const DefaultModel = require('./DefaultModel')
const db = require('../database/db');

class User extends DefaultModel {
    constructor({ username, email, image, details, password }) {
        super();
        this.username = username;
        this.email = email;
        this.image = image;
        this.details = details;
        this.password = password;
    }

    static modelName = 'users';

    save() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (username, email, password, image, details) VALUES (?, ?, ?, "", "")', [this.username, this.email, this.password], (err, results) => {
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
            db.query('UPDATE users SET username = ?, email = ?, password = ?, image = ?, details = ? WHERE id = ?', [this.username, this.email, this.password, this.image, this.details, this.id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }
}

module.exports = User