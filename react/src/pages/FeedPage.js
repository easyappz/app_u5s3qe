import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Row, Col, Avatar, Typography, List, Divider, Badge } from 'antd';
import { HeartOutlined, CommentOutlined, LogoutOutlined, SearchOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { getPosts, createPost, likePost } from '../api/posts';
import '../styles/vk-theme.css';

const { Title, Text } = Typography;

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
      <div className="vk-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="vk-logo">ВКонтакте</div>
          <div className="vk-search-bar">
            <SearchOutlined className="vk-search-icon" />
            <input placeholder="Поиск" />
          </div>
        </div>
        <div className="vk-header-menu">
          <div className="vk-header-icons">
            <Badge count={3} className="vk-notification-badge">
              <BellOutlined className="vk-header-icon" />
            </Badge>
            <UserOutlined className="vk-header-icon" onClick={() => navigate('/profile')} />
          </div>
          <Button type="text" className="vk-menu-item" onClick={handleLogout} icon={<LogoutOutlined />}>Выход</Button>
        </div>
      </div>
      <Row gutter={16} className="vk-content">
        <Col span={6} className="vk-sidebar">
          <Card className="vk-sidebar-card">
            <div className="vk-menu">
              <Button type="text" className="vk-menu-item"><UserOutlined className="vk-menu-item-icon" />Моя страница</Button>
              <Button type="text" className="vk-menu-item active"><HeartOutlined className="vk-menu-item-icon" />Новости</Button>
              <Button type="text" className="vk-menu-item"><CommentOutlined className="vk-menu-item-icon" />Сообщения</Button>
              <Button type="text" className="vk-menu-item"><UserOutlined className="vk-menu-item-icon" />Друзья</Button>
              <Button type="text" className="vk-menu-item"><UserOutlined className="vk-menu-item-icon" />Сообщества</Button>
              <Button type="text" className="vk-menu-item"><UserOutlined className="vk-menu-item-icon" />Фотографии</Button>
              <Button type="text" className="vk-menu-item"><UserOutlined className="vk-menu-item-icon" />Музыка</Button>
              <Button type="text" className="vk-menu-item"><UserOutlined className="vk-menu-item-icon" />Видео</Button>
            </div>
          </Card>
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
