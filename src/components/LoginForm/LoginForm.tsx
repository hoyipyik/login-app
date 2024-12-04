// src/components/LoginForm/LoginForm.tsx
import React, { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContent}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.forgotPassword}>
          <a href="#forgot">Forgot Password?</a>
        </div>
        
        <button type="submit" className={styles.loginButton}>
          Log In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;