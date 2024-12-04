// src/components/WelcomeBox/WelcomeBox.tsx
import React from 'react';
import styles from './WelcomeBox.module.css';

interface WelcomeBoxProps {
  username: string | null;
}

export const WelcomeBox: React.FC<WelcomeBoxProps> = ({ username }) => {
  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <div className={styles.welcomeBox}>
      <div className={styles.welcomeContent}>
        <div className={styles.welcomeText}>
          <h1>Good {timeOfDay()}, {username || 'User'} 👋</h1>
          <p>Here are services we provide for you</p>
        </div>
      </div>
    </div>
  );
};