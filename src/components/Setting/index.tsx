import React, { useState, forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Інтерфейси та типи
interface StepProps {
  label: string;
  isActive?: boolean;
  isLast?: boolean;
}

interface Option {
  label: string;
  value: string;
}

interface UserFormData {
  email: string;
  phone?: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface BlockedUser {
  name: string;
}

interface SessionInfoProps {
  activeSessions: number;
  joinDate: string;
}

interface FormInputProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  showCharCount?: boolean;
}

interface ActionButtonsProps {
  onSave: () => void;
  onCancel: () => void;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  showPasswordToggle?: boolean;
  backgroundText?: string;
}

interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  phone?: string;
  avatar: string;
}

interface ModalState {
  open: boolean;
  message: string;
  isSuccess: boolean;
}

// Компоненти
const Step: React.FC<StepProps> = ({ label, isActive, isLast }) => (
  <div className="self-stretch flex flex-col items-center justify-center w-[180px] my-auto pt-px" style={{ cursor: "pointer" }}>
    <div
      className={`max-w-full w-[180px] text-base ${isActive ? "text-[#E6DFE7]" : "text-[#BC98C9]"} font-normal whitespace-nowrap text-center`}
    >
      {label}
    </div>
    <div className="flex w-3.5 items-center gap-1 overflow-hidden justify-center mt-2">
      {!isLast && (
        <div className="self-stretch flex w-full shrink h-[3px] flex-1 basis-[0%] my-auto" />
      )}
      <img
        src={
          isActive
            ? "https://cdn.builder.io/api/v1/image/assets/c30e2b7059da48629502fd3deaf9307c/41ff897f518aa6caacd3d25edb96341880bb649e3321890f7d5ce9beb41bf57a?placeholderIfAbsent=true"
            : "https://cdn.builder.io/api/v1/image/assets/c30e2b7059da48629502fd3deaf9307c/6b512b0bd47975b00617fa8ca0f0a63c9c0cb5dc62d6189034950281e66cc5d5?placeholderIfAbsent=true"
        }
        className="aspect-[1] object-contain w-2 self-stretch shrink-0 my-auto"
        alt=""
      />
      {!isLast && (
        <div className="self-stretch flex w-full shrink h-[3px] flex-1 basis-[0%] my-auto" />
      )}
    </div>
  </div>
);

const SettingsHeader: React.FC<{ currentStep: number; setCurrentStep: (step: number) => void }> = ({ currentStep, setCurrentStep }) => {
  const steps = [
    { label: "Персоналізація", isActive: currentStep === 0 },
    { label: "Акаунт", isActive: currentStep === 1 },
    { label: "Розширені налаштування", isActive: currentStep === 2 },
  ];

  return (
    <header>
      <div className="self-stretch text-3xl text-[#E6DFE7] font-medium whitespace-nowrap leading-none max-md:max-w-full">
        <div className="max-md:max-w-full">Налаштування</div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/c30e2b7059da48629502fd3deaf9307c/3233843acf76f85088e6a0782f5914bc1ba4d5c66138f908a7e56c1ebfb7c297?placeholderIfAbsent=true"
          className="object-contain w-[1300px] stroke-[1px] stroke-[#E6DFE7] max-w-full mt-2.5"
          alt=""
        />
      </div>
      <div className="flex items-center gap-[7px] flex-wrap ml-7 mt-[26px] max-md:max-w-full">
        {steps.map((step, index) => (
          <div key={index} onClick={() => setCurrentStep(index)}>
            <Step label={step.label} isActive={step.isActive} isLast={index === steps.length - 1} />
          </div>
        ))}
      </div>
    </header>
  );
};

