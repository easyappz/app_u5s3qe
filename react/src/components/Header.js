import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { SearchOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import Notification from './Notification';
import '../styles/vk-theme.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
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
          <Notification />
          <UserOutlined className="vk-header-icon" onClick={() => navigate('/profile')} />
        </div>
        <Button 
          type="text" 
          className="vk-menu-item" 
          onClick={handleLogout} 
          icon={<LogoutOutlined />}
        >
          Выход
        </Button>
      </div>
    </div>
  );
};

export default Header;
