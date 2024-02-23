const DefaultModel = require('./DefaultModel')
const db = require('../database/db');


class Book extends DefaultModel {

    constructor({ title, page, quantity, author_id, bookshelve_id, synopsis, cover }) {
        super();
        this.title = title;
        this.page = page;
        this.quantity = quantity;
        this.author_id = author_id;
        this.synopsis = synopsis;
        this.cover = cover;
        this.bookshelve_id = bookshelve_id;
    }

    static modelName = 'books';

    save() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO books (title, page, quantity, author_id, bookshelve_id, synopsis, cover) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [this.title, this.page, this.quantity, this.author_id, this.bookshelve_id, this.synopsis, this.cover], (err, result) => {
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
            db.query('UPDATE books SET title = ?, page = ?, cover = ?, quantity = ?, author_id = ?, bookshelve_id = ?, synopsis = ? , cover = ?  WHERE id = ?', [this.title, this.page, this.cover, this.quantity, this.author_id, this.bookshelve_id, this.synopsis, this.cover, this.id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }
    
}

module.exports = Book;