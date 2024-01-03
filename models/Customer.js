const DefaultModel = require('../classes/DefaultModel')
const db = require('../database/db');


class Customer extends DefaultModel {

    constructor({ name, phone, adress }) {
        super();
        this.name = name;
        this.phone = phone;
        this.adress = adress;
    }

    static modelName = 'customers';

    save() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO customers (name, phone, adress) VALUES (?, ?, ?)', [this.name, this.phone, this.adress], (err, result) => {
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
            db.query('UPDATE customers SET name = ?, phone = ?, adress = ? WHERE id = ?', [this.name, this.phone, this.adress, this.id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }

}

module.exports = Customer;
