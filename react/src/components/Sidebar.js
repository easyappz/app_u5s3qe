import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Button } from 'antd';
import { UserOutlined, HeartOutlined, CommentOutlined } from '@ant-design/icons';
import '../styles/vk-theme.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Card className="vk-sidebar-card">
      <div className="vk-menu">
        <Button 
          type="text" 
          className={`vk-menu-item ${location.pathname === '/profile' ? 'active' : ''}`} 
          onClick={() => navigate('/profile')}
        >
          <UserOutlined className="vk-menu-item-icon" />Моя страница
        </Button>
        <Button 
          type="text" 
          className={`vk-menu-item ${location.pathname === '/feed' ? 'active' : ''}`} 
          onClick={() => navigate('/feed')}
        >
          <HeartOutlined className="vk-menu-item-icon" />Новости
        </Button>
        <Button type="text" className="vk-menu-item">
          <CommentOutlined className="vk-menu-item-icon" />Сообщения
        </Button>
        <Button type="text" className="vk-menu-item">
          <UserOutlined className="vk-menu-item-icon" />Друзья
        </Button>
        <Button type="text" className="vk-menu-item">
          <UserOutlined className="vk-menu-item-icon" />Сообщества
        </Button>
        <Button type="text" className="vk-menu-item">
          <UserOutlined className="vk-menu-item-icon" />Фотографии
        </Button>
        <Button type="text" className="vk-menu-item">
          <UserOutlined className="vk-menu-item-icon" />Музыка
        </Button>
        <Button type="text" className="vk-menu-item">
          <UserOutlined className="vk-menu-item-icon" />Видео
        </Button>
      </div>
    </Card>
  );
};

export default Sidebar;
