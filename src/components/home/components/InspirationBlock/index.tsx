import "./style.css"; // Підключаємо CSS

const InspirationBlock = () => {
    return (
        <div className="inspiration-block">
            {/* Фото зліва */}
            <div className="inspiration-image">
                <img src="public/images/image.png" alt="Митці" />
            </div>
            {/* Текст справа */}
            <div className="inspiration-text">
                <h1 className="inspiration-title">Платформа для натхнення</h1>
                <p className="inspiration-description">
                    Знаходьте українських митців, відкривайте для себе унікальні твори та підтримуйте культуру.
                    Пориньте у світ мистецтва разом з нами!
                </p>
                <button className="inspiration-button">Переглянути</button>
            </div>
        </div>
    );
};

export default InspirationBlock;
