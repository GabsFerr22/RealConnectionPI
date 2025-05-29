const express = require('express');
const router = express.Router();
const { upload, createPost, getPosts } = require('../controllers/postsController');

router.post('/posts', upload.single('image'), createPost);
router.get('/posts', getPosts);

module.exports = router;
