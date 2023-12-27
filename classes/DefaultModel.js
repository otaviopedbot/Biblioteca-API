

class DefaultModel {
    constructor({ modelName, db }) {
        this.modelName = modelName;
        this.db = db;
    }

    static getAll(callback) {
        this.db.query(`SELECT * FROM ${this.modelName}`, callback);
    }

    static getById(id, callback) {
        this.db.query(`SELECT * FROM ${this.modelName} WHERE id = ?`, [id], callback);
    }

    static deleteById(id, callback) {
        this.db.query(`DELETE FROM ${this.modelName} WHERE id = ?`, [id], (err) => {
            callback(err, this);
        });
    }
}

module.exports = DefaultModel;
