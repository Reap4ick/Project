import { CloseOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Typography, message } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (token: string) => void;
};

const RegisterModal = ({ isOpen, onClose, onRegister }: RegisterModalProps): JSX.Element | null => {
  if (!isOpen) return null;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("FirstName", firstName);
      formData.append("LastName", lastName);
      formData.append("Email", email);
      formData.append("Password", password);
      formData.append("Role", "Author");
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Помилка реєстрації");
      }
  
      const data = await response.json();
      localStorage.setItem("token", data.token); // Зберігаємо токен у localStorage
      onRegister(data.token);
      message.success("Успішна реєстрація!");
      onClose();
    } catch (error: any) {
      message.error(error.message || "Помилка реєстрації");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 544,
          backgroundColor: "#E5E5E5",
          borderRadius: 8,
          padding: 24,
          transform: "translateY(-20px)",
          animation: "slideIn 0.3s ease-out forwards",
        }}
      >
        <CloseOutlined
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            fontSize: 24,
            cursor: "pointer",
          }}
          onClick={onClose}
        />

        {/* Верхня частина з логотипом та заголовком */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ marginTop: 16 }}>
            Вітаємо на платформі ArtUA!
          </Title>
          <Text style={{ color: "#410c55" }}>
            Увійдіть в акаунт, щоб отримати доступ до ексклюзивних функцій та зберігати улюблені роботи.
          </Text>
        </div>

        {/* Поле для введення Ім’я */}
        <label htmlFor="firstName" style={{ display: "block", marginBottom: 8, color: "#000" }}>
          Ім’я
        </label>
        <Row justify="center">
          <Col span={24} style={{ display: "flex", gap: "8px" }}>
            <Input
              id="firstName"
              placeholder="Ім’я"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                paddingLeft: 10,
                flexGrow: 1,
                borderColor: "#5A189A",
                height: 45,
                color: "#000",
              }}
            />
          </Col>
        </Row>

        {/* Поле для введення Прізвище */}
        <label htmlFor="lastName" style={{ display: "block", marginBottom: 8, color: "#000", paddingTop: 10 }}>
          Прізвище
        </label>
        <Row justify="center">
          <Col span={24} style={{ display: "flex", gap: "8px" }}>
            <Input
              id="lastName"
              placeholder="Прізвище"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{
                paddingLeft: 10,
                flexGrow: 1,
                borderColor: "#5A189A",
                height: 45,
                color: "#000",
              }}
            />
          </Col>
        </Row>

        {/* Поле для введення Email */}
        <label htmlFor="email" style={{ display: "block", marginBottom: 8, color: "#000", paddingTop: 10 }}>
          Email
        </label>
        <Row justify="center">
          <Col span={24} style={{ display: "flex", gap: "8px" }}>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                paddingLeft: 10,
                flexGrow: 1,
                borderColor: "#5A189A",
                height: 45,
                color: "#000",
              }}
            />
          </Col>
        </Row>

        {/* Поле для введення Пароля */}
        <label htmlFor="password" style={{ display: "block", marginBottom: 8, color: "#000", paddingTop: 10 }}>
          Пароль
        </label>
        <Row justify="center">
          <Col span={24} style={{ display: "flex", gap: "8px", width: "100%", position: "relative" }}>
            <Input.Password
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              iconRender={(visible) => (
                <div
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                  }}
                >
                  {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </div>
              )}
              style={{
                paddingLeft: 10,
                paddingRight: 40, // Залишаємо місце для іконки
                flexGrow: 1,
                borderColor: "#5A189A",
                height: 45,
                color: "#000",
                width: "100%",
              }}
            />
          </Col>
        </Row>

        {/* Кнопка для реєстрації */}
        <Row justify="center" style={{ marginTop: 24 }}>
          <Col span={24}>
            <Button
              type="primary"
              onClick={handleRegister}
              loading={loading}
              style={{
                width: "100%",
                height: 45,
                backgroundColor: "#000",
                borderColor: "#D8B4E2",
              }}
            >
              Зареєструватись
            </Button>
          </Col>
        </Row>

        {/* Інформаційний текст */}
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Text style={{ fontSize: 12, color: "#080217" }}>
            Натискаючи «Зареєструватися» або «Увійти за допомогою електронної пошти», ви погоджуєтеся з Правилами та умовами і Політикою конфіденційності сайту ArtUA, а також на отримання електронних листів від ArtUA.
          </Text>
        </div>
        <div data-svg-wrapper style={{ marginTop: 16 }}>
          <svg width="480" height="2" viewBox="0 0 480 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1H480" stroke="#080217" />
          </svg>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 16 }}>
          <Text className="text-center" style={{ fontSize: 14, color: "#080217" }}>
            Уже маєте акаунт?{" "}
            <span
              style={{
                color: "#410C55",
                fontWeight: "bold",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Увійти!
            </span>
          </Text>
        </div>
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideIn {
              from { transform: translateY(-20px); }
              to { transform: translateY(0); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default RegisterModal;
