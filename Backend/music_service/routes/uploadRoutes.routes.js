const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController.controller.js');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const audioTypes = /mp3|wav|ogg|m4a/;
        const imageTypes = /jpg|jpeg|png|gif/;
        const ext = path.extname(file.originalname).toLowerCase();

        if (file.fieldname === 'audio' && audioTypes.test(ext)) {
            cb(null, true);
        } else if (file.fieldname === 'poster' && imageTypes.test(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận file nhạc (mp3...) hoặc ảnh (jpg...)'));
        }
    },
});

router.post(
    '/upload',
    upload.fields([
        { name: 'audio', maxCount: 1 },
        { name: 'poster', maxCount: 1 }
    ]),
    uploadController.uploadAudio
);

// POST /api/upload
router.post('/upload', upload.single('audio'), uploadController.uploadAudio);

module.exports = router;
