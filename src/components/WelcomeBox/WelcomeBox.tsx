// src/components/WelcomeBox/WelcomeBox.tsx
import React from 'react';
import styles from './WelcomeBox.module.css';

interface WelcomeBoxProps {
  username: string | null;
  onLogout: () => void;
}

export const WelcomeBox: React.FC<WelcomeBoxProps> = ({ username, onLogout }) => {
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
        <button onClick={onLogout} className={styles.logoutButton}>
          <span>Logout</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M16 17L21 12L16 7M21 12H9M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};