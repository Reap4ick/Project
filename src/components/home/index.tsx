import "./style.css";
// import InspirationBlock from "./components/InspirationBlock";
import InspirationPage from "./components/BestWorks";
import UCanSee from "./components/UCanSee"
import Famous from "./components/Famous"
// import UH from "./components/UkHelp"

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
                <div className="w-[1300px] h-[400px] relative">
                    <div className="w-[1300px] h-[400px] left-0 top-0 absolute rounded-lg border border-[#e6dfe7]" />
                    <img className="w-[476.91px] h-[370px] left-[11px] top-[12px] absolute" src="public/images/image.png" />
                    <div className="w-[606px] h-[152px] left-[530px] top-[46px] absolute flex-col justify-start items-start gap-4 inline-flex">
                        <div className="text-[#e6dfe7] text-[46px] font-medium font-['Skema Pro Omni'] leading-[46px]">Платформа для натхнення</div>
                        <div className="self-stretch text-[#e6dfe7] text-[22px] font-normal font-['Gotham'] leading-[30px]">Знаходьте українських митців, відкривайте для себе унікальні твори та підтримуйте культуру. Пориньте у світ мистецтва разом з нами!</div>
                    </div>
                    <div className="h-10 px-[15px] left-[530px] top-[262px] absolute bg-[#eee6e3] rounded-lg border border-[#eee6e3] flex-col justify-center items-center gap-2 inline-flex">
                        <div className="h-10 justify-center items-center gap-2 inline-flex">
                            <div className="text-[#080217] text-base font-normal font-['Fixel Display'] leading-normal">Переглянути</div>
                        </div>
                    </div>
                    <div data-svg-wrapper className="left-[1216px] top-[361px] absolute">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.56261 12.1514L14.3282 16.3233C14.4525 16.4124 14.6259 16.3233 14.6259 16.171V15.0717C14.6259 14.8327 14.5111 14.6053 14.3165 14.4647L10.9087 11.9991L14.3165 9.53345C14.5111 9.39283 14.6259 9.16783 14.6259 8.92642V7.8272C14.6259 7.67486 14.4525 7.58579 14.3282 7.67486L8.56261 11.8467C8.53864 11.8642 8.51914 11.8872 8.50569 11.9136C8.49225 11.9401 8.48524 11.9694 8.48524 11.9991C8.48524 12.0288 8.49225 12.058 8.50569 12.0845C8.51914 12.111 8.53864 12.1339 8.56261 12.1514Z" fill="#BC98C9" />
                            <path d="M20.625 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V3.375C21.375 2.96016 21.0398 2.625 20.625 2.625ZM19.6875 19.6875H4.3125V4.3125H19.6875V19.6875Z" fill="#BC98C9" />
                        </svg>
                    </div>
                    <div data-svg-wrapper className="left-[1256px] top-[361px] absolute">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.67266 16.3256L15.4383 12.1537C15.5414 12.0787 15.5414 11.9264 15.4383 11.8514L9.67266 7.6795C9.54844 7.59043 9.375 7.6795 9.375 7.83184V8.93106C9.375 9.17013 9.48984 9.39747 9.68438 9.5381L13.0922 12.0014L9.68438 14.467C9.48984 14.6076 9.375 14.8326 9.375 15.0741V16.1733C9.375 16.3256 9.54844 16.4147 9.67266 16.3256Z" fill="#BC98C9" />
                            <path d="M20.625 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V3.375C21.375 2.96016 21.0398 2.625 20.625 2.625ZM19.6875 19.6875H4.3125V4.3125H19.6875V19.6875Z" fill="#BC98C9" />
                        </svg>
                    </div>
                </div>
                <InspirationPage />
                <UCanSee />
                <Famous />
                <div className="w-[1213px] h-[350px] relative">
                    <div className="w-[1213px] h-[350px] left-0 top-0 absolute bg-[#ff7086] rounded-lg" />
                    <div className="left-[89px] top-[106px] absolute justify-start items-center gap-[30px] inline-flex">
                        <div className="w-[772px] flex-col justify-start items-start gap-4 inline-flex">
                            <div className="self-stretch text-[#080217] text-3xl font-medium font-['Skema Pro Omni'] leading-[38px]">Підтримуй українське мистецтво!</div>
                            <div className="self-stretch text-black text-xl font-normal font-['Gotham'] leading-7">Наша платформа об'єднує творчих людей, які несуть українську культуру у світ. Підтримайте українських митців та долучайтеся до нашої спільноти, щоб допомогти мистецтву розвиватися попри всі перешкоди.</div>
                        </div>
                        <div className="w-[233px] h-[60.90px] px-[19.03px] bg-[#080217] rounded-[5.07px] shadow-[0px_2.537405490875244px_0px_0px_rgba(0,0,0,0.02)] border border-[#e6dfe7] flex-col justify-center items-center gap-[10.15px] inline-flex">
                            <div className="h-[30.60px] justify-center items-center gap-[10.15px] inline-flex">
                                <div className="w-[181.81px] text-[#e6dfe7] text-lg font-normal font-['Fixel Display'] leading-7">Приєднатися зараз</div>
                            </div>
                        </div>
                    </div>
                </div>




            </main>
        </div>
    );
};

export default HomePage;

