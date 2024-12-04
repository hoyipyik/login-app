// src/pages/SignupPage/SignupPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './SignupPage.module.css';
import { useAuthStore } from '../../store/authStore';
import TopBar from '../../components/Topbar/Topbar';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app');
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = async (data: { email: string; password: string; confirmPassword?: string }) => {
    try {
      await mockSignupAPI(data);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <TopBar />
      <div className={styles.signupBox}>
        <h1 className={styles.slogan}>Create Account</h1>
        <p className={styles.subSlogan}>Join us today!</p>
        <AuthForm type="signup" onSubmit={handleSignup} />
        <div className={styles.loginLink}>
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

const mockSignupAPI = async (data: { email: string; password: string; confirmPassword?: string }) => {
  console.log(data)
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

export default SignupPage;