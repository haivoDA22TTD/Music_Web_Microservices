const db = require('../config/db.config.js');

const Song = {
    save: (filename, poster, song_name, id_singer, filepath, callback) => {
        const sql = `
            INSERT INTO songs (filename, poster, song_name, id_singer, filepath)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(sql, [filename, poster, song_name, id_singer, filepath], callback);
    },
};

module.exports = Song;
