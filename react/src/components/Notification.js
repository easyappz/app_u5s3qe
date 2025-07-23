import React from 'react';
import { Badge, Popover, List, Avatar } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import '../styles/vk-theme.css';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      title: 'Новое сообщение',
      description: 'Вам написал Иван Иванов',
      avatar: 'https://vk.com/images/camera_50.png',
    },
    {
      id: 2,
      title: 'Лайк на пост',
      description: 'Анна Петрова лайкнула ваш пост',
      avatar: 'https://vk.com/images/camera_50.png',
    },
    {
      id: 3,
      title: 'Новый друг',
      description: 'Мария Смирнова добавила вас в друзья',
      avatar: 'https://vk.com/images/camera_50.png',
    },
  ];

  const content = (
    <div style={{ width: 300 }}>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={item => (
          <List.Item style={{ padding: '10px 15px', borderBottom: '1px solid var(--vk-divider-color)' }}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} size={40} />}
              title={<span style={{ fontWeight: 500 }}>{item.title}</span>}
              description={<span style={{ color: 'var(--vk-icon-color)', fontSize: 12 }}>{item.description}</span>}
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <Popover content={content} title="Уведомления" trigger="click" placement="bottomRight">
      <Badge count={notifications.length} className="vk-notification-badge">
        <BellOutlined className="vk-header-icon" />
      </Badge>
    </Popover>
  );
};

export default Notification;
