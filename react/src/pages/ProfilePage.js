import React, { useState, useEffect } from 'react';
import { Card, Avatar, Typography, Button, Row, Col, Divider } from 'antd';
import { EditOutlined, HomeOutlined, MailOutlined, CalendarOutlined } from '@ant-design/icons';
import { getProfile } from '../api/user';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/vk-theme.css';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="vk-loading">Загрузка...</div>;
  }

  if (!user) {
    return <div className="vk-error">Ошибка загрузки профиля</div>;
  }

  return (
    <div className="vk-container">
      <Header />
      <Row gutter={16} className="vk-content">
        <Col span={6} className="vk-sidebar">
          <Sidebar />
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
