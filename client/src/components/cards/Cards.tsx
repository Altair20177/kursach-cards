import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { CardType, CategoryType } from "../../types";
import Text from "../generic/Text";
import search from "./images/search.svg";
import arrow from "./images/arrow.svg";
import OneCard from "./OneCard";
import { useState } from "react";

const cardsInfo: CardType[] = [
  {
    id: 1,
    name: "Card 1",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, magnam.",
    category: "",
  },
  {
    id: 2,
    name: "Card 2",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, magnam.",
    category: "",
  },
  {
    id: 3,
    name: "Card 3",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, magnam.",
    category: "",
  },
  {
    id: 4,
    name: "Card 4",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, magnam.",
    category: "",
  },
  {
    id: 5,
    name: "Card 5",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, magnam.",
    category: "",
  },
];

export default function Cards({ categories }: { categories: CategoryType[] }) {
  const { category } = useParams();

  const [sortType, setSortType] = useState<string>("normal");

  function updateSort() {
    sortType === "normal" && setSortType("up");
    sortType === "up" && setSortType("down");
    sortType === "down" && setSortType("normal");
  }

  return (
    <Container>
      <Carusel></Carusel>
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
          <Search placeholder="Введите место или название" />
          <SearchIcon src={search} alt="search" />
        </SearchBlock>
      </Options>
      <CardsContainer>
        {cardsInfo.map((card: CardType) => {
          return <OneCard key={card.id} cardAbout={card} />;
        })}
      </CardsContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1350px;
  padding: 0 20px;
  margin: 0 auto;
  margin-top: 45px;
`;

const Carusel = styled.div``;

const CardsContainer = styled.div`
  margin-top: 50px;
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
