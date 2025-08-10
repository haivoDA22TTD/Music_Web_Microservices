const db = require('../config/db.config.js');

const Song = {
    // Đã có: save()

    getAll: (callback) => {
        const sql = `
            SELECT songs.*, singers.name AS singer_name
            FROM songs
            LEFT JOIN singers ON songs.id_singer = singers.id
            ORDER BY songs.uploaded_at DESC
        `;
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = `
            SELECT songs.*, singers.name AS singer_name
            FROM songs
            LEFT JOIN singers ON songs.id_singer = singers.id
            WHERE songs.id = ?
        `;
        db.query(sql, [id], callback);
    },
};

module.exports = Song;
