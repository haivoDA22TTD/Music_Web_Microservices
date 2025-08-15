const musicManagerModel = require('../model/musicManager.model');

const musicManagerController = {
    getAllMusic: (req, res) => {
        musicManagerModel.getAllMusic((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Lỗi khi lấy danh sách bài hát' });
            }
            res.json(results);
        });
    },

    deleteMusicById: (req, res) => {
        const { id } = req.params;
        musicManagerModel.deleteMusicById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Lỗi khi xóa bài hát' });
            }
            res.json({ message: 'Xóa bài hát thành công' });
        });
    }
}

module.exports = musicManagerController;