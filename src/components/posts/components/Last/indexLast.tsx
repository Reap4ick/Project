import React from 'react';
import './styleLast.css';

const BestWorks: React.FC = () => {
  return (
    <div className="best-works-container-unique">
      {/* Верхній блок */}
      <div className="best-works-header-unique">
        <div className="best-works-title-navigation-unique">
          <h2 className="best-works-title-unique">Останні переглянуті роботи</h2>
        </div>
      </div>

      {/* Блок з картками */}
      <div className="best-works-cards-container-unique">
        <div className="best-works-card-unique">
          <div className="best-works-card-image-unique"></div>
          <div className="best-works-card-info-unique">
            <p className="best-works-card-title-unique">
              <span className="best-works-card-name-unique">"Скоро вихід"</span>
            </p>
            <p className="best-works-card-description-unique">
              Ломикін Костянтин Матвійович (1924 – 1994), Одеський художник
            </p>
            <p className="best-works-card-price-unique">4000 грн</p>
          </div>
          <img src="public/images/heart.svg" alt="like" className="best-works-like-icon-unique" />
        </div>
        {/* Додайте інші картки тут */}
      </div>
    </div>
  );
};

export default BestWorks;
