const db = require('../database/db');

class DefaultModel {

    static modelName = '';

    //getAll with pagination

    static getAll(page, pageSize) {
        return new Promise((resolve, reject) => {
            let query = '';

            if (page && pageSize) {
                const offset = (page - 1) * pageSize;
                const limit = parseInt(pageSize);
                query = `SELECT * FROM ${this.modelName} LIMIT ${limit} OFFSET ${offset};`
            } else {
                query = `SELECT * FROM ${this.modelName}`
            }

            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static countTotal() {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) AS total_items FROM ${this.modelName};`;
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].total_items);
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

    static find(criteria) {
        const columns = Object.keys(criteria);
        const values = Object.values(criteria);

        const conditions = columns.map(column => `${column} = ?`).join(' AND ');

        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.modelName} WHERE ${conditions}`;
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
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

    static hasReferences(from, where, id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) AS count FROM ${from} WHERE ${where} = ?`, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const rowCount = result[0].count;
                    resolve(rowCount > 0);
                }
            });
        });
    }

}

module.exports = DefaultModel;