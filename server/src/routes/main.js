const express = require('express');
const authController = require('@src/controllers/authController');
const profileController = require('@src/controllers/profileController');
const postController = require('@src/controllers/postController');
const authMiddleware = require('@src/middleware/auth');

const router = express.Router();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Profile routes
router.get('/profile', authMiddleware, profileController.getProfile);
router.put('/profile', authMiddleware, profileController.updateProfile);

// Post routes
router.post('/posts', authMiddleware, postController.createPost);
router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPost);
router.post('/posts/:id/like', authMiddleware, postController.likePost);
router.post('/posts/:id/comment', authMiddleware, postController.addComment);

// Default routes
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
