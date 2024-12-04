// src/pages/LoginPage/LoginPage.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './LoginPage.module.css';
import { useAuthStore } from '../../store/authStore';
import TopBar from '../../components/Topbar/Topbar';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await mockLoginAPI(data);
      await login(response.token);
      
      const from = location.state?.from?.pathname || '/app';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <TopBar />
      <div className={styles.loginBox}>
        <h1 className={styles.slogan}>Welcome Back!</h1>
        <p className={styles.subSlogan}>Enter your credentials to continue</p>
        <AuthForm type="login" onSubmit={handleLogin} />
        <div className={styles.signupLink}>
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

const mockLoginAPI = async (data: { email: string; password: string }) => {
  console.log(data)
  return new Promise<{ token: string }>((resolve) => {
    setTimeout(() => {
      resolve({ token: 'mock-jwt-token' });
    }, 1000);
  });
};

export default LoginPage;