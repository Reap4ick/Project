import { HomeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Collapse } from "antd";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
import Last from "../posts/components/Last/indexLast";
import Help from "../posts/components/Help";
import AuthorProductsCarousel from "./components/Cards";

interface ProductData {
  id: number;
  name: string;
  price: number;
  description: string;
  size: string;
  format: string;
  technique: string;
  artisticDirection: string;
  color: string;
  categoryName: string;
  createdAt: string;
  images: string[];
  createdById: string;
}

interface AuthorData {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  profileImage: string;
  socialLinks: string[];
}

interface ProfileData {
  id: string;
}

function Breadcrumbs(): JSX.Element {
  return (
    <Breadcrumb
      className="breadcrumb"
      items={[
        { href: "/", title: <HomeOutlined /> },
        { title: "Скоро вихід" },
      ]}
    />
  );
}

export default function CombinedComponent({
  className = "",
}: {
  className?: string;
}): JSX.Element {
  const { Panel } = Collapse;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [author, setAuthor] = useState<AuthorData | null>(null);
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product!.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product!.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (!response.ok) throw new Error("Помилка отримання профілю");

        const data: ProfileData = await response.json();
        setUserProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Невідома помилка");
      } finally {
        setLoading(false);
      }
    };

    const fetchProductData = async (): Promise<void> => {
      try {
        if (!id) return;
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/Products/${id}`
        );

        if (!response.ok) {
          console.error("Error fetching product data:", response.status);
          return;
        }

        const data: ProductData = await response.json();
        setProduct(data);

        if (data.createdById) {
          fetchAuthorData(data.createdById);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchAuthorData = async (authorId: string): Promise<void> => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/Products/user/${authorId}`
        );

        if (!response.ok) {
          console.error("Error fetching author data:", response.status);
          return;
        }

        const data: AuthorData = await response.json();
        setAuthor({
          ...data,
          socialLinks: data.socialLinks || [],
        });
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchProductData();
    fetchProfile();
  }, [id]);

  const handleEditClick = () => {
    if (product) {
      navigate(`/update/${product.id}`);
    }
  };

  if (!product) {
    return <div>Завантаження даних про продукт...</div>;
  }

  const showEditButton = userProfile && product.createdById === userProfile.id;

  return (
    <div
      className={`font-gotham flex w-full flex-col gap-y-6 bg-slate-950 pt-9 tracking-[0px] ${className}`}
    >
      <div className="flex items-end pt-4">
        <Breadcrumbs />
      </div>

      <div className="flex flex-wrap items-start justify-center gap-x-16 gap-y-16 min-[1430px]:flex-nowrap">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-6 min-[1430px]:flex-nowrap">
          <div className="relative group">
            <img
              className="h-[708px] w-[545px] flex-shrink-0 rounded-[4.3px] object-cover object-center"
              src={`${import.meta.env.VITE_API_URL}/images/${product.images[currentImageIndex]}`}
              alt={product.name}
              loading="lazy"
            />
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-4 text-white hover:bg-black/75 transition-colors"
                >
                  <LeftOutlined className="text-2xl" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-4 text-white hover:bg-black/75 transition-colors"
                >
                  <RightOutlined className="text-2xl" />
                </button>
              </>
            )}
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                    index === currentImageIndex 
                      ? "bg-rose-400" 
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-[530px] flex-shrink-0 flex-col items-start gap-y-3">
          <div className="font-skema-pro-omni text-3xl font-medium leading-[38px] text-rose-400">
            {product.name}
          </div>
          <div className="text-xl leading-7 text-white">
            {author
              ? `Автор: ${author.firstName} ${author.lastName}`
              : `Автор ID: ${product.createdById}`}
          </div>
          <div className="flex flex-wrap items-start gap-x-11 gap-y-11 self-stretch leading-[35px]">
            <div className="flex w-28 flex-shrink-0 flex-col items-start gap-y-6">
              <div className="self-stretch text-zinc-200">
                <span>
                  <p>Жанр</p>
                  <p>Основа</p>
                  <p>Техніка</p>
                  <p>Висота</p>
                  <p>Ширина</p>
                  <p>Рік створення</p>
                </span>
              </div>
              <div className="text-xl font-bold leading-7 text-rose-400">
                {product.price} грн
              </div>
            </div>
            <div className="w-[70px] flex-shrink-0 text-[plum]">
              <span>
                <p>{product.categoryName}</p>
                <p>{product.size}</p>
                <p>{product.technique}</p>
                <p>65</p>
                <p>50</p>
                <p>1987</p>
              </span>
            </div>
          </div>

          {showEditButton && (
            <button
              onClick={handleEditClick}
              className="flex items-center justify-center gap-x-2.5 rounded-[5.2px] border border-solid border-zinc-200 bg-zinc-200 px-[18px] py-[4.9px] drop-shadow-lg"
            >
              <div className="font-fixel-display text-lg leading-7 text-slate-950">
                Редагувати
              </div>
            </button>
          )}

          <Collapse
            defaultActiveKey={[]}
            ghost
            className="custom-accordion"
            accordion
          >
            <Panel header="Детальніше про картину" key="1">
              <p>{product.description}</p>
            </Panel>
            <Panel header="Автор" key="2">
              {author ? (
                <div className="flex flex-col gap-y-4">
                  <img
                    className="h-32 w-32 rounded-full object-cover"
                    src={`${import.meta.env.VITE_API_URL}/images/${author.profileImage}`}
                    alt={`${author.firstName} ${author.lastName}`}
                  />
                  <p className="text-lg text-white">
                    {author.firstName} {author.lastName}
                  </p>
                  <p className="text-sm text-zinc-400">{author.bio}</p>
                  <div className="flex gap-x-4">
                    {author.socialLinks.length > 0 ? (
                      author.socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400"
                        >
                          {link}
                        </a>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">
                        Соціальні посилання відсутні
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p>Інформація про автора недоступна</p>
              )}
            </Panel>
            <Panel header="Правила та умови придбання" key="3">
              <p>
                Правила придбання: перерахування на рахунок, доставка в межах
                України тощо.
              </p>
            </Panel>
          </Collapse>
        </div>
      </div>

      <AuthorProductsCarousel authorId={product.createdById} />
      <Help />
    </div>
  );
}