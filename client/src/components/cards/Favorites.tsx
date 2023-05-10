import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  deleteCardFromFavourites,
  fetchFavouritesCardsByUserId,
} from "../../http/cardApi";
import { CardType } from "../../types";
import Text from "../generic/Text";
import OneCard from "./OneCard";
import { notification } from "antd";

export default function Favorites() {
  const [favouritesCards, setFavouritesCards] = useState<CardType[]>([]);

  useEffect(() => {
    fetchFavouritesCardsByUserId(localStorage.getItem("userId")).then((data) =>
      setFavouritesCards(data.filter(Boolean))
    );
  }, []);

  function deleteFromFavourites(cardId: number) {
    deleteCardFromFavourites(localStorage.getItem("userId"), cardId).then(
      () => {
        notification.info({
          message: "Карточка была удалена из избранного",
        });
        setFavouritesCards(
          favouritesCards.filter((card) => card.id !== cardId)
        );
      }
    );
  }
  return (
    <>
      <Title>Избранное</Title>
      <Container>
        {favouritesCards.length === 0 ? (
          <Text color="black" align="center" size={60} mt={106} mb={300}>
            У Вас нет избранных карточек!
          </Text>
        ) : (
          <CardsContainer>
            {favouritesCards.map((card) => {
              return (
                <OneCard
                  deleteFromFavourites={deleteFromFavourites}
                  withRedHeart
                  key={card.id}
                  cardAbout={card}
                />
              );
            })}
          </CardsContainer>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 1350px;
  padding: 0 20px;
  margin: 0 auto;
  margin-top: 45px;
  margin-bottom: 100px;
`;

const Title = styled.h2`
  color: #c1a875;
  font-size: 48px;
  line-height: 59px;
  position: relative;
  padding-left: 132px;
  margin: 50px 0;

  &::after {
    position: absolute;
    content: "";
    width: 385px;
    left: 0;
    bottom: -10px;
    height: 1.5px;
    background-color: #c1a875;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
`;
