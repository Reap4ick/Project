import { CloseOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Typography, message } from "antd";
import { useState } from "react";

const { Title, Text, Link } = Typography;

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (token: string) => void;
};

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps): JSX.Element | null => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Невірний логін або пароль");
      }

      const data = await response.json();
      console.log(data); // Додайте це для перевірки
      const token = data.token; // тут отримуємо токен

      if (token) {
        console.log("Before saving token:", localStorage.getItem("token"));
        localStorage.setItem("token", token);
        console.log("After saving token:", localStorage.getItem("token"));
        onLogin(token); // Передаємо токен до onLogin
        message.success("Успішний вхід!");
        onClose();
      } else {
        throw new Error("Токен не отримано");
      }
    } catch (error: any) {
      message.error(error.message || "Помилка входу");
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
          height: 668,
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
            zIndex: 1,
          }}
          onClick={onClose}
        />

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="38.3184" y="38.3188" width="15.2081" height="14.8624" fill="#410C55" />
            <rect x="20" y="29.678" width="4.49329" height="32.8356" fill="#BC98C9" />
            <rect x="20" y="62.5132" width="4.49329" height="33.8725" transform="rotate(-90 20 62.5132)" fill="#BC98C9" />
            <rect x="72.1919" y="62.5139" width="4.49329" height="32.8356" transform="rotate(180 72.1919 62.5139)" fill="#BC98C9" />
            <rect x="72.1919" y="29.6787" width="4.49329" height="33.8725" transform="rotate(90 72.1919 29.6787)" fill="#BC98C9" />
            <rect x="62.8584" y="20" width="4.49329" height="32.8356" transform="rotate(90 62.8584 20)" fill="#FF7086" />
            <rect x="30.0229" y="20" width="4.49329" height="33.8725" fill="#FF7086" />
            <rect x="30.0225" y="72.1919" width="4.49329" height="32.8356" transform="rotate(-90 30.0225 72.1919)" fill="#57F4AB" />
            <rect x="62.8579" y="72.1919" width="4.49329" height="33.8725" transform="rotate(-180 62.8579 72.1919)" fill="#57F4AB" />


          </svg>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="text-[#080217] text-3xl font-medium font-['Skema Pro Omni'] leading-[38px]">
            Вітаємо на платформі ArtUA!
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="w-[461px] text-center text-[#410c55] text-base font-normal font-['Gotham'] leading-normal">
            Увійдіть в акаунт, щоб отримати доступ до ексклюзивних функцій та зберігати улюблені роботи.
          </div>
        </div>

        <label htmlFor="email" style={{ display: "block", marginBottom: 8, color: "#000" }}>
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

        <label htmlFor="password" style={{ display: "block", marginBottom: 8, color: "#000", paddingTop: 10 }}>
          Пароль
        </label>
        <Col span={24} style={{ display: "flex", gap: "8px", width: "100%", position: 'relative' }}>
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
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1
              }}>
                {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            )}
            style={{
              paddingLeft: 10,
              paddingRight: 40, /* Залишаємо місце для іконки */
              flexGrow: 1,
              borderColor: "#5A189A",
              height: 45,
              color: "#000",
              width: "100%",
            }}
            autoComplete="current-password"
          />
        </Col>
        <Col span={24} style={{ textAlign: "center", width: "100%" }}>
          <Text
            style={{
              width: "100%",
              color: "#410c55",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Забули пароль?
          </Text>
        </Col>

        <Row justify="center" style={{ marginTop: 24 }}>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              style={{
                width: "100%",
                height: 45,
                backgroundColor: "#000",
                borderColor: "#D8B4E2",
              }}
              onClick={handleLogin}
              loading={loading}
            >
              Увійти
            </Button>
          </Col>
        </Row>

        <div className="flex justify-center mt-4">
          <div className="w-[432px] text-center text-[#080217] text-xs font-normal font-['Fixel Display'] leading-[17px]">
            Натискаючи «Зареєструватися» або «Увійти за допомогою електронної пошти», ви погоджуєтеся з Правилами та умовами і Політикою конфіденційності сайту ArtUA, а також на отримання електронних листів від ArtUA.
          </div>
        </div>

        <div data-svg-wrapper style={{ marginTop: 16 }}>
          <svg width="480" height="2" viewBox="0 0 480 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1H480" stroke="#080217" />
          </svg>
        </div>

        <Row justify="center" style={{ marginTop: 16 }}>
          <Col>
            <Text style={{ textAlign: "center", color: "#000" }}>
              Ще не маєте акаунту?
            </Text>
          </Col>
          <Col>
            <Link href="#" style={{ textAlign: "center", color: "#5A189A", marginLeft: 8 }}>
              Зареєструйтесь!
            </Link>
          </Col>
        </Row>
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
  );
};

export default LoginModal;
