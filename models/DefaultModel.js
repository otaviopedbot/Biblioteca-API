const db = require('../database/db');

class DefaultModel {

    static modelName = '';

    static getAll() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${this.modelName}`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${this.modelName} WHERE id = ?`, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static findOne(criteria) {
        const columns = Object.keys(criteria);
        const values = Object.values(criteria);
    
        const conditions = columns.map(column => `${column} = ?`).join(' AND ');
    
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.modelName} WHERE ${conditions} LIMIT 1`;
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }    

    static deleteById(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${this.modelName} WHERE id = ?`, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = DefaultModel;