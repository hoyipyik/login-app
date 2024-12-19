import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  onAddUser: () => void;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddUser, onBack }) => (
  <div className={styles.header}>
    <div className={styles.leftSection}>
      <button className={styles.backButton} onClick={onBack}>
        <svg 
          className={styles.backIcon} 
          viewBox="0 0 24 24" 
          width="24" 
          height="24"
        >
          <path 
            fill="currentColor" 
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          />
        </svg>
      </button>
      <h2 className={styles.title}>User Management</h2>
    </div>
    <button className={styles.addButton} onClick={onAddUser}>
      Add User
    </button>
  </div>
);

export default Header;