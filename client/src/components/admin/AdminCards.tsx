import styled from "styled-components";
import OneCard from "../cards/OneCard";
import { useGetOrganizationCardsQuery } from "../../store/organizationApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Spin, Result, Empty } from "antd";
import { Content } from "antd/es/layout/layout";

export default function AdminCards() {
  const {
    data: organizationCards,
    isLoading,
    isError,
    error,
  } = useGetOrganizationCardsQuery(+localStorage.getItem("userId")!, {
    skip: !localStorage.getItem("userId"),
  });
  if (isLoading) {
    return (
      <Content
        style={{
          width: "100vw",
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
  if (!organizationCards?.length) {
    return (
      <Content
        style={{
          width: "100vw",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Empty description={"Список карточек пуст"} />
      </Content>
    );
  }
  return (
    <>
      <Title>Опубликованные карточки</Title>
      <CardsContainer>
        {organizationCards.map((card) => (
          <OneCard withHeart={false} key={card.id} cardAbout={card} />
        ))}
      </CardsContainer>
    </>
  );
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  margin-bottom: 100px;
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
