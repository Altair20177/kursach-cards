import React, { useState } from "react";
import styled from "styled-components";
import { registration, logIn } from "../../http/userAPI";
import { useAppDispatch } from "../../store/hooks";
import { authorizeUser, setUserData } from "../../store/userSlice";
import Message from "../generic/Message";
import Text from "../generic/Text";
import { nameAndSurnameInput } from "../generic/validation";

interface ModalRegAuthProps {
  isAuth: boolean;
  setIsAuth: (flag: boolean) => void;
  setModalIsOpen: (flag: boolean) => void;
}

export default function ModalRegAuth({
  isAuth,
  setIsAuth,
  setModalIsOpen,
}: ModalRegAuthProps) {
  const [login, setLogin] = useState<string>("");
  const [nameAndSurname, setNameAndSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

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

  function onChangeName(e: any) {
    const letter = e.target.value.slice(-1);

    if (nameAndSurnameInput(letter)) setNameAndSurname(e.target.value);
  }

  async function signIn() {
    if (password.length < 8) {
      setStatus("Слишком маленький пароль!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } else if (login.length < 5) {
      setStatus("Слишком маленький логин!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } else if (nameAndSurname.split(" ").length !== 2) {
      setStatus("Неверный формат записи имени и фамилии!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
    {
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
      </Header>
      <Body>
        {!isAuth && (
          <React.Fragment>
            <Text pb={10} size={16} lh={20} color="#292929">
              Имя и фамилия
            </Text>
            <Input value={nameAndSurname} onChange={(e) => onChangeName(e)} />
            <Text pt={5} color="rgba(41, 41, 41, 0.34);" size={10}>
              Не допустимы к вводу цифры и специальные символы
            </Text>
            <Text pb={10} size={16} lh={20} color="#292929">
              Логин
            </Text>
            <Input value={login} onChange={(e) => setLogin(e.target.value)} />
            <Text pt={5} color="rgba(41, 41, 41, 0.34);" size={10}>
              Логин должен содержать не менее 5 символов
            </Text>
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
            Пароль должен содержать не менее 8 символов
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
      </Body>
      {showMessage && <Message>{status}</Message>}
    </Block>
  );
}

const Block = styled.div`
  background: #fafafa;
  box-shadow: 17px 15px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding-bottom: 40px;
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
