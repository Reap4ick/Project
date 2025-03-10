import "./style.css";
import { Disclosure } from "@headlessui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import LoginModal from "../../LoginPage/";
import RegisterModal from "../../RegisterPage";

const navigation = [
  { name: "Головна", href: "/", current: true },
  { name: "Що нового?", href: "/news", current: false },
  { name: "Пошук", href: "/posts", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}


const DropdownMenu = ({ onClose }: { onClose: () => void }) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Токен не знайдено");
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
  
        console.log("Статус відповіді:", response.status); // Додано
        console.log("Статусний текст:", response.statusText); // Додано
  
        if (!response.ok) {
          const errorData = await response.json(); // Додано
          console.log("Помилка сервера:", errorData); // Додано
          throw new Error("Помилка отримання профілю");
        }
        
        const data: ProfileData = await response.json();
        console.log("Успішна відповідь:", data); // Додано
        setProfileData(data);
      } catch (err) {
        console.error("Помилка запиту:", err); // Додано
        setError(err instanceof Error ? err.message : "Невідома помилка");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <nav className="absolute right-0 mt-2 shadow-lg z-50">
      <div className="bg-white rounded-lg w-52">
        <div className="p-2">
        {profileData && (
  <a href="/profile" className="flex flex-row flex-wrap items-center gap-2">
    <img
      src={`${import.meta.env.VITE_API_URL}/images/${profileData.avatar}`}
      alt={`${profileData.firstName} ${profileData.lastName}`}
      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
    />
    <div className="flex flex-col min-w-[100px]">
      <div className="text-[#BC98C9] font-medium break-words">
        {profileData.firstName} {profileData.lastName}
      </div>
      <div className="text-[#080217] text-sm hidden xs:block">
        Мій акаунт
      </div>
    </div>
  </a>
)}
          <div className="border-t my-2 border-[#FF7086]" />
          <Link
            to="/Setting"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            onClick={onClose}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/c30e2b7059da48629502fd3deaf9307c/d0f4561a8e6aed36fbda79512873dffa87664f558c3db59cfe015dae088a39ae"
              alt="Settings"
              className="w-4 h-4"
            />
            <span className="text-[#BC98C9] font-medium">Налаштування</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-[#080217]"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/c30e2b7059da48629502fd3deaf9307c/4600a26852b60d9f8c60e33fb6852e92cff36aeab848f8753701b3aa843d1a4d"
              alt="Logout"
              className="w-4 h-4"
            />
            <span>Вийти</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const MainLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Для інформаційного меню
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false); // Для меню профілю
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Функція для меню профілю
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogin = (token: string) => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    localStorage.setItem("token", token);
  };

  const handleRegister = (token: string) => {
    setIsLoggedIn(true);
    setIsRegisterModalOpen(false);
    localStorage.setItem("token", token);
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between space-x-4">
               {/* Logo */}
               <div className="flex-shrink-0">
                <svg width="82" height="94" viewBox="0 0 82 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="..." fill="#E6DFE7" />
                  <rect x="32.6562" y="27.7761" width="14.151" height="13.8294" fill="#410C55" />
                  <rect x="15.6108" y="19.7358" width="4.18097" height="30.5533" fill="#BC98C9" />
                  <rect x="15.6108" y="50.2888" width="4.18097" height="31.5181" transform="rotate(-90 15.6108 50.2888)" fill="#BC98C9" />
                  <rect x="64.1753" y="50.2896" width="4.18097" height="30.5533" transform="rotate(180 64.1753 50.2896)" fill="#BC98C9" />
                  <rect x="64.1753" y="19.7366" width="4.18097" height="31.5181" transform="rotate(90 64.1753 19.7366)" fill="#BC98C9" />
                  <rect x="55.4902" y="10.7305" width="4.18097" height="30.5533" transform="rotate(90 55.4902 10.7305)" fill="#FF7086" />
                  <rect x="24.937" y="10.7305" width="4.18097" height="31.5181" fill="#FF7086" />
                  <rect x="24.937" y="59.2947" width="4.18097" height="30.5533" transform="rotate(-90 24.937 59.2947)" fill="#57F4AB" />
                  <rect x="55.4897" y="59.2947" width="4.18097" height="31.5181" transform="rotate(-180 55.4897 59.2947)" fill="#57F4AB" />
                </svg>
              </div>

              {/* Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "text-[#bc98c9] font-semibold"
                          : "text-gray-700 hover:text-[#bc98c9]",
                        "px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Пошукове поле */}
              <div className="flex-grow max-w-[300px] mx-4">
                <input
                  type="text"
                  placeholder="Пошук..."
                  className="w-full px-4 py-2 border-2 border-[#bc98c9] rounded-md bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#bc98c9]"
                />
              </div>

              {/* Випадаючий список */}
              <div className="relative">
                <button
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#bc98c9] focus:outline-none"
                  onClick={toggleDropdown}
                >
                  Інформація ▼
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 bg-white border border-[#bc98c9] rounded-md shadow-lg w-48 z-50"
                  >
                    <ul className="py-1 text-sm text-gray-700">
                      <li>
                        <Link
                          to="/about"
                          className="block px-4 py-2 hover:bg-[#ff7086] hover:text-white"
                        >
                          Про ArtUA
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/customers"
                          className="block px-4 py-2 hover:bg-[#ff7086] hover:text-white"
                        >
                          Покупцям
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/artists"
                          className="block px-4 py-2 hover:bg-[#ff7086] hover:text-white"
                        >
                          Митцям
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/policy"
                          className="block px-4 py-2 hover:bg-[#ff7086] hover:text-white"
                        >
                          Політика
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Кнопки авторизації */}
              {!isLoggedIn ? (
                <div className="flex space-x-4 items-center">
                  <button
                    className="text-white bg-[#ff7086] px-4 py-2 rounded-md"
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Зареєструватись
                  </button>
                  <span className="text-gray-500">або</span>
                  <button
                    className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md hover:text-white hover:bg-gray-500"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Увійти
                  </button>
                </div>
              ) : (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg
                      width="33"
                      height="33"
                      viewBox="0 0 33 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.9522 24.717C26.3627 23.3207 25.5073 22.0523 24.4335 20.9826C23.363 19.9098 22.0948 19.0545 20.6991 18.4639C20.6866 18.4576 20.6741 18.4545 20.6616 18.4482C22.6085 17.042 23.8741 14.7514 23.8741 12.167C23.8741 7.88574 20.4054 4.41699 16.1241 4.41699C11.8429 4.41699 8.3741 7.88574 8.3741 12.167C8.3741 14.7514 9.63973 17.042 11.5866 18.4514C11.5741 18.4576 11.5616 18.4607 11.5491 18.467C10.1491 19.0576 8.89285 19.9045 7.81473 20.9857C6.74194 22.0563 5.88662 23.3244 5.29598 24.7201C4.71573 26.0865 4.4028 27.5515 4.3741 29.0357C4.37327 29.0691 4.37912 29.1023 4.39131 29.1333C4.4035 29.1644 4.42178 29.1927 4.44508 29.2166C4.46838 29.2405 4.49622 29.2594 4.52696 29.2724C4.55771 29.2853 4.59074 29.292 4.6241 29.292H6.4991C6.6366 29.292 6.74598 29.1826 6.7491 29.0482C6.8116 26.6357 7.78035 24.3764 9.49285 22.6639C11.2647 20.892 13.6179 19.917 16.1241 19.917C18.6304 19.917 20.9835 20.892 22.7554 22.6639C24.4679 24.3764 25.4366 26.6357 25.4991 29.0482C25.5022 29.1857 25.6116 29.292 25.7491 29.292H27.6241C27.6575 29.292 27.6905 29.2853 27.7212 29.2724C27.752 29.2594 27.7798 29.2405 27.8031 29.2166C27.8264 29.1927 27.8447 29.1644 27.8569 29.1333C27.8691 29.1023 27.8749 29.0691 27.8741 29.0357C27.8429 27.542 27.5335 26.0889 26.9522 24.717ZM16.1241 17.542C14.6897 17.542 13.3397 16.9826 12.3241 15.967C11.3085 14.9514 10.7491 13.6014 10.7491 12.167C10.7491 10.7326 11.3085 9.38262 12.3241 8.36699C13.3397 7.35137 14.6897 6.79199 16.1241 6.79199C17.5585 6.79199 18.9085 7.35137 19.9241 8.36699C20.9397 9.38262 21.4991 10.7326 21.4991 12.167C21.4991 13.6014 20.9397 14.9514 19.9241 15.967C18.9085 16.9826 17.5585 17.542 16.1241 17.542Z"
                        fill="#E6DFE7"
                      />
                    </svg>
                  </button>
                  {isProfileDropdownOpen && <DropdownMenu onClose={() => setProfileDropdownOpen(false)} />}
                </div>
              )}
            </div>
          </div>
          <div className="border-b-2 border-[#bc98c9] mt-0"></div>
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl px- py-6 sm:px-6 lg:px-4">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="w-[1440px] h-[371px] relative">
            <div className="w-[97px] h-[115.80px] left-[954px] top-[42.39px] absolute">
              <div className="w-[84px] h-[28.95px] left-0 top-0 absolute text-[#bc98c8] text-xl font-normal font-['Gotham'] underline leading-7">Про нас</div>
              <div className="w-[76px] h-[28.95px] left-0 top-[42.39px] absolute text-[#bc98c8] text-xl font-normal font-['Gotham'] underline leading-7">Роботи</div>
              <div className="w-[97px] h-[28.95px] left-0 top-[86.85px] absolute text-[#bc98c8] text-xl font-normal font-['Gotham'] underline leading-7">Контакти</div>
            </div>
            <div className="w-[784px] h-[169.57px] left-[70px] top-[42.39px] absolute justify-start items-start gap-48 inline-flex">
              <div className="w-[181px] h-[164px] relative">
                <div className="left-0 top-0 absolute text-[#bc98c8] text-xl font-normal font-['Gotham'] leading-7">Покупцям</div>
                <div className="left-0 top-[40px] absolute text-[#e6dfe7] text-base font-normal font-['Gotham'] leading-normal">Як зробити покупку?</div>
                <div className="left-0 top-[74px] absolute text-[#e6dfe7] text-base font-normal font-['Gotham'] leading-normal">Які правила покупки?</div>
                <div className="left-[2px] top-[108px] absolute text-[#e6dfe7] text-base font-normal font-['Gotham'] leading-normal">Повернення</div>
                <div className="left-0 top-[140px] absolute text-[#e6dfe7] text-base font-normal font-['Gotham'] leading-normal">Інші питання..</div>
              </div>
              <div className="relative">
                <div className="left-0 top-0 absolute text-[#bc98c8] text-xl font-normal font-['Gotham'] leading-7">Художникам</div>
                <div className="left-0 top-[41px] absolute text-[#e6dfe7] text-base font-normal font-['Gotham'] leading-normal">Умови співпраці</div>
              </div>
              <div className="w-[212px] relative">
                <div className="left-0 top-0 absolute text-[#bc98c8] text-xl font-normal font-['Gotham'] leading-7">Інформація</div>
                <div className="w-[212px] left-0 top-[43px] absolute text-[#e6dfe7] text-base font-normal font-['Gotham'] leading-normal">Політика конфіденційності...</div>
                <div className="w-[212px] left-0 top-[106px] absolute text-[#e6dfe7] text-base font-normal font-['Gotham'] leading-normal">Умови використання сайту...</div>
              </div>
            </div>
            <div className="w-[974.57px] h-[97.01px] left-[70px] top-[254px] absolute justify-start items-center gap-2.5 inline-flex">
              <div className="p-[10.79px] flex-col justify-center items-start gap-[5.39px] inline-flex">
                <div className="w-[60px] h-[72.25px] relative">
                  <svg width="82" height="95" viewBox="0 0 82 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8484 79.627V79.1793C10.8895 79.1587 11.0027 79.1072 11.188 79.0249C11.3835 78.9426 11.5482 78.8705 11.682 78.8088C11.8261 78.7367 11.929 78.6698 11.9907 78.6081L16.0971 68.8207H17.3321L21.4385 78.6698C21.5105 78.7316 21.6186 78.7933 21.7626 78.8551C21.9067 78.9168 22.0662 78.9786 22.2412 79.0403C22.4265 79.1021 22.5551 79.1484 22.6271 79.1793V79.627H18.2738V79.1793C18.3355 79.1484 18.5362 79.0866 18.8758 78.994C19.2155 78.8911 19.4316 78.8036 19.5242 78.7316L18.598 76.4932H13.766L12.8552 78.6698C12.917 78.7316 13.0251 78.7933 13.1794 78.8551C13.3338 78.9168 13.5036 78.9786 13.6889 79.0403C13.8844 79.1021 14.0182 79.1484 14.0902 79.1793V79.627H10.8484ZM18.2738 75.7213L16.1897 70.6732L14.0902 75.7213H18.2738ZM23.2058 79.627V79.1793C23.247 79.1587 23.4477 79.0918 23.8079 78.9786C24.1681 78.8551 24.3945 78.7522 24.4871 78.6698V69.7779C24.3945 69.6955 24.1681 69.5978 23.8079 69.4846C23.4477 69.3611 23.247 69.289 23.2058 69.2684V68.8207H28.2693C29.4117 68.8207 30.3173 69.0832 30.9863 69.6081C31.6655 70.1329 32.0051 70.8122 32.0051 71.6458C32.0051 72.2633 31.8147 72.8139 31.434 73.2976C31.0635 73.771 30.5437 74.1312 29.8748 74.3782L32.1441 78.6853C32.2367 78.7676 32.4734 78.8654 32.8542 78.9786C33.235 79.0815 33.4511 79.1484 33.5026 79.1793V79.627H30.801L30.3842 79.2101L27.9914 74.7024H26.3087V78.639C26.3911 78.7213 26.6381 78.8294 27.0497 78.9631C27.4614 79.0866 27.693 79.1587 27.7444 79.1793V79.627H23.2058ZM30.1527 71.8774C30.1527 71.2084 29.9365 70.6629 29.5043 70.241C29.0823 69.819 28.5523 69.6081 27.9142 69.6081H26.3087V73.9151H28.0995C28.6861 73.9151 29.1749 73.735 29.566 73.3748C29.9571 73.0043 30.1527 72.5051 30.1527 71.8774ZM36.1433 79.627V79.1793C36.1845 79.1587 36.3852 79.0918 36.7454 78.9786C37.1056 78.8551 37.332 78.7522 37.4247 78.6698V69.6081H35.0318C34.7437 70.4108 34.4452 71.054 34.1365 71.5377H33.7351C33.6836 71.5377 33.6322 71.301 33.5807 70.8276C33.5396 70.3542 33.519 69.9477 33.519 69.6081V68.8207H43.1519V69.6081C43.1519 69.9477 43.1262 70.3542 43.0748 70.8276C43.0336 71.301 42.9873 71.5377 42.9358 71.5377H42.519C42.2617 71.1261 41.9633 70.4828 41.6236 69.6081H39.2463V78.6698C39.3286 78.7522 39.5499 78.8551 39.9101 78.9786C40.2703 79.0918 40.471 79.1587 40.5121 79.1793V79.627H36.1433ZM58.8764 68.8207V69.2684C58.8044 69.2993 58.6706 69.3508 58.4751 69.4228C58.2795 69.4846 58.0994 69.5514 57.9347 69.6235C57.7804 69.6852 57.6672 69.747 57.5951 69.8087V75.8139C57.5951 76.946 57.1937 77.8877 56.391 78.639C55.5882 79.38 54.5334 79.7505 53.2263 79.7505C51.9399 79.7505 50.9056 79.3851 50.1234 78.6544C49.3515 77.9237 48.9656 77.0026 48.9656 75.8911V69.7779C48.8833 69.6955 48.662 69.5978 48.3018 69.4846C47.9416 69.3611 47.7409 69.289 47.6997 69.2684V68.8207H52.0685V69.2684C52.0273 69.289 51.8267 69.3611 51.4665 69.4846C51.1062 69.5978 50.8798 69.6955 50.7872 69.7779V75.5978C50.7872 76.5652 51.0651 77.3268 51.6208 77.8825C52.1869 78.428 52.9021 78.7007 53.7666 78.7007C54.6208 78.7007 55.3207 78.4383 55.8661 77.9134C56.4116 77.3782 56.6843 76.6835 56.6843 75.8293V69.8087C56.602 69.7264 56.3756 69.6183 56.0051 69.4846C55.6449 69.3508 55.4493 69.2787 55.4184 69.2684V68.8207H58.8764ZM58.2914 79.627V79.1793C58.3325 79.1587 58.4457 79.1072 58.631 79.0249C58.8265 78.9426 58.9912 78.8705 59.125 78.8088C59.2691 78.7367 59.372 78.6698 59.4337 78.6081L63.5401 68.8207H64.7751L68.8815 78.6698C68.9535 78.7316 69.0616 78.7933 69.2056 78.8551C69.3497 78.9168 69.5092 78.9786 69.6842 79.0403C69.8694 79.1021 69.9981 79.1484 70.0701 79.1793V79.627H65.7168V79.1793C65.7785 79.1484 65.9792 79.0866 66.3188 78.994C66.6585 78.8911 66.8746 78.8036 66.9672 78.7316L66.041 76.4932H61.209L60.2982 78.6698C60.36 78.7316 60.468 78.7933 60.6224 78.8551C60.7768 78.9168 60.9466 78.9786 61.1319 79.0403C61.3274 79.1021 61.4612 79.1484 61.5332 79.1793V79.627H58.2914ZM65.7168 75.7213L63.6327 70.6732L61.5332 75.7213H65.7168Z" fill="#E6DFE7" />
                    <rect x="32.6562" y="28.4243" width="14.151" height="13.8294" fill="#410C55" />
                    <rect x="15.6108" y="20.3843" width="4.18097" height="30.5533" fill="#BC98C9" />
                    <rect x="15.6108" y="50.9375" width="4.18097" height="31.5181" transform="rotate(-90 15.6108 50.9375)" fill="#BC98C9" />
                    <rect x="64.1753" y="50.9375" width="4.18097" height="30.5533" transform="rotate(180 64.1753 50.9375)" fill="#BC98C9" />
                    <rect x="64.1753" y="20.3848" width="4.18097" height="31.5181" transform="rotate(90 64.1753 20.3848)" fill="#BC98C9" />
                    <rect x="55.4902" y="11.3789" width="4.18097" height="30.5533" transform="rotate(90 55.4902 11.3789)" fill="#FF7086" />
                    <rect x="24.937" y="11.3789" width="4.18097" height="31.5181" fill="#FF7086" />
                    <rect x="24.937" y="59.9429" width="4.18097" height="30.5533" transform="rotate(-90 24.937 59.9429)" fill="#57F4AB" />
                    <rect x="55.4897" y="59.9429" width="4.18097" height="31.5181" transform="rotate(-180 55.4897 59.9429)" fill="#57F4AB" />
                  </svg>
                </div>
              </div>
              <div className="w-[377px] text-[#e6dfe7] text-base font-medium font-['Gotham'] leading-normal">Місце сили для українських митців, де культура знаходить підтримку і натхнення.</div>
              <div className="w-[496px] text-[#bc98c8] text-sm font-normal font-['Gotham'] leading-snug">© 2024 ArtUA. Усі права захищені.     Використання матеріалів сайту можливе лише з письмової згоди адміністрації.</div>
  </div>
            <div className="w-[260px] h-[54.80px] left-[1110px] top-[261.24px] absolute justify-start items-center gap-4 inline-flex">
              <div className="w-[53px] h-[53px] relative">
                <div className="w-[53px] h-[53px] left-0 top-0 absolute bg-[#410c55] rounded-full" />
                <div data-svg-wrapper className="left-[11px] top-[11px] absolute">
                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5656 11.9299C21.75 11.9299 21.9344 11.9361 22.1156 11.9455C21.3531 7.92363 17.1688 4.84863 12.1188 4.84863C6.53125 4.84863 2 8.61738 2 13.2674C2 15.8018 3.3625 18.0861 5.49688 19.6299C5.58491 19.692 5.6567 19.7744 5.7062 19.8702C5.75569 19.9659 5.78143 20.0721 5.78125 20.1799C5.78125 20.2549 5.76563 20.3236 5.74688 20.3955C5.575 21.0299 5.30313 22.0455 5.29063 22.0924C5.26875 22.1736 5.2375 22.2549 5.2375 22.3393C5.2375 22.5236 5.3875 22.6768 5.575 22.6768C5.64688 22.6768 5.70625 22.6486 5.76875 22.6143L7.98438 21.3361C8.15 21.2393 8.32813 21.1799 8.52188 21.1799C8.62188 21.1799 8.72188 21.1955 8.81875 21.2236C9.85313 21.5205 10.9688 21.6861 12.1219 21.6861C12.3094 21.6861 12.4938 21.683 12.6781 21.6736C12.4563 21.0174 12.3375 20.3268 12.3375 19.6111C12.3375 15.3674 16.4688 11.9299 21.5656 11.9299ZM15.4938 9.22676C16.2375 9.22676 16.8438 9.82988 16.8438 10.5736C16.8438 11.3174 16.2406 11.9205 15.4938 11.9205C14.75 11.9205 14.1438 11.3174 14.1438 10.5736C14.1438 9.82988 14.75 9.22676 15.4938 9.22676ZM8.74688 11.9205C8.00313 11.9205 7.39688 11.3174 7.39688 10.5736C7.39688 9.82988 8 9.22676 8.74688 9.22676C9.49375 9.22676 10.0969 9.82988 10.0969 10.5736C10.0969 11.3174 9.49063 11.9205 8.74688 11.9205ZM27.0844 24.908C28.8625 23.6205 29.9969 21.7205 29.9969 19.6049C29.9969 15.7299 26.2219 12.5893 21.5625 12.5893C16.9063 12.5893 13.1281 15.7299 13.1281 19.6049C13.1281 23.4799 16.9031 26.6205 21.5625 26.6205C22.525 26.6205 23.4563 26.483 24.3156 26.2361C24.3969 26.2111 24.4781 26.1986 24.5625 26.1986C24.725 26.1986 24.8719 26.2486 25.0094 26.3268L26.8563 27.3893C26.9094 27.4205 26.9594 27.4424 27.0188 27.4424C27.0558 27.4427 27.0925 27.4357 27.1269 27.4217C27.1612 27.4078 27.1924 27.3872 27.2188 27.3611C27.2448 27.3348 27.2654 27.3036 27.2793 27.2692C27.2933 27.2349 27.3003 27.1982 27.3 27.1611C27.3 27.0924 27.2719 27.0236 27.2563 26.9549C27.2469 26.9174 27.0188 26.0705 26.875 25.5393C26.8594 25.4799 26.8469 25.4205 26.8469 25.3611C26.85 25.1768 26.9438 25.0111 27.0844 24.908ZM18.7563 18.4861C18.1344 18.4861 17.6313 17.983 17.6313 17.3643C17.6313 16.7455 18.1344 16.2424 18.7563 16.2424C19.3781 16.2424 19.8813 16.7455 19.8813 17.3643C19.8813 17.983 19.375 18.4861 18.7563 18.4861ZM24.3781 18.4861C23.7563 18.4861 23.2531 17.983 23.2531 17.3643C23.2531 16.7455 23.7563 16.2424 24.3781 16.2424C25 16.2424 25.5031 16.7455 25.5031 17.3643C25.5016 17.6619 25.3825 17.9468 25.1718 18.157C24.9611 18.3672 24.6758 18.4855 24.3781 18.4861Z" fill="#E6DFE7"/>
                    </svg> 
                  </div>
                </div>
            <div className="w-[53px] h-[53px] relative">
              <div className="w-[53px] h-[53px] left-0 top-0 absolute bg-[#410c55] rounded-full" />
              <div data-svg-wrapper className="left-[11px] top-[9px] absolute">
              <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.8117 6.28965L27.8308 6.28229L27.8494 6.27386C28.1858 6.12166 28.3819 6.20783 28.4659 6.28907C28.5596 6.37962 28.7329 6.67605 28.5634 7.35564L28.5603 7.36798L28.5577 7.38042L24.5323 26.3511L24.5318 26.3536C24.4112 26.9322 24.2201 27.0742 24.1476 27.1068C24.073 27.1404 23.8553 27.18 23.3999 26.9381L17.3084 22.4387L16.8168 22.0756L16.3787 22.5017L13.5068 25.2943L13.8223 20.5795L24.9786 10.511C24.9795 10.5102 24.9803 10.5095 24.9811 10.5088C25.1466 10.3614 25.389 10.0936 25.4033 9.71608C25.4114 9.50083 25.3407 9.29277 25.2021 9.1276C25.073 8.9738 24.9141 8.89057 24.7844 8.84605C24.5334 8.75988 24.2694 8.77408 24.0534 8.81883C23.8237 8.86644 23.5847 8.96133 23.3544 9.10144L23.3544 9.10136L23.3445 9.10761L9.58299 17.7902L3.83106 15.9959L3.83106 15.9959L3.82785 15.9949C3.63807 15.9366 3.5164 15.8752 3.44383 15.8273C3.45394 15.8173 3.46552 15.8065 3.47878 15.7948C3.6022 15.6856 3.82275 15.5463 4.17648 15.4038L27.8117 6.28965ZM24.388 10.2232C24.388 10.2232 24.3869 10.2233 24.3848 10.2232C24.387 10.2231 24.3881 10.2231 24.388 10.2232Z" stroke="#E6DFE7" stroke-width="1.44"/>
                  </svg> 
                </div>
              </div>
          <div className="w-[53px] h-[53px] relative">
            <div className="w-[53px] h-[53px] left-0 top-0 absolute bg-[#410c55] rounded-full" />
            <div data-svg-wrapper className="left-[11px] top-[11px] absolute">
            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.5323 13.9622H16.2417V18.6028H22.6917C22.4136 20.1028 21.5698 21.3716 20.2979 22.2216C19.2229 22.9403 17.8511 23.3653 16.2386 23.3653C13.1167 23.3653 10.4761 21.256 9.53232 18.4216C9.29482 17.7028 9.15732 16.9341 9.15732 16.1435C9.15732 15.3528 9.29482 14.5841 9.53232 13.8653C10.4792 11.0341 13.1198 8.92471 16.2417 8.92471C18.0011 8.92471 19.5792 9.53096 20.8229 10.7185L24.2604 7.27783C22.1823 5.34033 19.4729 4.15283 16.2417 4.15283C11.5573 4.15283 7.5042 6.84033 5.53232 10.7591C4.71982 12.3778 4.25732 14.2091 4.25732 16.1466C4.25732 18.0841 4.71982 19.9122 5.53232 21.531C7.5042 25.4497 11.5573 28.1372 16.2417 28.1372C19.4792 28.1372 22.1917 27.0622 24.1729 25.231C26.4386 23.1435 27.7479 20.0685 27.7479 16.4153C27.7479 15.5653 27.6729 14.7497 27.5323 13.9622Z" fill="#E6DFE7"/>
                </svg> 
              </div>
            </div>
      <div className="w-[53px] h-[53px] relative">
        <div className="w-[53px] h-[53px] left-0 top-0 absolute bg-[#410c55] rounded-full" />
        <div data-svg-wrapper className="left-[11px] top-[11px] absolute">
        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.9987 9.72866C12.4518 9.72866 9.58931 12.5912 9.58931 16.138C9.58931 19.6849 12.4518 22.5474 15.9987 22.5474C19.5456 22.5474 22.4081 19.6849 22.4081 16.138C22.4081 12.5912 19.5456 9.72866 15.9987 9.72866ZM15.9987 20.3037C13.7049 20.3037 11.8331 18.4318 11.8331 16.138C11.8331 13.8443 13.7049 11.9724 15.9987 11.9724C18.2924 11.9724 20.1643 13.8443 20.1643 16.138C20.1643 18.4318 18.2924 20.3037 15.9987 20.3037ZM22.6706 7.97241C21.8424 7.97241 21.1737 8.64116 21.1737 9.46929C21.1737 10.2974 21.8424 10.9662 22.6706 10.9662C23.4987 10.9662 24.1674 10.3005 24.1674 9.46929C24.1677 9.27265 24.1291 9.07789 24.054 8.89617C23.9789 8.71445 23.8686 8.54933 23.7296 8.41029C23.5905 8.27124 23.4254 8.16099 23.2437 8.08585C23.062 8.01072 22.8672 7.97217 22.6706 7.97241ZM28.4924 16.138C28.4924 14.413 28.5081 12.7037 28.4112 10.9818C28.3143 8.98179 27.8581 7.20679 26.3956 5.74429C24.9299 4.27866 23.1581 3.82554 21.1581 3.72866C19.4331 3.63179 17.7237 3.64741 16.0018 3.64741C14.2768 3.64741 12.5674 3.63179 10.8456 3.72866C8.84556 3.82554 7.07056 4.28179 5.60806 5.74429C4.14243 7.20991 3.68931 8.98179 3.59243 10.9818C3.49556 12.7068 3.51118 14.4162 3.51118 16.138C3.51118 17.8599 3.49556 19.5724 3.59243 21.2943C3.68931 23.2943 4.14556 25.0693 5.60806 26.5318C7.07368 27.9974 8.84556 28.4505 10.8456 28.5474C12.5706 28.6443 14.2799 28.6287 16.0018 28.6287C17.7268 28.6287 19.4362 28.6443 21.1581 28.5474C23.1581 28.4505 24.9331 27.9943 26.3956 26.5318C27.8612 25.0662 28.3143 23.2943 28.4112 21.2943C28.5112 19.5724 28.4924 17.863 28.4924 16.138ZM25.7424 23.5068C25.5143 24.0755 25.2393 24.5005 24.7987 24.938C24.3581 25.3787 23.9362 25.6537 23.3674 25.8818C21.7237 26.5349 17.8206 26.388 15.9987 26.388C14.1768 26.388 10.2706 26.5349 8.62681 25.8849C8.05806 25.6568 7.63306 25.3818 7.19556 24.9412C6.75493 24.5005 6.47993 24.0787 6.25181 23.5099C5.60181 21.863 5.74868 17.9599 5.74868 16.138C5.74868 14.3162 5.60181 10.4099 6.25181 8.76616C6.47993 8.19741 6.75493 7.77241 7.19556 7.33491C7.63618 6.89741 8.05806 6.61929 8.62681 6.39116C10.2706 5.74116 14.1768 5.88804 15.9987 5.88804C17.8206 5.88804 21.7268 5.74116 23.3706 6.39116C23.9393 6.61929 24.3643 6.89429 24.8018 7.33491C25.2424 7.77554 25.5174 8.19741 25.7456 8.76616C26.3956 10.4099 26.2487 14.3162 26.2487 16.138C26.2487 17.9599 26.3956 21.863 25.7424 23.5068Z" fill="#E6DFE7"/>
            </svg> 
          </div>
        </div>
    </div>     
</div>     
         </footer>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} onRegister={handleRegister} />
    </>
  );
};

export default MainLayout;