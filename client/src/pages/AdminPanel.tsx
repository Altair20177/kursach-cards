import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Text from "../components/generic/Text";
import { useAppSelector } from "../store/hooks";

type NavType = {
  text: string;
  link: string;
};

const NavForAdmin: NavType[] = [
  {
    text: "Опубликованные карточки",
    link: "published-cards",
  },
  {
    text: "Опубликовать новое событие",
    link: "publish-new-card",
  },
  {
    text: "Редактировать профиль",
    link: "update-profile",
  },
];

const NavForSuperAdmin: NavType[] = [
  {
    text: "Панель управления",
    link: "managing-panel",
  },
  {
    text: "Заявки",
    link: "requests",
  },
  {
    text: "Карточки на утверждение",
    link: "cards-to-accept",
  },
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const { userData } = useAppSelector((store) => store.user);
  const { pathname } = useLocation();

  const navToShow =
    userData?.userRole === "admin" ? NavForAdmin : NavForSuperAdmin;

  useEffect(() => {
    if (userData?.userRole === "superAdmin") navigate("managing-panel");
    else if (userData?.userRole === "admin") navigate("published-cards");
  }, [userData?.userRole]);

  return (
    <Container>
      <Nav>
        {navToShow.map((item) => {
          return (
            <Button
              isActive={pathname.split("/")[2] === item.link}
              key={item.link}
              onClick={() => navigate(`${item.link}`)}
            >
              <Text
                size={15}
                fw={500}
                ls={0.115}
                color="rgba(31, 31, 31, 0.79)"
              >
                {item.text}
              </Text>
            </Button>
          );
        })}
      </Nav>
      <Outlet />
    </Container>
  );
}

const Nav = styled.nav`
  display: flex;
`;

const Container = styled.div`
  max-width: 1350px;
  padding: 0 20px;
  margin: 0 auto;
  margin-top: 45px;
`;

const Button = styled.button<{ isActive: boolean }>`
  background: ${(p) => (p.isActive ? "rgba(6, 90, 85, 0.5)" : "#ffffff")};
  box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 3px 20px;
  margin-right: 40px;
  transition: 0.2s;

  &:hover {
    background: rgba(6, 90, 85, 0.5);
  }
`;
