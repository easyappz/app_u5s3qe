import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Card, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../api/auth';
import '../styles/vk-theme.css';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при входе');
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
        <Text className="vk-auth-subtitle">Вход в аккаунт</Text>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
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
            rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
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
              Войти
            </Button>
          </Form.Item>
          <div className="vk-auth-links">
            <Text>Нет аккаунта? <a href="/register">Зарегистрироваться</a></Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
