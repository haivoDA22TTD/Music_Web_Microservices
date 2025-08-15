const db = require('../config/db.config');

const musicManager = {
    getAllMusic: (callback) => {
        const sql = `SELECT * FROM songs`;
        db.query(sql, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    deleteMusicById: (id, callback) => {
        const sql = `DELETE FROM songs WHERE id = ?`;
        db.query(sql, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
}

module.exports = musicManager;