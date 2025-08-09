const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController.controller.js');

const router = express.Router();

// Cấu hình multer
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
        const filetypes = /mp3|wav|ogg|m4a/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (extname) {
        return cb(null, true);
        } else {
        cb(new Error('Chỉ cho phép upload file âm thanh (mp3, wav, ogg, m4a)'));
        }
    },
    });

// POST /api/upload
router.post('/upload', upload.single('audio'), uploadController.uploadAudio);

module.exports = router;