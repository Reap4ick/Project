import React, { useEffect, useState, useCallback } from "react";
import ProductFilter from "../Filter";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";

interface CardData {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];  // Оновлено з productImages на images
}

interface ApiResponse {
  items: CardData[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

const Cards: React.FC = () => {
  const navigate = useNavigate(); // Додано хук для навігації
  const [cards, setCards] = useState<CardData[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;


  const handleCardClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };


  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(key, v));
        } else {
          queryParams.append(key, value);
        }
      });

      const url = `${import.meta.env.VITE_API_URL}/api/Products?${queryParams.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Не вдалося отримати продукти");
      }

      const data: ApiResponse = await response.json();
      setCards(
        data.items.map((item) => ({
          ...item,
          image: item.images?.[0] || "placeholder.jpg",  // Замінили productImages на images className="card-image"
        }))
      );
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleFilterChange = (values: Record<string, any>) => {
    setFilters(values);
    setCurrentPage(1);  // Скидаємо на першу сторінку при зміні фільтрів
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);  // Оновлюємо поточну сторінку
  };

  return (
    <div>
      <div className="cards-container">
        <div className="filter-container">
          <ProductFilter onFilter={handleFilterChange} />
        </div>

        <div className="cards-list">
          {loading && <div>Завантаження...</div>}
          {error && <div>Помилка: {error}</div>}
          {cards.length === 0 && !loading && <div>Немає доступних продуктів</div>}
          {cards.map((card) => (
            <div className="card"
             key={card.id}
             onClick={() => handleCardClick(card.id)} // Додано обробник кліку
             style={{ cursor: "pointer" }} 
             >
              {/* Відображення першого зображення або placeholder */}
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_API_URL}/images/${card.images[0] || 'placeholder.jpg'})`, // Підставляємо перше зображення
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="card-info">
                <p className="card-title">{card.name}</p>
                <p className="card-description">{card.description}</p>
                <p className="card-price">${card.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={totalPages * pageSize}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          itemRender={(_page, type, originalElement) => {
            if (type === "prev") {
              return <button className="pagination-arrow">&lt;</button>;
            }
            if (type === "next") {
              return <button className="pagination-arrow">&gt;</button>;
            }
            return originalElement;
          }}
        />
      </div>
    </div>
  );
};

export default Cards;