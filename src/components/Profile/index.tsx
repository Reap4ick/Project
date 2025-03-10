import { useState, useEffect } from "react";
import AuthorProductsCarousel from "../authorview/components/Cards";

interface Tab {
  id: string;
  label: string;
  isActive: boolean;
}

const TABS = [
  { id: "works", label: "Мої роботи", isActive: true },
  { id: "favorites", label: "Улюблені", isActive: false },
  { id: "viewed", label: "Переглянуті", isActive: false },
];

interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

const ProfileSection = ({
  image,
  name,
  location,
  onAddWork,
}: {
  image: string;
  name: string;
  location: string;
  onAddWork: () => void;
}) => {
  return (
    <section className="flex mb-10">
      <div className="flex gap-[31px] max-sm:flex-col max-sm:items-center max-sm:text-center">
        <img
          src={image}
          alt={`${name}'s profile`}
          className="w-[150px] h-[150px] rounded-[50%] object-cover"
        />
        <div className="flex flex-col gap-5 px-0 py-[17px] max-sm:items-center">
          <h1 className="text-[#BC98C9] text-3xl leading-[38px]">{name}</h1>
          <div className="flex items-center gap-2 text-[#57F4AB] text-base leading-6 max-sm:justify-center">
            <i className="ti ti-map-pin text-[#57F4AB]" />
            <span>{location}</span>
          </div>
          <a href="AddWork">
          <button
            onClick={onAddWork}
            className="h-8 border rounded text-[#080217] text-sm leading-[22px] cursor-pointer bg-[#FF7086] px-[15px] py-0 border-solid border-[#E6DFE7]"
          >
            Додати роботу
          </button></a>
        </div>
      </div>
    </section>
  );
};

const NavigationTabs = ({
  tabs,
  onTabChange,
}: {
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
}) => {
  return (
    <nav className="flex items-center gap-[7px] mb-10">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex flex-col items-center gap-2 w-[180px] cursor-pointer"
        >
          <span
            className={`text-base leading-6 text-center ${
              tab.isActive ? "text-[#E6DFE7]" : "text-[#BC98C9]"
            }`}
          >
            {tab.label}
          </span>
          <div className="flex items-center gap-1 w-full">
            {tab.isActive ? (
              <>
                <div className="h-[3px] flex-1 bg-[#FF7086]" />
                <div className="w-2 h-2 bg-[#FF7086] rounded-[50%]" />
                <div className="h-[3px] flex-1 bg-[#FF7086]" />
              </>
            ) : (
              <div className="w-2 h-2 bg-[#BC98C9] rounded-[50%]" />
            )}
          </div>
        </div>
      ))}
    </nav>
  );
};

const EditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute flex items-center gap-2.5 text-[#E6DFE7] text-lg leading-7 cursor-pointer right-[70px] top-[148px] max-sm:static max-sm:justify-center max-sm:mt-5"
    >
      {/* SVG залишається незмінним */}
    </button>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("works");
  const [tabs, setTabs] = useState(TABS);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        if (!response.ok) throw new Error("Помилка отримання профілю");
        
        const data: ProfileData = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Невідома помилка");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setTabs(tabs.map((tab) => ({
      ...tab,
      isActive: tab.id === tabId,
    })));
  };

  const handleAddWork = () => {
    console.log("Add work clicked");
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;
  if (!profileData) return <div>Профіль не знайдено</div>;

  return (
    <main className="min-h-screen bg-[#080217] p-[70px] max-md:p-10">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />

      <ProfileSection
        image={
          profileData.avatar 
            ? `${import.meta.env.VITE_API_URL}/images/${profileData.avatar}`
            : "https://cdn.builder.io/api/v1/image/assets/TEMP/8f2dbcadf727e83ef941a748fd02cc02cf5b4c7f"
        }
        name={`${profileData.firstName} ${profileData.lastName}`}
        location="Україна"
        onAddWork={handleAddWork}
      />

      <NavigationTabs tabs={tabs} onTabChange={handleTabChange} />

      <EditButton onClick={handleEdit} />

      {activeTab === "works" && profileData.id && (
        <AuthorProductsCarousel authorId={profileData.id} />
      )}
    </main>
  );
};

export default Index;