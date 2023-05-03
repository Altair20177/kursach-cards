import styled, { css } from "styled-components";
import { CardType } from "../../types";
import Text from "../generic/Text";
import searchIcon from "./images/search.svg";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import CardList from "./CardList";

export default function Cards() {
  const cardsFromStore = useAppSelector((store) => store.cards);

  const [sortType, setSortType] = useState<string>("normal");
  const [cards, setCards] = useState<CardType[]>([]);
  const [search, setSearch] = useState<string>("");

  function updateSort() {
    if (sortType === "normal") {
      setCards(cardsFromStore.allCards);
      setSortType("up");
    }
    if (sortType === "up") {
      setCards(
        cards.sort((a, b) => (a.dateTimeStart > b.dateTimeStart ? 1 : -1))
      );
      setSortType("down");
    }
    if (sortType === "down") {
      setCards(
        cards.sort((a, b) => (a.dateTimeStart > b.dateTimeStart ? 1 : -1))
      );
      setSortType("normal");
    }
  }

  function onChangeSearch(e: any) {
    const value = e.target.value;
    setSearch(value);

    const result = cards.filter((card: CardType) =>
      card.cardName.toLowerCase().includes(value.toLowerCase())
    );

    setCards(value === "" ? cardsFromStore.allCards : result);
  }

  return (
    <Container>
      <CardList />
    </Container>
  );
}

const Container = styled.div`
  max-width: 1350px;
  padding: 0 20px;
  margin: 0 auto;
  margin-top: 45px;
  margin-bottom: 110px;
`;
