import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Row, Col, Avatar, Typography, List, Divider } from 'antd';
import { HeartOutlined, CommentOutlined } from '@ant-design/icons';
import { getPosts, createPost, likePost } from '../api/posts';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/vk-theme.css';

const { Text } = Typography;

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (!newPost.trim()) return;
    try {
      const response = await createPost({ text: newPost });
      setPosts([response.data, ...posts]);
      setNewPost('');
    } catch (err) {
      console.error('Ошибка при создании поста', err);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await likePost(postId);
      setPosts(posts.map(post => post._id === postId ? response.data : post));
    } catch (err) {
      console.error('Ошибка при лайке', err);
    }
  };

  if (loading) {
    return <div className="vk-loading">Загрузка...</div>;
  }

  return (
    <div className="vk-container">
      <Header />
      <Row gutter={16} className="vk-content">
        <Col span={6} className="vk-sidebar">
          <Sidebar />
        </Col>
        <Col span={18}>
          <Card className="vk-post-card">
            <Input.TextArea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Что у вас нового?"
              rows={3}
              className="vk-textarea"
            />
            <Button
              type="primary"
              onClick={handlePostSubmit}
              className="vk-button-primary"
              style={{ marginTop: 10 }}
            >
              Опубликовать
            </Button>
          </Card>
          <Divider />
          <List
            itemLayout="vertical"
            size="large"
            dataSource={posts}
            renderItem={post => (
              <Card key={post._id} className="vk-post-card">
                <div className="vk-post-header">
                  <Avatar
                    src={post.author?.avatar || 'https://vk.com/images/camera_50.png'}
                    size={40}
                  />
                  <div className="vk-post-author">
                    <Text strong>{post.author?.name || 'Пользователь'}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {new Date(post.createdAt).toLocaleString('ru-RU')}
                    </Text>
                  </div>
                </div>
                <div className="vk-post-content">
                  <Text>{post.text}</Text>
                </div>
                <div className="vk-post-actions">
                  <Button
                    type="text"
                    icon={<HeartOutlined />}
                    onClick={() => handleLike(post._id)}
                    className={`vk-post-action ${post.likes.includes(post.author?._id) ? 'liked' : ''}`}
                  >
                    {post.likes.length}
                  </Button>
                  <Button
                    type="text"
                    icon={<CommentOutlined />}
                    className="vk-post-action"
                  >
                    {post.comments.length}
                  </Button>
                </div>
              </Card>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FeedPage;
