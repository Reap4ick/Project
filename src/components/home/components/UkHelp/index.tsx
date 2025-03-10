import "./style.css";

const App = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="text-block">
          <h2 className="title">Підтримуй українське мистецтво!</h2>
          <p className="body-text">
            Наша платформа об'єднує творчих людей, які несуть українську культуру у світ.
            Підтримайте українських митців та долучайтеся до нашої спільноти, щоб допомогти
            мистецтву розвиватися попри всі перешкоди.
          </p>
        </div>
        <button className="button">Приєднатися зараз</button>
      </div>
    </div>
  );
};

export default App;
