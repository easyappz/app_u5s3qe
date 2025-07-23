import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Typography, Button, Row, Col, Divider } from 'antd';
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { getProfile, updateProfile } from '../api/user';
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
        <div className="vk-logo">ВКонтакте</div>
        <div className="vk-header-menu">
          <Button type="text" className="vk-menu-item">Профиль</Button>
          <Button type="text" className="vk-menu-item" onClick={() => navigate('/feed')}>Новости</Button>
          <Button type="text" className="vk-menu-item" onClick={handleLogout} icon={<LogoutOutlined />}>Выход</Button>
        </div>
      </div>
      <Row gutter={16} className="vk-content">
        <Col span={6} className="vk-sidebar">
          <Card className="vk-sidebar-card">
            <div className="vk-menu">
              <Button type="text" className="vk-menu-item active">Моя страница</Button>
              <Button type="text" className="vk-menu-item">Новости</Button>
              <Button type="text" className="vk-menu-item">Сообщения</Button>
              <Button type="text" className="vk-menu-item">Друзья</Button>
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card className="vk-profile-card">
            <div className="vk-profile-header">
              <Avatar
                size={120}
                src={user.avatar || 'https://vk.com/images/camera_200.png'}
                className="vk-profile-avatar"
              />
              <div className="vk-profile-info">
                <Title level={2} className="vk-profile-name">{user.name}</Title>
                <Text className="vk-profile-email">{user.email}</Text>
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  className="vk-button-edit"
                  style={{ marginTop: 10 }}
                >
                  Редактировать
                </Button>
              </div>
            </div>
            <Divider />
            <div className="vk-profile-details">
              <Text>Дата регистрации: {new Date(user.createdAt).toLocaleDateString('ru-RU')}</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