const RadioGroup: React.FC<{
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}> = ({ options, value, onChange, name }) => {
  return (
    <div className="flex w-full max-w-full flex-col mt-3">
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-3 mt-2 first:mt-0">
          <div className="flex items-center justify-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              className="appearance-none w-4 h-4 rounded-full border border-[#BC98C9] checked:border-[#BC98C9] checked:bg-[#BC98C9] checked:border-2 checked:bg-[#080217] checked:bg-center"
            />
          </div>
          <label
            htmlFor={`${name}-${option.value}`}
            className="text-[#BC98C9] text-sm font-normal leading-loose cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

const BlockedUsers: React.FC<{ users: BlockedUser[]; onUnblock?: (name: string) => void }> = ({ users, onUnblock }) => {
  return (
    <div className="min-h-16 max-w-full font-normal mt-3">
      {users.map((user, index) => (
        <div key={user.name} className={`flex w-full items-center justify-between ${index > 0 ? "mt-2" : ""}`}>
          <div className="text-[#BC98C9] text-xl leading-[1.4]">
            <span className="underline">{user.name}</span>
          </div>
          <button
            onClick={() => onUnblock?.(user.name)}
            className="text-[#57F4AB] text-sm leading-loose hover:opacity-80"
          >
            Розблокувати
          </button>
        </div>
      ))}
    </div>
  );
};

const SessionInfo: React.FC<SessionInfoProps> = ({ activeSessions, joinDate }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-xl font-normal leading-[1.4]">
        <div className="text-[#E6DFE7]">Активні сеанси</div>
        <div className="text-[#BC98C9]">
          <span className="underline">{activeSessions} пристрій</span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xl font-normal leading-[1.4]">
        <div className="text-[#E6DFE7]">На платформі з:</div>
        <div className="text-[#BC98C9]">{joinDate}</div>
      </div>
    </div>
  );
};

const PrivacySettings: React.FC = () => {
  const [profilePrivacy, setProfilePrivacy] = useState("public");
  const [lastActivityVisibility, setLastActivityVisibility] = useState("all");
  const [messagePermission, setMessagePermission] = useState("all");

  return (
    <section className="space-y-6">
      <h2 className="text-[#E6DFE7] text-2xl font-normal leading-none">Конфіденційність</h2>
      <div>
        <div className="text-xl text-[#E6DFE7] font-normal leading-[1.4]">Приватність профілю</div>
        <div className="flex w-full max-w-[241px] items-start gap-4">
          <RadioGroup
            name="profile-privacy"
            options={[
              { label: "Публічний", value: "public" },
              { label: "Приватний", value: "private" },
            ]}
            value={profilePrivacy}
            onChange={setProfilePrivacy}
          />
          {profilePrivacy === "private" && (
            <img
              src="https://cdn.builder.io/api/v1/image/assets/c30e2b7059da48629502fd3deaf9307c/2d32652cdc215bf528de3cf461aceb9e21f5a8669c79837827fd156c1ef27404?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-3.5 shrink-0 mt-4"
              alt=""
            />
          )}
        </div>
      </div>
      <div>
        <div className="text-xl text-[#E6DFE7] font-normal leading-[1.4]">Хто може бачити останню активність</div>
        <RadioGroup
          name="activity-visibility"
          options={[
            { label: "Усі", value: "all" },
            { label: "Ніхто", value: "none" },
            { label: "Усі...", value: "custom" },
          ]}
          value={lastActivityVisibility}
          onChange={setLastActivityVisibility}
        />
        {lastActivityVisibility === "custom" && (
          <div className="flex items-center gap-2.5 mt-3">
            <div className="rounded flex items-center text-sm text-[#080217] font-normal whitespace-nowrap leading-loose">
              <button className="justify-center items-center rounded bg-[#FF7086] min-h-[32px] px-[16px] border-[1px] border-solid border-[#FF7086] flex gap-2">
                <span>крім</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/c30e2b7059da48629502fd3deaf9307c/c6889dec6f2899931be41108189ee00ed3406a487ac2a26f40026d86e180d9b4?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-6"
              alt=""
            />
          </div>
        )}
      </div>
      <div>
        <div className="text-xl text-[#E6DFE7] font-normal leading-[1.4]">Хто може писати повідомлення</div>
        <RadioGroup
          name="message-permission"
          options={[
            { label: "Усі", value: "all" },
            { label: "Ніхто", value: "none" },
            { label: "Лише підписники", value: "followers" },
          ]}
          value={messagePermission}
          onChange={setMessagePermission}
        />
      </div>
    </section>
  );
};

const SecuritySettings: React.FC = () => {
  const blockedUsers = [
    { name: "Ломикін Костянтин" },
    { name: "Уваров Сергій" },
  ];

  const handleUnblock = (name: string) => {
    console.log(`Unblocking ${name}`);
  };

  return (
    <section className="space-y-6">
      <h2 className="text-[#E6DFE7] text-2xl font-normal leading-none">Безпека та блокування</h2>
      <div>
        <div className="text-xl text-[#E6DFE7] font-normal leading-[1.4]">Чорний список</div>
        <BlockedUsers users={blockedUsers} onUnblock={handleUnblock} />
      </div>
      <SessionInfo activeSessions={1} joinDate="16 грудня 2024 р." />
    </section>
  );
};

const PersonalizationSettings: React.FC<{ 
  profileData: ProfileData | null,
  updateProfile: (data: Partial<ProfileData>, file?: File) => Promise<void>,
  showModal: (message: string, isSuccess: boolean) => void 
}> = ({ profileData, updateProfile, showModal }) => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    country: "",
    avatar: "",
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        lastName: profileData.lastName,
        firstName: profileData.firstName,
        country: profileData.country,
        avatar: profileData.avatar,
      });
    }
  }, [profileData]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await updateProfile({ avatar: URL.createObjectURL(file) }, file);
      showModal("Аватар успішно оновлено", true);
    } catch (error) {
      showModal("Помилка при оновленні аватару", false);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      showModal("Дані успішно збережено", true);
    } catch (error) {
      showModal("Помилка при збереженні даних", false);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="text-[#E6DFE7] text-2xl font-normal leading-none">Персоналізація</h2>
      <div className="mb-10 relative">
        <div className="relative">
          <div className="w-[150px] h-[150px] rounded-full bg-[#BC98C9] overflow-hidden">
            {profileData?.avatar ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/images/${profileData.avatar}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#080217] opacity-50" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="avatarInput"
          />
          <label
            htmlFor="avatarInput"
            className="text-[#BC98C9] text-xl underline mt-[-85px] ml-[174px] absolute cursor-pointer"
          >
            Вибрати зображення
          </label>
        </div>
      </div>
      <div className="max-w-[722px] max-sm:w-full">
        <FormInput
          label="Прізвище"
          required
          value={formData.lastName}
          onChange={(value) => setFormData(prev => ({ ...prev, lastName: value }))}
        />
        <FormInput
          label="Ім'я"
          required
          value={formData.firstName}
          onChange={(value) => setFormData(prev => ({ ...prev, firstName: value }))}
        />
        <FormInput
          label="Моя країна"
          value={formData.country}
          onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
          showCharCount={false}
        />
        <div className="flex gap-3 mt-[60px] max-sm:flex-col">
          <button
            onClick={handleSave}
            className="h-8 border rounded text-[#080217] text-sm cursor-pointer bg-[#FF7086] px-[15px] py-0 border-solid border-[#E6DFE7] max-sm:w-full hover:opacity-90 transition-opacity"
          >
            Зберегти зміни
          </button>
        </div>
      </div>
    </section>
  );
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  required = false,
  value,
  onChange,
  maxLength = 30,
  showCharCount = true,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!maxLength || newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className="mb-[30px]">
      <div className="flex items-start gap-1 mb-1.5">
        <div className="text-[#E6DFE7] text-xl">{label}</div>
        {required && <div className="text-[#C00] text-sm">*</div>}
      </div>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="w-full h-[46px] border text-[#E6DFE7] text-base px-[11px] py-0 rounded-md border-solid border-[#BC98C9] bg-transparent"
          maxLength={maxLength}
        />
        {showCharCount && (
          <div className="absolute text-[#BC98C9] text-[11px] right-[11px] -bottom-6">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, required, error, showPasswordToggle, backgroundText, ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(event.target.value.length > 0);
    };

    return (
      <div className="mb-6">
        {label && (
          <div className="flex items-start gap-1 mb-1.5">
            <div className="text-[#E6DFE7] text-xl leading-7">{label}</div>
            {required && (
              <span className="text-[#C00] text-sm leading-[22px]">*</span>
            )}
          </div>
        )}
        <div className="flex items-center w-[722px] h-[46px] border border-[#BC98C9] px-[11px] py-0 rounded-md max-md:w-full max-sm:w-full relative">
          <input
            type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
            className={`flex-1 text-[#E6DFE7] text-base leading-6 border-none bg-transparent outline-none ${className}`}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
            {...props}
          />
          {backgroundText && !hasValue && !isFocused && (
            <span className="absolute left-3 text-[#BC98C9] text-base leading-6 pointer-events-none">
              {backgroundText}
            </span>
          )}
          {showPasswordToggle && (
            <i
              className={`ti ti-eye${showPassword ? "" : "-off"} text-[#BC98C9] text-lg cursor-pointer`}
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        {error && <span className="text-[#C00] text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

const SettingsForm: React.FC<{ 
  profileData: ProfileData | null,
  updateProfile: (data: Partial<ProfileData>) => Promise<void>,
  showModal: (message: string, isSuccess: boolean) => void 
}> = ({ profileData, updateProfile, showModal }) => {
  const { register, handleSubmit, reset } = useForm<UserFormData>({
    defaultValues: {
      email: profileData?.email || "",
      phone: profileData?.phone || "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      await updateProfile(data);
      showModal("Дані успішно оновлено", true);
      reset(data);
    } catch (error) {
      showModal("Помилка при оновленні даних", false);
    }
  };

  return (
    <section className="mb-10">
      <h2 className="text-[#E6DFE7] text-2xl leading-8 mb-4">Інформація</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          required
          backgroundText="example@gmail.com"
          {...register("email", { required: true })}
        />
        <Input
          label="Номер телефону"
          type="tel"
          backgroundText="+38 (999)-99-99-999"
          {...register("phone")}
        />
        <button
          type="submit"
          className="text-[#080217] border border-[#E6DFE7] rounded text-sm leading-[22px] cursor-pointer bg-[#FF7086] px-[15px] py-[5px]"
        >
          Зберегти зміни
        </button>
      </form>
    </section>
  );
};

const PasswordSection: React.FC<{ 
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>,
  showModal: (message: string, isSuccess: boolean) => void 
}> = ({ updatePassword, showModal }) => {
  const { register, handleSubmit, formState, watch, reset } = useForm<PasswordFormData>();
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      showModal("Паролі не співпадають", false);
      return;
    }
    
    try {
      await updatePassword(data.currentPassword, data.newPassword);
      showModal("Пароль успішно змінено", true);
      reset();
    } catch (error) {
      showModal("Невірний поточний пароль", false);
    }
  };

  return (
    <section className="mb-10">
      <h2 className="text-[#E6DFE7] text-2xl leading-8 mb-4">Пароль</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Поточний пароль"
          required
          showPasswordToggle
          {...register("currentPassword", { required: true })}
        />
        <Input
          label="Новий пароль"
          required
          showPasswordToggle
          {...register("newPassword", { required: true })}
        />
        <Input
          label="Підтвердіть пароль"
          required
          showPasswordToggle
          {...register("confirmPassword", { required: true })}
        />
        <div className="flex items-center max-sm:flex-col max-sm:gap-2.5">
          <button
            type="submit"
            className="text-[#080217] border border-[#E6DFE7] rounded text-sm leading-[22px] cursor-pointer bg-[#FF7086] px-[15px] py-[5px]"
          >
            Зберегти зміни
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="text-[#BC98C9] border border-[#E6DFE7] rounded text-sm leading-[22px] cursor-pointer ml-4 px-[15px] py-[5px] max-sm:mt-2.5"
          >
            Відмінити
          </button>
        </div>
      </form>
    </section>
  );
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    message: "",
    isSuccess: false
  });
  const navigate = useNavigate();

  const showModal = (message: string, isSuccess: boolean) => {
    setModalState({ open: true, message, isSuccess });
  };

  const handleModalClose = () => {
    setModalState(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
  }, [navigate]);

  const updateProfile = async (data: Partial<ProfileData>, file?: File) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("Token", token);
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (file) formData.append("AvatarFile", file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/update`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Помилка оновлення профілю");

      const newData = await response.json();
      setProfileData(prev => ({ ...prev!, ...newData }));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Невідома помилка");
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, currentPassword, newPassword }),
      });

      if (!response.ok) throw new Error("Помилка зміни паролю");
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Невідома помилка");
    }
  };

  const renderStepContent = () => {
    if (loading) {
      return <div className="text-[#E6DFE7]">Завантаження профілю...</div>;
    }

    if (error) {
      return <div className="text-[#FF7086]">{error}</div>;
    }

    switch (currentStep) {
      case 0:
        return <PersonalizationSettings 
          profileData={profileData} 
          updateProfile={updateProfile}
          showModal={showModal}
        />;
      case 1:
        return (
          <div>
            <SettingsForm 
              profileData={profileData} 
              updateProfile={updateProfile}
              showModal={showModal}
            />
            <PasswordSection 
              updatePassword={updatePassword}
              showModal={showModal}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <PrivacySettings />
            <SecuritySettings />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <main className="min-h-screen bg-[#080217] p-[70px] max-md:p-10 max-sm:p-5">
        <SettingsHeader currentStep={currentStep} setCurrentStep={setCurrentStep} />
        {renderStepContent()}
        
        {/* Модальне вікно */}
        {modalState.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#080217] p-6 rounded-lg border border-[#e6dfe7] min-w-[300px] text-center">
              <div className={`text-xl mb-4 ${modalState.isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                {modalState.isSuccess ? 'Успіх!' : 'Помилка'}
              </div>
              <div className="text-[#e6dfe7] mb-6">{modalState.message}</div>
              <button
                className="w-full py-2 bg-[#ff7086] rounded hover:bg-[#ff5c75] transition-colors"
                onClick={handleModalClose}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Index;