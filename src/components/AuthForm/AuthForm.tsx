// src/components/AuthForm/AuthForm.tsx
import React, { useState } from 'react';
import styles from './AuthForm.module.css';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: { email: string; password: string; confirmPassword?: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, confirmPassword });
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

        {type === 'signup' && (
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        
        {type === 'login' && (
          <div className={styles.forgotPassword}>
            <a href="#forgot">Forgot Password?</a>
          </div>
        )}
        
        <button type="submit" className={styles.authButton}>
          {type === 'login' ? 'Log In' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;