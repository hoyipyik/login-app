// src/components/TopBar/TopBar.tsx
import React from 'react';
import styles from './TopBar.module.css';

const TopBar: React.FC = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.logo}>CompanyName</div>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href='#account'>Account</a>
      </nav>
    </div>
  );
};

export default TopBar;