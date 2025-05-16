const express = require('express');
const router = express.Router();
const controller = require('../src/controllers/PostControllers');

router.post('/', controller.criarPost);

module.exports = router;