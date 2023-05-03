import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchPublishedCards } from "../../http/organizationApi";
import { CardType } from "../../types";
import OneCard from "../cards/OneCard";

export default function AdminCards() {
  const { pathname } = useLocation();
  const [organizationsCards, setOrganizationsCards] = useState<CardType[]>([]);

  useEffect(() => {
    fetchPublishedCards(localStorage.getItem("userId")).then((data) =>
      setOrganizationsCards(data)
    );
  }, []);

  return (
    <>
      <Title>Опубликованные карточки</Title>
      <CardsContainer>
        {organizationsCards.length !== 0 &&
          organizationsCards.map((card: CardType) => {
            return <OneCard withHeart={false} key={card.id} cardAbout={card} />;
          })}
      </CardsContainer>
    </>
  );
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  margin-bottom: 100px;
`;

const ButtonsBlock = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Button = styled.div`
  background: #335250;
  border-radius: 20px;
  transition: 0.2s;
  margin: 0 auto;
  margin-top: 20px;
  padding: 10px 30px;
  width: fit-content;

  &:hover {
    background: #335250de;
    cursor: pointer;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  line-height: 29px;
  color: rgba(53, 53, 53, 0.6);
  position: relative;
  margin: 30px 0;
  margin-left: -105px;
  padding-left: 120px;

  &::after {
    position: absolute;
    content: "";
    width: 459px;
    left: 0;
    bottom: -10px;
    height: 1.5px;
    background-color: rgba(53, 53, 53, 0.6);
  }
`;
