import "./style.css";
import InspirationBlock from "./components/InspirationBlock"; 
import InspirationPage from "./components/BestWorks"; 

const HomePage = () => {
    return (
        <div className="relative">
            {/* Фон з вогниками */}
            <div className="animated-bg">
                <div className="firefly firefly-1"></div>
                <div className="firefly firefly-2"></div>
            </div>

            {/* Основний контент */}
            <main className="relative z-10">
                <InspirationBlock />
                <InspirationPage /> 
            </main>
        </div>
    );
};

export default HomePage;

