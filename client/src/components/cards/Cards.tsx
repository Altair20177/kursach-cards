import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { CardType } from "../../types";
import Text from "../generic/Text";
import search from "./images/search.svg";
import arrow from "./images/arrow.svg";
import OneCard from "./OneCard";
import { useEffect, useState } from "react";
import { fetchCardsByCategory } from "../../http/cardApi";

export default function Cards({}) {
  const { category } = useParams();

  const [sortType, setSortType] = useState<string>("normal");
  const [cards, setCards] = useState<CardType[]>([]);

  function updateSort() {
    sortType === "normal" && setSortType("up");
    sortType === "up" && setSortType("down");
    sortType === "down" && setSortType("normal");
  }

  useEffect(() => {
    category && fetchCardsByCategory(category).then((data) => setCards(data));
  }, [category]);

  return (
    <Container>
      <Options>
        <Sorts>
          <OptionsItem>
            <input type="checkbox" />
            <Text pl={5} size={15} lh={18} color="rgba(31, 31, 31, 0.79)">
              Свободный вход
            </Text>
          </OptionsItem>
          <OptionsItem onClick={updateSort} sort>
            <Text pr={5} size={15} lh={18} color="rgba(31, 31, 31, 0.79)">
              Отсортировать по дате
            </Text>
            {sortType !== "normal" && <img src={arrow} alt="arrow" />}
          </OptionsItem>
        </Sorts>
        <SearchBlock>
          <Search placeholder="Введите название мероприятия" />
          <SearchIcon src={search} alt="search" />
        </SearchBlock>
      </Options>
      {cards.length !== 0 ? (
        <CardsContainer>
          {cards.map((card: CardType) => {
            return <OneCard withHeart key={card.id} cardAbout={card} />;
          })}
        </CardsContainer>
      ) : (
        <Text pt={80} pb={264} color="black" align="center" size={50}>
          Карточек на данную категорию нет!
        </Text>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1350px;
  padding: 0 20px;
  margin: 0 auto;
  margin-top: 45px;
  margin-bottom: 100px;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OptionsItem = styled(Options)<{ sort?: boolean }>`
  ${(p) =>
    p.sort &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
`;

const Sorts = styled(Options)`
  width: 30%;
`;

const Search = styled.input`
  width: 400px;
  background: #ffffff;
  border: 1px solid rgba(53, 53, 53, 0.6);
  border-radius: 20px;
  height: 36px;
  padding: 0 20px 0 50px;
  position: relative;
`;

const SearchIcon = styled.img`
  position: absolute;
  width: 20px;
  left: 10px;
  top: 8px;
`;

const SearchBlock = styled.div`
  position: relative;
`;
