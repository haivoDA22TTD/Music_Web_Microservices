const Song = require('../models/Song.model.js');

exports.getAllSongs = (req, res) => {
    Song.getAll((err, results) => {
        if (err) {
            console.error('Lỗi lấy danh sách bài hát:', err);
            return res.status(500).json({ message: 'Lỗi máy chủ' });
        }
        res.status(200).json(results);
    });
};

exports.getSongById = (req, res) => {
    const id = req.params.id;
    Song.getById(id, (err, results) => {
        if (err) {
            console.error('Lỗi lấy bài hát:', err);
            return res.status(500).json({ message: 'Lỗi máy chủ' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài hát' });
        }

        res.status(200).json(results[0]);
    });
};
