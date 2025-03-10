import React from 'react';
import styles from './CardGrid.module.css';

const CardGrid: React.FC = () => {
  const cards = [
    {
      title1: 'Лисняк',
      title2: 'Євген',
      subtitle: 'абстракція',
      description: 'Очільник власної виставки у Києві «Safe Place»',
      image: '/images/evgen.svg',
    },
    {
      title1: 'Кострицька',
      title2: 'Анна',
      subtitle: 'абстракція',
      description: 'Входить до топ-10 кращих молодих художників України.',
      image: '/images/anna.svg',
    },
    {
      title1: 'Fatum',
      title2: 'Діма',
      subtitle: 'стріт-арт',
      description: 'Всесвітньовідомий, автор муралу та трасі Формула-1.',
      image: '/images/dima.svg',
    },
    {
      title1: 'Харчук',
      title2: 'Інна',
      subtitle: 'український \n етнос',
      description: 'Представляє своїми виставками Україну на світовій арені.',
      image: '/images/inna.svg',
    },
  ];

  return (
    <div style={{paddingBottom: 20}}>
      <h1 className={styles['cardgrid-main-title']}>Відомі люди на платформі</h1>
      <div className={styles.cardgridMargin}>
        <div className={styles['cardgrid-grid']}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles['cardgrid-text-container']}>
                <h2 className={styles['cardgrid-title']}>{card.title1}</h2>
                <h2 className={styles['cardgrid-title']}>{card.title2}</h2>
                <p className={styles['cardgrid-subtitle']}>{card.subtitle}</p>
              </div>
              <img
                src={card.image}
                alt={`card-${index}`}
                className={styles.cardgridImage}
              />
              <div className={styles['cardgrid-hover-description']}>{card.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
