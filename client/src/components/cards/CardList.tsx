import { FC, useCallback, useMemo, useState } from "react";
import {
  useGetCardsByCategoryQuery,
  useRejectCardMutation,
} from "../../store/cardApi";
import { Spin, Empty, notification, Layout, Input, Space, Select } from "antd";
import OneCard from "./OneCard";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { CardType } from "../../types";

const { Search } = Input;

const getSortedCards = (cards: CardType[], sortType: string) =>
  !!cards
    ? [...cards]?.sort((a, b) => {
        if (sortType === "up") {
          return -1;
        }
        return 0;
      })
    : [];

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

const CardList: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");
  const [fetchDeleteCard] = useRejectCardMutation();
  const { categoryId } = useParams();
  const {
    data: cards,
    isLoading,
    isError,
    error,
  } = useGetCardsByCategoryQuery(categoryId as string, {
    skip: !categoryId,
  });
  const deleteCardHandler = useCallback(
    (id: number) => {
      fetchDeleteCard(id);
    },
    [fetchDeleteCard]
  );
  if (isLoading) {
    return (
      <Layout>
        <Spin />;
      </Layout>
    );
  }
  if (isError && error) {
    notification.error({
      message: "smth",
    });
  }
  if (!cards?.length) {
    return <Empty description={"Карточек на данную категорию нет!"} />;
  }
  const filteredCards = getSortedCards(
    !!search
      ? [...cards!]?.filter((card) =>
          card.cardName.concat(card.description).includes(search)
        )
      : cards,
    sortType
  );

  return (
    <Content
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Space>
        <Search
          placeholder="Поиск картинок"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(e) => {
            setSearch(e);
          }}
        />
      </Space>
      <Space>
        <Select
          style={{
            width: "300px",
          }}
          onChange={(e) => {
            console.log(e);
            setSortType(e);
          }}
          options={[
            {
              label: "По умолчанию",
              value: "",
            },
            {
              label: "По дате",
              value: "up",
            },
          ]}
          defaultValue={""}
        />
      </Space>
      {!!filteredCards?.length ? (
        <CardsContainer>
          {filteredCards?.map((card) => {
            return (
              <OneCard
                withHeart
                key={card.id}
                cardAbout={card}
                onDeleteCard={deleteCardHandler}
              />
            );
          })}
        </CardsContainer>
      ) : (
        <Empty description={"Карточек на данную категорию нет!"} />
      )}
    </Content>
  );
};

export default CardList;
