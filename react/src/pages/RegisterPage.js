import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Card, Alert } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { register } from '../api/auth';
import '../styles/vk-theme.css';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const response = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vk-auth-container">
      <Card className="vk-auth-card">
        <div className="vk-logo-container">
          <Title level={2} className="vk-logo-text">ВКонтакте</Title>
        </div>
        <Text className="vk-auth-subtitle">Регистрация нового пользователя</Text>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Пожалуйста, введите ваше имя' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Имя"
              className="vk-input"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Пожалуйста, введите email', type: 'email' }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="vk-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите пароль', min: 6 }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Пароль"
              className="vk-input"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="vk-button-primary"
              block
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
          <div className="vk-auth-links">
            <Text>Уже есть аккаунт? <a href="/login">Войти</a></Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
