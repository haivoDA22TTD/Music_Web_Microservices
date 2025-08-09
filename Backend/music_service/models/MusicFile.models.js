const db = require('../config/db.config.js');

const MusicFile = {
    save: (filename, filepath, callback) => {
        const sql = 'INSERT INTO music_files (filename, filepath) VALUES (?, ?)';
        db.query(sql, [filename, filepath], callback);
    },
};

module.exports = MusicFile;