const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController.controller.js');

router.get('/songs', songController.getAllSongs);
router.get('/songs/:id', songController.getSongById);

module.exports = router;
