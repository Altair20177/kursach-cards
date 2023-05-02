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

  // useEffect(() => {
  //   category &&
  //     fetchCardsByCategory(category).then((data) => {
  //       setCards(data);
  //       dispatch(setAllCards(data));
  //     });
  // }, [category]);

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
          {/*           <OptionsItem onClick={updateSort} sort>
            <Text pr={5} size={15} lh={18} color="rgba(31, 31, 31, 0.79)">
              Отсортировать по дате
            </Text>
            {sortType !== "normal" && <img src={arrow} alt="arrow" />}
          </OptionsItem> */}
        </Sorts>
        <SearchBlock>
          <Search
            value={search}
            onChange={(e) => onChangeSearch(e)}
            placeholder="Введите название мероприятия"
          />
          <SearchIcon src={searchIcon} alt="search" />
        </SearchBlock>
      </Options>
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
