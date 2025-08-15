const express = require('express');
const musicManagerController = require('../controller/musicManager.controller')
const router = express.Router();

router.get('/music', musicManagerController.getAllMusic);
router.delete('/music/:id', musicManagerController.deleteMusicById);

module.exports = router;
