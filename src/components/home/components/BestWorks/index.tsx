import React from 'react';
import './style.css';

const BestWorks: React.FC = () => {
  return (
    <div className="best-works-container">
      {/* Верхній блок */}

      <div className="w-[1300px] h-[38px] justify-between items-end inline-flex">
        <div className="justify-start items-center gap-[18px] flex">
          <div className="text-[#e6dfe7] text-3xl font-medium font-['Skema Pro Omni'] leading-[38px]">Кращі роботи</div>
          <div data-svg-wrapper>
            <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.56261 12.1514L14.3282 16.3233C14.4525 16.4124 14.6259 16.3233 14.6259 16.171V15.0717C14.6259 14.8327 14.5111 14.6053 14.3165 14.4647L10.9087 11.9991L14.3165 9.53345C14.5111 9.39283 14.6259 9.16783 14.6259 8.92642V7.8272C14.6259 7.67486 14.4525 7.58579 14.3282 7.67486L8.56261 11.8467C8.53864 11.8642 8.51914 11.8872 8.50569 11.9136C8.49225 11.9401 8.48524 11.9694 8.48524 11.9991C8.48524 12.0288 8.49225 12.058 8.50569 12.0845C8.51914 12.111 8.53864 12.1339 8.56261 12.1514Z" fill="#E6DFE7" />
              <path d="M20.625 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V3.375C21.375 2.96016 21.0398 2.625 20.625 2.625ZM19.6875 19.6875H4.3125V4.3125H19.6875V19.6875Z" fill="#E6DFE7" />
              <path d="M49.6727 16.3256L55.4383 12.1537C55.5414 12.0787 55.5414 11.9264 55.4383 11.8514L49.6727 7.6795C49.5484 7.59043 49.375 7.6795 49.375 7.83184V8.93106C49.375 9.17013 49.4898 9.39747 49.6844 9.5381L53.0922 12.0014L49.6844 14.467C49.4898 14.6076 49.375 14.8326 49.375 15.0741V16.1733C49.375 16.3256 49.5484 16.4147 49.6727 16.3256Z" fill="#E6DFE7" />
              <path d="M60.625 2.625H43.375C42.9602 2.625 42.625 2.96016 42.625 3.375V20.625C42.625 21.0398 42.9602 21.375 43.375 21.375H60.625C61.0398 21.375 61.375 21.0398 61.375 20.625V3.375C61.375 2.96016 61.0398 2.625 60.625 2.625ZM59.6875 19.6875H44.3125V4.3125H59.6875V19.6875Z" fill="#E6DFE7" />
            </svg>
          </div>
        </div>
        <div className="w-[188px] text-[#e6dfe7] text-base font-normal font-['Gotham'] leading-normal">Дивитись усі роботи...</div>
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
        {/* Додайте інші картки тут */}
      </div>
    </div>
  );
};

export default BestWorks;
