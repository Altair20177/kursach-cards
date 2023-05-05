import { FC, useCallback, useState } from "react";
import {
  useGetCardsByCategoryQuery,
  useRejectCardMutation,
} from "../../store/cardApi";
import { Spin, Empty, notification, Input, Space, Select, Result } from "antd";
import OneCard from "./OneCard";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { CardType } from "../../types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const { Search } = Input;

const getSortedCards = (cards: CardType[], sortType: string) =>
  !!cards
    ? [...cards]?.sort((a, b) => {
        if (sortType === "up-start") {
          return new Date(a.dateTimeStart).getTime() <
            new Date(b.dateTimeStart).getTime()
            ? -1
            : 1;
        }
        if (sortType === "down-start") {
          return new Date(a.dateTimeStart).getTime() >
            new Date(b.dateTimeStart).getTime()
            ? -1
            : 1;
        }
        if (sortType === "up-end") {
          return new Date(a.dateTimeFinish).getTime() <
            new Date(b.dateTimeFinish).getTime()
            ? -1
            : 1;
        }
        if (sortType === "down-end") {
          return new Date(a.dateTimeFinish).getTime() >
            new Date(b.dateTimeFinish).getTime()
            ? -1
            : 1;
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
      <Content
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin />
      </Content>
    );
  }
  if (isError) {
    return (
      <Result
        status="error"
        title={"Ошибка при загрузке карточек"}
        subTitle="Перед повторной отправкой проверьте и измените следующую информацию."
      >
        Причина: {(error as FetchBaseQueryError)?.status}
      </Result>
    );
  }
  if (!cards?.length) {
    return (
      <Content
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Empty description={"Карточек на данную категорию нет..."} />
      </Content>
    );
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
          enterButton="Поиск"
          size="large"
          onSearch={setSearch}
        />
      </Space>
      <Space>
        <Select
          style={{
            width: "300px",
          }}
          onChange={setSortType}
          options={[
            {
              label: "По умолчанию",
              value: "",
            },
            {
              label: "По дате начала(по возрастанию)",
              value: "up-start",
            },
            {
              label: "По дате начала(по убыванию)",
              value: "down-start",
            },
            {
              label: "По дате окончания(по возрастанию)",
              value: "up-end",
            },
            {
              label: "По дате окончания(по убыванию)",
              value: "down-end",
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
