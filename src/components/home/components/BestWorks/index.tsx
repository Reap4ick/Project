import React from 'react';
import './style.css';

const BestWorks: React.FC = () => {
  return (
    <div className="best-works-container">
      {/* Верхній блок */}
      <div className="header">
        <div className="title">
          <h2 className="best-works-title">Найкращі роботи</h2>
          <div className="navigation">
            <img src="public/images/arrowleft.svg" alt="left" className="icon" />
            <img src="public/images/arrowright.svg" alt="right" className="icon" />
          </div>
        </div>
        <div className="view-all">
          <span>Дивитись усі роботи...</span>
        </div>
      </div>

      {/* Блок з картками */}
      <div className="cards-container">
        <div className="card">
          <div className="card-image"></div>
          <div className="card-info">
            <p className="card-title">
              <span className="card-name">"Скоро вихід"</span>
            </p>
            <p className="card-description">
              Ломикін Костянтин Матвійович (1924 – 1994), Одеський художник
            </p>
            <p className="card-price">4000 грн</p>
          </div>
          <img src="public/images/heart.svg" alt="like" className="like-icon" />
        </div>
        {/*Для інших карток*/}
      </div>
    </div>
  );
};

export default BestWorks;
