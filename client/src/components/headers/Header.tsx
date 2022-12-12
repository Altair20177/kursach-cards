import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { authorizeUser, setUserData } from "../../store/userSlice";
import Message from "../generic/Message";
import ModalContainer from "../generic/ModalContainer";
import Text from "../generic/Text";
import ModalRegAuth from "../modal/ModalRegAuth";
import back from "./images/header_back_1.png";
import heartSvg from "./images/heart_1.svg";

interface HeaderProps {
  size: "small" | "big";
}

export default function Header({ size }: HeaderProps) {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isRequestToAdmin, setIsRequestToAdmin] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const { isAuthorized, userData } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function onFavouriteClick() {
    if (isAuthorized) {
      navigate("/main/favorites");
    } else {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    }
  }

  function logOut() {
    dispatch(authorizeUser(false));
    dispatch(setUserData(null));
    localStorage.removeItem("token");
  }

  return (
    <>
      <HeaderBlock size={size} back={back}>
        <Menu size={size}>
          {size === "small" ? (
            <Text
              onClick={() => navigate("/main")}
              size={28}
              lh={34}
              color="#DECDA9"
            >
              Events.by
            </Text>
          ) : (
            <p></p>
          )}
          <RightMenu>
            {isAuthorized && userData?.userRole !== "user" && (
              <Button onClick={() => navigate("/admin")}>Админ-панель</Button>
            )}
            <Button ml={60} onClick={onFavouriteClick} heartSvg={heartSvg}>
              Избранное
            </Button>
            <Button
              onClick={isAuthorized ? logOut : () => setModalIsOpen(true)}
              ml={60}
              underline
            >
              {isAuthorized ? "Выход" : "Вход"}
            </Button>
          </RightMenu>
        </Menu>
        {size === "big" && (
          <About>
            <Text size={64} color="#DECDA9">
              Events.by
            </Text>
            <Text width={507} lh={38} size={24} mt={28}>
              Афиша мероприятий в городе Минске на любой вкус!
            </Text>
          </About>
        )}
      </HeaderBlock>
      <ModalContainer
        setIsAuth={setIsAuth}
        setIsRequestToAdmin={setIsRequestToAdmin}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      >
        <ModalRegAuth
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          isRequestToAdmin={isRequestToAdmin}
          setIsRequestToAdmin={setIsRequestToAdmin}
          setModalIsOpen={setModalIsOpen}
        />
      </ModalContainer>
      {showMessage && <Message>Необходимо авторизоваться!</Message>}
    </>
  );
}

const HeaderBlock = styled.header<{ back: string; size: string }>`
  background-image: url(${(p) => p.back});
  background-repeat: no-repeat;
  background-position: center;
  background-color: #004945;
  width: 100%;
  position: relative;

  height: ${(p) => (p.size === "big" ? "490" : "85")}px;
`;

const About = styled.div`
  position: absolute;
  right: 0;
  margin-right: 110px;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
`;

const Menu = styled.div<{ size: string }>`
  display: flex;
  justify-content: space-between;
  max-width: 1350px;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 95px;

  padding: ${(p) => (p.size === "big" ? "45px 40px 0" : "0 20px")};

  ${(p) => p.size === "small" && "height: 100%;"};
`;

const Button = styled.p<{
  underline?: boolean;
  ml?: number;
  heartSvg?: string;
}>`
  color: #decda9;
  font-size: 16px;
  letter-spacing: 0.205em;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ${(p) => p.underline && `text-decoration: underline;`}
  ${(p) => p.ml && `margin-left: ${p.ml}px;`}

  ${(p) =>
    p.heartSvg &&
    css`
      position: relative;
      display: flex;
      align-items: center;
      &::after {
        content: url(${p.heartSvg});
        position: relative;
        margin-left: 8px;
        top: 1px;
      }
    `}

  &:hover {
    cursor: pointer;
  }
`;
