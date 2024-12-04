// src/pages/AppPage/AppPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeBox } from '../../components/WelcomeBox/WelcomeBox';
import { CardSection } from '../../components/CardSection/CardSection';
import { dashboardApps, services } from '../../data/appCards';
import styles from './AppPage.module.css';
import { useAuthStore } from '../../store/authStore';
import TopBar from '../../components/Topbar/Topbar';

const AppPage: React.FC = () => {
  const { username } = useAuthStore();
  const navigate = useNavigate();


  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.appContainer}>
      <TopBar />
      <div className={styles.content}>
        <WelcomeBox username={username} />
        
        <CardSection
          title="Dashboard Apps"
          cards={dashboardApps}
          onCardClick={handleCardClick}
        />
        
        <CardSection
          title="Services"
          cards={services}
          onCardClick={handleCardClick}
        />
      </div>
    </div>
  );
};

export default AppPage;