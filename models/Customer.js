const DefaultModel = require('../classes/DefaultModel')
const db = require('../database/db');


class Customer extends DefaultModel{

    constructor({ name, phone, adress }) {
        super();
        this.name = name;
        this.phone = phone;
        this.adress = adress;
    }

    static modelName = 'customers';

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

}

module.exports = Customer;
