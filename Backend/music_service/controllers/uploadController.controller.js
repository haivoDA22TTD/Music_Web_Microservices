const path = require('path');
const Song = require('../models/MusicFile.models.js');

exports.uploadAudio = (req, res) => {
    // Kiểm tra file âm thanh
    if (!req.files || !req.files['audio']) {
        return res.status(400).json({ message: 'Chưa có file audio được upload' });
    }

    const audioFile = req.files['audio'][0];
    const posterFile = req.files['poster'] ? req.files['poster'][0] : null;

    const { song_name, id_singer } = req.body;

    if (!song_name || !id_singer) {
        return res.status(400).json({ message: 'Thiếu tên bài hát hoặc ID ca sĩ' });
    }

    const filename = audioFile.originalname;
    const filepath = path.join('uploads', audioFile.filename);
    const poster = posterFile ? path.join('uploads', posterFile.filename) : null;

    Song.save(filename, poster, song_name, id_singer, filepath, (err, result) => {
        if (err) {
            console.error('Lỗi khi lưu vào database:', err);
            return res.status(500).json({ message: 'Lỗi khi lưu vào database' });
        }

        res.status(200).json({
            message: 'Upload thành công',
            data: {
                id: result.insertId,
                filename,
                song_name,
                id_singer,
                filepath,
                poster
            },
        });
    });
};
