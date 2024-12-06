import { Disclosure } from "@headlessui/react";
import { Link, Outlet } from "react-router-dom";
import { useState, useRef } from "react";

const navigation = [
    { name: "Головна", href: "/", current: true },
    { name: "Що нового?", href: "/news", current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const MainLayout = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false); // Стан для відкриття/закриття випадаючого списку
    const dropdownRef = useRef<HTMLDivElement>(null); // Референція для випадаючого списку

    // Функція для зміни стану випадаючого списку
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-transparent">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between space-x-4">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <img
                                    src="images/image-removebg-preview.png"
                                    className="h-[93.71px] w-[81.12px]"
                                />
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
                                        className="absolute right-0 mt-2 bg-white border border-[#bc98c9] rounded-md shadow-lg w-48"
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

                            {/* Кнопки зареєструватися та увійти */}
                            <div className="flex space-x-4 items-center">
                                <button className="text-white bg-[#ff7086] px-4 py-2 rounded-md">
                                    Зареєструватись
                                </button>
                                <span className="text-gray-500">або</span>
                                <button className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md hover:text-white hover:bg-gray-500">
                                    Увійти
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Лінія */}
                    <div className="border-b-2 border-[#bc98c9] mt-0"></div>
                </Disclosure>

                {/* Main content */}
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>

        </>
    );
};

export default MainLayout;
