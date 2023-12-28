const db = require('../database/db');

class DefaultModel {
    
    static modelName = '';

    static getAll(callback) {
        db.query(`SELECT * FROM ${this.modelName}`, callback);
    }

    static getById(id, callback) {
        db.query(`SELECT * FROM ${this.modelName} WHERE id = ?`, [id], callback);
    }

    static deleteById(id, callback) {
        db.query(`DELETE FROM ${this.modelName} WHERE id = ?`, [id], (err) => {
            callback(err, this);
        });
    }
}

module.exports = DefaultModel;