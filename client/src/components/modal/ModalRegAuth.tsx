import React, { useState } from "react";
import styled from "styled-components";
import { registration, logIn } from "../../http/userAPI";
import { useAppDispatch } from "../../store/hooks";
import { authorizeUser, setUserData } from "../../store/userSlice";
import Text from "../generic/Text";

interface ModalRegAuthProps {
  isAuth: boolean;
  isRequestToAdmin: boolean;
  setIsAuth: (flag: boolean) => void;
  setIsRequestToAdmin: (flag: boolean) => void;
  setModalIsOpen: (flag: boolean) => void;
}

export default function ModalRegAuth({
  isAuth,
  setIsAuth,
  isRequestToAdmin,
  setIsRequestToAdmin,
  setModalIsOpen,
}: ModalRegAuthProps) {
  const [login, setLogin] = useState<string>("");
  const [nameAndSurname, setNameAndSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  function LogAndSignIn(userInfo: any) {
    dispatch(authorizeUser(true));
    dispatch(setUserData(userInfo));

    setLogin("");
    setNameAndSurname("");
    setEmail("");
    setPassword("");
    setModalIsOpen(false);
  }

  async function signIn() {
    try {
      const userInfo = await registration(
        email,
        password,
        login,
        nameAndSurname?.split(" ")[0],
        nameAndSurname?.split(" ")[1]
      );

      LogAndSignIn(userInfo);
    } catch (e: any) {
      alert(e.response.data.message);
    }
  }

  async function logInFunc() {
    try {
      const userInfo = await logIn(email, password);

      LogAndSignIn(userInfo);
    } catch (e: any) {
      alert(e.response.data.message);
    }
  }

  return (
    <Block>
      <Header>
        {isRequestToAdmin ? (
          <RequestHeader>
            <Text align="center" size={18} lh={22} color="#000000">
              Заявка на создание учетной записи администратора организации
            </Text>
          </RequestHeader>
        ) : (
          <React.Fragment>
            <Button onClick={() => setIsAuth(true)} isActive={isAuth}>
              <Text align="center" size={18} lh={22} color="#000000">
                Вход
              </Text>
            </Button>
            <Button onClick={() => setIsAuth(false)} isActive={!isAuth}>
              <Text align="center" size={18} lh={22} color="#000000">
                Регистрация
              </Text>
            </Button>
          </React.Fragment>
        )}
      </Header>
      <Body>
        {isRequestToAdmin ? (
          <React.Fragment>
            <Text pt={10} pb={10} size={16} lh={20} color="#292929">
              Название организации/заведения
            </Text>
            <Input />
            <Text pt={10} pb={10} size={16} lh={20} color="#292929">
              Сфера деятельности
            </Text>
            <Input />
            <Text pt={10} pb={10} size={16} lh={20} color="#292929">
              Email
            </Text>
            <Input />
            <Text pt={10} pb={10} size={16} lh={20} color="#292929">
              Мобильный телефон
            </Text>
            <Input />
            <ButtonWrapper isAuthOrReg={false}>
              <SignIn>Подать заявку</SignIn>
            </ButtonWrapper>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {!isAuth && (
              <React.Fragment>
                <Text pb={10} size={16} lh={20} color="#292929">
                  Имя и фамилия
                </Text>
                <Input
                  value={nameAndSurname}
                  onChange={(e) => setNameAndSurname(e.target.value)}
                />
                <Text pt={5} color="rgba(41, 41, 41, 0.34);" size={10}>
                  Не допустимы к вводу цифры и специальные символы
                </Text>
                <Text pb={10} size={16} lh={20} color="#292929">
                  Логин
                </Text>
                <Input
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </React.Fragment>
            )}
            <Text pt={10} pb={10} size={16} lh={20} color="#292929">
              Email
            </Text>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <Text pt={10} pb={10} size={16} lh={20} color="#292929">
              Пароль
            </Text>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            {!isAuth && (
              <Text pt={5} color="rgba(41, 41, 41, 0.34);" size={10}>
                Пароль должен содержать 8 символов
              </Text>
            )}
            {!isAuth ? (
              <ButtonWrapper isAuthOrReg={true}>
                <SignIn onClick={signIn}>Зарегистрироваться</SignIn>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper isAuthOrReg={true}>
                <SignIn onClick={logInFunc}>Вход</SignIn>
              </ButtonWrapper>
            )}
            <TextWrapper onClick={() => setIsRequestToAdmin(true)}>
              <Text underline size={11} color="#335250">
                Подать заявку на регистрацию учетной записи администратора
              </Text>
            </TextWrapper>
          </React.Fragment>
        )}
      </Body>
    </Block>
  );
}

const Block = styled.div`
  background: #fafafa;
  box-shadow: 17px 15px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding-bottom: 40px;
`;

const RequestHeader = styled.div`
  padding: 30px 0 20px;
  border-bottom: 3px solid #0049457c;
`;

const ButtonWrapper = styled.div<{ isAuthOrReg: boolean }>`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: ${(p) => (p.isAuthOrReg ? "30" : "0")}px;
`;

const SignIn = styled.button`
  background: #335250;
  border-radius: 20px;
  padding: 0 30px;
  height: 31.25px;
  font-size: 16px;
  color: #ffffff;
`;

const Input = styled.input`
  width: 100%;
  background: #ffffff;
  border: 1px solid rgba(53, 53, 53, 0.6);
  border-radius: 20px;
  height: 36px;
  padding-left: 15px;
  font-size: 16px;
`;

const Body = styled.div`
  padding: 0 50px;
`;

const Header = styled.header`
  padding: 0 0 30px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button<{ isActive: boolean }>`
  width: 50%;
  padding-bottom: 5px;
  padding-top: 20px;
  transition: 0.2s;

  &:hover {
    background-color: rgba(62, 62, 62, 0.1);
  }

  box-shadow: 0 3px
    ${(p) => (p.isActive ? "#004945" : "rgba(62, 62, 62, 0.1);")};
`;

const TextWrapper = styled.div`
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
`;
