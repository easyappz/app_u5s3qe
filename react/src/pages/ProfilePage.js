import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Typography, Button, Row, Col, Divider, Badge } from 'antd';
import { EditOutlined, LogoutOutlined, SearchOutlined, BellOutlined, UserOutlined, HomeOutlined, MailOutlined, CalendarOutlined } from '@ant-design/icons';
import { getProfile } from '../api/user';
import '../styles/vk-theme.css';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div className="vk-loading">Загрузка...</div>;
  }

  if (!user) {
    return <div className="vk-error">Ошибка загрузки профиля</div>;
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
              <Button type="text" className="vk-menu-item active"><UserOutlined className="vk-menu-item-icon" />Моя страница</Button>
              <Button type="text" className="vk-menu-item" onClick={() => navigate('/feed')}><HeartOutlined className="vk-menu-item-icon" />Новости</Button>
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
          <Card className="vk-profile-card">
            <div className="vk-profile-header">
              <div style={{ position: 'relative' }}>
                <Avatar
                  size={120}
                  src={user.avatar || 'https://vk.com/images/camera_200.png'}
                  className="vk-profile-avatar"
                />
                <span className="vk-online-badge"></span>
              </div>
              <div className="vk-profile-info">
                <Title level={2} className="vk-profile-name">{user.name}</Title>
                <Text className="vk-profile-status">Online</Text>
                <div style={{ display: 'flex', gap: '10px', marginTop: 10 }}>
                  <Button
                    type="default"
                    icon={<EditOutlined />}
                    className="vk-button-edit"
                  >
                    Редактировать
                  </Button>
                  <Button
                    type="primary"
                    className="vk-button-primary"
                  >
                    Добавить в друзья
                  </Button>
                </div>
              </div>
            </div>
            <Divider />
            <div className="vk-profile-details">
              <div className="vk-profile-detail-item">
                <CalendarOutlined className="vk-profile-detail-icon" />
                <Text>Дата регистрации: {new Date(user.createdAt).toLocaleDateString('ru-RU')}</Text>
              </div>
              <div className="vk-profile-detail-item">
                <MailOutlined className="vk-profile-detail-icon" />
                <Text>Email: {user.email}</Text>
              </div>
              <div className="vk-profile-detail-item">
                <HomeOutlined className="vk-profile-detail-icon" />
                <Text>Город: Не указан</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
