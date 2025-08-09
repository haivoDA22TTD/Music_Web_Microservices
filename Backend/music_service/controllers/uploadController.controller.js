const path = require('path');
const MusicFile = require('../models/MusicFile.models.js');

exports.uploadAudio = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Chưa có file được upload' });
    }

    const filename = req.file.originalname;
    const filepath = path.join('uploads', req.file.filename);

    MusicFile.save(filename, filepath, (err, result) => {
        if (err) {
        console.error('Lỗi khi lưu vào database:', err);
        return res.status(500).json({ message: 'Lỗi khi lưu vào database' });
        }

        res.status(200).json({
        message: 'Upload thành công',
        data: {
            id: result.insertId,
            filename: filename,
            path: filepath,
        },
        });
    });
};