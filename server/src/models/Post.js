const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  images: { 
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        return v.every(img => {
          const size = Buffer.from(img, 'base64').length;
          return size <= 1024 * 1024; // 1MB limit per image
        });
      },
      message: 'Each image size must be less than 1MB'
    }
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
