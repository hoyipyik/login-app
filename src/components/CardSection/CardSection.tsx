// src/components/CardSection/CardSection.tsx
import React from 'react';
import { AppCard as AppCardType } from '../../types/app.types';
import { AppCard } from '../AppCard/AppCard';
import styles from './CardSection.module.css';

interface CardSectionProps {
  title: string;
  cards: AppCardType[];
  onCardClick: (path: string) => void;
}

const sortCards = (cards: AppCardType[]) => {
  return [...cards].sort((a, b) => {
    // Enabled apps first
    if (a.enabled && !b.enabled) return -1;
    if (!a.enabled && b.enabled) return 1;
    
    // Then not enabled apps
    if (!a.enabled && !b.enabled) {
      if (!a.unavailable && b.unavailable) return -1;
      if (a.unavailable && !b.unavailable) return 1;
    }
    
    // If same status, sort by title
    return a.title.localeCompare(b.title);
  });
};

export const CardSection: React.FC<CardSectionProps> = ({
  title,
  cards,
  onCardClick,
}) => {
  const sortedCards = sortCards(cards);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.cardGrid}>
        {sortedCards.map((card) => (
          <AppCard
            key={card.id}
            card={card}
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
};