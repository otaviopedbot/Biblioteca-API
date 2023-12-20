const db = require('../database/db');


class Customer {

    constructor({ name, phone, adress }) {
        this.name = name;
        this.phone = phone;
        this.adress = adress;
    }

    static getAll(callback) {
        db.query('SELECT * FROM customers', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM customers WHERE id = ?', [id], callback);
    }

    save(callback) {
        db.query('INSERT INTO customers (name, phone, adress) VALUES (?, ?, ?)', [this.name, this.phone, this.adress], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                this.id = results.insertId;
                callback(null, this);
            }
        });
    }

    update(callback) {
        db.query('UPDATE customers SET name = ?, phone = ?, adress = ? WHERE id = ?', [this.name, this.phone, this.adress, this.id], (err) => {
            callback(err, this);
        });
    }

    static deleteById(id, callback) {
        db.query('DELETE FROM customers WHERE id = ?', [id], (err) => {
            callback(err, this);
        });
    }
}

module.exports = Customer;
