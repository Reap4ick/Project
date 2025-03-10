import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  images: string[]; // Змінили на масив рядків
  name: string;
  author: string;
  price: number;
}

interface AuthorWorksProps {
  authorId: string;
}

const AuthorWorks: React.FC<AuthorWorksProps> = ({ authorId }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;
  const cardWidth = 262;
  const gap = 24;
  const cardFullWidth = cardWidth + gap;
  const bgColor = "rgb(2, 6, 23)";
  const imageBaseUrl = `${import.meta.env.VITE_API_URL}/images/`;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/Products?authorId=${authorId}&page=1&pageSize=10`)
      .then((res) => res.json())
      .then((data: Product[] | { items: Product[] }) => {
        const items = Array.isArray(data) ? data : data.items;
        setProducts(items);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [authorId]);

  const handleCardClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => 
      Math.min(products.length - cardsToShow, prev + 1)
    );
  };

  return (
    <div className="w-[1300px] h-96 flex flex-col items-start gap-4 overflow-hidden relative px-8" style={{ backgroundColor: bgColor }}>
      <div className="text-[#e6dfe7] text-3xl font-medium font-['Skema Pro Omni'] z-10">
        Інші роботи цього автора
      </div>
      
      <div className="relative w-full h-full">
        {/* Ліва стрілка */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-16 h-[340px] flex items-center justify-center"
          style={{ 
            backgroundColor: bgColor,
            left: '-45px',
            borderRadius: '0 8px 8px 0'
          }}
        >
          <button
            onClick={prev}
            className={`hover:scale-110 transition-transform ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentIndex === 0}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M22.6257 6.8214V4.40578C22.6257 4.1964 22.385 4.08078 22.2225 4.2089L8.13503 15.212C8.01534 15.3051 7.91849 15.4243 7.85186 15.5605C7.78524 15.6967 7.75061 15.8463 7.75061 15.998C7.75061 16.1496 7.78524 16.2992 7.85186 16.4354C7.91849 16.5716 8.01534 16.6908 8.13503 16.7839L22.2225 27.787C22.3882 27.9152 22.6257 27.7995 22.6257 27.5902V25.1745C22.6257 25.0214 22.5538 24.8745 22.435 24.7808L11.185 15.9995L22.435 7.21515C22.5538 7.1214 22.6257 6.97453 22.6257 6.8214Z"
                fill="#BC98C9"
              />
            </svg>
          </button>
        </div>

        {/* Картки */}
        <div 
          className="flex gap-[24px] absolute transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * cardFullWidth}px)`,
            left: '40px',
            right: '40px'
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[262px] h-[330px] flex-shrink-0 relative rounded border border-[#e6dfe7] cursor-pointer"
              onClick={() => window.location.href = `/product/${product.id}`}
            >
              <img
              className="w-[247px] h-[189px] mx-auto mt-[11px] object-cover"
              src={
                product.images && product.images.length > 0 
                ? `${imageBaseUrl}${product.images[0]}` // Виводимо перше зображення
                    : "https://placehold.co/247x189"
                }
                alt={product.name}
                onError={(e) => (e.currentTarget.src = "https://placehold.co/247x189")}
              />
              <div className="mt-4 px-2">
                <p className="text-[#ff7086] text-base font-normal mb-1">
                  {product.name}
                </p>
                <p className="text-[#bc98c8] text-sm font-normal">
                  {product.author}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[#e6dfe7] text-base font-bold">
                    {product.price} грн
                  </span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21.6328 6.6464C21.3187 5.91899..."
                      fill="#E6DFE7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Права стрілка */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-[110px] h-[340px] flex items-center justify-center"
          style={{ 
            backgroundColor: bgColor,
            right: '-35px',
            borderRadius: '8px 0 0 8px'
          }}
        >
          <button
            onClick={next}
            className={`hover:scale-110 transition-transform ${
              currentIndex >= products.length - cardsToShow ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentIndex >= products.length - cardsToShow}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M23.9281 15.2127L9.84063 4.20962C9.80382 4.18064 9.75958 4.16263 9.71299 4.15766C9.66641 4.15268 9.61936 4.16095 9.57726 4.18151C9.53517 4.20207 9.49972 4.23409 9.475 4.27389C9.45028 4.31368 9.43728 4.35964 9.4375 4.40649V6.82212C9.4375 6.97524 9.50938 7.12212 9.62813 7.21587L20.8781 16.0002L9.62813 24.7846C9.50625 24.8784 9.4375 25.0252 9.4375 25.1784V27.594C9.4375 27.8034 9.67813 27.919 9.84063 27.7909L23.9281 16.7877C24.0478 16.6943 24.1447 16.5749 24.2113 16.4384C24.2779 16.302 24.3126 16.1521 24.3126 16.0002C24.3126 15.8484 24.2779 15.6985 24.2113 15.5621C24.1447 15.4256 24.0478 15.3061 23.9281 15.2127Z" fill="#BC98C9"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorWorks;