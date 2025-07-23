const Post = require('@src/models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const userId = req.user.userId; // From JWT middleware
    const { text, images } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required for a post' });
    }

    const post = new Post({
      author: userId,
      text,
      images: images || []
    });

    await post.save();
    await post.populate('author', 'name email');
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: `Failed to create post: ${error.message}` });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: `Failed to get posts: ${error.message}` });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('comments.author', 'name email');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: `Failed to get post: ${error.message}` });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: `Failed to like post: ${error.message}` });
  }
};

// Add comment to post
exports.addComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    post.comments.push({ author: userId, text });
    await post.save();
    await post.populate('comments.author', 'name email');
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: `Failed to add comment: ${error.message}` });
  }
};
