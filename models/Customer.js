const db = require('../database/db');


class Customer {

    constructor({ name, phone, address }) {
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    static getAll(callback) {
        db.query('SELECT * FROM customers', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM customers WHERE id = ?', [id], callback);
    }

    save(callback) {
        db.query('INSERT INTO customers (name, phone, address) VALUES (?, ?, ?)', [this.name, this.phone, this.address], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                this.id = results.insertId;
                callback(null, this);
            }
        });
    }

    update(callback) {
        db.query('UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?', [this.name, this.phone, this.address, this.id], (err) => {
            callback(err, this);
        });
    }

    delete(callback) {
        db.query('DELETE FROM customers WHERE id = ?', [this.id], (err) => {
            callback(err, this);
        });
    }
}

module.exports = Customer;
