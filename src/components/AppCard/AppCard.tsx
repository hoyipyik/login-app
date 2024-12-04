// src/components/AppCard/AppCard.tsx
import React from 'react';
import clsx from 'clsx';
import { AppCard as AppCardType } from '../../types/app.types';
import styles from './AppCard.module.css';

interface AppCardProps {
  card: AppCardType;
  onClick: (path: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ card, onClick }) => (
  <div
    className={clsx(styles.card, 
      !card.enabled && styles.cardDisabled,
      card.unavailable && styles.cardUnavailable
    )}
    onClick={() => card.enabled && !card.unavailable && onClick(card.path)}
    title={!card.enabled ? 'This feature is currently disabled' : 
           card.unavailable ? 'This feature is currently unavailable' : ''}
  >
    <div className={styles.cardIcon}>{card.icon}</div>
    <h3 className={styles.cardTitle}>{card.title}</h3>
    <p className={styles.cardDescription}>{card.description}</p>
    {card.enabled && !card.unavailable && (
      <div className={styles.availableBadge}>
        Available
      </div>
    )}
    {!card.enabled && !card.unavailable && (
      <div className={styles.disabledBadge}>
        Not Enabled
      </div>
    )}
    {card.unavailable && (
      <div className={styles.unavailableBadge}>
        Unavailable
      </div>
    )}
  </div>
);